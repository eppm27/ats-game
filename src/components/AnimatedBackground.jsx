import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#fff6ee]" />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(135deg, rgba(255, 226, 232, 0.82) 0%, rgba(255, 246, 238, 0.92) 38%, rgba(234, 221, 255, 0.72) 100%)'
      }} />

      <motion.div
        className="absolute -left-20 top-24 h-48 w-[44rem] -rotate-12 rounded-[4rem] bg-[#ffd1df]/45 blur-2xl"
        style={{ 
          clipPath: 'polygon(0 20%, 100% 0, 88% 76%, 8% 100%)'
        }}
        animate={{ 
          x: [0, 18, 0],
          y: [0, -10, 0],
          opacity: [0.45, 0.65, 0.45]
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute right-[-8rem] top-12 h-56 w-[38rem] rotate-12 rounded-[5rem] bg-[#d8c7ff]/50 blur-2xl"
        style={{ 
          clipPath: 'polygon(9% 0, 100% 24%, 91% 100%, 0 78%)'
        }}
        animate={{ 
          x: [0, -22, 0],
          y: [0, 16, 0],
          opacity: [0.4, 0.62, 0.4]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-12 left-1/2 h-36 w-[34rem] -translate-x-1/2 rotate-3 rounded-[4rem] bg-[#ffd6a8]/38 blur-2xl"
        style={{ 
          clipPath: 'polygon(0 18%, 92% 0, 100% 82%, 12% 100%)'
        }}
        animate={{ 
          y: [0, -18, 0],
          opacity: [0.35, 0.58, 0.35]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(rgba(126,76,142,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(126,76,142,0.18) 1px, transparent 1px)',
        backgroundSize: '54px 54px'
      }} />

      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 400 400%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 /%3E%3C/filter%3E%3Crect width=%27400%27 height=%27400%27 fill=%27%2333283f%27 filter=%27url(%23noiseFilter)%27 /%3E%3C/svg%3E")',
        backgroundSize: '500px 500px'
      }} />
    </div>
  );
}
