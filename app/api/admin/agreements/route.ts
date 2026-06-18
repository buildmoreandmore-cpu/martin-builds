import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * DELETE /api/admin/agreements
 * Body: { id?: string, ids?: string[], filter?: { emailIn?: string[] } }
 *
 * Single delete, bulk delete, or filter-based bulk delete of invites
 * (and any matching signed rows). Used by the Agreements tab × button
 * and the Clear-test-data action.
 */
export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { id, ids, filter } = body || {};

  let inviteIds: string[] = [];
  if (id) inviteIds = [id];
  else if (Array.isArray(ids)) inviteIds = ids;

  // Resolve a filter (e.g. emailIn) into a concrete list of invite ids
  if (filter?.emailIn && Array.isArray(filter.emailIn) && filter.emailIn.length > 0) {
    const { data } = await supabase
      .from("agreement_invites")
      .select("id")
      .in("client_email", filter.emailIn);
    inviteIds = [...inviteIds, ...((data || []) as Array<{ id: string }>).map((r) => r.id)];
  }

  inviteIds = Array.from(new Set(inviteIds.filter(Boolean)));
  if (inviteIds.length === 0) {
    return NextResponse.json({ error: "Nothing to delete" }, { status: 400 });
  }

  // Delete any signed_agreements rows tied to these invites first
  const { error: signedErr } = await supabase
    .from("signed_agreements")
    .delete()
    .in("invite_id", inviteIds);
  if (signedErr) console.error("[agreements/delete] signed:", signedErr.message);

  // Then the invites themselves
  const { error: invErr, count } = await supabase
    .from("agreement_invites")
    .delete({ count: "exact" })
    .in("id", inviteIds);
  if (invErr) return NextResponse.json({ error: invErr.message }, { status: 500 });

  return NextResponse.json({ ok: true, deleted: count ?? inviteIds.length });
}
