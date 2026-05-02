const PERSONAS = [
  {
    icon: "01",
    title: "Шукаєш нову професію",
    desc: "Виходь на дохід від $30/год і розвивайся в напрямку, який має майбутнє.",
  },
  {
    icon: "02",
    title: "Фрилансер",
    desc: "Підвищуй дохід і продавай експертизу, а не години — завдяки AI-інструментам.",
  },
  {
    icon: "03",
    title: "Спеціаліст з бізнесу",
    desc: "Автоматизуй процеси у своєму проєкті, позбавляйся рутини й підвищуй вартість на ринку праці.",
  },
  {
    icon: "04",
    title: "Підприємець або керівник",
    desc: "Зніми рутину з команди, оптимізуй витрати й наведи порядок у процесах.",
  },
];

export default function ForWho() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <span className="section-eyebrow">Для кого</span>
          <h2 className="section-title section-title--center">
            Варто доєднатися просто зараз, якщо ти:
          </h2>
        </div>

        <div className="forwho__grid">
          {PERSONAS.map((p) => (
            <article className="card forwho__card" key={p.icon}>
              <div className="forwho__icon">{p.icon}</div>
              <h3 className="forwho__title">{p.title}</h3>
              <p className="forwho__desc">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
