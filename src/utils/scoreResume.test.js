import test from "node:test";
import assert from "node:assert/strict";
import { scoreResume } from "./scoreResume.js";
import { hasTerm, hasPhone, metricLines } from "./scoringRules.js";
const SWE = "Software Engineer Intern";
const DATA = "Data Analyst Intern";
const CONSULT = "Product / Tech Consultant";
const common = `Alex Example
alex@example.com | +61 412 345 678
Education
Bachelor of Science, Example University, March 2023 - November 2026
Experience
- Built a student project used by 200 users to coordinate campus events.
- Reduced manual reporting effort by 40% through an automated workflow.
- Designed a reliable process with clear documentation and accessible navigation.
- Led weekly team reviews to identify gaps and deliver focused improvements.
- Presented findings to project partners and implemented their feedback.
Skills
`;
const context = `Collaborated with a small student team to understand the problem, review alternatives, and deliver a practical solution. Documented decisions and tradeoffs so future contributors could continue the work. Validated changes against representative examples and gathered feedback from participants. Explained findings clearly, tracked open questions, and revised the approach after testing. `;
export const samples = {
  empty: "",
  short: "I like building things.",
  swe:
    common +
    "JavaScript TypeScript React Node.js SQL Git Docker testing Python APIs HTML CSS\n" +
    context.repeat(4),
  data:
    common +
    "Excel Python SQL Tableau Power BI pandas numpy statistics regression data cleaning ETL dashboards\n" +
    context.repeat(4),
  consultant:
    common +
    "Product management stakeholder roadmap user stories requirements prototyping UX market research strategy agile clients presentations\n" +
    context.repeat(4),
};
test("required scenario matrix", () => {
  const cases = [
    ["empty", samples.empty, SWE],
    ["short", samples.short, SWE],
    ["strong SWE", samples.swe, SWE],
    ["strong Data", samples.data, DATA],
    ["strong Consultant", samples.consultant, CONSULT],
    [
      "no contact",
      samples.swe.replace("alex@example.com | +61 412 345 678", ""),
      SWE,
    ],
    [
      "no metrics",
      samples.swe
        .replace("200 users", "students")
        .replace("40%", "a meaningful amount"),
      SWE,
    ],
    ["very long", samples.swe + context.repeat(30), SWE],
  ];
  const results = Object.fromEntries(
    cases.map(([label, text, role]) => {
      const result = scoreResume(text, role);
      console.log(`${label}: ${result.score}/100 (${result.wordCount} words)`);
      assert.ok(result.score >= 0 && result.score <= 100);
      assert.equal(
        result.breakdown.reduce((sum, item) => sum + item.max, 0),
        100,
      );
      assert.equal(
        result.breakdown.reduce((sum, item) => sum + item.points, 0),
        result.score,
      );
      assert.ok(result.feedback.length <= 7);
      return [label, result.score];
    }),
  );
  assert.equal(results.empty, 0);
  assert.ok(results.short < 20);
  for (const label of ["strong SWE", "strong Data", "strong Consultant"])
    assert.ok(results[label] >= 85);
  assert.equal(results["no contact"], results["strong SWE"] - 10);
  assert.equal(results["no metrics"], results["strong SWE"] - 20);
  assert.ok(results["very long"] < results["strong SWE"]);
});
test("case, whitespace, boundaries, punctuation and aliases", () => {
  assert.equal(
    scoreResume(samples.swe.toUpperCase(), SWE).score,
    scoreResume(samples.swe, SWE).score,
  );
  assert.equal(
    scoreResume(`  \n${samples.swe}\n `, SWE).score,
    scoreResume(samples.swe, SWE).score,
  );
  assert.equal(
    scoreResume("React ".repeat(400), SWE).matchedKeywords.length,
    1,
  );
  assert.equal(
    scoreResume("Node.js nodejs NODE JS", SWE).matchedKeywords.length,
    1,
  );
  assert.equal(hasTerm("reactive javascript", "java"), false);
  assert.equal(hasTerm("reactive", "react"), false);
  assert.equal(hasTerm("C++", "c++"), false); // matcher accepts normalized text only
  assert.equal(hasTerm("c++ developer", "c++"), true);
  assert.equal(hasTerm("nodeXjs", "node.js"), false);
});
test("contact and impact false positives", () => {
  for (const phone of ["+61 412 345 678", "(415) 555-0123", "0412 345 678"])
    assert.equal(hasPhone(phone), true);
  assert.equal(hasPhone("2023 - 2026"), false);
  assert.equal(metricLines("GPA 4.0\n2023 - 2026\n+61 412 345 678"), 0);
  assert.equal(metricLines("reduced load time by 40%"), 1);
  assert.equal(metricLines("built a tool for 200 users"), 1);
  assert.equal(
    metricLines("built a tool for 200 users\nbuilt a tool for 200 users"),
    1,
  );
  assert.equal(metricLines("built a tool in 2024"), 0);
});
test("first-line bullets, unknown roles and absent values are safe", () => {
  assert.equal(
    scoreResume("- Built a project", SWE).breakdown.find(
      (item) => item.id === "format",
    ).points,
    2,
  );
  assert.equal(scoreResume(undefined, SWE).score, 0);
  assert.equal(scoreResume(null, SWE).score, 0);
  assert.equal(scoreResume(samples.swe, "unknown").matchedKeywords.length, 0);
});
