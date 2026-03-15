# AI Chief of Staff — Technical Architecture

## Overview

The AI Chief of Staff is a 5-layer autonomous system that connects to a business owner's existing tools and proactively manages operations — email triage, calendar optimization, lead follow-up, post-service automation, and daily briefings.

Unlike a chatbot (waits) or an agent (responds), the Chief of Staff **initiates**. It wakes up before the owner and starts working.

---

## System Architecture

```
┌─────────────────────────────────────────────────┐
│                 OWNER INTERFACE                  │
│         Telegram / WhatsApp / SMS / Email        │
│    (Daily briefing, alerts, approvals, chat)     │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│              CHIEF OF STAFF BRAIN               │
│          MiniMax-Text-01 + Rules Engine          │
│     Context: business profile, preferences,      │
│     industry playbook, conversation memory       │
└──────┬────────┬────────┬────────┬────────┬──────┘
       │        │        │        │        │
  ┌────▼──┐ ┌──▼───┐ ┌──▼──┐ ┌──▼───┐ ┌──▼────┐
  │Layer 1│ │Layer 2│ │Layer3│ │Layer4│ │Layer 5│
  │ Email │ │ Cal   │ │Follow│ │ Post │ │Brief  │
  │ Intel │ │ Mgmt  │ │  Up  │ │ Svc  │ │  ing  │
  └───┬───┘ └──┬───┘ └──┬──┘ └──┬───┘ └──┬────┘
      │        │        │       │        │
┌─────▼────────▼────────▼───────▼────────▼─────┐
│              TOOL CONNECTIONS                 │
│  Gmail/Outlook · Google Calendar · Stripe     │
│  Square · Composio OAuth · Supabase State     │
└──────────────────────────────────────────────┘
```

---

## Layer 1 — Email Intelligence

**What it does:** Reads every incoming email, categorizes it, and takes action.

### Categories & Actions

| Category | Detection | Auto-Action | Owner Involvement |
|----------|-----------|-------------|-------------------|
| New Lead | Keywords: "quote", "interested", "how much", new sender | Draft + send personalized follow-up within 5 min | None — notified in daily brief |
| Reschedule | Keywords: "reschedule", "move", "different time" | Check calendar, propose 3 options, confirm | None unless conflict |
| Cancellation | Keywords: "cancel", "won't make it" | Confirm, offer reschedule, flag gap for filling | None |
| Complaint | Negative sentiment, "unhappy", "problem", "disappointed" | Flag IMMEDIATELY via Telegram with suggested response | Owner approves or edits response |
| Vendor/Supplier | Known vendor domains, invoices, supply chain | File/forward, flag if action needed | Weekly vendor summary |
| Review/Feedback | "review", "feedback", Google/Yelp domains | Log + send thank-you if positive | None |
| Spam/Irrelevant | Low relevance score | Archive silently | None |

### Technical Implementation

```
Composio Gmail API (read/send)
→ Polling: every 2 minutes via cron
→ Each email → MiniMax classification prompt
→ Category → action handler
→ Action taken → logged to Supabase `email_actions` table
→ Owner notified only for complaints + flagged items
```

### Email Templates
- Per-industry response templates (HVAC, dental, legal, property mgmt)
- Personalized with business name, owner name, service details
- A/B testable subject lines
- Tone matches business brand (professional, friendly, casual)

---

## Layer 2 — Calendar Management

**What it does:** Owns the calendar. Sends reminders, prevents no-shows, fills gaps.

### Proactive Actions

| Trigger | Action | Timing |
|---------|--------|--------|
| Appointment in 24h | Send reminder to customer (SMS/email) | 24h before |
| Appointment in 2h | Send "on our way" / "see you soon" | 2h before |
| No confirmation reply | Follow up: "Still on for tomorrow?" | 18h before |
| Gap detected (>2h empty) | Pull lead from pipeline, send "we had a cancellation" offer | Within 1h of gap appearing |
| Recurring client overdue | "It's been X months since your last visit" | Based on service cycle |
| End of week | Preview next week's schedule for owner | Friday 5 PM |

### No-Show Prevention Flow

```
Appointment booked
  → T-24h: "Reminder: Your [service] is tomorrow at [time]"
  → If no reply by T-18h: "Just confirming — still good for tomorrow?"
  → If "yes" → done
  → If "no" or reschedule → handle + fill gap
  → If no reply by T-4h: "We're looking forward to seeing you at [time] today"
  → If no-show: log, send "we missed you", offer rebook
```

### Technical Implementation

```
Composio Google Calendar API (read/write)
→ Cron: every 15 minutes, check upcoming 48h
→ Reminder queue in Supabase `reminders` table
→ SMS via Telnyx or email via Composio Gmail
→ Gap detection: scan for blocks > configurable threshold
→ Gap filling: query `leads` table for warm prospects
```

---

## Layer 3 — Follow-Up Engine

**What it does:** No lead ever falls through the cracks. Automated multi-touch sequences that run forever.

### Lead Lifecycle

```
New Lead Detected (email, form, call)
  │
  ▼
  DAY 0: Personalized response (< 5 min)
  │
  ▼
  DAY 2: If no reply → Follow-up #1 (different angle)
  │
  ▼
  DAY 5: If no reply → Follow-up #2 (value add / case study)
  │
  ▼
  DAY 10: If no reply → Follow-up #3 (soft close / limited offer)
  │
  ▼
  DAY 14: If no reply → Move to nurture sequence
  │
  ▼
  NURTURE: Monthly check-in, seasonal offers, educational content
  
  AT ANY POINT: If they reply → AI reads response, routes accordingly
  AT ANY POINT: If they book → Stop sequence, move to active customer
```

### Configurable Per Client

- Timing between touches (aggressive vs. gentle)
- Tone and messaging style
- Industry-specific templates
- Max follow-up attempts before nurture
- Nurture frequency
- Blackout hours (no messages before 8 AM or after 8 PM)

### Technical Implementation

```
Supabase tables:
  - `leads` (source, status, score, last_contact, next_action)
  - `follow_up_queue` (lead_id, step, scheduled_at, sent_at, channel)
  - `sequences` (client_id, steps[], timing[], templates[])

Cron: every 15 minutes
  → Query follow_up_queue WHERE scheduled_at <= now() AND sent_at IS NULL
  → For each: send via appropriate channel (email/SMS)
  → Log result, schedule next step
  → If reply detected: pause sequence, classify, route
```

---

## Layer 4 — Post-Service Automation

**What it does:** After every completed job, automatically handles thank-you, review requests, and upsells.

### Post-Service Sequence

```
Job Marked Complete (manual trigger or calendar event end)
  │
  ▼
  HOUR 1: Thank-you message
  "Thanks for choosing [business]. Hope everything went great!"
  │
  ▼
  DAY 2: Review request
  "Would you mind leaving us a quick review? [Google link]"
  (Only if no complaint detected)
  │
  ▼
  DAY 7: Upsell / Cross-sell
  Industry-specific:
    HVAC → "Maintenance plan: $X/month, never worry about breakdowns"
    Dental → "Time for your 6-month cleaning? Book now"
    Legal → "Need help with [related service]?"
    Property → "Considering additional properties?"
  │
  ▼
  CYCLE: Recurring service reminder based on service type
    HVAC → 6 months (filter change), 12 months (annual service)
    Dental → 6 months (cleaning)
    Legal → Annual review
    Property → Lease renewal 90 days out
```

### Review Gating

- If customer sentiment is negative → skip review request, flag for owner
- If positive → send review request with direct Google/Yelp link
- Track review completion → send thank-you for review

### Technical Implementation

```
Supabase tables:
  - `completed_jobs` (client_id, customer_id, service_type, completed_at)
  - `post_service_queue` (job_id, step, scheduled_at, sent_at)
  - `reviews` (customer_id, platform, requested_at, completed_at, rating)

Trigger: owner marks job complete (via Telegram command or calendar event)
  → Enqueue post-service sequence
  → Cron processes queue every 15 minutes
```

---

## Layer 5 — Daily Briefing

**What it does:** One message at end of day. Everything the owner needs to know.

### Briefing Template

```
📊 Daily Briefing — [Date]
━━━━━━━━━━━━━━━━━━━━

🔴 NEEDS YOUR ATTENTION
• [Complaint from John Smith — draft response attached]
• [Large quote request: $12K kitchen remodel]

📥 EMAIL
• 23 emails processed
• 4 new leads (2 responded, 2 in follow-up)
• 1 reschedule handled
• 1 complaint (flagged above)

📅 TOMORROW
• 8 appointments scheduled
• 1 gap: 2-4 PM (reaching out to fill)
• 3 reminders sent, 2 confirmed

💰 PIPELINE
• 12 active leads
• 3 proposals outstanding ($34K total)
• 2 follow-ups sent today

⭐ REVIEWS
• 1 review request sent
• New 5-star review from Sarah M.

📈 THIS WEEK
• Revenue booked: $18,400
• New leads: 14
• Conversion rate: 43%
• No-show rate: 5% (down from 12%)

━━━━━━━━━━━━━━━━━━━━
Reply to ask me anything.
```

### Technical Implementation

```
Cron: daily at client's configured time (default 6 PM local)
→ Query all day's actions from Supabase
→ MiniMax generates natural-language summary
→ Send via Telegram/WhatsApp/Email (owner preference)
→ Owner can reply to ask questions or give instructions
```

---

## Database Schema (New Tables)

```sql
-- Lead tracking
CREATE TABLE cos_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  name text,
  email text,
  phone text,
  source text, -- 'email', 'form', 'referral', 'manual'
  status text DEFAULT 'new', -- new, contacted, following_up, nurture, converted, lost
  score integer DEFAULT 50,
  notes text,
  last_contact_at timestamptz,
  next_action_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Follow-up sequences
CREATE TABLE cos_sequences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  name text, -- 'new_lead', 'nurture', 'post_service', 'review'
  steps jsonb, -- [{day: 0, channel: 'email', template: '...'}, ...]
  active boolean DEFAULT true
);

-- Queued actions
CREATE TABLE cos_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  lead_id uuid REFERENCES cos_leads(id),
  action_type text, -- 'email', 'sms', 'reminder', 'review_request', 'briefing'
  payload jsonb,
  scheduled_at timestamptz,
  sent_at timestamptz,
  result text,
  created_at timestamptz DEFAULT now()
);

-- Action log (everything the AI did)
CREATE TABLE cos_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  layer text, -- 'email', 'calendar', 'followup', 'postservice', 'briefing'
  action text,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- Email classifications
CREATE TABLE cos_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  message_id text,
  from_email text,
  subject text,
  category text,
  action_taken text,
  flagged boolean DEFAULT false,
  processed_at timestamptz DEFAULT now()
);

-- Completed jobs (for post-service automation)
CREATE TABLE cos_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  customer_name text,
  customer_email text,
  customer_phone text,
  service_type text,
  revenue numeric,
  completed_at timestamptz,
  post_service_started boolean DEFAULT false
);
```

---

## Industry Playbooks

Each client gets an industry-specific configuration:

### HVAC
- Lead response emphasizes urgency ("AC out? We can be there today")
- Follow-up cycle: aggressive (comfort = urgency)
- Post-service: maintenance plan upsell, seasonal reminders
- Review timing: 2 days after service
- Recall cycle: 6 months (filter), 12 months (tune-up)

### Dental
- Lead response: warm, emphasize ease of booking
- Follow-up cycle: moderate (healthcare = trust)
- Post-service: 6-month recall, whitening upsell
- Review timing: 1 day after appointment
- Insurance verification proactive outreach

### Legal
- Lead response: professional, emphasize confidentiality
- Follow-up cycle: gentle (legal = sensitivity)
- Post-service: annual review, referral request
- Review timing: 7 days (after resolution)
- Conflict check before engaging

### Property Management
- Lead response: availability + pricing focus
- Follow-up cycle: moderate
- Post-service: lease renewal 90 days out
- Maintenance request triage
- Tenant communication automation

### General Service Business
- Configurable templates for any service business
- Customizable timing, tone, and channels

---

## Cron Schedule

| Job | Frequency | Purpose |
|-----|-----------|---------|
| Email scan | Every 2 min | Read + classify + act on new emails |
| Calendar check | Every 15 min | Reminders, gap detection, no-show prevention |
| Follow-up processor | Every 15 min | Send queued follow-ups |
| Post-service processor | Every 15 min | Send queued post-service messages |
| Daily briefing | Once/day (configurable) | Compile + send daily summary |
| Weekly report | Once/week (Friday) | Weekly performance metrics |
| Sequence optimizer | Weekly | Analyze open rates, adjust timing |

---

## Onboarding Process (Per Client)

### Week 1: Discovery + Connection
1. Discovery call — understand business, pain points, current tools
2. Connect accounts via OAuth (Gmail, Calendar, CRM, Stripe)
3. Import existing contacts/leads
4. Set industry playbook + customizations
5. Configure communication preferences (channels, hours, tone)

### Week 2: Training + Testing
1. AI processes 1 week of email history (classification accuracy tuning)
2. Test all sequences with dummy data
3. Owner reviews and approves templates
4. Shadow mode: AI drafts actions but doesn't send — owner reviews
5. Adjust rules based on feedback

### Week 3: Go Live
1. Turn on auto-send for approved categories
2. Keep complaint handling in approval mode
3. Daily briefings begin
4. Weekly check-in call with owner

### Week 4+: Optimization
1. Review metrics (response time, follow-up conversion, no-show rate)
2. Optimize sequences based on data
3. Expand to additional layers if not all launched at once
4. Monthly strategy call

---

## Pricing

| Tier | Monthly | What's Included |
|------|---------|-----------------|
| **Chief of Staff Starter** | $2,000/mo | Layer 1 (Email) + Layer 5 (Briefing) + 1 additional layer |
| **Chief of Staff Pro** | $3,500/mo | All 5 layers, up to 500 leads, 2 communication channels |
| **Chief of Staff Enterprise** | $5,000/mo | All 5 layers, unlimited leads, all channels, custom integrations, weekly strategy call |

**Setup fee:** $1,000 one-time (waived for pilot clients)
**Pilot offer:** $1,500/mo for 60 days, full system, money-back guarantee

---

## Success Metrics (What We Measure)

- **Response time**: New lead → first contact (target: < 5 minutes)
- **Follow-up rate**: % of leads that get all sequence steps (target: 100%)
- **No-show rate**: Before vs. after (target: cut by 50%+)
- **Review generation**: Reviews requested vs. received per month
- **Gap fill rate**: % of calendar gaps filled proactively
- **Owner time saved**: Hours/week of admin work eliminated (target: 20+)
- **Revenue impact**: New revenue from filled gaps + converted leads

---

## Tech Stack

- **AI Brain**: MiniMax-Text-01 (cost-effective, high quality)
- **Tool Connections**: Composio (OAuth middleware for all integrations)
- **State & Data**: Supabase (Postgres + real-time)
- **Communication**: Telegram (now), WhatsApp (pending), SMS (Telnyx), Email (Composio Gmail)
- **Scheduling**: OpenClaw cron + Vercel cron
- **Hosting**: Vercel (serverless)
- **Payments**: Stripe (subscription billing)
