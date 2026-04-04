export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        body::before { display: none !important; }
        section { padding-left: unset !important; padding-right: unset !important; }
        h1, h2 { font-size: unset !important; letter-spacing: unset !important; }
      `}</style>
      {children}
    </>
  );
}
