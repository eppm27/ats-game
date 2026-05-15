import { motion } from 'framer-motion';

export default function FeedbackList({ feedback }) {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <h3 className="font-semibold text-lg text-gray-800 mb-4">Detailed Feedback</h3>
      {feedback.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400"
        >
          <p className="text-gray-700">{item}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
