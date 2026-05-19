/**
 * Швидкий і плавний скрол до позиції — через requestAnimationFrame
 * з easeInOutQuart. Тривалість динамічна (380–620 мс) залежно від дистанції.
 *
 * @param {number} targetY - цільова позиція scrollY
 * @param {Object} [opts]
 * @param {number} [opts.minDuration=380]
 * @param {number} [opts.maxDuration=620]
 * @param {number} [opts.speed=0.35] - множник тривалості (мс/px)
 * @returns {() => void} - функція скасування поточної анімації
 */
export function smoothScrollTo(targetY, opts = {}) {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) {
    window.scrollTo(0, targetY);
    return () => {};
  }

  const { minDuration = 380, maxDuration = 620, speed = 0.35 } = opts;
  const startY = window.scrollY;
  const distance = targetY - startY;

  if (Math.abs(distance) < 4) {
    window.scrollTo(0, targetY);
    return () => {};
  }

  const duration = Math.min(
    maxDuration,
    Math.max(minDuration, Math.abs(distance) * speed),
  );

  // easeInOutQuart — швидкий старт, плавне завершення
  const ease = (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  let rafId = 0;
  let cancelled = false;
  const startTime = performance.now();

  const step = (now) => {
    if (cancelled) return;
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    window.scrollTo(0, startY + distance * ease(t));
    if (t < 1) {
      rafId = requestAnimationFrame(step);
    }
  };

  rafId = requestAnimationFrame(step);

  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
  };
}

/**
 * Скрол до елемента за id з урахуванням висоти sticky topbar.
 *
 * Якщо всередині секції є дочірній елемент з [data-scroll-focus] —
 * скрол іде саме до нього (наприклад, до форми, а не до заголовка секції).
 * Це гарантує, що ключовий контент (перші поля форми) відразу видно на мобільному.
 */
export function smoothScrollToId(id, opts) {
  const section = document.getElementById(id);
  if (!section) return () => {};

  const focus = section.querySelector("[data-scroll-focus]");
  const target = focus || section;

  const topbar = document.querySelector(".topbar");
  const topbarH = topbar ? topbar.getBoundingClientRect().height : 0;
  // Більший зазор під фокус-таргетом — щоб заголовок форми не «прилипав» до topbar
  // і перші поля гарантовано були в полі зору на телефоні.
  const gap = focus ? 16 : 8;
  const offset = topbarH + gap;

  const targetY = target.getBoundingClientRect().top + window.scrollY - offset;
  return smoothScrollTo(targetY, opts);
}
