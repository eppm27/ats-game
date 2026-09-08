import { countWords } from "../utils/scoringRules.js";
export default function ResumeInput({ value, onChange, inputRef }) {
  return (
    <section className="resume-input">
      <div className="input-heading">
        <label htmlFor="resume" className="step-label">
          <span>02</span> PASTE YOUR RESUME
        </label>
        <button
          type="button"
          className="text-button"
          disabled={!value}
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
        >
          Clear
        </button>
      </div>
      <div className="paper-input">
        <textarea
          ref={inputRef}
          id="resume"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Paste your resume here..."
          spellCheck="false"
          aria-describedby="input-note"
        />
        <div className="input-bottom">
          <span id="input-note">PLAIN TEXT. REAL ACHIEVEMENTS.</span>
          <span>{countWords(value).toLocaleString()} words</span>
        </div>
      </div>
    </section>
  );
}
