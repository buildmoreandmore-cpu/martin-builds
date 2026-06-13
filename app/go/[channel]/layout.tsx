import type { Metadata } from "next";
import Script from "next/script";

// Paid landing pages must NOT compete with organic pages in search.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Self-contained shell for /go/[channel]. Deliberately renders NO global Nav or
 * Footer — a paid traffic page has exactly one exit: the lead form. The only
 * branding is a logo that anchors back to the top of the same page.
 */
export default function GoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {GTM_ID ? (
        <>
          <Script id="gtm-base" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      ) : null}
      {children}
    </>
  );
}
