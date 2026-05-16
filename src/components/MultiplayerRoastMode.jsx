import { motion } from 'framer-motion';

export default function MultiplayerRoastMode() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f5ecff]/80 via-white/60 to-[#ffe1e8]/78 p-5 shadow-[0_20px_70px_rgba(126,76,142,0.12)] ring-1 ring-white/70 backdrop-blur-xl sm:p-8"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f7a8c5] via-[#bca3ff] to-[#4f2cff]" />

      <div className="relative z-10">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/75 shadow-sm"
          >
            <span className="text-lg">✦</span>
          </motion.div>
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h3 className="text-2xl font-black tracking-[-0.02em] text-[#33243f]">Multiplayer Roast Mode</h3>
              <span className="inline-block rounded-full bg-[#4f2cff]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#4f2cff] ring-1 ring-[#4f2cff]/15">
                Coming Soon
              </span>
            </div>
            <p className="text-base leading-7 text-[#6f6078]">
              Compare resumes with friends and let the ATS decide who survives internship season.
            </p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: 'Leaderboard' },
            { label: 'Live Reactions' },
            { label: 'Resume Battles' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              className="flex items-center gap-2 rounded-2xl bg-white/62 p-3 text-sm font-bold text-[#5f5068] shadow-sm ring-1 ring-white/80"
            >
              <span className="h-2 w-2 rounded-full bg-[#4f2cff]" />
              <span>{feature.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          disabled
          whileHover={{ scale: 0.98 }}
          className="w-full cursor-not-allowed rounded-2xl bg-[#d8cadf]/55 px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-[#8b7a95] opacity-80 transition-all"
        >
          Available Soon
        </motion.button>

        <p className="mt-3 text-center text-xs font-medium text-[#8c7a91]">
          The future contains leaderboards and mild emotional damage.
        </p>
      </div>
    </motion.div>
  );
}
