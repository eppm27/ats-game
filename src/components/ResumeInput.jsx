import { motion } from 'framer-motion';

export default function ResumeInput({ value, onChange }) {
  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label className="mb-3 block text-sm font-black uppercase tracking-[0.2em] text-[#8a5c9e]">
        Paste your resume
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ctrl+V the resume. Bullet points, contact info, dates, skills, the tiny evidence crumbs."
        className="min-h-[220px] w-full resize-y rounded-3xl bg-[#fffaf5]/90 p-6 text-base leading-7 text-[#352a40] shadow-inner shadow-[#e6cbd8]/35 ring-1 ring-[#ead7e4] transition placeholder:text-[#a693a1] focus:outline-none focus:ring-4 focus:ring-[#bca3ff]/35 sm:min-h-[280px]"
      />
      
      <motion.div
        className="flex flex-col gap-2 text-sm leading-6 text-[#766378] sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="max-w-2xl">Tiny tip: dates, specific skills, and numbers make the machine less dramatic.</p>
        <p className="shrink-0 rounded-full bg-white/65 px-3 py-1 text-xs font-bold text-[#7b667d] shadow-sm ring-1 ring-white/70">
          {charCount.toLocaleString()} chars · {wordCount.toLocaleString()} words
        </p>
      </motion.div>
    </motion.div>
  );
}
