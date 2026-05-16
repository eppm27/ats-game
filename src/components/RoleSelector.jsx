import { motion } from 'framer-motion';

export default function RoleSelector({ selectedRole, onChange }) {
  const roles = [
    {
      name: 'Software Engineer Intern',
      kicker: 'Build things',
      detail: 'Projects, systems, APIs, debugging receipts.',
      accent: 'from-[#c7b9ff] to-[#f6c5dd]'
    },
    {
      name: 'Data Analyst Intern',
      kicker: 'Find patterns',
      detail: 'SQL, dashboards, metrics, suspiciously tidy charts.',
      accent: 'from-[#bcebd7] to-[#ffd6a8]'
    },
    {
      name: 'Product / Tech Consultant',
      kicker: 'Explain chaos',
      detail: 'Stakeholders, strategy, research, crisp storytelling.',
      accent: 'from-[#ffc4d6] to-[#d8b4fe]'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <label className="mb-3 block text-sm font-black uppercase tracking-[0.2em] text-[#8a5c9e]">
        Pick the internship flavor
      </label>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {roles.map((role) => {
          const isSelected = selectedRole === role.name;
          return (
            <motion.button
              key={role.name}
              onClick={() => onChange(role.name)}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative min-h-[156px] w-full overflow-hidden rounded-3xl p-5 text-left transition-all duration-300 ${
                isSelected
                  ? 'bg-white text-[#33243f] shadow-[0_18px_45px_rgba(126,76,142,0.18)] ring-2 ring-[#4f2cff]'
                  : 'bg-white/50 text-[#55475e] shadow-sm ring-1 ring-white/80 hover:bg-white/75 hover:shadow-[0_14px_35px_rgba(126,76,142,0.13)]'
              }`}
            >
              <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${role.accent}`} />
              <span className="relative z-10 block">
                <span className="mb-5 flex items-start justify-between gap-3">
                  <span className="min-w-0 rounded-full bg-[#f5ecff] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#7a4e93]">
                    {role.kicker}
                  </span>
                  <span className={`h-4 w-4 rounded-full border-2 transition ${
                    isSelected ? 'border-[#4f2cff] bg-[#4f2cff] shadow-[inset_0_0_0_3px_white]' : 'border-[#cdb7d4] bg-white/70'
                  }`} />
                </span>
                <span className="block text-base font-black leading-tight">{role.name}</span>
                <span className="mt-2 block text-sm leading-5 text-[#766378]">{role.detail}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm leading-6 text-[#766378]"
      >
        Choose your destiny. The ATS will be weirdly specific about it.
      </motion.p>
    </motion.div>
  );
}
