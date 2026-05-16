import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeInput from './components/ResumeInput';
import RoleSelector from './components/RoleSelector';
import ScoreCard from './components/ScoreCard';
import RecruiterReaction from './components/RecruiterReaction';
import RecruiterSimulation from './components/RecruiterSimulation';
import EyeTrackingAnalysis from './components/EyeTrackingAnalysis';
import MultiplayerRoastMode from './components/MultiplayerRoastMode';
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
    'The ATS is warming up.',
    'Recruiter attention span detected.',
    'Checking keyword alignment.',
    'Judging the evidence density.',
    'Calculating internship survival odds.'
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
    <div className="relative min-h-screen overflow-hidden bg-[#fff6ee] text-[#32283f]">
      <AnimatedBackground />

      <div className="relative z-10">
        {score === null && (
          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen px-4 py-8 sm:px-6 lg:px-8"
          >
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mx-auto max-w-4xl text-center"
              >
                <div className="mb-5 inline-flex rounded-full bg-white/55 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#7d5c98] shadow-sm ring-1 ring-[#d9b8e8]/50 backdrop-blur">
                  Internship anxiety simulator
                </div>
                <h1 className="text-5xl font-black leading-[0.92] tracking-[-0.04em] text-[#33243f] sm:text-7xl lg:text-8xl">
                  Will your resume survive?
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6078] sm:text-xl">
                  Paste your resume, pick an internship lane, and let the tiny gatekeeping machine decide if your bullet points have emotional range.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mx-auto w-full max-w-5xl rounded-[2rem] bg-white/62 p-5 shadow-[0_30px_90px_rgba(126,76,142,0.18)] ring-1 ring-white/70 backdrop-blur-xl sm:p-8 lg:p-10"
              >
                <div className="space-y-6">
                  <ResumeInput value={resume} onChange={setResume} />
                  <RoleSelector selectedRole={selectedRole} onChange={setSelectedRole} />

                  <div className="flex justify-center pt-1">
                    <motion.button
                      onClick={handleScan}
                      disabled={!resume.trim() || isLoading}
                      whileHover={{ y: !isLoading && resume.trim() ? -2 : 0, scale: !isLoading && resume.trim() ? 1.01 : 1 }}
                      whileTap={{ scale: !isLoading && resume.trim() ? 0.98 : 1 }}
                      className={`group relative w-full max-w-md overflow-hidden rounded-3xl px-8 py-5 text-base font-black transition-all duration-300 sm:w-auto sm:min-w-72 ${
                        isLoading || !resume.trim()
                          ? 'cursor-not-allowed bg-[#d8cadf]/55 text-[#8b7a95]'
                          : 'bg-[#4f2cff] text-white shadow-[0_18px_45px_rgba(79,44,255,0.28)] hover:bg-[#3f20df]'
                      }`}
                    >
                      {!isLoading && resume.trim() && (
                        <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
                      )}
                      <motion.span
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10"
                      >
                        {isLoading ? loadingMessages[loadingMessageIndex] : 'Start ATS Scan'}
                      </motion.span>
                    </motion.button>
                  </div>
                </div>
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
              className="min-h-screen px-4 py-10 sm:px-6 sm:py-16 lg:px-8"
            >
              <div className="mx-auto max-w-5xl space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#89679e]">Scan complete</p>
                  <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#33243f] sm:text-6xl">
                    The verdict is emotionally complicated.
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.7, type: 'spring' }}
                  className=""
                >
                  <ScoreCard score={score} />
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className=""
                >
                  <RecruiterReaction score={score} />
                </motion.div>

                <RecruiterSimulation score={score} />

                <EyeTrackingAnalysis feedback={feedback} />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mx-auto w-full max-w-4xl rounded-[2rem] bg-white/68 p-5 shadow-[0_20px_70px_rgba(126,76,142,0.14)] ring-1 ring-white/70 backdrop-blur-xl sm:p-8"
                >
                  <FeedbackList feedback={feedback} />
                </motion.div>

                <MultiplayerRoastMode />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex flex-col gap-3 sm:flex-row sm:justify-center"
                >
                  <motion.button
                    onClick={handleReset}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-2xl bg-white/65 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#62436f] shadow-sm ring-1 ring-[#d9b8e8]/60 transition-all hover:bg-white/85 sm:w-auto sm:min-w-52"
                  >
                    Analyze Again
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      const text = `I scored ${score}/100 on the ATS Resume Game. Interview probability: emotionally complicated.`;
                      navigator.clipboard.writeText(text);
                      alert('Copied to clipboard! Share your score!');
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-2xl bg-[#4f2cff] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_45px_rgba(79,44,255,0.24)] transition-all hover:bg-[#3f20df] sm:w-auto sm:min-w-52"
                  >
                    Copy Share Text
                  </motion.button>
                </motion.div>
              </div>
            </motion.main>
          )}
        </AnimatePresence>

        {score === null && (
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="pointer-events-none px-4 pb-6 text-center"
          >
            <p className="text-xs font-medium text-[#8c7a91]">
              This is a game. Your resume is probably fine. Probably.
            </p>
          </motion.footer>
        )}
      </div>
    </div>
  );
}
