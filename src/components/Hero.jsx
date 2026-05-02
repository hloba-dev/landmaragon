const TOOLS = [
  { name: "n8n", label: "n8n" },
  { name: "telegram", label: "Telegram" },
  { name: "gemini", label: "Gemini" },
  { name: "make", label: "Make" },
  { name: "openai", label: "OpenAI" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__badges">
            <span className="tag">Безоплатно</span>
            <span className="tag tag--ghost">3 дні практики</span>
          </div>

          <h1 className="hero__title no-wrap-word">AI-автоматизатор</h1>

          <p className="hero__subtitle">
            Спробуй сучасну професію <b>без програмування</b> та навчись
            заробляти <b>від $30 за годину</b>.
          </p>

          <ul className="hero__tools" aria-label="Інструменти, які вивчатимемо">
            {TOOLS.map((tool) => (
              <li key={tool.name} className="hero__tool">
                <span className="hero__tool-dot" aria-hidden="true" />
                {tool.label}
              </li>
            ))}
          </ul>

          <a href="#register" className="btn btn--lg">
            Зареєструватися →
          </a>

          <p className="hero__note">
            Фриланс, найм, додаткова зайнятість, розвиток власного бізнесу або
            прокачка на поточній роботі — обирай свої нові можливості.
          </p>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__visual-glow" />
          <img
            src="/images/hero-ai.png"
            alt=""
            className="hero__visual-img"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="hero__visual-chip hero__visual-chip--tl">
            <span className="hero__visual-chip-dot" />
            n8n · workflow live
          </div>
          <div className="hero__visual-chip hero__visual-chip--br">
            <span className="hero__visual-chip-dot hero__visual-chip-dot--green" />
            AI-агент · online
          </div>
        </div>
      </div>
    </section>
  );
}
