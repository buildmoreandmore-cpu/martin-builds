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
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
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
    padding: "3px 10px",
    borderRadius: 12,
    fontSize: 11,
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
  const [activeTab, setActiveTab] = useState<"invoices" | "automate" | "agents">("invoices");

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
    }
  }, [authed, fetchProjects, fetchAutomation, fetchAgents]);

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
        {(["invoices", "automate", "agents"] as const).map((t) => (
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
            {t === "invoices" ? "Invoices" : t === "automate" ? "Automate" : "AI Agents"}
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
