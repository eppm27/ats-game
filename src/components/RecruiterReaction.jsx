import { motion } from 'framer-motion';

export default function RecruiterReaction({ score }) {
  const getReaction = (s) => {
    if (s >= 90) return {
      emoji: '🤩',
      text: "WOW! I'm calling HR right now. You're hired!",
      color: 'bg-green-100 border-green-400'
    };
    if (s >= 80) return {
      emoji: '😍',
      text: "Stellar resume! Let's schedule an interview ASAP.",
      color: 'bg-green-100 border-green-400'
    };
    if (s >= 70) return {
      emoji: '😊',
      text: "Nice work! Your resume passed our ATS. We'll review it soon.",
      color: 'bg-blue-100 border-blue-400'
    };
    if (s >= 60) return {
      emoji: '🤔',
      text: "It's... okay? Could be better. Maybe reformat and add more details?",
      color: 'bg-yellow-100 border-yellow-400'
    };
    if (s >= 40) return {
      emoji: '😕',
      text: "This resume has some issues. Work on the formatting and keyword matching.",
      color: 'bg-orange-100 border-orange-400'
    };
    return {
      emoji: '😬',
      text: "Yikes. This resume won't pass most ATS systems. Major overhaul needed!",
      color: 'bg-red-100 border-red-400'
    };
  };

  const reaction = getReaction(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`${reaction.color} border-2 rounded-xl p-6 text-center`}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
        className="text-5xl mb-3"
      >
        {reaction.emoji}
      </motion.div>
      <p className="text-lg font-semibold text-gray-800">{reaction.text}</p>
    </motion.div>
  );
}
