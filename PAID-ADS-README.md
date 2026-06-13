# Paid-Ads Landing Pages + Attribution

A GoHighLevel-style paid-traffic funnel: dedicated no-leak landing pages at
`/go/[channel]`, full attribution capture (UTMs + click IDs, first-touch and
last-touch), and lead submissions that carry that attribution into Supabase and
into the notification email — so every lead ties back to a campaign.

## Environment variables

| Var | Required | Purpose |
| --- | --- | --- |
| `SUPABASE_URL` | yes | Supabase project URL (already set) |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | Service-role key — server-only writes to `leads` (already set) |
| `COMPOSIO_API_KEY` | yes | Email send via the existing Composio→Gmail helper (`lib/send-email.ts`) — used **instead of Resend** |
| `NOTIFY_EMAIL` | no | Where new-lead notifications go. Defaults to `agent@martinbuilds.ai` |
| `NEXT_PUBLIC_GTM_ID` | no | Google Tag Manager container id (e.g. `GTM-XXXXXXX`). If unset, the GTM snippet is not injected |

> **Note on email:** the spec referenced `RESEND_API_KEY`, but this project already
> sends transactional email through Composio→Gmail (`lib/send-email.ts`). We reuse
> that path, so there is no Resend dependency and no `RESEND_API_KEY`.

## One-time setup

1. Run the migration `supabase/migrations/006_lead_attribution.sql` in the Supabase
   SQL editor (or your migration tool). It is additive — it `ALTER`s the existing
   `leads` table to add attribution columns.
2. (Optional) Set `NEXT_PUBLIC_GTM_ID` in Vercel to enable GTM + the `lead_submit`
   conversion event.

## How the pieces fit

| File | Role |
| --- | --- |
| `lib/landing-pages.ts` | Per-channel config (copy, FAQs, default campaign). **Add a channel here — no new route needed.** |
| `app/go/[channel]/page.tsx` | The landing page, rendered from config. Unknown channel → 404. |
| `app/go/[channel]/layout.tsx` | `noindex` + optional GTM snippet. No global nav/footer. |
| `components/landing/LeadForm.tsx` | Client form. Captures attribution, posts `/api/leads`, pushes `lead_submit` to `dataLayer`, redirects to `/thank-you`. |
| `lib/attribution.ts` | First-party cookie (90d) + sessionStorage. `captureAttribution()` / `getAttribution()`. First-touch never overwritten; last-touch refreshed. |
| `app/api/leads/route.ts` | zod validation + in-memory IP rate limit + insert into `leads` + 2 emails. |
| `app/thank-you/page.tsx` | `noindex` conversion-goal URL (fallback conversion). |
| `lib/google-ads-conversions.ts` | Stub for offline / Enhanced Conversions upload via stored `gclid`. |

## Adding a new channel

Add an entry to `LANDING_PAGES` in `lib/landing-pages.ts` (e.g. `tiktok`). The route
`/go/tiktok` then works automatically — no duplicated code. `meta` and `linkedin`
are already stubbed.

## Constructing ad URLs

Point every ad at the channel's landing page and append UTMs + the platform's click
ID (Google/Meta append `gclid`/`fbclid` automatically when auto-tagging is on).

```
https://martinbuilds.ai/go/google?utm_source=google&utm_medium=pmax&utm_campaign=mb_pmax_prospection_usa
https://martinbuilds.ai/go/meta?utm_source=meta&utm_medium=paid_social&utm_campaign=mb_advantageplus_retarget_usa
```

### UTM naming convention

Lowercase, underscores, no spaces. Campaign format:

```
{brand}_{adtype}_{intent}_{geo}
```

| Part | Examples |
| --- | --- |
| `brand` | `mb` |
| `adtype` | `pmax`, `search`, `pmax`, `advantageplus`, `inmail` |
| `intent` | `prospection`, `retarget`, `brand` |
| `geo` | `usa`, `atl`, `ga` |

Example: `mb_pmax_prospection_usa`, `mb_search_brand_atl`.

## Seeing leads by campaign

All paid leads land in the existing `leads` table with `source = 'paid_ads'` and
`type = <channel>`. Query in the Supabase SQL editor:

```sql
-- Recent paid leads with attribution
select created_at, name, email, utm_campaign, utm_source, utm_medium, gclid, budget_range
from leads
where source = 'paid_ads'
order by created_at desc;

-- Lead count by campaign
select utm_campaign, count(*) as leads
from leads
where source = 'paid_ads'
group by utm_campaign
order by leads desc;

-- Full attribution snapshot for one lead
select first_touch_json, last_touch_json
from leads
where email = 'someone@example.com';
```

In the Supabase dashboard: open **Table editor → leads**, filter `source = paid_ads`,
and sort by `created_at`.

## Conversion tracking

- On successful submit the form pushes `{ event: 'lead_submit', value, currency: 'USD', channel }`
  to `window.dataLayer`. Configure a GTM trigger on the `lead_submit` event to fire your
  Google Ads conversion tag.
- `/thank-you` is a clean `noindex` URL you can also use as a URL-based conversion goal.
- `lib/google-ads-conversions.ts` is a stub for reporting **offline** conversions back to
  Google Ads against the stored `gclid` once a lead qualifies/closes. Fill in the TODOs and
  the listed `GOOGLE_ADS_*` env vars to go live.
