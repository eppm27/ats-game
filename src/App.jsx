import { useState } from 'react';
import { motion } from 'framer-motion';
import ResumeInput from './components/ResumeInput';
import RoleSelector from './components/RoleSelector';
import ScoreCard from './components/ScoreCard';
import RecruiterReaction from './components/RecruiterReaction';
import FeedbackList from './components/FeedbackList';
import { scoreResume } from './utils/scoreResume';
import './index.css';

export default function App() {
  const [resume, setResume] = useState('');
  const [selectedRole, setSelectedRole] = useState('Software Engineer Intern');
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = () => {
    setIsLoading(true);
    setTimeout(() => {
      const { score: calculatedScore, feedback: generatedFeedback } = scoreResume(resume, selectedRole);
      setScore(calculatedScore);
      setFeedback(generatedFeedback);
      setIsLoading(false);
    }, 800);
  };

  const handleReset = () => {
    setResume('');
    setScore(null);
    setFeedback([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Can You Pass the ATS?
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            A fun, rule-based resume scoring game. See if your resume passes modern ATS systems!
          </p>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {score === null && (
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
              <ResumeInput value={resume} onChange={setResume} />
              <RoleSelector selectedRole={selectedRole} onChange={setSelectedRole} />
              
              <button
                onClick={handleScan}
                disabled={!resume.trim() || isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="inline-block animate-spin mr-2">⏳</span>
                    Scanning...
                  </span>
                ) : (
                  '🚀 Scan My Resume'
                )}
              </button>
            </div>
          )}

          {score !== null && (
            <div className="space-y-6">
              <ScoreCard score={score} />
              <RecruiterReaction score={score} />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
              >
                <FeedbackList feedback={feedback} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4"
              >
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition transform hover:scale-105"
                >
                  🔄 Try Again
                </button>
                <button
                  onClick={() => {
                    const text = `Check out my ATS score: ${score}/100 on "Can You Pass the ATS?" 🎮`;
                    navigator.clipboard.writeText(text);
                    alert('Copied to clipboard!');
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                >
                  📤 Share Score
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>

        <footer className="mt-16 text-center text-gray-600 text-sm">
          <p>Made with ❤️ for students and job seekers | Phase 1 MVP | No AI, purely rule-based scoring</p>
        </footer>
      </div>
    </div>
  );
}
