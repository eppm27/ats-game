import { motion } from 'framer-motion';

export default function FeedbackList({ feedback }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, y: 10 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const isPositive = (text) => text.startsWith('✅');
  const isWarning = (text) => text.startsWith('⚠️');
  const isError = (text) => text.startsWith('❌');

  const getCardColor = (text) => {
    if (isPositive(text)) return 'from-emerald-950/40 via-emerald-900/20 to-emerald-950/30 border-emerald-600/30';
    if (isError(text)) return 'from-red-950/40 via-red-900/20 to-red-950/30 border-red-600/30';
    if (isWarning(text)) return 'from-orange-950/40 via-orange-900/20 to-orange-950/30 border-orange-600/30';
    return 'from-blue-950/40 via-blue-900/20 to-blue-950/30 border-blue-600/30';
  };

  const getAccentColor = (text) => {
    if (isPositive(text)) return 'border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-500/10';
    if (isError(text)) return 'border-l-4 border-l-red-500 bg-gradient-to-r from-red-500/10';
    if (isWarning(text)) return 'border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-500/10';
    return 'border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-500/10';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="font-bold text-2xl text-slate-100 mb-6"
      >
        📊 Detailed Feedback
      </motion.h3>

      {feedback.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ x: 8 }}
          className={`bg-gradient-to-r ${getCardColor(item)} ${getAccentColor(item)} rounded-xl p-4 backdrop-blur-sm transition-all hover:shadow-lg border`}
        >
          <p className="text-slate-200 font-medium leading-relaxed">{item}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
