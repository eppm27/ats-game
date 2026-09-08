import { motion, useReducedMotion } from "framer-motion";
export default function FeedbackList({ feedback }) {
  const reduced = useReducedMotion();
  return (
    <div className="feedback-groups">
      {["fix", "good"].map((type) => {
        const items = feedback.filter((item) => item.type === type);
        if (!items.length) return null;
        return (
          <section key={type}>
            <h2 className="eyebrow">
              {type === "fix" ? "NEXT MOVES" : "KEEP THESE"}
            </h2>
            <ul>
              {items.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={reduced ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: reduced ? 0 : index * 0.035,
                  }}
                >
                  <span className={`feedback-icon ${type}`} aria-hidden="true">
                    {type === "fix" ? "↗" : "✓"}
                  </span>
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
