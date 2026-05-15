import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Deep dark gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />

      {/* Grid texture overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Large animated blobs - more dramatic */}
      <motion.div
        className="absolute -top-40 -left-20 w-96 h-96 bg-gradient-to-br from-blue-600/25 to-purple-600/15 rounded-full float"
        style={{ filter: 'blur(60px)' }}
      />
      
      <motion.div
        className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/20 to-pink-600/15 rounded-full float-slow"
        style={{ filter: 'blur(70px)' }}
      />
      
      <motion.div
        className="absolute -bottom-40 left-1/3 w-96 h-96 bg-gradient-to-br from-cyan-600/20 to-blue-600/15 rounded-full float-slower"
        style={{ filter: 'blur(65px)' }}
      />

      <motion.div
        className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/20 to-purple-600/15 rounded-full float"
        style={{ filter: 'blur(70px)' }}
      />

      {/* Accent blobs */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-80 h-80 bg-gradient-to-br from-rose-500/10 to-purple-500/5 rounded-full float-slow"
        style={{ filter: 'blur(50px)' }}
      />

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none opacity-50" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 100%)'
      }} />

      {/* Top accent glow */}
      <motion.div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-blue-500/20 to-transparent rounded-full"
        style={{ filter: 'blur(60px)' }}
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom accent glow */}
      <motion.div
        className="absolute -bottom-32 right-1/3 w-80 h-80 bg-gradient-to-t from-purple-500/15 to-transparent rounded-full"
        style={{ filter: 'blur(50px)' }}
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 400 400%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 /%3E%3C/filter%3E%3Crect width=%27400%27 height=%27400%27 fill=%27%23f1f5f9%27 filter=%27url(%23noiseFilter)%27 /%3E%3C/svg%3E")',
        backgroundSize: '400px 400px'
      }} />
    </div>
  );
}
