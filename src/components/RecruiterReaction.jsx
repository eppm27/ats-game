import { motion } from 'framer-motion';
import { getReaction } from '../utils/reactions';

export default function RecruiterReaction({ score }) {
  const reaction = getReaction(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`relative mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] p-6 text-center shadow-[0_20px_70px_rgba(126,76,142,0.12)] ring-1 ring-white/70 backdrop-blur-xl sm:p-8 ${
        score >= 80 ? 'bg-[#e8fbef]/72' : score >= 60 ? 'bg-[#fff0d6]/72' : 'bg-[#ffe1e8]/72'
      }`}
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className={`mb-4 inline-block h-3 w-3 rounded-full ${
            score >= 80 ? 'bg-[#36b37e]' : score >= 60 ? 'bg-[#e79a32]' : 'bg-[#df5f78]'
          }`}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl font-black leading-snug tracking-[-0.02em] text-[#33243f]"
        >
          {reaction.text}
        </motion.p>

        {reaction.subtext && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-3 max-w-xl text-base leading-7 text-[#6f6078]"
          >
            {reaction.subtext}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
