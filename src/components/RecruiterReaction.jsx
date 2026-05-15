import { motion } from 'framer-motion';
import { getReaction } from '../utils/reactions';

export default function RecruiterReaction({ score }) {
  const reaction = getReaction(score);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, rotateY: -90 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.7, delay: 0.3, type: 'spring' }}
      className={`bg-gradient-to-br ${reaction.color} rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl ${score >= 80 ? 'glow-pulse' : ''}`}
      style={{ perspective: '1000px' }}
    >
      {/* Shimmer effect overlay */}
      {score >= 80 && (
        <div className="absolute inset-0 shimmer opacity-20 pointer-events-none" />
      )}

      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10">
        {/* Animated emoji */}
        <motion.div
          animate={{ 
            scale: [1, 1.4, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2.5 }}
          className="text-7xl mb-5 inline-block"
        >
          {reaction.emoji}
        </motion.div>

        {/* Reaction text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={`text-3xl font-bold ${reaction.textColor} leading-snug`}
        >
          {reaction.text}
        </motion.p>
      </div>
    </motion.div>
  );
}
