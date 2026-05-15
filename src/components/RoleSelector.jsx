import { motion } from 'framer-motion';

export default function RoleSelector({ selectedRole, onChange }) {
  const roles = [
    { name: 'Software Engineer Intern', emoji: '💻' },
    { name: 'Data Analyst Intern', emoji: '📊' },
    { name: 'Product / Tech Consultant', emoji: '🧠' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <label className="block text-lg font-bold text-slate-100 mb-4">
        🎯 What role are you applying for?
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {roles.map((role) => {
          const isSelected = selectedRole === role.name;
          return (
            <motion.button
              key={role.name}
              onClick={() => onChange(role.name)}
              variants={itemVariants}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden p-5 rounded-2xl font-semibold transition-all duration-300 group ${
                isSelected
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/40 border border-blue-400/50 glow-pulse'
                  : 'glass text-slate-100 hover:text-white hover:bg-slate-800/40 border border-slate-700/50 hover:border-slate-600/50'
              }`}
            >
              {/* Hover glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
              
              <div className="relative">
                <div className="text-4xl mb-2">{role.emoji}</div>
                <div className="text-sm leading-snug">{role.name}</div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
