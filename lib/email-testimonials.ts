/**
 * Testimonials for cold outreach emails.
 * Add new entries here as more clients agree to be quoted.
 */

export type Testimonial = {
  quote: string;
  attribution: string;
  link?: string;
};

/** Testimonial used in every Template A "Send Intro" email. */
export const INTRO_TESTIMONIAL: Testimonial = {
  quote: "Before martin.builds built our platform, everything was manual — the steps, the clicks, all of it. I knew there had to be a better way but didn't know where to find it. He delivered the whole system in under two weeks, and we had our first real candidate running through it within a week of launch.",
  attribution: "PCGScreening.net",
  link: "https://pcgscreening.net",
};

/** Render a testimonial as branded HTML for inline use in email templates. */
export function renderTestimonialHtml(t: Testimonial): string {
  const attribution = t.link
    ? `<a href="${t.link}" style="color:#c8ff00;text-decoration:none;">${t.attribution}</a>`
    : t.attribution;
  return `
<div style="border-left:3px solid #c8ff00;padding:16px 20px;margin:0 0 24px 0;background:#0f0f0f;border-radius:0 8px 8px 0;">
<p style="font-size:14px;font-style:italic;color:#ccc;margin:0 0 12px 0;line-height:1.7;">
&ldquo;${t.quote}&rdquo;
</p>
<p style="font-size:11px;color:#888;margin:0;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">
&mdash; ${attribution}
</p>
</div>`;
}
