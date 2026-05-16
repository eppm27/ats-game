import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function ScoreCard({ score }) {
  const getScoreColor = (s) => {
    if (s >= 80) return { 
      circle: 'stroke-[#36b37e]',
      text: 'text-[#16835c]',
      bg: 'from-[#d8f8e8] to-[#fff9f2]',
      label: 'Keyword alignment looks suspiciously decent.'
    };
    if (s >= 60) return { 
      circle: 'stroke-[#e79a32]',
      text: 'text-[#a46516]',
      bg: 'from-[#ffe6bb] to-[#fff4f6]',
      label: 'Interview probability: emotionally complicated.'
    };
    return { 
      circle: 'stroke-[#df5f78]',
      text: 'text-[#b43d59]',
      bg: 'from-[#ffd5de] to-[#fff4ed]',
      label: 'This bullet point needs evidence.'
    };
  };

  const colors = getScoreColor(score);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  useEffect(() => {
    const controls = animate(count, score, { duration: 1.6, ease: 'easeOut' });
    return controls.stop;
  }, [count, score]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] bg-gradient-to-br ${colors.bg} p-6 shadow-[0_26px_80px_rgba(126,76,142,0.16)] ring-1 ring-white/75 backdrop-blur-xl sm:p-8`}
    >
      <div className="absolute right-0 top-0 h-28 w-56 -translate-y-1/3 translate-x-1/4 rotate-12 rounded-[40%] bg-white/45 blur-2xl" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-center"
        >
          <p className="mb-2 text-sm font-black uppercase tracking-[0.22em] text-[#89679e]">
            ATS Compatibility Score
          </p>
          <p className={`mx-auto max-w-md text-base font-bold ${colors.text}`}>
            {colors.label}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative w-40 h-40">
            <svg width="180" height="180" className="transform -rotate-90">
              <circle
                cx="90"
                cy="90"
                r="45"
                stroke="rgba(126, 76, 142, 0.12)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="90"
                cy="90"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, ease: 'easeOut' }}
                strokeLinecap="round"
                className={colors.circle}
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <motion.span
                  key={score}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`block text-6xl font-black leading-none tracking-[-0.05em] ${colors.text}`}
                >
                  {rounded}
                </motion.span>
                <span className="mt-1 block text-sm font-black text-[#8b7a95]">/100</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-center text-xs font-bold uppercase tracking-[0.22em] text-[#8b7a95]"
        >
          Scan complete
        </motion.div>
      </div>
    </motion.div>
  );
}
