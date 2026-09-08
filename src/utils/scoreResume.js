import keywordBanks from "./keywordBanks.js";
import {
  normalizeText,
  countWords,
  hasTerm,
  hasPhone,
  actionVerbs,
  metricLines,
  lengthPoints,
} from "./scoringRules.js";

export function scoreResume(resumeText, selectedRole) {
  const text = normalizeText(resumeText);
  const words = countWords(text);
  const email = /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/.test(text);
  const phone = hasPhone(text);
  const matched = (keywordBanks[selectedRole] ?? [])
    .filter((aliases) => aliases.some((term) => hasTerm(text, term)))
    .map((aliases) => aliases[0]);
  const verbs = actionVerbs.filter((verb) => hasTerm(text, verb)).length;
  const bullets = new Set(
    text
      .split("\n")
      .filter((line) => /^\s*(?:[-•*▪◦]|\d+[.)])\s+\S/.test(line)),
  ).size;
  const metrics = metricLines(text);
  const dates =
    /\b(?:19|20)\d{2}\s*(?:-\s*(?:(?:[a-z]+\s+)?(?:19|20)\d{2}|present|current)|to\s+(?:(?:19|20)\d{2}|present))\b|\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+(?:19|20)\d{2}\b|\b(?:0?[1-9]|1[0-2])\/(?:19|20)\d{2}\b/.test(
      text,
    );
  const sections = [
    /^(?:education|qualifications)\s*:?$/m,
    /^(?:(?:work |professional |relevant )?experience|projects|employment)\s*:?$/m,
    /^(?:(?:technical |core )?skills|technologies)\s*:?$/m,
  ].filter((pattern) => pattern.test(text)).length;
  const breakdown = [
    {
      id: "keywords",
      label: "Role keywords",
      points: Math.min(25, matched.length * 3),
      max: 25,
      detail: `${matched.length} distinct terms; 3 points each, capped at 25. Aliases count once.`,
      good: matched.length >= 9,
      fix: "Name relevant tools you have actually used.",
      success: `${matched.length} distinct role terms found.`,
    },
    {
      id: "impact",
      label: "Measurable results",
      points: Math.min(20, metrics * 10),
      max: 20,
      detail: `${metrics} distinct lines pair an action verb with a metric; 10 points each, capped at 20.`,
      good: metrics >= 2,
      fix: "Add results: “Reduced load time by 40%.”",
      success: "Actions backed by measurable results.",
    },
    {
      id: "contact",
      label: "Contact details",
      points: (email ? 5 : 0) + (phone ? 5 : 0),
      max: 10,
      detail: "5 points each for an email address and a phone number.",
      good: email && phone,
      fix:
        !email && !phone
          ? "Add an email and phone number."
          : !email
            ? "Add an email address."
            : "Add a phone number, if appropriate.",
      success: "Email + phone found.",
    },
    {
      id: "format",
      label: "Bullets",
      points: Math.min(10, bullets * 2),
      max: 10,
      detail: `${bullets} distinct bullet lines; 2 points each, capped at 10. Visual layout is not assessed.`,
      good: bullets >= 5,
      fix: "Use short bullets for projects and experience.",
      success: "Experience is easy to skim.",
    },
    {
      id: "verbs",
      label: "Action verbs",
      points: Math.min(10, verbs * 2),
      max: 10,
      detail: `${verbs} distinct action verbs; 2 points each, capped at 10.`,
      good: verbs >= 5,
      fix: "Lead with verbs like “built” or “led”.",
      success: "Clear action verbs found.",
    },
    {
      id: "structure",
      label: "Sections + dates",
      points: sections * 3 + (dates ? 6 : 0),
      max: 15,
      detail:
        "3 points each for education, experience/projects and skills headings; 6 for a date range or month + year.",
      good: sections === 3 && dates,
      fix:
        sections < 3
          ? "Use Education, Experience / Projects, Skills headings."
          : "Add month + year or date ranges.",
      success: "Clear sections and dates.",
    },
    {
      id: "length",
      label: "Resume length",
      points: lengthPoints(words),
      max: 10,
      detail: `${words} words. 250–800: 10 points; 150–249: 7; 801–1,000: 5; 80–149: 3; otherwise: 0.`,
      good: words >= 250 && words <= 800,
      fix:
        words > 800
          ? "Trim less relevant details; aim under 800 words."
          : "Add useful project and experience details.",
      success: "Length is in the sweet spot.",
    },
  ];
  // Sort fixes by missing points, retaining a stable priority for ties.
  const fixes = breakdown
    .filter((item) => !item.good)
    .sort((a, b) => b.max - b.points - (a.max - a.points));
  const good = breakdown.filter((item) => item.good);
  const feedback = [...fixes, ...good]
    .slice(0, 7)
    .map((item) => ({
      id: item.id,
      type: item.good ? "good" : "fix",
      text: item.good ? item.success : item.fix,
    }));
  return {
    score: Math.max(
      0,
      Math.min(
        100,
        breakdown.reduce((total, item) => total + item.points, 0),
      ),
    ),
    feedback,
    breakdown,
    matchedKeywords: matched,
    wordCount: words,
  };
}
