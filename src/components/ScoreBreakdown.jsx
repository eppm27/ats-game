export default function ScoreBreakdown({ result }) {
  return (
    <details className="breakdown">
      <summary>How was this scored?</summary>
      <p>A few text checks. No AI. No actual ATS simulation.</p>
      <dl>
        {result.breakdown.map((item) => (
          <div className="breakdown-row" key={item.id}>
            <dt>
              {item.label}
              <small>{item.detail}</small>
            </dt>
            <dd>
              {item.points}
              <span> / {item.max}</span>
            </dd>
          </div>
        ))}
      </dl>
      {result.matchedKeywords.length > 0 && (
        <p>Matched: {result.matchedKeywords.join(", ")}.</p>
      )}
      <p>
        These heuristics can miss context. A high score doesn’t predict
        interviews; use only details that are true.
      </p>
    </details>
  );
}
