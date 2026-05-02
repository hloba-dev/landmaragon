import { useCountdown } from "../hooks/useCountdown.js";

const LABELS = [
  { key: "days", label: "Днів" },
  { key: "hours", label: "Годин" },
  { key: "minutes", label: "Хвилин" },
  { key: "seconds", label: "Секунд" },
];

export default function Countdown({ target }) {
  const time = useCountdown(target);

  return (
    <section className="section section--tight">
      <div className="container">
        <div className="countdown">
          <h2 className="countdown__title">
            До старту <b>залишилося:</b>
          </h2>

          <div className="countdown__grid" aria-live="polite">
            {LABELS.map(({ key, label }) => (
              <div className="countdown__cell" key={key}>
                <span className="countdown__num">{time[key]}</span>
                <span className="countdown__label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
