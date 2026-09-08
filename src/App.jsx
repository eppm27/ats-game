import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import ResumeInput from "./components/ResumeInput.jsx";
import RoleSelector from "./components/RoleSelector.jsx";
import ScoreCard from "./components/ScoreCard.jsx";
import RecruiterReaction from "./components/RecruiterReaction.jsx";
import FeedbackList from "./components/FeedbackList.jsx";
import ScoreBreakdown from "./components/ScoreBreakdown.jsx";
import ShareButton from "./components/ShareButton.jsx";
import { scoreResume } from "./utils/scoreResume.js";
import "./index.css";

export default function App() {
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("Software Engineer Intern");
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);
  const resultRef = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);
  function scan(event) {
    event.preventDefault();
    if (resume.trim()) setResult({ ...scoreResume(resume, role), role });
  }
  function edit() {
    setResult(null);
    requestAnimationFrame(() => inputRef.current?.focus());
  }
  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell">
        <header className="masthead">
          <a
            href="#main"
            className="wordmark"
            aria-label="ATS Game, skip to tool"
          >
            <span className="brand-mark" aria-hidden="true">
              ↗
            </span>{" "}
            ATS<span className="brand-light">GAME</span>
          </a>
          <span className="header-note">
            <span aria-hidden="true">●</span> A RESUME FEEDBACK GAME
          </span>
        </header>
        <main id="main">
          <div className="intro">
            <div>
              <p className="eyebrow">
                {result
                  ? "THE RESULTS ARE IN"
                  : "LESS GUESSING. BETTER BULLETS."}
              </p>
              <h1>
                {result ? (
                  <>
                    Good draft.
                    <br />
                    <span>Next level?</span>
                  </>
                ) : (
                  <>
                    Your resume.
                    <br />
                    <span>Put it to the test.</span>
                  </>
                )}
              </h1>
            </div>
            <div className="intro-note">
              <span className="tiny-arrow" aria-hidden="true">
                ↙
              </span>
              <p>
                {result ? "A score to build on." : "Pick a role. Paste. Play."}
              </p>
              <span>Rule-based. Not a real ATS.</span>
            </div>
          </div>
          {!result ? (
            <form onSubmit={scan} className="tool-panel">
              <div className="panel-bar">
                <span>RESUME CHECK</span>
                <span>
                  READY WHEN YOU ARE <span aria-hidden="true">●</span>
                </span>
              </div>
              <div className="tool-body">
                <RoleSelector selectedRole={role} onChange={setRole} />
                <ResumeInput
                  value={resume}
                  onChange={setResume}
                  inputRef={inputRef}
                />
                <div className="scan-footer">
                  <p>
                    <span aria-hidden="true">⌁</span> Your resume stays in your
                    browser.
                  </p>
                  <button className="primary-button" disabled={!resume.trim()}>
                    SCAN RESUME <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <motion.section
              ref={resultRef}
              tabIndex={-1}
              aria-label={`Resume result: ${result.score} out of 100 for ${result.role}`}
              className="results-panel"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="result-grid">
                <ScoreCard score={result.score} role={result.role} />
                <div className="result-feedback">
                  <RecruiterReaction score={result.score} />
                  <FeedbackList feedback={result.feedback} />
                </div>
              </div>
              <div className="result-actions">
                <button className="primary-button" onClick={edit}>
                  EDIT & TRY AGAIN <span aria-hidden="true">↗</span>
                </button>
                <ShareButton score={result.score} role={result.role} />
              </div>
              <ScoreBreakdown result={result} />
            </motion.section>
          )}
        </main>
        <footer className="site-footer">
          <span>Rule-based feedback. Not a real ATS.</span>
          <span>LOCAL ONLY · NO UPLOADS · NO AI</span>
        </footer>
      </div>
    </MotionConfig>
  );
}
