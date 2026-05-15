import { motion } from 'framer-motion';

export default function ResumeInput({ value, onChange }) {
  const charCount = value.length;
  const wordCount = value.trim().split(/\s+/).length;

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label className="block text-lg font-bold text-slate-100 mb-3">
        📋 Paste Your Resume
      </label>
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
        
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your full resume here... We'll scan it for ATS compatibility."
          className="relative w-full h-64 p-6 rounded-2xl focus:outline-none transition resize-none glass-dark text-slate-100 placeholder-slate-400 font-mono text-sm leading-relaxed border border-slate-700/50 hover:border-slate-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
        />

        {/* Character count indicator */}
        <motion.div
          className="absolute bottom-4 right-4 text-xs font-mono text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-right bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-700/30 backdrop-blur-sm">
            <div className="text-slate-200">{charCount} chars</div>
            <div className="text-slate-400">{wordCount} words</div>
          </div>
        </motion.div>
      </div>
      
      <motion.p
        className="text-xs text-slate-400 mt-3 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        💡 <span>Use bullet points, include dates, contact info, and quantified results for better scores!</span>
      </motion.p>
    </motion.div>
  );
}
