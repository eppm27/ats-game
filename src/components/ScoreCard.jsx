import { motion } from 'framer-motion';

export default function ScoreCard({ score }) {
  const getScoreColor = (s) => {
    if (s >= 80) return { gradient: 'from-emerald-500 via-green-500 to-cyan-600', glow: 'glow-pulse-green', shadow: 'shadow-green-500/50' };
    if (s >= 60) return { gradient: 'from-amber-500 via-orange-500 to-rose-600', glow: 'glow-pulse-orange', shadow: 'shadow-orange-500/50' };
    return { gradient: 'from-rose-500 via-red-500 to-pink-600', glow: 'glow-pulse-red', shadow: 'shadow-red-500/50' };
  };

  const getScoreLabel = (s) => {
    if (s >= 90) return '🎉 LEGENDARY!';
    if (s >= 80) return '🌟 Excellent!';
    if (s >= 70) return '👍 Good';
    if (s >= 60) return '🤔 Decent';
    if (s >= 40) return '⚠️ Needs Work';
    return '❌ Yikes...';
  };

  const colors = getScoreColor(score);
  const circumference = 2 * Math.PI * 50;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, rotateX: -90 }}
      animate={{ scale: 1, opacity: 1, rotateX: 0 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 60 }}
      className={`bg-gradient-to-br ${colors.gradient} rounded-3xl p-12 text-white shadow-2xl text-center relative overflow-hidden`}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 shimmer opacity-20 pointer-events-none" />

      {/* Glow pulse */}
      <div className={`absolute inset-0 ${colors.glow} opacity-40 pointer-events-none`} />

      <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-xl font-semibold mb-6 opacity-90 uppercase tracking-widest"
        >
          ATS Score
        </motion.p>

        {/* Animated Circular Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-48 h-48">
            <svg width="200" height="200" className="transform -rotate-90 drop-shadow-lg">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="50"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="10"
                fill="none"
              />
              {/* Animated progress circle */}
              <motion.circle
                cx="100"
                cy="100"
                r="50"
                stroke="rgba(255, 255, 255, 1)"
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
                strokeLinecap="round"
                filter="drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))"
              />
            </svg>
            
            {/* Score text in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4, type: 'spring' }}
                className="text-center score-pop"
              >
                <motion.span
                  key={score}
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="text-7xl font-black block leading-none"
                  style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.4)' }}
                >
                  {score}
                </motion.span>
                <span className="text-3xl font-bold text-white/90">/100</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Score Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-4xl font-bold mb-4"
        >
          {getScoreLabel(score)}
        </motion.p>

        {/* Context Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-base opacity-95 font-light"
        >
          {score >= 80
            ? "You've cracked the ATS code. Recruiters will see you! 🚀"
            : score >= 60
            ? "Getting closer. A few tweaks and you'll breeze through. 💪"
            : "Major overhaul time, but you've got this! 🔥"}
        </motion.p>
      </div>
    </motion.div>
  );
}
