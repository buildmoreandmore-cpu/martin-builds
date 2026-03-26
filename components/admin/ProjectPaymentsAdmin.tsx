"use client";

import { useState, useEffect } from "react";

const accent = "#c8ff00";
const black = "#0a0a0a";
const white = "#f5f5f0";
const grayDark = "#1a1a1a";
const grayMid = "#2a2a2a";
const grayText = "#888";

interface Project {
  id: string;
  client_name: string;
  client_email: string;
  project_name: string;
  total_amount: number;
  phase_1_amount: number;
  phase_2_amount: number;
  phase_1_status: string;
  phase_2_status: string;
  project_status: string;
  phase_1_paid_at: string | null;
  phase_2_paid_at: string | null;
  phase_1_payment_link: string | null;
  phase_2_payment_link: string | null;
  created_at: string;
}

export default function ProjectPaymentsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const triggerPhase2 = async (projectId: string) => {
    if (!confirm("Trigger Phase 2 payment for this project?")) return;

    try {
      const res = await fetch("/api/project-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phase: "2",
          project_id: projectId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(`Phase 2 payment link created! Copy and send to client:\n\n${data.payment_link}`);
        fetchProjects(); // Refresh
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Failed to trigger Phase 2");
    }
  };

  const copyLink = (link: string | null) => {
    if (!link) return;
    navigator.clipboard.writeText(link);
    alert("Payment link copied to clipboard!");
  };

  const filteredProjects = projects.filter((p) => {
    if (filter === "awaiting_deposit") return p.phase_1_status === "pending";
    if (filter === "in_progress") return p.project_status === "in_progress";
    if (filter === "ready_for_phase_2") return p.phase_1_status === "paid" && p.phase_2_status === "pending";
    if (filter === "completed") return p.project_status === "completed";
    return true;
  });

  if (loading) {
    return <div style={{ color: grayText }}>Loading projects...</div>;
  }

  return (
    <div style={{ padding: "2rem 0" }}>
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: 700,
          color: accent,
          marginBottom: "1.5rem",
        }}
      >
        Two-Phase Project Payments
      </h2>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {[
          { key: "all", label: "All" },
          { key: "awaiting_deposit", label: "Awaiting Deposit" },
          { key: "in_progress", label: "In Progress" },
          { key: "ready_for_phase_2", label: "Ready for Phase 2" },
          { key: "completed", label: "Completed" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: "0.5rem 1rem",
              background: filter === tab.key ? accent : grayMid,
              color: filter === tab.key ? black : white,
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Table */}
      {filteredProjects.length === 0 ? (
        <div style={{ color: grayText }}>No projects found</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                padding: "1.5rem",
                background: grayDark,
                borderRadius: "12px",
                border: `1px solid ${grayMid}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700, color: white, marginBottom: "0.25rem" }}>
                    {project.project_name}
                  </div>
                  <div style={{ fontSize: "0.9rem", color: grayText }}>
                    {project.client_name} ({project.client_email})
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: accent }}>
                    ${(project.total_amount / 100).toFixed(2)}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: grayText }}>Total</div>
                </div>
              </div>

              {/* Phase Status */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div
                  style={{
                    padding: "1rem",
                    background: grayMid,
                    borderRadius: "8px",
                    border: `1px solid ${project.phase_1_status === "paid" ? accent : grayMid}`,
                  }}
                >
                  <div style={{ fontSize: "0.75rem", color: grayText, marginBottom: "0.5rem" }}>PHASE 1 (50%)</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: white, marginBottom: "0.25rem" }}>
                    ${(project.phase_1_amount / 100).toFixed(2)}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: project.phase_1_status === "paid" ? accent : grayText }}>
                    {project.phase_1_status === "paid" ? "✓ Paid" : "Pending"}
                  </div>
                  {project.phase_1_status === "paid" && project.phase_1_paid_at && (
                    <div style={{ fontSize: "0.7rem", color: grayText, marginTop: "0.25rem" }}>
                      {new Date(project.phase_1_paid_at).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    padding: "1rem",
                    background: grayMid,
                    borderRadius: "8px",
                    border: `1px solid ${project.phase_2_status === "paid" ? accent : grayMid}`,
                  }}
                >
                  <div style={{ fontSize: "0.75rem", color: grayText, marginBottom: "0.5rem" }}>PHASE 2 (50%)</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: white, marginBottom: "0.25rem" }}>
                    ${(project.phase_2_amount / 100).toFixed(2)}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: project.phase_2_status === "paid" ? accent : grayText }}>
                    {project.phase_2_status === "paid" ? "✓ Paid" : project.phase_2_status === "ready" ? "Ready" : "Pending"}
                  </div>
                  {project.phase_2_status === "paid" && project.phase_2_paid_at && (
                    <div style={{ fontSize: "0.7rem", color: grayText, marginTop: "0.25rem" }}>
                      {new Date(project.phase_2_paid_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {project.phase_1_payment_link && project.phase_1_status !== "paid" && (
                  <button
                    onClick={() => copyLink(project.phase_1_payment_link)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: grayMid,
                      color: white,
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    Copy Phase 1 Link
                  </button>
                )}

                {project.phase_1_status === "paid" && project.phase_2_status === "pending" && (
                  <button
                    onClick={() => triggerPhase2(project.id)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: accent,
                      color: black,
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    Trigger Phase 2 Payment
                  </button>
                )}

                {project.phase_2_payment_link && project.phase_2_status !== "paid" && (
                  <button
                    onClick={() => copyLink(project.phase_2_payment_link)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: grayMid,
                      color: white,
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    Copy Phase 2 Link
                  </button>
                )}

                <div
                  style={{
                    padding: "0.5rem 1rem",
                    background: grayMid,
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    color: grayText,
                  }}
                >
                  Status: {project.project_status.replace(/_/g, " ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
