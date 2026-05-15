import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeInput from './components/ResumeInput';
import RoleSelector from './components/RoleSelector';
import ScoreCard from './components/ScoreCard';
import RecruiterReaction from './components/RecruiterReaction';
import FeedbackList from './components/FeedbackList';
import AnimatedBackground from './components/AnimatedBackground';
import { scoreResume } from './utils/scoreResume';
import './index.css';

export default function App() {
  const [resume, setResume] = useState('');
  const [selectedRole, setSelectedRole] = useState('Software Engineer Intern');
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadingMessages = [
    '🔍 Scanning keywords…',
    '👀 Summoning ATS demons…',
    '🤖 Recruiter judging in progress…',
    '💭 Analyzing bullet points…',
    '⚡ Running through the matrix…'
  ];

  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const handleScan = () => {
    setIsLoading(true);
    setLoadingMessageIndex(0);

    const messageInterval = setInterval(() => {
      setLoadingMessageIndex((i) => (i + 1) % loadingMessages.length);
    }, 500);

    setTimeout(() => {
      clearInterval(messageInterval);
      const { score: calculatedScore, feedback: generatedFeedback } = scoreResume(resume, selectedRole);
      setScore(calculatedScore);
      setFeedback(generatedFeedback);
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setResume('');
    setScore(null);
    setFeedback([]);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Hero Section - Completely Redesigned */}
        {score === null && (
          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen pt-20 pb-20 flex flex-col items-center justify-center relative overflow-hidden"
          >
            {/* Decorative rotating borders */}
            <motion.div
              className="absolute top-20 left-10 w-40 h-40 rounded-full border border-blue-500/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute bottom-32 right-20 w-56 h-56 rounded-full border border-purple-500/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
              {/* Main title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <h1 className="text-7xl sm:text-8xl font-black mb-6 leading-tight" style={{
                  background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 6s ease infinite',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Can You Pass<br />the ATS?
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl font-light text-slate-300 mb-4 leading-relaxed"
              >
                The emotionally dramatic ATS simulator
              </motion.p>

              {/* Disclaimer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-sm text-slate-400 italic mb-16"
              >
                Where your resume's fate is decided by increasingly absurd rules
              </motion.p>

              {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="glass rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto border border-slate-700/50"
              >
                <ResumeInput value={resume} onChange={setResume} />
                <RoleSelector selectedRole={selectedRole} onChange={setSelectedRole} />

                {/* Scan Button */}
                <motion.button
                  onClick={handleScan}
                  disabled={!resume.trim() || isLoading}
                  whileHover={{ scale: !isLoading && resume.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: !isLoading && resume.trim() ? 0.98 : 1 }}
                  className={`w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all transform relative group overflow-hidden ${
                    isLoading || !resume.trim()
                      ? 'bg-slate-700/30 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-500/50 hover:from-blue-500 hover:to-purple-500'
                  }`}
                >
                  {/* Glow effect on hover */}
                  {!isLoading && resume.trim() && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-purple-400/50 blur-xl group-hover:opacity-100 opacity-0 transition-opacity -z-10" />
                  )}
                  
                  <motion.div
                    className="flex items-center justify-center gap-3"
                    key={isLoading ? loadingMessages[loadingMessageIndex] : 'scan'}
                  >
                    <motion.span
                      initial={{ rotate: 0 }}
                      animate={{ rotate: isLoading ? 360 : 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="inline-block text-xl"
                    >
                      {isLoading ? '⚙️' : '🚀'}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-semibold"
                    >
                      {isLoading ? loadingMessages[loadingMessageIndex] : 'Scan My Resume'}
                    </motion.span>
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </motion.header>
        )}

        {/* Results Phase */}
        <AnimatePresence mode="wait">
          {score !== null && (
            <motion.main
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="min-h-screen py-12 sm:py-20"
            >
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Score Section - CENTERPIECE */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.7, type: 'spring' }}
                  className="mb-12"
                >
                  <ScoreCard score={score} />
                </motion.div>

                {/* Recruiter Reaction */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mb-12"
                >
                  <RecruiterReaction score={score} />
                </motion.div>

                {/* Feedback Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="glass rounded-3xl p-8 sm:p-10 border border-slate-700/50 mb-12"
                >
                  <FeedbackList feedback={feedback} />
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex gap-4 flex-col sm:flex-row"
                >
                  <motion.button
                    onClick={handleReset}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 glass rounded-2xl py-4 px-6 font-bold transition-all border border-slate-600/50 hover:border-slate-500 hover:bg-slate-800/40 text-slate-100"
                  >
                    🔄 Try Again
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      const text = `Check out my ATS score: ${score}/100 on "Can You Pass the ATS?" 🎮`;
                      navigator.clipboard.writeText(text);
                      alert('✨ Copied to clipboard! Ready to share!');
                    }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl py-4 px-6 font-bold transition-all hover:shadow-2xl hover:shadow-cyan-500/50 hover:from-cyan-500 hover:to-blue-500"
                  >
                    📤 Share Score
                  </motion.button>
                </motion.div>
              </div>
            </motion.main>
          )}
        </AnimatePresence>

        {/* Footer */}
        {score === null && (
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="fixed bottom-0 left-0 right-0 py-6 text-center border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-sm"
          >
            <p className="text-slate-400 text-sm">
              Made with ❤️ for students and job seekers
            </p>
            <p className="text-slate-500 text-xs mt-1">
              No AI, purely rule-based scoring | Phase 2 ✨
            </p>
          </motion.footer>
        )}
      </div>
    </div>
  );
}
