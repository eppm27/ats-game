import { motion } from 'framer-motion';

export default function FeedbackList({ feedback }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const isPositive = (text) => text.startsWith('✅');
  const isWarning = (text) => text.startsWith('⚠️');
  const isError = (text) => text.startsWith('❌');
  const cleanFeedbackText = (text) => {
    if (isPositive(text)) return text.slice('✅'.length).trim();
    if (isWarning(text)) return text.slice('⚠️'.length).trim();
    if (isError(text)) return text.slice('❌'.length).trim();
    return text;
  };

  const getSeverityStyle = (text) => {
    if (isPositive(text)) return {
      bg: 'bg-[#e8fbef]',
      indicator: '✓',
      label: 'text-[#16835c]'
    };
    if (isError(text)) return {
      bg: 'bg-[#ffe1e8]',
      indicator: '✕',
      label: 'text-[#b43d59]'
    };
    if (isWarning(text)) return {
      bg: 'bg-[#fff0d6]',
      indicator: '!',
      label: 'text-[#a46516]'
    };
    return {
      bg: 'bg-[#eef1ff]',
      indicator: 'ℹ',
      label: 'text-[#4f2cff]'
    };
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-[#89679e]"
      >
        Detailed Feedback
      </motion.h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {feedback.map((item, index) => {
          const style = getSeverityStyle(item);
          const cleanText = cleanFeedbackText(item);
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`group flex min-h-28 items-start gap-3 rounded-3xl p-5 shadow-sm ring-1 ring-white/80 transition-all ${style.bg}`}
            >
              <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/72 text-xs font-black ${style.label}`}>
                {style.indicator}
              </div>
              <p className="flex-1 text-sm leading-6 text-[#5f5068]">
                {cleanText}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
