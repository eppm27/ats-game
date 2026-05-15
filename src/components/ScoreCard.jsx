import { motion } from 'framer-motion';

export default function ScoreCard({ score }) {
  const getScoreColor = (s) => {
    if (s >= 80) return 'from-green-400 to-emerald-600';
    if (s >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-rose-600';
  };

  const getScoreLabel = (s) => {
    if (s >= 80) return '🎉 Excellent!';
    if (s >= 60) return '👍 Good';
    return '❌ Needs Work';
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className={`bg-gradient-to-br ${getScoreColor(score)} rounded-2xl p-8 text-white shadow-2xl text-center`}
    >
      <h2 className="text-lg font-semibold mb-2 opacity-90">ATS Score</h2>
      
      {/* Animated score number */}
      <motion.div
        initial={{ count: 0 }}
        animate={{ count: score }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="text-7xl font-bold mb-4"
      >
        <motion.span
          key={score}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {score}
        </motion.span>
        <span className="text-4xl">/100</span>
      </motion.div>

      {/* Score meter bar */}
      <div className="w-full bg-white/30 rounded-full h-3 mb-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full bg-white rounded-full"
        />
      </div>

      <p className="text-2xl font-bold">{getScoreLabel(score)}</p>
    </motion.div>
  );
}
