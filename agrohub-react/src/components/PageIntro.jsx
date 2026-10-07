export default function PageIntro({ eyebrow, title, children }) {
  return (
    <section className="ah-page-hero">
      <div className="container">
        <span className="ah-eyebrow">{eyebrow}</span>
        <h1 className="ah-title mb-3">{title}</h1>
        <p className="ah-lead mb-0">{children}</p>
      </div>
    </section>
  );
}
