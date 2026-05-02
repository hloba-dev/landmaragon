/**
 * Замінює звичайний дефіс на non-breaking hyphen (U+2011) у складених
 * термінах типу "AI-автоматизатор", "no-code", "low-code" — щоб слово
 * лишалося єдиним і не переносилося посередині на вузьких екранах.
 */
const COMPOUNDS = [
  /\bAI-([\wА-Яа-яІіЇїЄєҐґ])/g,
  /\bno-code\b/g,
  /\blow-code\b/g,
];

export function noBreak(text) {
  if (!text) return text;
  let out = text
    .replace(COMPOUNDS[0], "AI‑$1")
    .replace(COMPOUNDS[1], "no‑code")
    .replace(COMPOUNDS[2], "low‑code");
  return out;
}
