export function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\r\n?/g, "\n")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[^\S\n]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
}
export function countWords(text) {
  return text.trim().match(/\S+/g)?.length ?? 0;
}
export function hasTerm(text, term) {
  const escaped = term
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/ /g, "\\s+");
  // Unlike \b, these boundaries also work for C++ and punctuation in Node.js.
  return new RegExp(
    `(?<![\\p{L}\\p{N}_+])${escaped}(?![\\p{L}\\p{N}_+])`,
    "u",
  ).test(text);
}
export const actionVerbs = [
  "developed",
  "created",
  "built",
  "led",
  "managed",
  "designed",
  "implemented",
  "optimized",
  "optimised",
  "analyzed",
  "analysed",
  "collaborated",
  "improved",
  "delivered",
  "reduced",
  "launched",
  "automated",
  "presented",
  "increased",
];
export function hasPhone(text) {
  // Ignore year ranges; accept common international, spaced and bracketed numbers.
  return (text.match(/(?:\+?\d|\(\d)[\d ().-]{7,}\d/g) ?? []).some(
    (candidate) => {
      const digits = candidate.replace(/\D/g, "");
      return (
        digits.length >= 10 &&
        digits.length <= 15 &&
        !/^(?:19|20)\d{2}\s*-\s*(?:19|20)\d{2}$/.test(candidate)
      );
    },
  );
}
export function metricLines(text) {
  // Contact numbers, calendar years and GPA alone are not evidence of impact.
  const metric =
    /\b\d+(?:[,.]\d+)*\s*(?:%|[x×]\b|percent\b|users?\b|customers?\b|clients?\b|hours?\b|minutes?\b|seconds?\b|projects?\b|reports?\b|records?\b|students?\b|teams?\b)|[$£€]\s*\d+/;
  return new Set(
    text
      .split("\n")
      .filter(
        (line) =>
          actionVerbs.some((verb) => hasTerm(line, verb)) && metric.test(line),
      ),
  ).size;
}
export function lengthPoints(words) {
  if (words >= 250 && words <= 800) return 10;
  if (words >= 150 && words < 250) return 7;
  if (words > 800 && words <= 1000) return 5;
  if (words >= 80 && words < 150) return 3;
  return 0;
}
