import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { getReaction } from "../utils/reactions.js";
export default function ScoreCard({ score, role }) {
  const reduced = useReducedMotion();
  const count = useMotionValue(reduced ? score : 0);
  const rounded = useTransform(count, (value) => Math.round(value));
  useEffect(() => {
    const control = animate(count, score, {
      duration: reduced ? 0 : 0.6,
      ease: "easeOut",
    });
    return () => control.stop();
  }, [count, score, reduced]);
  return (
    <div className="score-ticket">
      <div className="ticket-top">
        <span>YOUR SCORE</span>
        <span aria-hidden="true">↗</span>
      </div>
      <div className="score-number" aria-label={`${score} out of 100`}>
        <motion.span aria-hidden="true">{rounded}</motion.span>
        <span aria-hidden="true" className="score-denominator">
          /100
        </span>
      </div>
      <div className="score-track" aria-hidden="true">
        <motion.div
          initial={{ width: reduced ? `${score}%` : 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: reduced ? 0 : 0.6 }}
        />
      </div>
      <strong className="score-stamp">{getReaction(score).label}</strong>
      <div className="ticket-bottom">
        <span>{role}</span>
        <span>RULE-BASED SCORE</span>
      </div>
    </div>
  );
}
