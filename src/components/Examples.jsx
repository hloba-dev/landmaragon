import { useCallback, useEffect, useRef, useState } from "react";

const EXAMPLES = [
  {
    src: "/images/examples/clothing-store.png",
    title: "AI-асистент магазину одягу",
    desc: "Консультує клієнтів, підбирає розміри й оформлює замовлення в месенджері 24/7.",
  },
  {
    src: "/images/examples/beauty-salon.png",
    title: "Онлайн-запис у салон краси",
    desc: "Веде клієнта від першого повідомлення до підтвердженого запису без участі адміністратора.",
  },
  {
    src: "/images/examples/budget-manager.png",
    title: "AI-менеджер бюджету",
    desc: "Автоматично фіксує витрати, формує звіти й нагадує про планові платежі.",
  },
  {
    src: "/images/examples/content-generator.png",
    title: "Генерація контенту",
    desc: "Створює пости, описи й рекламні тексти за брендбуком у кілька кліків.",
  },
];

export default function Examples() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll(".examples__slide");
    if (!slides.length) return;

    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let nearest = 0;
    let nearestDist = Infinity;
    slides.forEach((slide, i) => {
      const r = slide.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const d = Math.abs(c - trackCenter);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = i;
      }
    });
    setActiveIndex(nearest);

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateState();
    track.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      track.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  const scrollToIndex = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll(".examples__slide");
    const target = slides[Math.max(0, Math.min(i, slides.length - 1))];
    if (!target) return;
    const offset =
      target.offsetLeft - (track.clientWidth - target.clientWidth) / 2;
    track.scrollTo({ left: offset, behavior: "smooth" });
  };

  const handlePrev = () => scrollToIndex(activeIndex - 1);
  const handleNext = () => scrollToIndex(activeIndex + 1);

  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <span className="section-eyebrow">Приклади</span>
          <h2 className="section-title section-title--center">
            Що саме ти зможеш{" "}
            <span className="text-accent">створювати своїми руками</span>
          </h2>
          <p className="examples__lead">
            Реальні сценарії автоматизацій, які учні запускають уже на інтенсиві
            — від чат-ботів до AI-менеджерів процесів.
          </p>
        </div>

        <div className="examples__carousel">
          <button
            type="button"
            className="examples__nav examples__nav--prev"
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Попередній приклад"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="examples__track"
            ref={trackRef}
            role="region"
            aria-label="Карусель прикладів автоматизацій"
            tabIndex={0}
          >
            {EXAMPLES.map((item, i) => (
              <article
                className={
                  "examples__slide" +
                  (i === activeIndex ? " examples__slide--active" : "")
                }
                key={item.src}
                aria-label={item.title}
              >
                <div className="examples__media">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="examples__body">
                  <h3 className="examples__title">{item.title}</h3>
                  <p className="examples__desc">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="examples__nav examples__nav--next"
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Наступний приклад"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div
          className="examples__dots"
          role="tablist"
          aria-label="Навігація каруселі"
        >
          {EXAMPLES.map((item, i) => (
            <button
              key={item.src}
              type="button"
              className={
                "examples__dot" +
                (i === activeIndex ? " examples__dot--active" : "")
              }
              onClick={() => scrollToIndex(i)}
              aria-label={`Слайд ${i + 1}: ${item.title}`}
              aria-selected={i === activeIndex}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
