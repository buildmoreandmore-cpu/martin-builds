"use client";

import { useState, useEffect, useCallback, useRef, type CSSProperties, type FormEvent } from "react";

/* ─── Design tokens ─── */
const GREEN = "#c8ff00";
const BG = "#0a0a0a";
const CARD_BG = "#1a1a1a";
const BORDER = "#2a2a2a";
const TEXT = "#e0e0e0";
const DIM = "#888";

/* ─── Types ─── */
interface LineItem {
  id: string;
  description: string;
  amount: string;
}

interface InvoiceEntry {
  id: string;
  amount: number;
  amount_paid: number;
  status: string | null;
  due_date: string | null;
  payment_type: string;
  stripe_url: string;
  pay_url: string | null;
  description: string | null;
  customer_email: string | null;
  line_items: { id: string; description: string; amount: number }[];
}

interface SubscriptionEntry {
  id: string;
  status: string;
  current_period_end: string;
  monthly_amount: number;
  stripe_url: string;
}

interface ProjectCard {
  client_name: string;
  project_name: string;
  payment_type: string;
  phase: string | null;
  invoices: InvoiceEntry[];
  status: string;
  status_label: string;
  total_amount: number;
  installment?: {
    id: string;
    status: string;
    monthly_amount: number;
    total_owed: number;
    payments_made: number;
    total_payments: number;
    amount_paid: number;
    next_payment_date: string | null;
    stripe_url: string;
    customer_email: string | null;
  };
  amount_paid: number;
  subscription?: SubscriptionEntry;
}

/* ─── Styles ─── */
const s: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: BG,
    color: TEXT,
    fontFamily: "'Outfit', sans-serif",
    padding: 0,
    margin: 0,
  },
  loginWrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: BG,
  },
  loginBox: {
    width: "100%",
    maxWidth: 380,
    padding: "32px clamp(16px, 5vw, 32px)",
  },
  loginTitle: {
    color: GREEN,
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 8,
    fontFamily: "'Space Mono', monospace",
    letterSpacing: 1,
  },
  loginSub: {
    color: DIM,
    fontSize: 13,
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    background: "#0a0f0a",
    border: `1px solid ${BORDER}`,
    borderRadius: 4,
    color: TEXT,
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box" as const,
  },
  inputFocus: {
    borderColor: GREEN,
  },
  btn: {
    width: "100%",
    padding: "10px 0",
    background: GREEN,
    color: BG,
    border: "none",
    borderRadius: 4,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "inherit",
    marginTop: 12,
  },
  btnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  header: {
    padding: "16px clamp(12px, 4vw, 24px)",
    borderBottom: `1px solid ${BORDER}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: GREEN,
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
  },
  logoutBtn: {
    background: "transparent",
    border: `1px solid ${BORDER}`,
    color: DIM,
    padding: "6px 14px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "inherit",
  },
  content: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "24px clamp(12px, 4vw, 24px)",
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: GREEN,
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: 2,
    marginBottom: 16,
    borderBottom: `1px solid ${BORDER}`,
    paddingBottom: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    color: DIM,
    fontSize: 11,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
    marginBottom: 4,
  },
  row: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap" as const,
  },
  flex1: {
    flex: 1,
    minWidth: 200,
  },
  lineItemRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap" as const,
  },
  trashBtn: {
    background: "transparent",
    border: "none",
    color: "#ff4444",
    cursor: "pointer",
    fontSize: 18,
    padding: "4px 8px",
    lineHeight: 1,
  },
  addBtn: {
    background: "transparent",
    border: `1px dashed ${BORDER}`,
    color: GREEN,
    padding: "8px 16px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "inherit",
    width: "100%",
  },
  toggleGroup: {
    display: "flex",
    gap: 0,
    borderRadius: 4,
    overflow: "hidden",
    border: `1px solid ${BORDER}`,
  },
  toggleBtn: {
    flex: 1,
    padding: "8px 4px",
    background: CARD_BG,
    color: DIM,
    border: "none",
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "inherit",
    borderRight: `1px solid ${BORDER}`,
  },
  toggleActive: {
    background: GREEN,
    color: BG,
    fontWeight: 700,
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    background: "#0a0f0a",
    border: `1px solid ${BORDER}`,
    borderRadius: 4,
    color: TEXT,
    fontSize: 14,
    fontFamily: "inherit",
    resize: "vertical" as const,
    minHeight: 80,
    outline: "none",
    boxSizing: "border-box" as const,
  },
  card: {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 6,
    padding: "clamp(10px, 3vw, 16px)",
    marginBottom: 12,
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 8,
    flexWrap: "wrap" as const,
  },
  cardTitle: {
    fontSize: "clamp(13px, 3.5vw, 15px)",
    fontWeight: 700,
    color: TEXT,
    margin: 0,
  },
  cardClient: {
    fontSize: 12,
    color: DIM,
    margin: 0,
  },
  badge: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: 12,
    fontSize: 10,
    fontWeight: 600,
    whiteSpace: "nowrap" as const,
  },
  cardMeta: {
    display: "flex",
    gap: 16,
    fontSize: 12,
    color: DIM,
    marginTop: 8,
    flexWrap: "wrap" as const,
  },
  error: {
    color: "#ff4444",
    fontSize: 12,
    marginTop: 4,
  },
  success: {
    color: GREEN,
    fontSize: 13,
    marginTop: 8,
    padding: "8px 12px",
    border: `1px solid ${GREEN}`,
    borderRadius: 4,
  },
  spinner: {
    display: "inline-block",
    width: 14,
    height: 14,
    border: "2px solid transparent",
    borderTop: `2px solid ${BG}`,
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
    marginRight: 6,
    verticalAlign: "middle",
  },
  emptyState: {
    textAlign: "center" as const,
    color: DIM,
    padding: "40px 0",
    fontSize: 13,
  },
  dueDateRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap" as const,
  },
};

/* ─── Service Presets ─── */
interface ServicePreset {
  id: string;
  category: string;
  name: string;
  projectName: string;
  lineItems: { description: string; amount: string }[];
  paymentType: "full" | "split" | "retainer";
  memo: string;
}

const SERVICE_PRESETS: ServicePreset[] = [
  // WEBSITES
  {
    id: "landing-page",
    category: "Websites",
    name: "Landing Page",
    projectName: "Landing Page",
    lineItems: [{ description: "Landing Page — single conversion page, Stripe or form integration, mobile-first, branded", amount: "750" }],
    paymentType: "full",
    memo: "Remove payment integration −$150",
  },
  {
    id: "starter-website",
    category: "Websites",
    name: "Starter Website",
    projectName: "Starter Website",
    lineItems: [{ description: "Starter Website — up to 5 pages, mobile-optimized, branded, contact form, basic SEO", amount: "1200" }],
    paymentType: "full",
    memo: "Remove SEO −$200",
  },
  {
    id: "business-website",
    category: "Websites",
    name: "Business Website",
    projectName: "Business Website",
    lineItems: [{ description: "Business Website — up to 10 pages, blog, lead capture, analytics, trust signals", amount: "2200" }],
    paymentType: "full",
    memo: "Remove blog −$300 | Remove analytics −$150",
  },
  // WORKFLOWS & PORTALS
  {
    id: "intake-workflow",
    category: "Workflows & Portals",
    name: "Intake + Payment + Consent Workflow",
    projectName: "Intake + Payment + Consent Workflow",
    lineItems: [{ description: "Intake + Payment + Consent Workflow — multi-step flow, intake form, Stripe payment, e-sign consent, mobile-first", amount: "1800" }],
    paymentType: "full",
    memo: "Remove e-sign −$300 | Remove Stripe −$250",
  },
  {
    id: "client-portal",
    category: "Workflows & Portals",
    name: "Client Portal",
    projectName: "Client Portal",
    lineItems: [{ description: "Client Portal — login-protected portal, dashboard, document access, order or status tracking", amount: "3500" }],
    paymentType: "full",
    memo: "Remove docs −$400 | Remove tracking −$300",
  },
  {
    id: "custom-platform",
    category: "Workflows & Portals",
    name: "Full Custom Platform",
    projectName: "Full Custom Platform",
    lineItems: [{ description: "Full Custom Platform — admin panel, user roles, billing, reporting, data migration", amount: "5500" }],
    paymentType: "split",
    memo: "Range: $5,500–$7,500 | Remove reporting −$750 | Remove migration −$500",
  },
  // AI BUILD SPRINT
  {
    id: "ai-tool",
    category: "AI Build Sprint",
    name: "AI-Powered Tool or Website",
    projectName: "AI-Powered Tool or Website",
    lineItems: [{ description: "AI-Powered Tool or Website — Claude API, custom UI, deployed", amount: "5000" }],
    paymentType: "split",
    memo: "Range: $5,000–$7,000 | Remove custom UI −$500",
  },
  // AI PLATFORM BUILD
  {
    id: "ai-platform",
    category: "AI Platform Build",
    name: "Full-Stack AI Platform",
    projectName: "Full-Stack AI Platform",
    lineItems: [{ description: "Full-Stack AI Platform — AI logic, admin dashboard, workflows, integrations", amount: "8000" }],
    paymentType: "split",
    memo: "Range: $8,000–$12,000 | Remove integrations −$1,000 | Remove workflows −$750",
  },
  // RETAINERS
  {
    id: "maintenance-retainer",
    category: "Retainers",
    name: "Maintenance Retainer",
    projectName: "Maintenance Retainer",
    lineItems: [{ description: "Maintenance Retainer — monthly updates, fixes, content changes, monitoring, priority support", amount: "350" }],
    paymentType: "retainer",
    memo: "Remove priority −$100 | Cancel anytime",
  },
  {
    id: "ai-growth-retainer",
    category: "Retainers",
    name: "AI Growth Retainer",
    projectName: "AI Growth Retainer",
    lineItems: [{ description: "AI Growth Retainer — new features, iterations, AI upgrades", amount: "1500" }],
    paymentType: "retainer",
    memo: "Remove AI upgrades −$200 | Cancel anytime",
  },
  // LEAD GENERATION
  {
    id: "targeted-outreach",
    category: "Lead Generation",
    name: "Targeted Outreach Program",
    projectName: "Targeted Outreach Program",
    lineItems: [{ description: "Targeted Outreach Program — verified prospect contacts, 3-step email sequence, monthly report", amount: "650" }],
    paymentType: "retainer",
    memo: "Remove report −$100 | Cancel anytime",
  },
  {
    id: "full-growth-package",
    category: "Lead Generation",
    name: "Full Growth Package",
    projectName: "Full Growth Package",
    lineItems: [{ description: "Full Growth Package — retainer + outreach combined, maintenance, leads, sequences", amount: "900" }],
    paymentType: "retainer",
    memo: "Save $100/mo vs separate | Cancel anytime",
  },
];

const PRESET_CATEGORIES = [...new Set(SERVICE_PRESETS.map((p) => p.category))];

/* ─── Automation Types ─── */
interface AutoClient {
  id: string;
  stripe_customer_id: string;
  subscription_id: string;
  subscription_item_id: string;
  plan: string;
  customer_email: string;
  client_name: string;
  business_name: string;
  model: string;
  per_convo_cents: number;
  status: string;
  conversations_this_month: number;
  last_conversation_at: string | null;
  setup_paid_at: string | null;
  current_usage: number;
  current_bill: number;
  created_at: string;
}

interface AutoSummary {
  total: number;
  active: number;
  paused: number;
  canceled: number;
  monthly_revenue: number;
}

const PLAN_COLORS: Record<string, string> = {
  essential: "#c8ff00",
  professional: "#64b4ff",
  enterprise: "#b482ff",
};

const PLAN_MODELS: Record<string, string> = {
  essential: "MiniMax-Text-01",
  professional: "Claude Haiku 4.5",
  enterprise: "Claude Sonnet 4.6",
};

interface AgentClient {
  id: string;
  name: string;
  email: string;
  business_name: string;
  bot_name: string;
  industry: string;
  plan: string;
  active: boolean;
  telegram_connected: boolean;
  bot_username: string | null;
  message_count: number;
  last_active: string | null;
  last_interface: string | null;
  estimated_cost: number;
  created_at: string;
}

interface AgentMessage {
  role: "user" | "assistant";
  content: string;
  interface: string;
  created_at: string;
}

/* ─── Component ─── */
export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Tab
  const [activeTab, setActiveTab] = useState<"invoices" | "automate" | "agents" | "reports" | "leads">("invoices");

  // Automation
  const [autoClients, setAutoClients] = useState<AutoClient[]>([]);
  const [autoSummary, setAutoSummary] = useState<AutoSummary | null>(null);
  const [autoLoading, setAutoLoading] = useState(false);
  const [autoActionId, setAutoActionId] = useState<string | null>(null);

  // AI Agents
  const [agents, setAgents] = useState<AgentClient[]>([]);
  const [agentsLoading, setAgentsLoading] = useState(false);
  const [conversationAgent, setConversationAgent] = useState<AgentClient | null>(null);
  const [conversationMessages, setConversationMessages] = useState<AgentMessage[]>([]);
  const [conversationLoading, setConversationLoading] = useState(false);

  // Build Reports
  interface BuildReport {
    id: string;
    name: string;
    business_name: string;
    industry: string;
    location: string | null;
    before: string;
    built: string;
    tech_tags: string[];
    impact: string;
    rating: string | null;
    quote: string | null;
    referral_name: string | null;
    referral_business: string | null;
    referral_contact: string | null;
    referral_reason: string | null;
    status: string;
    created_at: string;
  }
  const [reports, setReports] = useState<BuildReport[]>([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  // Leads
  interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    business: string | null;
    industry: string | null;
    type: string;
    message: string | null;
    source: string;
    status: string;
    notes: string | null;
    last_emailed_at: string | null;
    sequence_step: number;
    created_at: string;
  }
  const INDUSTRIES = ["Law Firm", "Real Estate", "Healthcare", "Construction", "Restaurant", "Retail", "Professional Services", "Technology", "Finance", "Other"];
  const EMAIL_TEMPLATES = [
    {
      id: "A",
      label: "A — Warm Intro (Day 0)",
      subject: "hello from martin.builds",
      message: `Hi {{first_name}},\n\nMy name is Francis with martin.builds and I help businesses like {{firm_name}} simplify the workflows that eat up your team's time — client intake, scheduling, reporting, all of it.\n\nI'd love to learn more about how your team runs things today and see if there's a way I can help.\n\nI put together a few working demos of what this looks like: martinbuilds.ai/demo\n\nTake a look when you have a minute. If anything in there feels familiar, I'd enjoy a conversation.\n\nFeel free to reply to this email or reach out anytime.\n\nBest,\nFrancis\nmartin.builds\nagent@martinbuilds.ai`,
    },
    {
      id: "B",
      label: "B — Pain + Demo (Day 5)",
      subject: "there has to be an easier way",
      message: `Hi {{first_name}},\n\nEvery business owner I talk to says some version of the same thing: "There has to be an easier way to do this."\n\nAll the steps, all the clicks — and knowing there's a better way but not having the time or the $50K an agency would charge to fix it.\n\nI build the fix — custom dashboards and AI tools that you own. Two weeks, fixed price, no agency runaround.\n\nSee what it looks like: martinbuilds.ai/demo\n\nReply with the one workflow that bugs your team the most. I'll send back a working demo built around it — no call, no commitment.\n\nFrancis\nmartin.builds`,
    },
    {
      id: "C",
      label: "C — Breakup (Day 12)",
      subject: "re: hello from martin.builds",
      message: `Hi {{first_name}},\n\nClosing the loop — should I stop reaching out?\n\nIf the timing isn't right, no hard feelings. The demos are still live if you ever want to take a look: martinbuilds.ai/demo\n\nIf a workflow ever comes up that's eating your team's time, you know where to find me.\n\nFrancis\nmartin.builds`,
    },
  ];
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadBusiness, setNewLeadBusiness] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadIndustry, setNewLeadIndustry] = useState("");
  const [newLeadType, setNewLeadType] = useState("General");
  const [newLeadMessage, setNewLeadMessage] = useState("");
  const [leadFilter, setLeadFilter] = useState<string>("all");
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [bulkSending, setBulkSending] = useState(false);
  const [editingLeadNotes, setEditingLeadNotes] = useState<string | null>(null);
  const [leadNotesValue, setLeadNotesValue] = useState("");
  const [editingLeadField, setEditingLeadField] = useState<{ id: string; field: "name" | "email" | "phone" | "industry" } | null>(null);
  const [leadFieldValue, setLeadFieldValue] = useState("");
  const [leadSearch, setLeadSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [leadSort, setLeadSort] = useState<"newest" | "oldest" | "name" | "last_emailed">("newest");
  // Compose panel
  const [showCompose, setShowCompose] = useState(false);
  const [composeSubject, setComposeSubject] = useState("");
  const [composeMessage, setComposeMessage] = useState("");
  const [composeTargets, setComposeTargets] = useState<Lead[]>([]);
  const [composeSending, setComposeSending] = useState(false);
  const [composeTemplate, setComposeTemplate] = useState("");

  const fetchLeads = useCallback(async () => {
    setLeadsLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch { /* ignore */ }
    setLeadsLoading(false);
  }, []);

  async function addLead() {
    if (!newLeadName || !newLeadEmail) return;
    const duplicate = leads.find((l) => l.email.toLowerCase() === newLeadEmail.toLowerCase());
    if (duplicate && !confirm(`A lead with email "${newLeadEmail}" already exists (${duplicate.name}). Add anyway?`)) return;
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newLeadName,
          email: newLeadEmail,
          business: newLeadBusiness || null,
          phone: newLeadPhone || null,
          industry: newLeadIndustry || null,
          type: newLeadType,
          message: newLeadMessage || null,
          source: "manual",
        }),
      });
      if (res.ok) {
        setNewLeadName("");
        setNewLeadEmail("");
        setNewLeadBusiness("");
        setNewLeadPhone("");
        setNewLeadIndustry("");
        setNewLeadType("General");
        setNewLeadMessage("");
        setShowAddLead(false);
        fetchLeads();
      }
    } catch { /* ignore */ }
  }

  async function updateLead(id: string, updates: Record<string, string | null>) {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      if (res.ok) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
      }
    } catch { /* ignore */ }
  }

  async function deleteLead(id: string) {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch { /* ignore */ }
  }

  const [sendingFollowUp, setSendingFollowUp] = useState<string | null>(null);

  function openCompose(targets: Lead[], defaultSubject?: string, defaultMessage?: string) {
    const validTargets = targets.filter((l) => l.email && l.email !== "not found");
    if (validTargets.length === 0) { alert("No valid email addresses in selection."); return; }
    setComposeTargets(validTargets);
    // Auto-select next template based on lead's sequence step
    const minStep = Math.min(...validTargets.map((l) => l.sequence_step || 0));
    const nextTemplate = EMAIL_TEMPLATES[Math.min(minStep, EMAIL_TEMPLATES.length - 1)];
    if (!defaultSubject && !defaultMessage && nextTemplate) {
      setComposeTemplate(nextTemplate.id);
      setComposeSubject(nextTemplate.subject);
      setComposeMessage(nextTemplate.message);
    } else {
      setComposeTemplate("");
      setComposeSubject(defaultSubject || nextTemplate?.subject || "");
      setComposeMessage(defaultMessage || nextTemplate?.message || "");
    }
    setShowCompose(true);
  }

  async function sendCompose() {
    if (!composeMessage.trim() || composeTargets.length === 0) return;
    // Find which template index was used (for sequence tracking)
    const templateIdx = EMAIL_TEMPLATES.findIndex((t) => t.id === composeTemplate);
    setComposeSending(true);
    for (const lead of composeTargets) {
      try {
        const newStep = templateIdx >= 0 ? templateIdx + 1 : (lead.sequence_step || 0) + 1;
        const isDrip = ["A", "B", "C"].includes(composeTemplate);
        const res = await fetch("/api/admin/leads/send-followup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lead_id: lead.id,
            lead_email: lead.email,
            lead_name: lead.name,
            lead_business: lead.business,
            ...(isDrip ? { template_id: composeTemplate } : { type: "custom", custom_subject: composeSubject, custom_message: composeMessage }),
            sequence_step: newStep,
          }),
        });
        if (res.ok) {
          const now = new Date().toISOString();
          const tLabel = templateIdx >= 0 ? ` (${EMAIL_TEMPLATES[templateIdx].id})` : "";
          const noteText = `Email${tLabel} sent ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}`;
          setLeads((prev) => prev.map((l) => l.id === lead.id ? { ...l, status: l.status === "new" ? "contacted" : l.status, notes: noteText, last_emailed_at: now, sequence_step: newStep } : l));
        }
      } catch { /* continue */ }
    }
    setComposeSending(false);
    setShowCompose(false);
    setSelectedLeads(new Set());
  }

  async function sendFollowUp(lead: Lead, type: "initial" | "proposal" | "cold") {
    if (type === "cold") {
      openCompose([lead]);
      return;
    }
    setSendingFollowUp(lead.id);
    try {
      const res = await fetch("/api/admin/leads/send-followup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: lead.id,
          lead_email: lead.email,
          lead_name: lead.name,
          lead_business: lead.business,
          type,
        }),
      });
      if (res.ok) {
        const now = new Date().toISOString();
        const newStatus = type === "proposal" ? "proposal_sent" : "contacted";
        const noteText = `Follow-up email (${type}) sent ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}`;
        setLeads((prev) => prev.map((l) => l.id === lead.id ? { ...l, status: newStatus, notes: noteText, last_emailed_at: now } : l));
      }
    } catch { /* ignore */ }
    setSendingFollowUp(null);
  }

  function toggleLeadSelection(id: string) {
    setSelectedLeads((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function getFilteredLeads() {
    return leads
      .filter((l) => {
        if (leadFilter !== "all" && l.status !== leadFilter) return false;
        if (industryFilter !== "all" && (industryFilter === "untagged" ? l.industry : l.industry !== industryFilter)) return false;
        if (industryFilter === "untagged" && l.industry) return false;
        if (leadSearch) {
          const q = leadSearch.toLowerCase();
          const match = l.name.toLowerCase().includes(q) || (l.email || "").toLowerCase().includes(q) || (l.business || "").toLowerCase().includes(q) || (l.phone || "").toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (leadSort === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        if (leadSort === "name") return a.name.localeCompare(b.name);
        if (leadSort === "last_emailed") {
          if (!a.last_emailed_at && !b.last_emailed_at) return 0;
          if (!a.last_emailed_at) return 1;
          if (!b.last_emailed_at) return -1;
          return new Date(b.last_emailed_at).getTime() - new Date(a.last_emailed_at).getTime();
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }

  function toggleSelectAll() {
    const filtered = getFilteredLeads();
    if (filtered.length > 0 && filtered.every((l) => selectedLeads.has(l.id))) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(filtered.map((l) => l.id)));
    }
  }

  function bulkSendIntros() {
    const selected = leads.filter((l) => selectedLeads.has(l.id) && l.email && l.email !== "not found");
    if (selected.length === 0) return;
    openCompose(selected);
  }

  async function bulkUpdateStatus(status: string) {
    const ids = Array.from(selectedLeads);
    if (ids.length === 0) return;
    for (const id of ids) {
      await updateLead(id, { status });
    }
    setSelectedLeads(new Set());
  }

  async function bulkSetIndustry(industry: string) {
    const ids = Array.from(selectedLeads);
    if (ids.length === 0) return;
    for (const id of ids) {
      await updateLead(id, { industry });
    }
    setSelectedLeads(new Set());
  }

  async function bulkDelete() {
    const ids = Array.from(selectedLeads);
    if (ids.length === 0) return;
    if (!confirm(`Delete ${ids.length} lead${ids.length > 1 ? "s" : ""}?`)) return;
    for (const id of ids) {
      await deleteLead(id);
    }
    setSelectedLeads(new Set());
  }

  function exportLeadsCSV() {
    const filtered = getFilteredLeads();
    if (filtered.length === 0) return;
    const headers = ["Name", "Email", "Phone", "Business", "Industry", "Status", "Source", "Last Emailed", "Created"];
    const rows = filtered.map((l) => [
      l.name, l.email || "", l.phone || "", l.business || "", l.industry || "", l.status, l.source,
      l.last_emailed_at ? new Date(l.last_emailed_at).toLocaleString() : "",
      new Date(l.created_at).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function getEmailCount(lead: Lead): number {
    if (!lead.notes) return 0;
    const matches = lead.notes.match(/Email sent|Follow-up email/gi);
    return matches ? matches.length : (lead.last_emailed_at ? 1 : 0);
  }

  const fetchReports = useCallback(async () => {
    setReportsLoading(true);
    try {
      const res = await fetch("/api/admin/build-reports");
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } catch { /* ignore */ }
    setReportsLoading(false);
  }, []);

  async function updateReportStatus(id: string, status: string) {
    try {
      const res = await fetch("/api/admin/build-reports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      }
    } catch { /* ignore */ }
  }

  // Form state
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [phaseNumber, setPhaseNumber] = useState("");
  const [totalPhases, setTotalPhases] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: crypto.randomUUID(), description: "", amount: "" },
  ]);
  const [paymentType, setPaymentType] = useState<"full" | "split" | "retainer" | "installment">("full");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [memo, setMemo] = useState("");
  const [dueDateType, setDueDateType] = useState<"receipt" | "custom">("receipt");
  const [dueDate, setDueDate] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [presetApplied, setPresetApplied] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Projects
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [releasingId, setReleasingId] = useState<string | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);

  // Expandable project cards
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [editingMemo, setEditingMemo] = useState<string | null>(null); // invoice id being edited
  const [memoDraft, setMemoDraft] = useState("");
  const [memoSaving, setMemoSaving] = useState(false);
  const [addItemInvoice, setAddItemInvoice] = useState<string | null>(null);
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemAmount, setNewItemAmount] = useState("");
  const [addingItem, setAddingItem] = useState(false);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [voidingId, setVoidingId] = useState<string | null>(null);

  // Ref for scrolling to invoice form
  const invoiceFormRef = useRef<HTMLDivElement>(null);

  const prefillClient = (name: string, email: string | null) => {
    setClientName(name);
    setClientEmail(email || "");
    setProjectName("");
    setLineItems([{ id: crypto.randomUUID(), description: "", amount: "" }]);
    setPaymentType("full");
    setMemo("");
    setSelectedPreset("");
    setPresetApplied(false);
    setFormError("");
    setFormSuccess("");
    setTimeout(() => invoiceFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  // Check sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("mb_admin_auth");
    if (stored === "true") setAuthed(true);
    setCheckingAuth(false);
  }, []);

  const fetchProjects = useCallback(async () => {
    setProjectsLoading(true);
    try {
      const res = await fetch("/api/admin/invoices");
      const data = await res.json();
      if (data.projects) setProjects(data.projects);
    } catch {
      // silently fail
    }
    setProjectsLoading(false);
  }, []);

  const fetchAutomation = useCallback(async () => {
    setAutoLoading(true);
    try {
      const res = await fetch("/api/admin/automation");
      const data = await res.json();
      if (data.clients) setAutoClients(data.clients);
      if (data.summary) setAutoSummary(data.summary);
    } catch { /* silent */ }
    setAutoLoading(false);
  }, []);

  const fetchAgents = useCallback(async () => {
    setAgentsLoading(true);
    try {
      const pw = sessionStorage.getItem("mb_admin_pw") || "";
      const res = await fetch("/api/admin/agents", { headers: { "x-admin-password": pw } });
      const data = await res.json();
      if (Array.isArray(data)) setAgents(data);
    } catch { /* silent */ }
    setAgentsLoading(false);
  }, []);

  const [deletingAgentId, setDeletingAgentId] = useState<string | null>(null);

  async function openConversation(agent: AgentClient) {
    setConversationAgent(agent);
    setConversationMessages([]);
    setConversationLoading(true);
    try {
      const pw = sessionStorage.getItem("mb_admin_pw") || "";
      const res = await fetch(`/api/admin/agents/${agent.id}/messages`, {
        headers: { "x-admin-password": pw },
      });
      const data = await res.json();
      if (Array.isArray(data.messages)) setConversationMessages(data.messages);
    } catch { /* silent */ }
    setConversationLoading(false);
  }

  async function handleDeleteAgent(agentId: string, agentName: string) {
    if (!confirm(`Delete ${agentName}? This will remove the client and all their messages permanently.`)) return;
    setDeletingAgentId(agentId);
    try {
      const pw = sessionStorage.getItem("mb_admin_pw") || "";
      const res = await fetch("/api/admin/agents", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-admin-password": pw },
        body: JSON.stringify({ id: agentId }),
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchAgents();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
    setDeletingAgentId(null);
  }

  async function handleAutoAction(clientId: string, action: string, tier?: string) {
    setAutoActionId(clientId);
    try {
      const res = await fetch("/api/admin/automation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, client_id: clientId, tier }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      fetchAutomation();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Action failed");
    }
    setAutoActionId(null);
  }

  useEffect(() => {
    if (authed) {
      fetchProjects();
      fetchAutomation();
      fetchAgents();
      fetchReports();
      fetchLeads();
    }
  }, [authed, fetchProjects, fetchAutomation, fetchAgents, fetchReports, fetchLeads]);

  /* ─── Login ─── */
  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem("mb_admin_auth", "true");
        sessionStorage.setItem("mb_admin_pw", password);
        setAuthed(true);
      } else {
        setLoginError("Invalid password");
      }
    } catch {
      setLoginError("Network error");
    }
    setLoginLoading(false);
  }

  function handleLogout() {
    sessionStorage.removeItem("mb_admin_auth");
    sessionStorage.removeItem("mb_admin_pw");
    setAuthed(false);
    setPassword("");
  }

  /* ─── Line items ─── */
  function addLineItem() {
    setLineItems([...lineItems, { id: crypto.randomUUID(), description: "", amount: "" }]);
  }

  function removeLineItem(id: string) {
    if (lineItems.length <= 1) return;
    setLineItems(lineItems.filter((li) => li.id !== id));
  }

  function updateLineItem(id: string, field: "description" | "amount", value: string) {
    setLineItems(lineItems.map((li) => (li.id === id ? { ...li, [field]: value } : li)));
  }

  /* ─── Presets ─── */
  function applyPreset(presetId: string) {
    if (!presetId) {
      // Clear / Custom
      setSelectedPreset("");
      setPresetApplied(false);
      setProjectName("");
      setLineItems([{ id: crypto.randomUUID(), description: "", amount: "" }]);
      setPaymentType("full");
      setMemo("");
      return;
    }
    const preset = SERVICE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setSelectedPreset(presetId);
    setProjectName(preset.projectName);
    setLineItems(preset.lineItems.map((li) => ({ id: crypto.randomUUID(), ...li })));
    setPaymentType(preset.paymentType);
    setMemo(preset.memo);
    setPresetApplied(true);
    setTimeout(() => setPresetApplied(false), 3000);
  }

  /* ─── Submit invoice ─── */
  async function handleSubmit(e: FormEvent, sendLater = false) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    setFormSuccess("");

    const items = lineItems
      .filter((li) => li.description && li.amount)
      .map((li) => ({ description: li.description, amount: parseFloat(li.amount) }));

    if (!items.length) {
      setFormError("At least one complete line item is required");
      setFormLoading(false);
      return;
    }

    if (items.some((li) => isNaN(li.amount) || li.amount <= 0)) {
      setFormError("All amounts must be positive numbers");
      setFormLoading(false);
      return;
    }

    if (paymentType === "installment") {
      const mp = parseFloat(monthlyPayment);
      if (isNaN(mp) || mp < 300) {
        setFormError("Monthly payment must be at least $300");
        setFormLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: clientName,
          client_email: clientEmail,
          project_name: projectName,
          phase_number: phaseNumber || null,
          total_phases: totalPhases || null,
          line_items: items,
          payment_type: paymentType,
          memo,
          due_date: dueDateType === "receipt" ? "receipt" : dueDate,
          send_later: sendLater,
          ...(paymentType === "installment" ? { monthly_amount: parseFloat(monthlyPayment) } : {}),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create invoice");

      const typeLabel =
        data.type === "draft"
          ? "Invoice saved as draft"
          : data.type === "split"
          ? "Split invoices created (deposit sent, final held)"
          : data.type === "retainer"
          ? "Retainer subscription created"
          : data.type === "installment"
          ? `Installment plan created (${data.num_payments} payments of $${data.monthly_amount}/mo)`
          : "Invoice sent";

      const linkMsg = data.payment_link
        ? `\nPayment link: ${data.payment_link}`
        : "";
      setFormSuccess(`${typeLabel} for ${clientName}${linkMsg}`);

      // Reset form
      setClientName("");
      setClientEmail("");
      setProjectName("");
      setPhaseNumber("");
      setTotalPhases("");
      setLineItems([{ id: crypto.randomUUID(), description: "", amount: "" }]);
      setPaymentType("full");
      setMonthlyPayment("");
      setMemo("");
      setDueDateType("receipt");
      setDueDate("");
      setSelectedPreset("");
      setPresetApplied(false);

      // Refresh projects
      fetchProjects();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong");
    }
    setFormLoading(false);
  }

  /* ─── Invoice edit actions ─── */
  async function handleSaveMemo(invoiceId: string) {
    setMemoSaving(true);
    try {
      const res = await fetch("/api/admin/invoices/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_memo", invoice_id: invoiceId, memo: memoDraft }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setEditingMemo(null);
      fetchProjects();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update memo");
    }
    setMemoSaving(false);
  }

  async function handleAddItem(invoiceId: string) {
    if (!newItemDesc || !newItemAmount) return;
    setAddingItem(true);
    try {
      const res = await fetch("/api/admin/invoices/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_item",
          invoice_id: invoiceId,
          description: newItemDesc,
          amount: parseFloat(newItemAmount),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setNewItemDesc("");
      setNewItemAmount("");
      setAddItemInvoice(null);
      fetchProjects();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add item");
    }
    setAddingItem(false);
  }

  async function handleRemoveItem(invoiceItemId: string, invoiceId: string) {
    if (!confirm("Remove this line item?")) return;
    setRemovingItemId(invoiceItemId);
    try {
      const res = await fetch("/api/admin/invoices/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove_item", invoice_item_id: invoiceItemId, invoice_id: invoiceId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      fetchProjects();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to remove item");
    }
    setRemovingItemId(null);
  }

  async function handleVoidInvoice(invoiceId: string) {
    if (!confirm("Void this invoice? This action cannot be undone.")) return;
    setVoidingId(invoiceId);
    try {
      const res = await fetch("/api/admin/invoices/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "void", invoice_id: invoiceId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      fetchProjects();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to void invoice");
    }
    setVoidingId(null);
  }

  /* ─── Release final invoice ─── */
  async function handleRelease(invoiceId: string) {
    if (!confirm("Send the final invoice to the client?")) return;
    setReleasingId(invoiceId);
    try {
      const res = await fetch("/api/admin/invoices/release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoice_id: invoiceId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      fetchProjects();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to release invoice");
    }
    setReleasingId(null);
  }

  /* ─── Resend invoice ─── */
  async function handleResend(invoiceId: string) {
    if (!confirm("Resend the invoice email to the client?")) return;
    setResendingId(invoiceId);
    try {
      const res = await fetch("/api/admin/invoices/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoice_id: invoiceId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert("Invoice resent to client!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to resend invoice");
    }
    setResendingId(null);
  }

  /* ─── Status badge ─── */
  function statusBadge(status: string, label: string) {
    const colors: Record<string, { bg: string; text: string }> = {
      draft_saved: { bg: "#1a1a2e", text: "#a78bfa" },
      deposit_pending: { bg: "#332b00", text: "#ffcc00" },
      deposit_paid: { bg: "#003300", text: GREEN },
      final_sent: { bg: "#001a33", text: "#4da6ff" },
      paid_full: { bg: "#002200", text: GREEN },
      overdue: { bg: "#330000", text: "#ff4444" },
      awaiting_payment: { bg: "#1a1a00", text: "#cccc00" },
      installment_active: { bg: "#001a33", text: "#4da6ff" },
    };
    const c = colors[status] || colors.awaiting_payment;

    const emoji: Record<string, string> = {
      draft_saved: "\uD83D\uDCDD",
      deposit_pending: "\uD83D\uDFE1",
      deposit_paid: "\uD83D\uDFE2",
      final_sent: "\uD83D\uDD35",
      paid_full: "\u2705",
      overdue: "\uD83D\uDD34",
      awaiting_payment: "\u23F3",
      installment_active: "\uD83D\uDCB3",
    };

    return (
      <span style={{ ...s.badge, background: c.bg, color: c.text }}>
        {emoji[status] || ""} {label}
      </span>
    );
  }

  /* ─── Total ─── */
  const total = lineItems.reduce((sum, li) => {
    const n = parseFloat(li.amount);
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  /* ─── Render ─── */
  if (checkingAuth) {
    return <div style={s.page} />;
  }

  if (!authed) {
    return (
      <div style={s.page}>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } } input:focus { border-color: ${GREEN} !important; }`}</style>
        <div style={s.loginWrap}>
          <form onSubmit={handleLogin} style={s.loginBox}>
            <div style={s.loginTitle}>martin.builds admin</div>
            <div style={s.loginSub}>Internal tools &mdash; authorized access only</div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={s.input}
              autoFocus
            />
            <button
              type="submit"
              disabled={loginLoading || !password}
              style={{
                ...s.btn,
                ...(loginLoading || !password ? s.btnDisabled : {}),
              }}
            >
              {loginLoading ? "Verifying..." : "Enter"}
            </button>
            {loginError && <div style={s.error}>{loginError}</div>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        input:focus, textarea:focus, select:focus { border-color: ${GREEN} !important; }
        button:hover { opacity: 0.85; }
        ::selection { background: ${GREEN}; color: ${BG}; }
      `}</style>

      {/* Header */}
      <div style={s.header}>
        <h1 style={s.headerTitle}>
          martin<span style={{ color: GREEN }}>.builds</span>{" "}
          <span style={{ color: DIM, fontWeight: 400, fontSize: 13 }}>admin</span>
        </h1>
        <button onClick={handleLogout} style={s.logoutBtn}>
          Logout
        </button>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", borderBottom: `1px solid ${BORDER}`, padding: "0 clamp(12px, 4vw, 24px)" }}>
        {(["invoices", "leads", "automate", "agents", "reports"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              padding: "12px 20px",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === t ? `2px solid ${GREEN}` : "2px solid transparent",
              color: activeTab === t ? GREEN : DIM,
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
              textTransform: "capitalize",
              letterSpacing: 0.5,
            }}
          >
            {t === "invoices" ? "Invoices" : t === "leads" ? "Leads" : t === "automate" ? "Automate" : t === "agents" ? "AI Agents" : "Reports"}
          </button>
        ))}
      </div>

      <div style={s.content}>
        {/* ─── INVOICES TAB ─── */}
        {activeTab === "invoices" && <>
        {/* ─── Invoice Generator ─── */}
        <div ref={invoiceFormRef} style={s.section}>
          <div style={s.sectionTitle}>Invoice Generator</div>
          <form onSubmit={handleSubmit}>
            {/* Service Preset Selector */}
            <div style={s.formGroup}>
              <label style={s.label}>Service Preset</label>
              <select
                value={selectedPreset}
                onChange={(e) => applyPreset(e.target.value)}
                style={{
                  ...s.input,
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  paddingRight: 32,
                }}
              >
                <option value="">Custom — blank form</option>
                {PRESET_CATEGORIES.map((cat) => (
                  <optgroup key={cat} label={cat}>
                    {SERVICE_PRESETS.filter((p) => p.category === cat).map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ${Number(p.lineItems[0].amount).toLocaleString()}{p.paymentType === "retainer" ? "/mo" : ""}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {presetApplied && (
                <div style={{ fontSize: 11, color: GREEN, marginTop: 4 }}>
                  Preset applied — edit as needed
                </div>
              )}
            </div>

            <div style={s.row}>
              <div style={{ ...s.formGroup, ...s.flex1 }}>
                <label style={s.label}>Client Name *</label>
                <input
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  style={s.input}
                  placeholder="Acme Corp"
                />
              </div>
              <div style={{ ...s.formGroup, ...s.flex1 }}>
                <label style={s.label}>Client Email *</label>
                <input
                  required
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  style={s.input}
                  placeholder="hello@acme.com"
                />
              </div>
            </div>

            <div style={s.row}>
              <div style={{ ...s.formGroup, flex: 2 }}>
                <label style={s.label}>Project Name *</label>
                <input
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  style={s.input}
                  placeholder="AI Lead Qualifier"
                />
              </div>
              <div style={{ ...s.formGroup, flex: 1 }}>
                <label style={s.label}>Phase #</label>
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    value={phaseNumber}
                    onChange={(e) => setPhaseNumber(e.target.value)}
                    style={{ ...s.input, width: "50%" }}
                    placeholder="1"
                    type="number"
                    min="1"
                  />
                  <span style={{ color: DIM, alignSelf: "center", fontSize: 12 }}>of</span>
                  <input
                    value={totalPhases}
                    onChange={(e) => setTotalPhases(e.target.value)}
                    style={{ ...s.input, width: "50%" }}
                    placeholder="3"
                    type="number"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div style={s.formGroup}>
              <label style={s.label}>Line Items</label>
              {lineItems.map((li) => (
                <div key={li.id} style={s.lineItemRow}>
                  <input
                    value={li.description}
                    onChange={(e) => updateLineItem(li.id, "description", e.target.value)}
                    style={{ ...s.input, flex: 3 }}
                    placeholder="Description"
                  />
                  <div style={{ position: "relative", flex: 1 }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: DIM,
                        fontSize: 14,
                        pointerEvents: "none",
                      }}
                    >
                      $
                    </span>
                    <input
                      value={li.amount}
                      onChange={(e) => updateLineItem(li.id, "amount", e.target.value)}
                      style={{ ...s.input, paddingLeft: 22 }}
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLineItem(li.id)}
                    style={{
                      ...s.trashBtn,
                      visibility: lineItems.length > 1 ? "visible" : "hidden",
                    }}
                    title="Remove"
                  >
                    &#128465;
                  </button>
                </div>
              ))}
              <button type="button" onClick={addLineItem} style={s.addBtn}>
                + Add Line Item
              </button>
              {total > 0 && (
                <div style={{ textAlign: "right", marginTop: 8, fontSize: 13, color: GREEN }}>
                  Total: ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  {paymentType === "split" && (
                    <span style={{ color: DIM, marginLeft: 8 }}>
                      (2 &times; ${(total / 2).toLocaleString("en-US", { minimumFractionDigits: 2 })})
                    </span>
                  )}
                  {paymentType === "retainer" && (
                    <span style={{ color: DIM, marginLeft: 8 }}>/month</span>
                  )}
                  {paymentType === "installment" && parseFloat(monthlyPayment) >= 300 && (
                    <span style={{ color: DIM, marginLeft: 8 }}>
                      ({Math.ceil(total / parseFloat(monthlyPayment))} &times; ${parseFloat(monthlyPayment).toLocaleString()}/mo)
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Payment Type */}
            <div style={s.formGroup}>
              <label style={s.label}>Payment Type</label>
              <div style={s.toggleGroup}>
                {(["full", "split", "installment", "retainer"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setPaymentType(t)}
                    style={{
                      ...s.toggleBtn,
                      ...(paymentType === t ? s.toggleActive : {}),
                    }}
                  >
                    {t === "full" ? "Full Payment" : t === "split" ? "Split (50/50)" : t === "installment" ? "Installment" : "Retainer"}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 11, color: DIM, marginTop: 4 }}>
                {paymentType === "full" && "Single invoice, sent immediately"}
                {paymentType === "split" &&
                  "Deposit invoice sent now, final invoice held as draft"}
                {paymentType === "installment" && "Monthly autopay until project is paid in full"}
                {paymentType === "retainer" && "Monthly recurring subscription"}
              </div>
            </div>

            {/* Installment Details */}
            {paymentType === "installment" && total > 0 && (
              <div style={{ ...s.formGroup, background: "#111", borderRadius: 8, padding: 12, border: `1px solid ${BORDER}` }}>
                <label style={s.label}>Monthly Payment Amount</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: DIM, fontSize: 14 }}>$</span>
                  <input
                    type="number"
                    min="300"
                    step="50"
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(e.target.value)}
                    placeholder="300"
                    style={{ ...s.input, flex: 1 }}
                  />
                  <span style={{ color: DIM, fontSize: 12 }}>/mo</span>
                </div>
                {parseFloat(monthlyPayment) > 0 && parseFloat(monthlyPayment) < 300 && (
                  <div style={{ fontSize: 11, color: "#ff4444", marginTop: 4 }}>Minimum $300/mo</div>
                )}
                {parseFloat(monthlyPayment) >= 300 && (
                  <div style={{ marginTop: 10, padding: 10, background: "#0a0a0a", borderRadius: 6, border: `1px solid rgba(200,255,0,0.1)` }}>
                    <div style={{ fontSize: 12, color: GREEN, fontWeight: 600, marginBottom: 6 }}>Payment Schedule</div>
                    <div style={{ fontSize: 12, color: TEXT }}>
                      {Math.ceil(total / parseFloat(monthlyPayment))} payments of ${parseFloat(monthlyPayment).toLocaleString()}/mo
                      {total % parseFloat(monthlyPayment) !== 0 && (
                        <span style={{ color: DIM }}> (final payment: ${(total % parseFloat(monthlyPayment)).toLocaleString("en-US", { minimumFractionDigits: 2 })})</span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: DIM, marginTop: 4 }}>
                      Total: ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })} &middot; Autopay required &middot; Card on file
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Memo */}
            <div style={s.formGroup}>
              <label style={s.label}>Memo / Scope Summary</label>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                style={s.textarea}
                placeholder="Brief scope of work..."
              />
            </div>

            {/* Due Date */}
            {paymentType !== "retainer" && paymentType !== "installment" && (
              <div style={s.formGroup}>
                <label style={s.label}>Due Date</label>
                <div style={s.dueDateRow}>
                  <button
                    type="button"
                    onClick={() => setDueDateType("receipt")}
                    style={{
                      ...s.toggleBtn,
                      borderRadius: 4,
                      border: `1px solid ${BORDER}`,
                      ...(dueDateType === "receipt" ? s.toggleActive : {}),
                    }}
                  >
                    Due on Receipt
                  </button>
                  <button
                    type="button"
                    onClick={() => setDueDateType("custom")}
                    style={{
                      ...s.toggleBtn,
                      borderRadius: 4,
                      border: `1px solid ${BORDER}`,
                      ...(dueDateType === "custom" ? s.toggleActive : {}),
                    }}
                  >
                    Custom Date
                  </button>
                  {dueDateType === "custom" && (
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      style={{ ...s.input, flex: 1 }}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  )}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                type="submit"
                disabled={formLoading}
                style={{
                  ...s.btn,
                  flex: 1,
                  ...(formLoading ? s.btnDisabled : {}),
                }}
              >
                {formLoading ? (
                  <>
                    <span style={s.spinner} /> Creating...
                  </>
                ) : paymentType === "retainer" ? (
                  "Create Retainer"
                ) : paymentType === "installment" ? (
                  "Create Installment Plan"
                ) : (
                  "Send Invoice"
                )}
              </button>
              {paymentType === "full" && (
                <button
                  type="button"
                  disabled={formLoading}
                  onClick={(e) => handleSubmit(e as unknown as FormEvent, true)}
                  style={{
                    ...s.btn,
                    flex: 1,
                    background: "transparent",
                    border: `1px solid ${GREEN}`,
                    color: GREEN,
                    ...(formLoading ? s.btnDisabled : {}),
                  }}
                >
                  Save Draft
                </button>
              )}
            </div>

            {formError && <div style={s.error}>{formError}</div>}
            {formSuccess && <div style={s.success}>{formSuccess}</div>}
          </form>
        </div>

        {/* ─── Project Status Board ─── */}
        <div style={s.section}>
          <div style={{ ...s.sectionTitle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Project Status Board</span>
            <button
              onClick={fetchProjects}
              disabled={projectsLoading}
              style={{ ...s.logoutBtn, fontSize: 11, color: GREEN, borderColor: GREEN }}
            >
              {projectsLoading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {projectsLoading && !projects.length && (
            <div style={s.emptyState}>Loading projects...</div>
          )}

          {!projectsLoading && !projects.length && (
            <div style={s.emptyState}>No invoices yet. Create one above.</div>
          )}

          {projects.map((p, i) => {
            const isExpanded = selectedProject === i;
            return (
            <div key={i} style={s.card}>
              <div
                style={{ ...s.cardHeader, cursor: "pointer" }}
                onClick={() => setSelectedProject(isExpanded ? null : i)}
              >
                <div>
                  <p style={s.cardTitle}>
                    <span style={{ marginRight: 6, fontSize: 10, color: DIM }}>{isExpanded ? "\u25BC" : "\u25B6"}</span>
                    {p.project_name}
                  </p>
                  <p style={s.cardClient}>
                    {p.client_name}
                    {p.phase && <span style={{ marginLeft: 8 }}>Phase {p.phase}</span>}
                  </p>
                </div>
                {statusBadge(p.status, p.status_label)}
              </div>

              <div style={s.cardMeta}>
                <span>
                  Type:{" "}
                  {p.payment_type === "split"
                    ? "Split (50/50)"
                    : p.payment_type === "retainer"
                    ? "Retainer"
                    : p.payment_type === "installment"
                    ? "Installment"
                    : "Full"}
                </span>
                {p.installment ? (
                  <>
                    <span>
                      ${p.installment.monthly_amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}/mo
                    </span>
                    <span>
                      {p.installment.payments_made} of {p.installment.total_payments} paid
                    </span>
                    <div style={{ width: "100%", height: 4, background: "#222", borderRadius: 2, marginTop: 4 }}>
                      <div style={{
                        height: "100%",
                        width: `${(p.installment.payments_made / p.installment.total_payments) * 100}%`,
                        background: p.installment.payments_made === p.installment.total_payments ? GREEN : "#4da6ff",
                        borderRadius: 2,
                        transition: "width 0.3s ease",
                      }} />
                    </div>
                    <span style={{ fontSize: 10, color: DIM }}>
                      ${p.installment.amount_paid.toLocaleString("en-US", { minimumFractionDigits: 2 })} of ${p.installment.total_owed.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </>
                ) : p.subscription ? (
                  <span>
                    ${p.subscription.monthly_amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    /mo
                  </span>
                ) : (
                  <>
                    <span>
                      Total: ${p.total_amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                    <span>
                      Paid: ${p.amount_paid.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </>
                )}
              </div>

              {/* Expanded invoice details */}
              {isExpanded && (
                <div style={{ marginTop: 16, borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
                  {p.invoices.map((inv) => (
                    <div key={inv.id} style={{ background: "#111", borderRadius: 4, border: `1px solid ${BORDER}`, padding: 12, marginBottom: 10 }}>
                      {/* Invoice header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{inv.description || inv.payment_type}</span>
                          <span style={{ fontSize: 11, color: DIM, marginLeft: 8, fontFamily: "'Space Mono', monospace" }}>
                            ${inv.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <span style={{
                          ...s.badge,
                          fontSize: 10,
                          background: inv.status === "paid" ? "#002200" : inv.status === "draft" ? "#1a1a00" : inv.status === "void" ? "#1a0000" : "#001a33",
                          color: inv.status === "paid" ? GREEN : inv.status === "draft" ? "#cccc00" : inv.status === "void" ? "#ff4444" : "#4da6ff",
                        }}>
                          {inv.status}
                        </span>
                      </div>

                      {/* Line items */}
                      {inv.line_items && inv.line_items.length > 0 && (
                        <div style={{ marginBottom: 8 }}>
                          <div style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, fontFamily: "'Space Mono', monospace" }}>Line Items</div>
                          {inv.line_items.map((li) => (
                            <div key={li.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: `1px solid ${BORDER}` }}>
                              <span style={{ fontSize: 12, color: TEXT }}>{li.description}</span>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 12, color: DIM, fontFamily: "'Space Mono', monospace" }}>
                                  ${li.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                </span>
                                {inv.status === "draft" && (
                                  <button
                                    onClick={() => handleRemoveItem(li.id, inv.id)}
                                    disabled={removingItemId === li.id}
                                    style={{ ...s.trashBtn, fontSize: 14, padding: "2px 4px", opacity: removingItemId === li.id ? 0.4 : 1 }}
                                    title="Remove item"
                                  >
                                    &#128465;
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Memo / scope — editable inline */}
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, fontFamily: "'Space Mono', monospace" }}>Memo / Scope</div>
                        {editingMemo === inv.id ? (
                          <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                            <textarea
                              value={memoDraft}
                              onChange={(e) => setMemoDraft(e.target.value)}
                              style={{ ...s.textarea, minHeight: 50, fontSize: 12, flex: 1 }}
                              autoFocus
                            />
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              <button
                                onClick={() => handleSaveMemo(inv.id)}
                                disabled={memoSaving}
                                style={{ padding: "4px 10px", background: GREEN, color: BG, border: "none", borderRadius: 3, fontSize: 11, fontWeight: 700, cursor: memoSaving ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: memoSaving ? 0.5 : 1 }}
                              >
                                {memoSaving ? "..." : "Save"}
                              </button>
                              <button
                                onClick={() => setEditingMemo(null)}
                                style={{ padding: "4px 10px", background: "transparent", color: DIM, border: `1px solid ${BORDER}`, borderRadius: 3, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              if (inv.status === "draft" || inv.status === "open") {
                                setEditingMemo(inv.id);
                                setMemoDraft(inv.description || "");
                              }
                            }}
                            style={{
                              fontSize: 12,
                              color: inv.description ? TEXT : DIM,
                              cursor: (inv.status === "draft" || inv.status === "open") ? "pointer" : "default",
                              padding: "4px 6px",
                              borderRadius: 3,
                              border: `1px solid transparent`,
                              transition: "border-color 0.15s",
                            }}
                            onMouseEnter={(e) => { if (inv.status === "draft" || inv.status === "open") (e.currentTarget.style.borderColor = BORDER); }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; }}
                          >
                            {inv.description || (inv.status === "draft" || inv.status === "open" ? "Click to add memo..." : "No memo")}
                          </div>
                        )}
                      </div>

                      {/* Add line item (draft only) */}
                      {inv.status === "draft" && (
                        <div style={{ marginBottom: 8 }}>
                          {addItemInvoice === inv.id ? (
                            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                              <input
                                value={newItemDesc}
                                onChange={(e) => setNewItemDesc(e.target.value)}
                                placeholder="Description"
                                style={{ ...s.input, flex: 2, fontSize: 12, padding: "6px 8px" }}
                              />
                              <div style={{ position: "relative", flex: 1 }}>
                                <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: DIM, fontSize: 12, pointerEvents: "none" }}>$</span>
                                <input
                                  value={newItemAmount}
                                  onChange={(e) => setNewItemAmount(e.target.value)}
                                  placeholder="0.00"
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  style={{ ...s.input, paddingLeft: 18, fontSize: 12, padding: "6px 8px 6px 18px" }}
                                />
                              </div>
                              <button
                                onClick={() => handleAddItem(inv.id)}
                                disabled={addingItem || !newItemDesc || !newItemAmount}
                                style={{ padding: "6px 12px", background: GREEN, color: BG, border: "none", borderRadius: 3, fontSize: 11, fontWeight: 700, cursor: (addingItem || !newItemDesc || !newItemAmount) ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: (addingItem || !newItemDesc || !newItemAmount) ? 0.5 : 1 }}
                              >
                                {addingItem ? "..." : "Add"}
                              </button>
                              <button
                                onClick={() => { setAddItemInvoice(null); setNewItemDesc(""); setNewItemAmount(""); }}
                                style={{ padding: "6px 8px", background: "transparent", color: DIM, border: `1px solid ${BORDER}`, borderRadius: 3, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setAddItemInvoice(inv.id)}
                              style={{ ...s.addBtn, fontSize: 11, padding: "6px 12px" }}
                            >
                              + Add Line Item
                            </button>
                          )}
                        </div>
                      )}

                      {/* Void button (open only) */}
                      {inv.status === "open" && (
                        <button
                          onClick={() => handleVoidInvoice(inv.id)}
                          disabled={voidingId === inv.id}
                          style={{ padding: "5px 12px", background: "transparent", border: "1px solid #ff4444", color: "#ff4444", borderRadius: 3, fontSize: 11, cursor: voidingId === inv.id ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: voidingId === inv.id ? 0.5 : 1 }}
                        >
                          {voidingId === inv.id ? "Voiding..." : "Void Invoice"}
                        </button>
                      )}

                      {/* Stripe link per invoice */}
                      <div style={{ marginTop: 6, textAlign: "right" }}>
                        <a href={inv.stripe_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: DIM, textDecoration: "none" }}>
                          View in Stripe &rarr;
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions bar */}
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${BORDER}`, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                {/* Primary action: Release Final Invoice (only when applicable) */}
                {p.status === "deposit_paid" &&
                  p.invoices
                    .filter((inv) => inv.payment_type === "final" && inv.status === "draft")
                    .map((inv) => (
                      <button
                        key={inv.id}
                        onClick={() => handleRelease(inv.id)}
                        disabled={releasingId === inv.id}
                        style={{
                          padding: "6px 12px",
                          background: GREEN,
                          color: BG,
                          border: "none",
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: releasingId === inv.id ? "not-allowed" : "pointer",
                          fontFamily: "inherit",
                          opacity: releasingId === inv.id ? 0.5 : 1,
                        }}
                      >
                        {releasingId === inv.id ? "Releasing..." : "Release Final"}
                      </button>
                    ))}

                {/* Send draft invoice */}
                {p.status === "draft_saved" &&
                  p.invoices
                    .filter((inv) => inv.payment_type === "full" && inv.status === "draft")
                    .map((inv) => (
                      <button
                        key={`send-${inv.id}`}
                        onClick={() => handleRelease(inv.id)}
                        disabled={releasingId === inv.id}
                        style={{
                          padding: "6px 12px",
                          background: GREEN,
                          color: BG,
                          border: "none",
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: releasingId === inv.id ? "not-allowed" : "pointer",
                          fontFamily: "inherit",
                          opacity: releasingId === inv.id ? 0.5 : 1,
                        }}
                      >
                        {releasingId === inv.id ? "Sending..." : "Send Now"}
                      </button>
                    ))}

                {/* Copy payment link */}
                {p.invoices
                  .filter((inv) => inv.pay_url && inv.status === "open")
                  .slice(0, 1)
                  .map((inv) => (
                    <button
                      key={`pay-${inv.id}`}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          inv.pay_url!.startsWith("http") ? inv.pay_url! : `${window.location.origin}${inv.pay_url}`
                        );
                        alert("Payment link copied!");
                      }}
                      style={{
                        padding: "6px 12px",
                        background: "transparent",
                        border: `1px solid ${GREEN}`,
                        color: GREEN,
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Copy Link
                    </button>
                  ))}

                {/* Resend invoice */}
                {p.invoices
                  .filter((inv) => inv.status === "open")
                  .slice(0, 1)
                  .map((inv) => (
                    <button
                      key={`resend-${inv.id}`}
                      onClick={() => handleResend(inv.id)}
                      disabled={resendingId === inv.id}
                      style={{
                        padding: "6px 12px",
                        background: "transparent",
                        border: `1px solid ${DIM}`,
                        color: TEXT,
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: resendingId === inv.id ? "not-allowed" : "pointer",
                        fontFamily: "inherit",
                        opacity: resendingId === inv.id ? 0.5 : 1,
                      }}
                    >
                      {resendingId === inv.id ? "Sending..." : "Resend"}
                    </button>
                  ))}

                {/* New Invoice for paid-in-full clients */}
                {p.status === "paid_full" && (
                  <button
                    onClick={() => prefillClient(p.client_name, p.invoices[0]?.customer_email ?? null)}
                    style={{
                      padding: "6px 12px",
                      background: GREEN,
                      color: BG,
                      border: "none",
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    + New Invoice
                  </button>
                )}

                {/* Send Build Report */}
                {p.status === "paid_full" && p.invoices[0]?.customer_email && (
                  <button
                    onClick={async () => {
                      if (!confirm(`Send build report request to ${p.invoices[0]?.customer_email}?`)) return;
                      try {
                        const res = await fetch("/api/admin/send-build-report", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ client_email: p.invoices[0]?.customer_email, client_name: p.client_name }),
                        });
                        if (!res.ok) throw new Error("Failed");
                        alert("Build report request sent!");
                      } catch { alert("Failed to send build report request"); }
                    }}
                    style={{
                      padding: "6px 12px",
                      background: "transparent",
                      border: `1px solid ${DIM}`,
                      color: TEXT,
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Build Report
                  </button>
                )}

                {/* Stripe link — single link for the project */}
                <a
                  href={p.installment?.stripe_url || p.subscription?.stripe_url || p.invoices[0]?.stripe_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 11,
                    color: DIM,
                    textDecoration: "none",
                    marginLeft: "auto",
                  }}
                >
                  Stripe &rarr;
                </a>
              </div>
            </div>
            );
          })}
        </div>
        </>}

        {/* ─── AI AGENTS TAB ─── */}
        {activeTab === "agents" && (
          <>
            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Total Agents", value: agents.length, color: TEXT },
                { label: "Active", value: agents.filter(a => a.active).length, color: GREEN },
                { label: "Telegram", value: agents.filter(a => a.telegram_connected).length, color: "#64b4ff" },
                { label: "Total Messages", value: agents.reduce((s, a) => s + a.message_count, 0), color: TEXT },
                { label: "Est. Cost", value: `$${agents.reduce((s, a) => s + a.estimated_cost, 0).toFixed(2)}`, color: "#ffcc00" },
              ].map((c) => (
                <div key={c.label} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, fontFamily: "'Space Mono', monospace" }}>{c.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: c.color, fontFamily: "'Space Mono', monospace" }}>{c.value}</div>
                </div>
              ))}
            </div>

            {/* Agent List */}
            <div style={s.section}>
              <div style={{ ...s.sectionTitle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>AI Agent Clients</span>
                <button onClick={fetchAgents} disabled={agentsLoading} style={{ ...s.logoutBtn, fontSize: 11, color: GREEN, borderColor: GREEN }}>
                  {agentsLoading ? "Loading..." : "Refresh"}
                </button>
              </div>

              {agentsLoading && !agents.length && <div style={s.emptyState}>Loading...</div>}
              {!agentsLoading && !agents.length && <div style={s.emptyState}>No AI agent clients yet.</div>}

              {agents.map((agent) => {
                const planColor = PLAN_COLORS[agent.plan] || GREEN;
                return (
                  <div key={agent.id} style={{ ...s.card, borderLeft: `3px solid ${planColor}` }}>
                    <div style={s.cardHeader}>
                      <div>
                        <p style={s.cardTitle}>{agent.name}</p>
                        <p style={s.cardClient}>
                          {agent.email}
                          {agent.business_name && <span style={{ marginLeft: 8, color: DIM }}>&bull; {agent.business_name}</span>}
                        </p>
                      </div>
                      <span style={{
                        ...s.badge,
                        background: agent.active ? "#002200" : "#1a0000",
                        color: agent.active ? GREEN : "#ff4444",
                      }}>
                        {agent.active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {/* Agent Info */}
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", margin: "8px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>Bot</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: GREEN }}>{agent.bot_name || "—"}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>Plan</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: planColor, textTransform: "capitalize" }}>{agent.plan || "starter"}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>Industry</span>
                        <span style={{ fontSize: 12, color: TEXT }}>{agent.industry || "—"}</span>
                      </div>
                    </div>

                    {/* Usage Stats */}
                    <div style={{ background: "#111", borderRadius: 4, border: `1px solid ${BORDER}`, padding: 12, margin: "8px 0" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, textAlign: "center" }}>
                        <div>
                          <div style={{ fontSize: 9, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Messages</div>
                          <div style={{ fontSize: 18, fontWeight: 700, color: planColor, fontFamily: "'Space Mono', monospace" }}>{agent.message_count}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 9, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Est. Cost</div>
                          <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, fontFamily: "'Space Mono', monospace" }}>${agent.estimated_cost.toFixed(2)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 9, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Last Active</div>
                          <div style={{ fontSize: 12, color: DIM }}>
                            {agent.last_active ? new Date(agent.last_active).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 9, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Channel</div>
                          <div style={{ fontSize: 12, color: DIM }}>
                            {agent.last_interface || "—"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Connections */}
                    <div style={s.cardMeta}>
                      <span>Joined: {new Date(agent.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span style={{ display: "flex", gap: 8 }}>
                        {agent.telegram_connected && (
                          <span style={{ fontSize: 11, color: "#64b4ff" }}>Telegram connected</span>
                        )}
                        {agent.bot_username && (
                          <a href={`https://t.me/${agent.bot_username}`} target="_blank" rel="noopener noreferrer"
                            style={{ fontSize: 11, color: DIM, textDecoration: "none" }}>
                            @{agent.bot_username} &rarr;
                          </a>
                        )}
                      </span>
                    </div>

                    {/* Actions */}
                    <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${BORDER}`, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <button
                        onClick={() => openConversation(agent)}
                        style={{ padding: "5px 12px", background: GREEN, color: BG, border: "none", borderRadius: 3, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                      >
                        View Conversation
                      </button>
                      <button
                        onClick={() => handleDeleteAgent(agent.id, agent.name)}
                        disabled={deletingAgentId === agent.id}
                        style={{ padding: "5px 12px", background: "transparent", border: "1px solid #ff4444", color: "#ff4444", borderRadius: 3, fontSize: 11, cursor: deletingAgentId === agent.id ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: deletingAgentId === agent.id ? 0.5 : 1, marginLeft: "auto" }}
                      >
                        {deletingAgentId === agent.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ─── AUTOMATE TAB ─── */}
        {activeTab === "automate" && (
          <>
            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Total", value: autoSummary?.total ?? 0, color: TEXT },
                { label: "Active", value: autoSummary?.active ?? 0, color: GREEN },
                { label: "Paused", value: autoSummary?.paused ?? 0, color: "#ffcc00" },
                { label: "Canceled", value: autoSummary?.canceled ?? 0, color: "#ff4444" },
                { label: "Monthly Rev", value: `$${(autoSummary?.monthly_revenue ?? 0).toFixed(2)}`, color: GREEN },
              ].map((c) => (
                <div key={c.label} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, fontFamily: "'Space Mono', monospace" }}>{c.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: c.color, fontFamily: "'Space Mono', monospace" }}>{c.value}</div>
                </div>
              ))}
            </div>

            {/* Client List */}
            <div style={s.section}>
              <div style={{ ...s.sectionTitle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Automation Clients</span>
                <button onClick={fetchAutomation} disabled={autoLoading} style={{ ...s.logoutBtn, fontSize: 11, color: GREEN, borderColor: GREEN }}>
                  {autoLoading ? "Loading..." : "Refresh"}
                </button>
              </div>

              {autoLoading && !autoClients.length && <div style={s.emptyState}>Loading...</div>}
              {!autoLoading && !autoClients.length && <div style={s.emptyState}>No automation clients yet.</div>}

              {autoClients.map((ac) => {
                const planColor = PLAN_COLORS[ac.plan] || GREEN;
                const busy = autoActionId === ac.id;
                return (
                  <div key={ac.id} style={{ ...s.card, borderLeft: `3px solid ${planColor}` }}>
                    <div style={s.cardHeader}>
                      <div>
                        <p style={s.cardTitle}>{ac.client_name || ac.customer_email}</p>
                        <p style={s.cardClient}>
                          {ac.customer_email}
                          {ac.business_name && <span style={{ marginLeft: 8, color: DIM }}>&bull; {ac.business_name}</span>}
                        </p>
                      </div>
                      <span style={{
                        ...s.badge,
                        background: ac.status === "active" ? "#002200" : ac.status === "paused" ? "#332b00" : "#1a0000",
                        color: ac.status === "active" ? GREEN : ac.status === "paused" ? "#ffcc00" : "#ff4444",
                      }}>
                        {ac.status}
                      </span>
                    </div>

                    {/* Tier / Model / Rate */}
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", margin: "8px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>Tier</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: planColor, textTransform: "capitalize" }}>{ac.plan}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>Model</span>
                        <span style={{ fontSize: 12, color: TEXT }}>{ac.model || PLAN_MODELS[ac.plan] || "—"}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>Rate</span>
                        <span style={{ fontSize: 12, color: TEXT, fontFamily: "'Space Mono', monospace" }}>${(ac.per_convo_cents / 100).toFixed(2)}/convo</span>
                      </div>
                    </div>

                    {/* Usage Stats */}
                    <div style={{ background: "#111", borderRadius: 4, border: `1px solid ${BORDER}`, padding: 12, margin: "8px 0" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, textAlign: "center" }}>
                        <div>
                          <div style={{ fontSize: 9, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Conversations</div>
                          <div style={{ fontSize: 18, fontWeight: 700, color: planColor, fontFamily: "'Space Mono', monospace" }}>{ac.current_usage || 0}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 9, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Current Bill</div>
                          <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, fontFamily: "'Space Mono', monospace" }}>${ac.current_bill.toFixed(2)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 9, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Last Active</div>
                          <div style={{ fontSize: 12, color: DIM }}>
                            {ac.last_conversation_at ? new Date(ac.last_conversation_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={s.cardMeta}>
                      <span>Joined: {new Date(ac.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>

                    {/* Actions */}
                    <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${BORDER}`, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      {ac.status === "active" && (
                        <button onClick={() => handleAutoAction(ac.id, "pause")} disabled={busy}
                          style={{ padding: "5px 12px", background: "transparent", border: "1px solid #ffcc00", color: "#ffcc00", borderRadius: 3, fontSize: 11, cursor: busy ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: busy ? 0.5 : 1 }}>
                          Pause
                        </button>
                      )}
                      {ac.status === "paused" && (
                        <button onClick={() => handleAutoAction(ac.id, "resume")} disabled={busy}
                          style={{ padding: "5px 12px", background: GREEN, color: BG, border: "none", borderRadius: 3, fontSize: 11, fontWeight: 700, cursor: busy ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: busy ? 0.5 : 1 }}>
                          Resume
                        </button>
                      )}
                      {ac.status !== "canceled" && (
                        <>
                          <select value="" onChange={(e) => { if (e.target.value && e.target.value !== ac.plan) handleAutoAction(ac.id, "change_tier", e.target.value); }}
                            style={{ padding: "5px 8px", background: CARD_BG, border: `1px solid ${BORDER}`, color: DIM, borderRadius: 3, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                            <option value="">Change Tier</option>
                            {["essential", "professional", "enterprise"].filter((t) => t !== ac.plan).map((t) => (
                              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                            ))}
                          </select>
                          <button onClick={() => { if (confirm(`Cancel ${ac.client_name || ac.customer_email}?`)) handleAutoAction(ac.id, "cancel"); }} disabled={busy}
                            style={{ padding: "5px 12px", background: "transparent", border: "1px solid #ff4444", color: "#ff4444", borderRadius: 3, fontSize: 11, cursor: busy ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: busy ? 0.5 : 1 }}>
                            Cancel
                          </button>
                        </>
                      )}
                      {ac.stripe_customer_id && (
                        <a href={`https://dashboard.stripe.com/customers/${ac.stripe_customer_id}`} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: 11, color: DIM, textDecoration: "none", marginLeft: "auto" }}>
                          Stripe &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ─── LEADS TAB ─── */}
        {activeTab === "leads" && (
          <>
            {/* Summary cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 8, marginBottom: 20 }}>
              {[
                { label: "Total", value: leads.length, color: TEXT },
                { label: "New", value: leads.filter((l) => l.status === "new").length, color: "#4ade80" },
                { label: "Contacted", value: leads.filter((l) => l.status === "contacted").length, color: "#60a5fa" },
                { label: "Qualified", value: leads.filter((l) => l.status === "qualified").length, color: "#c084fc" },
                { label: "Proposal", value: leads.filter((l) => l.status === "proposal_sent").length, color: "#facc15" },
                { label: "Won", value: leads.filter((l) => l.status === "won").length, color: GREEN },
              ].map((c) => (
                <div key={c.label} style={{ ...s.card, textAlign: "center", padding: "clamp(8px, 2vw, 14px) 6px" }}>
                  <div style={{ fontSize: "clamp(18px, 4vw, 22px)", fontWeight: 700, color: c.color }}>{c.value}</div>
                  <div style={{ fontSize: 10, color: DIM, marginTop: 2 }}>{c.label}</div>
                </div>
              ))}
            </div>

            {/* Search + Controls */}
            <div style={{ marginBottom: 12 }}>
              <input
                style={{ ...s.input, marginBottom: 10 }}
                value={leadSearch}
                onChange={(e) => setLeadSearch(e.target.value)}
                placeholder="Search by name, email, business, or phone..."
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer", marginRight: 6 }} title="Select all visible">
                    <input
                      type="checkbox"
                      checked={(() => { const f = getFilteredLeads(); return f.length > 0 && f.every((l) => selectedLeads.has(l.id)); })()}
                      onChange={toggleSelectAll}
                      style={{ accentColor: GREEN, width: 14, height: 14, cursor: "pointer" }}
                    />
                    <span style={{ fontSize: 10, color: DIM }}>All</span>
                  </label>
                  {["all", "new", "contacted", "qualified", "proposal_sent", "won", "lost"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setLeadFilter(f)}
                      style={{
                        padding: "5px 8px",
                        fontSize: 10,
                        fontWeight: 600,
                        border: `1px solid ${leadFilter === f ? GREEN : BORDER}`,
                        borderRadius: 4,
                        background: leadFilter === f ? GREEN : "transparent",
                        color: leadFilter === f ? BG : DIM,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        textTransform: "capitalize",
                      }}
                    >
                      {f === "proposal_sent" ? "Proposal" : f}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button onClick={fetchLeads} disabled={leadsLoading} style={{ ...s.logoutBtn, fontSize: 11, color: GREEN, borderColor: GREEN, whiteSpace: "nowrap" as const }}>
                    {leadsLoading ? "..." : "Refresh"}
                  </button>
                  <button
                    onClick={() => setShowAddLead(!showAddLead)}
                    style={{ padding: "6px 12px", background: GREEN, color: BG, border: "none", borderRadius: 4, fontWeight: 700, fontSize: 11, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" as const }}
                  >
                    + Add
                  </button>
                </div>
              </div>
              {/* Industry filter + sort */}
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  style={{ padding: "5px 10px", background: CARD_BG, border: `1px solid ${industryFilter !== "all" ? GREEN : BORDER}`, color: industryFilter !== "all" ? GREEN : DIM, borderRadius: 4, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}
                >
                  <option value="all">All Industries</option>
                  <option value="untagged">Untagged</option>
                  {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                </select>
                <select
                  value={leadSort}
                  onChange={(e) => setLeadSort(e.target.value as typeof leadSort)}
                  style={{ padding: "5px 10px", background: CARD_BG, border: `1px solid ${BORDER}`, color: DIM, borderRadius: 4, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="last_emailed">Last Emailed</option>
                </select>
                <button onClick={exportLeadsCSV} style={{ padding: "5px 12px", background: "transparent", color: DIM, border: `1px solid ${BORDER}`, borderRadius: 4, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                  Export CSV
                </button>
                <span style={{ fontSize: 11, color: DIM, marginLeft: "auto" }}>{getFilteredLeads().length} leads</span>
              </div>
            </div>

            {/* Bulk action bar */}
            {selectedLeads.size > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 10px", background: "rgba(200,255,0,0.08)", border: `1px solid rgba(200,255,0,0.2)`, borderRadius: 6, marginBottom: 16, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: GREEN }}>{selectedLeads.size} selected</span>
                <button
                  onClick={bulkSendIntros}
                  style={{ padding: "5px 14px", background: GREEN, color: BG, border: "none", borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                >
                  Compose Email
                </button>
                <select
                  value=""
                  onChange={(e) => { if (e.target.value) bulkSetIndustry(e.target.value); }}
                  style={{ padding: "5px 10px", background: CARD_BG, border: `1px solid ${GREEN}`, color: GREEN, borderRadius: 4, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}
                >
                  <option value="">Set Industry...</option>
                  {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                </select>
                <button onClick={() => bulkUpdateStatus("contacted")} style={{ padding: "5px 12px", background: "rgba(96,165,250,0.15)", color: "#60a5fa", border: "none", borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Mark Contacted
                </button>
                <button onClick={() => bulkUpdateStatus("qualified")} style={{ padding: "5px 12px", background: "rgba(192,132,252,0.15)", color: "#c084fc", border: "none", borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Qualify
                </button>
                <button onClick={() => bulkUpdateStatus("lost")} style={{ padding: "5px 12px", background: "rgba(255,68,68,0.1)", color: "#ff4444", border: "none", borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Mark Lost
                </button>
                <button onClick={bulkDelete} style={{ padding: "5px 12px", background: "transparent", color: "#ff4444", border: `1px solid rgba(255,68,68,0.2)`, borderRadius: 4, fontSize: 11, cursor: "pointer", fontFamily: "inherit", marginLeft: "auto" }}>
                  Delete
                </button>
                <button onClick={() => setSelectedLeads(new Set())} style={{ padding: "5px 12px", background: "transparent", color: DIM, border: `1px solid ${BORDER}`, borderRadius: 4, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                  Clear
                </button>
              </div>
            )}

            {/* Compose Panel */}
            {showCompose && (
              <div style={{ ...s.card, marginBottom: 16, border: `1px solid ${GREEN}`, position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ ...s.sectionTitle, fontSize: 12, margin: 0 }}>Compose Email</div>
                  <button onClick={() => setShowCompose(false)} style={{ background: "transparent", border: "none", color: DIM, cursor: "pointer", fontSize: 16, fontFamily: "inherit" }}>x</button>
                </div>
                <div style={{ fontSize: 12, color: DIM, marginBottom: 12 }}>
                  Sending to <strong style={{ color: GREEN }}>{composeTargets.length}</strong> lead{composeTargets.length !== 1 ? "s" : ""}: {composeTargets.slice(0, 3).map((l) => l.name.split(" ")[0]).join(", ")}{composeTargets.length > 3 ? ` +${composeTargets.length - 3} more` : ""}
                </div>
                {/* Template selector */}
                <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                  {EMAIL_TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setComposeTemplate(t.id); setComposeSubject(t.subject); setComposeMessage(t.message); }}
                      style={{
                        padding: "6px 14px",
                        fontSize: 11,
                        fontWeight: 600,
                        border: `1px solid ${composeTemplate === t.id ? GREEN : BORDER}`,
                        borderRadius: 4,
                        background: composeTemplate === t.id ? GREEN : "transparent",
                        color: composeTemplate === t.id ? BG : DIM,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                  <button
                    onClick={() => { setComposeTemplate(""); setComposeSubject(""); setComposeMessage(""); }}
                    style={{
                      padding: "6px 14px",
                      fontSize: 11,
                      fontWeight: 600,
                      border: `1px solid ${composeTemplate === "" ? GREEN : BORDER}`,
                      borderRadius: 4,
                      background: composeTemplate === "" ? GREEN : "transparent",
                      color: composeTemplate === "" ? BG : DIM,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Custom
                  </button>
                </div>
                <div style={{ fontSize: 10, color: DIM, marginBottom: 8, padding: "6px 10px", background: "#111", borderRadius: 4 }}>
                  Use <strong style={{ color: GREEN }}>{`{{first_name}}`}</strong> for the contact&apos;s first name and <strong style={{ color: GREEN }}>{`{{firm_name}}`}</strong> for their business name. These auto-fill per lead.
                </div>
                {["A", "B", "C"].includes(composeTemplate) && (
                  <div style={{ fontSize: 11, color: GREEN, marginBottom: 10, padding: "8px 12px", background: "rgba(200,255,0,0.06)", border: `1px solid rgba(200,255,0,0.15)`, borderRadius: 4 }}>
                    Sending styled HTML template {composeTemplate}. The preview below is plain text — the actual email includes branded design, cards, and CTA buttons.
                  </div>
                )}
                <div style={{ marginBottom: 8 }}>
                  <label style={s.label}>Subject</label>
                  <input
                    style={{ ...s.input, ...(["A", "B", "C"].includes(composeTemplate) ? { opacity: 0.6 } : {}) }}
                    value={composeSubject}
                    readOnly={["A", "B", "C"].includes(composeTemplate)}
                    onChange={(e) => { setComposeSubject(e.target.value); if (!["A", "B", "C"].includes(composeTemplate)) setComposeTemplate(""); }}
                    placeholder="Email subject..."
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label style={s.label}>Message Preview</label>
                  <textarea
                    style={{ ...s.textarea, minHeight: "clamp(140px, 30vh, 220px)", lineHeight: 1.6, ...(["A", "B", "C"].includes(composeTemplate) ? { opacity: 0.6 } : {}) }}
                    value={composeMessage}
                    readOnly={["A", "B", "C"].includes(composeTemplate)}
                    onChange={(e) => { setComposeMessage(e.target.value); if (!["A", "B", "C"].includes(composeTemplate)) setComposeTemplate(""); }}
                    placeholder="Write your message..."
                  />
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    onClick={sendCompose}
                    disabled={composeSending || !composeMessage.trim()}
                    style={{ ...s.btn, width: "auto", padding: "10px 24px", marginTop: 0, ...(composeSending || !composeMessage.trim() ? s.btnDisabled : {}) }}
                  >
                    {composeSending ? `Sending (${composeTargets.length})...` : `Send to ${composeTargets.length} Lead${composeTargets.length !== 1 ? "s" : ""}`}
                  </button>
                  <button onClick={() => setShowCompose(false)} style={{ ...s.logoutBtn }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Add Lead Form */}
            {showAddLead && (
              <div style={{ ...s.card, marginBottom: 16, border: `1px solid ${GREEN}` }}>
                <div style={{ ...s.sectionTitle, fontSize: 12, marginBottom: 12 }}>New Lead</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 10 }}>
                  <div>
                    <label style={s.label}>Name *</label>
                    <input style={s.input} value={newLeadName} onChange={(e) => setNewLeadName(e.target.value)} placeholder="Full name" />
                  </div>
                  <div>
                    <label style={s.label}>Email *</label>
                    <input style={s.input} value={newLeadEmail} onChange={(e) => setNewLeadEmail(e.target.value)} placeholder="email@example.com" type="email" />
                  </div>
                  <div>
                    <label style={s.label}>Business</label>
                    <input style={s.input} value={newLeadBusiness} onChange={(e) => setNewLeadBusiness(e.target.value)} placeholder="Business name" />
                  </div>
                  <div>
                    <label style={s.label}>Phone</label>
                    <input style={s.input} value={newLeadPhone} onChange={(e) => setNewLeadPhone(e.target.value)} placeholder="(555) 555-5555" />
                  </div>
                  <div>
                    <label style={s.label}>Industry</label>
                    <select style={{ ...s.input, cursor: "pointer" }} value={newLeadIndustry} onChange={(e) => setNewLeadIndustry(e.target.value)}>
                      <option value="">Select industry...</option>
                      {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={s.label}>Type</label>
                    <select style={{ ...s.input, cursor: "pointer" }} value={newLeadType} onChange={(e) => setNewLeadType(e.target.value)}>
                      <option value="General">General</option>
                      <option value="Custom Website + Dashboard">Custom Website + Dashboard</option>
                      <option value="AI Agent for My Site">AI Agent for My Site</option>
                      <option value="Full Platform Build">Full Platform Build</option>
                      <option value="Referral">Referral</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <label style={s.label}>Notes</label>
                  <textarea style={s.textarea} rows={3} value={newLeadMessage} onChange={(e) => setNewLeadMessage(e.target.value)} placeholder="How did this lead come in? Any context..." />
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button onClick={addLead} disabled={!newLeadName || !newLeadEmail} style={{ ...s.btn, width: "auto", padding: "8px 20px", marginTop: 0, ...((!newLeadName || !newLeadEmail) ? s.btnDisabled : {}) }}>
                    Save Lead
                  </button>
                  <button onClick={() => setShowAddLead(false)} style={{ ...s.logoutBtn }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Lead cards */}
            {leadsLoading && <div style={s.emptyState}>Loading leads...</div>}
            {!leadsLoading && leads.length === 0 && <div style={s.emptyState}>No leads yet. They&apos;ll appear here automatically from your contact form, or add them manually.</div>}

            {getFilteredLeads()
              .map((lead) => {
                const emailCount = getEmailCount(lead);
                const statusColors: Record<string, { bg: string; color: string }> = {
                  new: { bg: "rgba(74,222,128,0.15)", color: "#4ade80" },
                  contacted: { bg: "rgba(96,165,250,0.15)", color: "#60a5fa" },
                  qualified: { bg: "rgba(192,132,252,0.15)", color: "#c084fc" },
                  proposal_sent: { bg: "rgba(250,204,21,0.15)", color: "#facc15" },
                  won: { bg: `rgba(200,255,0,0.15)`, color: GREEN },
                  lost: { bg: "rgba(255,68,68,0.15)", color: "#ff4444" },
                };
                const sc = statusColors[lead.status] || statusColors.new;
                const age = Math.floor((Date.now() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60 * 24));
                const ageLabel = age === 0 ? "Today" : age === 1 ? "1 day ago" : `${age} days ago`;

                return (
                  <div key={lead.id} style={{ ...s.card, position: "relative", border: selectedLeads.has(lead.id) ? `1px solid ${GREEN}` : undefined }}>
                    <div style={s.cardHeader}>
                      <input
                        type="checkbox"
                        checked={selectedLeads.has(lead.id)}
                        onChange={() => toggleLeadSelection(lead.id)}
                        style={{ accentColor: GREEN, width: 16, height: 16, cursor: "pointer", flexShrink: 0, marginRight: 4, marginTop: 2 }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          {/* Editable name */}
                          {editingLeadField?.id === lead.id && editingLeadField.field === "name" ? (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                              <input
                                style={{ ...s.input, width: "min(200px, 50vw)", padding: "4px 8px", fontSize: 15, fontWeight: 700, display: "inline-block" }}
                                value={leadFieldValue}
                                onChange={(e) => setLeadFieldValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && leadFieldValue) { updateLead(lead.id, { name: leadFieldValue }); setEditingLeadField(null); }
                                  if (e.key === "Escape") setEditingLeadField(null);
                                }}
                                autoFocus
                              />
                              <button onClick={() => { if (leadFieldValue) { updateLead(lead.id, { name: leadFieldValue }); setEditingLeadField(null); } }} style={{ background: GREEN, color: BG, border: "none", borderRadius: 3, padding: "3px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>Save</button>
                              <button onClick={() => setEditingLeadField(null)} style={{ background: "transparent", color: DIM, border: `1px solid ${BORDER}`, borderRadius: 3, padding: "3px 8px", fontSize: 10, cursor: "pointer" }}>Cancel</button>
                            </span>
                          ) : (
                            <h3
                              style={{ ...s.cardTitle, cursor: "pointer", borderBottom: `1px dashed transparent` }}
                              onClick={() => { setEditingLeadField({ id: lead.id, field: "name" }); setLeadFieldValue(lead.name); }}
                              title="Click to edit name"
                            >{lead.name}</h3>
                          )}
                          <span style={{ ...s.badge, background: sc.bg, color: sc.color }}>
                            {lead.status === "proposal_sent" ? "Proposal Sent" : lead.status}
                          </span>
                          {editingLeadField?.id === lead.id && editingLeadField.field === "industry" ? (
                            <select
                              value={leadFieldValue}
                              onChange={(e) => { updateLead(lead.id, { industry: e.target.value || null }); setEditingLeadField(null); }}
                              onBlur={() => setEditingLeadField(null)}
                              autoFocus
                              style={{ padding: "2px 6px", background: CARD_BG, border: `1px solid ${GREEN}`, color: GREEN, borderRadius: 4, fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}
                            >
                              <option value="">No industry</option>
                              {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                            </select>
                          ) : (
                            <span
                              onClick={() => { setEditingLeadField({ id: lead.id, field: "industry" }); setLeadFieldValue(lead.industry || ""); }}
                              style={{ ...s.badge, background: lead.industry ? "rgba(200,255,0,0.08)" : "rgba(136,136,136,0.08)", color: lead.industry ? GREEN : DIM, cursor: "pointer", borderBottom: `1px dashed ${lead.industry ? GREEN : BORDER}` }}
                              title="Click to set industry"
                            >
                              {lead.industry || "Set industry"}
                            </span>
                          )}
                          {lead.source !== "manual" && (
                            <span style={{ ...s.badge, background: "rgba(136,136,136,0.15)", color: DIM }}>
                              {lead.source === "contact_form" ? "Contact Form" : lead.source === "discovery_call" ? "Discovery Call" : lead.source === "csv_import" ? "CSV Import" : lead.source}
                            </span>
                          )}
                        </div>
                        <div style={{ ...s.cardClient, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginTop: 2 }}>
                          {/* Editable email */}
                          {editingLeadField?.id === lead.id && editingLeadField.field === "email" ? (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                              <input
                                style={{ ...s.input, width: "min(200px, 50vw)", padding: "3px 8px", fontSize: 12, display: "inline-block" }}
                                value={leadFieldValue}
                                onChange={(e) => setLeadFieldValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") { updateLead(lead.id, { email: leadFieldValue || null }); setEditingLeadField(null); }
                                  if (e.key === "Escape") setEditingLeadField(null);
                                }}
                                placeholder="email@example.com"
                                autoFocus
                              />
                              <button onClick={() => { updateLead(lead.id, { email: leadFieldValue || null }); setEditingLeadField(null); }} style={{ background: GREEN, color: BG, border: "none", borderRadius: 3, padding: "3px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>Save</button>
                              <button onClick={() => setEditingLeadField(null)} style={{ background: "transparent", color: DIM, border: `1px solid ${BORDER}`, borderRadius: 3, padding: "3px 8px", fontSize: 10, cursor: "pointer" }}>Cancel</button>
                            </span>
                          ) : (
                            <span
                              onClick={() => { setEditingLeadField({ id: lead.id, field: "email" }); setLeadFieldValue(lead.email || ""); }}
                              style={{ cursor: "pointer", borderBottom: `1px dashed ${BORDER}` }}
                              title="Click to edit email"
                            >
                              {lead.email && lead.email !== "not found" ? lead.email : <span style={{ color: "#ff4444", fontStyle: "italic" }}>no email</span>}
                            </span>
                          )}
                          <span style={{ color: BORDER }}>&middot;</span>
                          {/* Editable phone */}
                          {editingLeadField?.id === lead.id && editingLeadField.field === "phone" ? (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                              <input
                                style={{ ...s.input, width: "min(160px, 45vw)", padding: "3px 8px", fontSize: 12, display: "inline-block" }}
                                value={leadFieldValue}
                                onChange={(e) => setLeadFieldValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") { updateLead(lead.id, { phone: leadFieldValue || null }); setEditingLeadField(null); }
                                  if (e.key === "Escape") setEditingLeadField(null);
                                }}
                                placeholder="(555) 555-5555"
                                autoFocus
                              />
                              <button onClick={() => { updateLead(lead.id, { phone: leadFieldValue || null }); setEditingLeadField(null); }} style={{ background: GREEN, color: BG, border: "none", borderRadius: 3, padding: "3px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>Save</button>
                              <button onClick={() => setEditingLeadField(null)} style={{ background: "transparent", color: DIM, border: `1px solid ${BORDER}`, borderRadius: 3, padding: "3px 8px", fontSize: 10, cursor: "pointer" }}>Cancel</button>
                            </span>
                          ) : (
                            <span
                              onClick={() => { setEditingLeadField({ id: lead.id, field: "phone" }); setLeadFieldValue(lead.phone || ""); }}
                              style={{ cursor: "pointer", borderBottom: `1px dashed ${BORDER}` }}
                              title="Click to edit phone"
                            >
                              {lead.phone ? lead.phone : <span style={{ color: DIM, fontStyle: "italic" }}>no phone</span>}
                            </span>
                          )}
                          {lead.business && <><span style={{ color: BORDER }}>&middot;</span> {lead.business}</>}
                          {lead.type && lead.type !== "General" && <><span style={{ color: BORDER }}>&middot;</span> {lead.type}</>}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 11, color: DIM, whiteSpace: "nowrap" }}>{ageLabel}</div>
                        {lead.last_emailed_at && (
                          <div style={{ fontSize: 10, color: GREEN, whiteSpace: "nowrap", marginTop: 2 }}>
                            Emailed {new Date(lead.last_emailed_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })} {new Date(lead.last_emailed_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                            {emailCount > 1 && <span style={{ color: DIM, marginLeft: 4 }}>({emailCount}x)</span>}
                          </div>
                        )}
                        {(lead.sequence_step || 0) > 0 && (
                          <div style={{ display: "flex", gap: 3, justifyContent: "flex-end", marginTop: 4 }}>
                            {EMAIL_TEMPLATES.map((t, i) => (
                              <div key={t.id} style={{
                                width: 20, height: 20, borderRadius: "50%", fontSize: 9, fontWeight: 700,
                                lineHeight: "20px", textAlign: "center",
                                background: i < (lead.sequence_step || 0) ? GREEN : "#222",
                                color: i < (lead.sequence_step || 0) ? BG : DIM,
                              }}>{t.id}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {lead.message && (
                      <div style={{ fontSize: 13, color: DIM, lineHeight: 1.6, padding: "8px 12px", background: "#111", borderRadius: 4, marginBottom: 8, whiteSpace: "pre-wrap" }}>
                        {lead.message}
                      </div>
                    )}

                    {/* Notes */}
                    {editingLeadNotes === lead.id ? (
                      <div style={{ marginBottom: 8 }}>
                        <textarea
                          style={{ ...s.textarea, minHeight: 60 }}
                          value={leadNotesValue}
                          onChange={(e) => setLeadNotesValue(e.target.value)}
                          placeholder="Add notes about this lead..."
                          autoFocus
                        />
                        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                          <button
                            onClick={() => { updateLead(lead.id, { notes: leadNotesValue || null }); setEditingLeadNotes(null); }}
                            style={{ padding: "4px 12px", background: GREEN, color: BG, border: "none", borderRadius: 3, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingLeadNotes(null)}
                            style={{ padding: "4px 12px", background: "transparent", color: DIM, border: `1px solid ${BORDER}`, borderRadius: 3, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : lead.notes ? (
                      <div
                        onClick={() => { setEditingLeadNotes(lead.id); setLeadNotesValue(lead.notes || ""); }}
                        style={{ fontSize: 12, color: "#aaa", padding: "6px 10px", background: "rgba(200,255,0,0.04)", border: `1px solid rgba(200,255,0,0.1)`, borderRadius: 4, marginBottom: 8, cursor: "pointer", whiteSpace: "pre-wrap" }}
                      >
                        <span style={{ fontSize: 10, color: GREEN, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Notes: </span>{lead.notes}
                      </div>
                    ) : null}

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
                      {/* Status buttons */}
                      {lead.status === "new" && (
                        <button onClick={() => updateLead(lead.id, { status: "contacted" })} style={{ padding: "4px 12px", background: "rgba(96,165,250,0.15)", color: "#60a5fa", border: "none", borderRadius: 3, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          Mark Contacted
                        </button>
                      )}
                      {lead.status === "contacted" && (
                        <button onClick={() => updateLead(lead.id, { status: "qualified" })} style={{ padding: "4px 12px", background: "rgba(192,132,252,0.15)", color: "#c084fc", border: "none", borderRadius: 3, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          Qualify
                        </button>
                      )}
                      {lead.status === "qualified" && (
                        <button onClick={() => updateLead(lead.id, { status: "proposal_sent" })} style={{ padding: "4px 12px", background: "rgba(250,204,21,0.15)", color: "#facc15", border: "none", borderRadius: 3, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          Proposal Sent
                        </button>
                      )}
                      {lead.status === "proposal_sent" && (
                        <button onClick={() => updateLead(lead.id, { status: "won" })} style={{ padding: "4px 12px", background: `rgba(200,255,0,0.15)`, color: GREEN, border: "none", borderRadius: 3, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          Won
                        </button>
                      )}
                      {lead.status !== "lost" && lead.status !== "won" && (
                        <button onClick={() => updateLead(lead.id, { status: "lost" })} style={{ padding: "4px 12px", background: "rgba(255,68,68,0.1)", color: "#ff4444", border: "none", borderRadius: 3, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          Lost
                        </button>
                      )}
                      {(lead.status === "lost" || lead.status === "won") && (
                        <button onClick={() => updateLead(lead.id, { status: "new" })} style={{ padding: "4px 12px", background: "rgba(136,136,136,0.1)", color: DIM, border: "none", borderRadius: 3, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          Reopen
                        </button>
                      )}
                      {/* Add notes */}
                      {!lead.notes && editingLeadNotes !== lead.id && (
                        <button onClick={() => { setEditingLeadNotes(lead.id); setLeadNotesValue(""); }} style={{ padding: "4px 12px", background: "transparent", color: DIM, border: `1px solid ${BORDER}`, borderRadius: 3, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                          + Notes
                        </button>
                      )}
                      {/* Email actions — available for any lead with a valid email */}
                      {lead.email && lead.email !== "not found" && lead.status !== "won" && lead.status !== "lost" && (
                        <>
                          {lead.status === "new" && (lead.source === "csv_import" || lead.source === "manual") && (
                            <button
                              onClick={() => openCompose([lead])}
                              style={{ padding: "4px 12px", background: GREEN, color: BG, border: "none", borderRadius: 3, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                            >
                              Send Intro
                            </button>
                          )}
                          {lead.status === "new" && lead.source !== "csv_import" && lead.source !== "manual" && (
                            <button
                              onClick={() => sendFollowUp(lead, "initial")}
                              disabled={sendingFollowUp === lead.id}
                              style={{ padding: "4px 12px", background: GREEN, color: BG, border: "none", borderRadius: 3, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                            >
                              {sendingFollowUp === lead.id ? "Sending..." : "Send Follow-up"}
                            </button>
                          )}
                          {lead.status === "contacted" && (
                            <button
                              onClick={() => sendFollowUp(lead, "initial")}
                              disabled={sendingFollowUp === lead.id}
                              style={{ padding: "4px 12px", background: GREEN, color: BG, border: "none", borderRadius: 3, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                            >
                              {sendingFollowUp === lead.id ? "Sending..." : "Send Follow-up"}
                            </button>
                          )}
                          {(lead.status === "qualified" || lead.status === "proposal_sent") && (
                            <button
                              onClick={() => sendFollowUp(lead, "proposal")}
                              disabled={sendingFollowUp === lead.id}
                              style={{ padding: "4px 12px", background: GREEN, color: BG, border: "none", borderRadius: 3, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                            >
                              {sendingFollowUp === lead.id ? "Sending..." : "Send Proposal Follow-up"}
                            </button>
                          )}
                        </>
                      )}
                      {/* Gmail fallback */}
                      {lead.email && lead.email !== "not found" && (
                        <a href={`mailto:${lead.email}`} style={{ padding: "4px 12px", background: "transparent", color: DIM, border: `1px solid ${BORDER}`, borderRadius: 3, fontSize: 11, cursor: "pointer", fontFamily: "inherit", textDecoration: "none", display: "inline-block" }}>
                          Gmail
                        </a>
                      )}
                      {/* Delete */}
                      <button onClick={() => { if (confirm(`Delete lead: ${lead.name}?`)) deleteLead(lead.id); }} style={{ padding: "4px 12px", background: "transparent", color: "#ff4444", border: `1px solid rgba(255,68,68,0.2)`, borderRadius: 3, fontSize: 11, cursor: "pointer", fontFamily: "inherit", marginLeft: "auto" }}>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </>
        )}

        {/* ─── REPORTS TAB ─── */}
        {activeTab === "reports" && (
          <>
            {/* Summary */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Total", value: reports.length, color: TEXT },
                { label: "Pending", value: reports.filter((r) => r.status === "pending").length, color: "#ffcc00" },
                { label: "Approved", value: reports.filter((r) => r.status === "approved").length, color: GREEN },
                { label: "Archived", value: reports.filter((r) => r.status === "archived").length, color: DIM },
              ].map((c) => (
                <div key={c.label} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, fontFamily: "'Space Mono', monospace" }}>{c.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: c.color }}>{c.value}</div>
                </div>
              ))}
            </div>

            {reportsLoading && <div style={{ textAlign: "center", color: DIM, padding: 40, fontSize: 13 }}>Loading reports...</div>}

            {!reportsLoading && reports.length === 0 && (
              <div style={{ textAlign: "center", color: DIM, padding: 40 }}>
                <div style={{ fontSize: 13, marginBottom: 8 }}>No build reports yet.</div>
                <div style={{ fontSize: 12 }}>Send the link to a client: <span style={{ color: GREEN }}>martinbuilds.ai/results</span></div>
              </div>
            )}

            {!reportsLoading && reports.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {reports.map((r) => {
                  const isExpanded = expandedReport === r.id;
                  const statusColors: Record<string, { bg: string; text: string }> = {
                    pending: { bg: "#1a1a00", text: "#cccc00" },
                    approved: { bg: "#002200", text: GREEN },
                    archived: { bg: "#1a1a1a", text: DIM },
                  };
                  const sc = statusColors[r.status] || statusColors.pending;
                  const ratingLabel = r.rating === "game_changer" ? "Game Changer" : r.rating === "exceptional" ? "Exceptional" : r.rating === "good" ? "Good" : null;

                  return (
                    <div key={r.id} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden" }}>
                      {/* Header row */}
                      <div
                        onClick={() => setExpandedReport(isExpanded ? null : r.id)}
                        style={{ padding: "16px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{r.name}</div>
                          <div style={{ fontSize: 12, color: DIM }}>{r.business_name} &middot; {r.industry}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                          {ratingLabel && (
                            <span style={{ fontSize: 10, padding: "3px 8px", background: "rgba(200,255,0,0.08)", border: `1px solid ${BORDER}`, borderRadius: 3, color: GREEN, textTransform: "uppercase", letterSpacing: 0.5 }}>
                              {ratingLabel}
                            </span>
                          )}
                          <span style={{ fontSize: 10, padding: "3px 8px", background: sc.bg, color: sc.text, borderRadius: 3, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>
                            {r.status}
                          </span>
                          <span style={{ fontSize: 11, color: DIM }}>{new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        </div>
                      </div>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${BORDER}` }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                            <div>
                              <div style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontFamily: "'Space Mono', monospace" }}>Before</div>
                              <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.6 }}>{r.before}</div>
                            </div>
                            <div>
                              <div style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontFamily: "'Space Mono', monospace" }}>What Was Built</div>
                              <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.6 }}>{r.built}</div>
                            </div>
                          </div>

                          <div style={{ marginTop: 16 }}>
                            <div style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontFamily: "'Space Mono', monospace" }}>Impact</div>
                            <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.6 }}>{r.impact}</div>
                          </div>

                          {r.quote && (
                            <div style={{ marginTop: 16, padding: "12px 16px", borderLeft: `2px solid ${GREEN}`, background: "rgba(200,255,0,0.03)" }}>
                              <div style={{ fontSize: 13, color: "#ccc", fontStyle: "italic", lineHeight: 1.6 }}>&ldquo;{r.quote}&rdquo;</div>
                            </div>
                          )}

                          {r.tech_tags && r.tech_tags.length > 0 && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                              {r.tech_tags.map((t: string) => (
                                <span key={t} style={{ fontSize: 10, padding: "3px 8px", border: `1px solid ${BORDER}`, borderRadius: 2, color: DIM, textTransform: "uppercase", letterSpacing: 0.5 }}>{t}</span>
                              ))}
                            </div>
                          )}

                          {r.location && (
                            <div style={{ fontSize: 12, color: DIM, marginTop: 12 }}>Location: {r.location}</div>
                          )}

                          {/* Referral */}
                          {r.referral_name && (
                            <div style={{ marginTop: 16, padding: 14, background: "#111", border: `1px solid ${BORDER}`, borderRadius: 6 }}>
                              <div style={{ fontSize: 10, color: GREEN, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>Referral</div>
                              <div style={{ fontSize: 13, color: TEXT }}>{r.referral_name}{r.referral_business ? ` — ${r.referral_business}` : ""}</div>
                              {r.referral_contact && <div style={{ fontSize: 12, color: DIM, marginTop: 4 }}>{r.referral_contact}</div>}
                              {r.referral_reason && <div style={{ fontSize: 12, color: DIM, marginTop: 4, fontStyle: "italic" }}>{r.referral_reason}</div>}
                            </div>
                          )}

                          {/* Actions */}
                          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                            {r.status !== "approved" && (
                              <button
                                onClick={() => updateReportStatus(r.id, "approved")}
                                style={{ padding: "6px 14px", background: GREEN, color: BG, border: "none", borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                              >
                                Approve
                              </button>
                            )}
                            {r.status !== "archived" && (
                              <button
                                onClick={() => updateReportStatus(r.id, "archived")}
                                style={{ padding: "6px 14px", background: "transparent", border: `1px solid ${BORDER}`, color: DIM, borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                              >
                                Archive
                              </button>
                            )}
                            {r.status === "archived" && (
                              <button
                                onClick={() => updateReportStatus(r.id, "pending")}
                                style={{ padding: "6px 14px", background: "transparent", border: `1px solid ${BORDER}`, color: TEXT, borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                              >
                                Restore
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Conversation Modal */}
      {conversationAgent && (
        <div
          onClick={() => setConversationAgent(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 8, width: "100%", maxWidth: 720, maxHeight: "85vh", display: "flex", flexDirection: "column", overflow: "hidden" }}
          >
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{conversationAgent.bot_name || "Agent"} &harr; {conversationAgent.name}</div>
                <div style={{ fontSize: 11, color: DIM, marginTop: 2 }}>{conversationAgent.business_name} &middot; {conversationMessages.length} messages</div>
              </div>
              <button onClick={() => setConversationAgent(null)} style={{ background: "transparent", border: `1px solid ${BORDER}`, color: DIM, padding: "4px 10px", borderRadius: 4, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Close</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 18 }}>
              {conversationLoading && <div style={{ color: DIM, textAlign: "center", padding: 24, fontSize: 12 }}>Loading...</div>}
              {!conversationLoading && conversationMessages.length === 0 && <div style={{ color: DIM, textAlign: "center", padding: 24, fontSize: 12 }}>No messages yet.</div>}
              {conversationMessages.map((msg, i) => {
                const isUser = msg.role === "user";
                return (
                  <div key={i} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 10 }}>
                    <div style={{ maxWidth: "75%" }}>
                      <div style={{ padding: "10px 14px", borderRadius: isUser ? "12px 12px 4px 12px" : "12px 12px 12px 4px", background: isUser ? GREEN : "#222", color: isUser ? "#0a0a0a" : TEXT, fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{msg.content}</div>
                      <div style={{ fontSize: 10, color: DIM, marginTop: 3, textAlign: isUser ? "right" : "left" }}>
                        {msg.interface} &middot; {new Date(msg.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
