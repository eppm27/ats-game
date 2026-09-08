import { useState } from "react";
export default function ShareButton({ score, role }) {
  const [status, setStatus] = useState("");
  const text = `I scored ${score}/100 on ATS Game for ${role}. A rule-based resume game, not a real ATS.`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied!");
    } catch {
      setStatus("Copy unavailable — select the text below.");
    }
  }
  return (
    <div className="share-control">
      <button type="button" className="secondary-button" onClick={copy}>
        Copy score <span aria-hidden="true">↗</span>
      </button>
      <span className="copy-status" role="status">
        {status}
      </span>
      {status.startsWith("Copy unavailable") && (
        <textarea
          aria-label="Score to copy"
          readOnly
          value={text}
          onFocus={(event) => event.target.select()}
        />
      )}
    </div>
  );
}
