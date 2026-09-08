import { getReaction } from "../utils/reactions.js";
export default function RecruiterReaction({ score }) {
  return (
    <div className="reaction">
      <span className="eyebrow">THE IMAGINARY RECRUITER</span>
      <p>{getReaction(score).text}</p>
    </div>
  );
}
