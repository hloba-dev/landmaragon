const ROLES = [
  { icon: "⚙", title: "Розробника", sub: "автоматизації без коду" },
  { icon: "📊", title: "CRM-менеджера", sub: "воронки та звіти" },
  { icon: "📈", title: "Аналітика", sub: "AI-аналіз даних" },
  { icon: "🤖", title: "Асистента", sub: "AI-агенти 24/7" },
];

export default function Replaces() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <span className="section-eyebrow">Універсальний фахівець</span>
          <h2 className="section-title section-title--center">
            <span className="no-wrap-word">AI-автоматизатор</span> замінює одразу
            кількох спеціалістів
          </h2>
        </div>

        <div className="replaces__grid">
          {ROLES.map((r) => (
            <div className="replaces__card" key={r.title}>
              <div className="replaces__icon" aria-hidden="true">
                {r.icon}
              </div>
              <div className="replaces__title">{r.title}</div>
              <div className="replaces__sub">{r.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
