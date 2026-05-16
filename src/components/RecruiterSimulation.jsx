import { motion } from 'framer-motion';

export default function RecruiterSimulation({ score }) {
  const getSimulation = (s) => {
    if (s >= 85) {
      return {
        timeSpent: '3m 47s',
        timeLabel: 'Deep dive reading',
        attention: 'high',
        attentionColor: 'text-[#16835c]',
        chance: 'promising',
        chanceColor: 'bg-[#e8fbef]/72',
        mood: 'impressed',
        details: ['Clicked LinkedIn link', 'Read all bullet points', 'Opened portfolio link']
      };
    } else if (s >= 70) {
      return {
        timeSpent: '1m 23s',
        timeLabel: 'Moderate engagement',
        attention: 'medium',
        attentionColor: 'text-[#a46516]',
        chance: 'maybe',
        chanceColor: 'bg-[#fff0d6]/72',
        mood: 'curious',
        details: ['Skimmed most sections', 'Checked dates', 'Paused on skills']
      };
    }
    return {
      timeSpent: s >= 50 ? '28s' : '11s',
      timeLabel: s >= 50 ? 'Brief scan' : 'Immediate skim spiral',
      attention: 'low',
      attentionColor: 'text-[#b43d59]',
      chance: s >= 50 ? 'unlikely' : 'very unlikely',
      chanceColor: 'bg-[#ffe1e8]/72',
      mood: s >= 50 ? 'confused' : 'quietly panicking',
      details: ['Scrolled past contact info', 'Skipped most bullets', 'No portfolio click']
    };
  };

  const sim = getSimulation(score);

  const metricVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.1, duration: 0.4 }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className={`mx-auto w-full max-w-4xl rounded-[2rem] p-5 shadow-[0_20px_70px_rgba(126,76,142,0.12)] ring-1 ring-white/70 backdrop-blur-xl sm:p-8 ${sim.chanceColor}`}
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/70 shadow-sm">
          <span className="h-3 w-3 rounded-full bg-[#4f2cff]" />
        </div>
        <div className="flex-1">
          <p className="mb-1 text-sm font-black uppercase tracking-[0.2em] text-[#89679e]">
            Recruiter Simulation
          </p>
          <p className="text-2xl font-black capitalize tracking-[-0.02em] text-[#33243f]">
            {sim.mood.charAt(0).toUpperCase() + sim.mood.slice(1)}
          </p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <motion.div
          custom={0}
          variants={metricVariants}
          initial="hidden"
          animate="visible"
          className="rounded-3xl bg-white/55 p-5 shadow-sm ring-1 ring-white/80"
        >
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#927899]">Time Spent Reading</p>
          <p className="mb-1 text-3xl font-black tracking-[-0.04em] text-[#33243f]">{sim.timeSpent}</p>
          <p className="text-sm text-[#766378]">{sim.timeLabel}</p>
        </motion.div>

        <motion.div
          custom={1}
          variants={metricVariants}
          initial="hidden"
          animate="visible"
          className="rounded-3xl bg-white/55 p-5 shadow-sm ring-1 ring-white/80"
        >
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#927899]">Attention Level</p>
          <div className="flex items-baseline gap-2">
            <p className={`text-2xl font-black ${sim.attentionColor}`}>
              {sim.attention.toUpperCase()}
            </p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#ead7e4]">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: sim.attention === 'high' ? '100%' : sim.attention === 'medium' ? '55%' : '20%'
              }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`h-full ${
                sim.attention === 'high'
                  ? 'bg-[#36b37e]'
                  : sim.attention === 'medium'
                  ? 'bg-[#e79a32]'
                  : 'bg-[#df5f78]'
              }`}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        custom={2}
        variants={metricVariants}
        initial="hidden"
        animate="visible"
        className="mb-4 rounded-3xl bg-white/55 p-5 shadow-sm ring-1 ring-white/80"
      >
        <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#927899]">Interview Chance</p>
        <p className="text-lg font-black capitalize text-[#33243f]">{sim.chance}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="rounded-3xl bg-white/45 p-5 shadow-sm ring-1 ring-white/70"
      >
        <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#927899]">Recruiter Behavior</p>
        <ul className="space-y-2">
          {sim.details.map((detail, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
              className="flex items-center gap-2 text-sm text-[#5f5068]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#4f2cff]" />
              {detail}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
