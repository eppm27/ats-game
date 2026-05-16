import { motion } from 'framer-motion';

export default function EyeTrackingAnalysis({ feedback }) {
  // Map feedback to "heatmap" regions based on content
  const getAttentionRegions = () => {
    const regions = {
      contactInfo: { label: 'Contact Info', attention: 'high' },
      skills: { label: 'Skills', attention: 'high' },
      experience: { label: 'Experience', attention: 'medium' },
      metrics: { label: 'Metrics', attention: 'medium' },
      education: { label: 'Education', attention: 'medium' },
      formatting: { label: 'Formatting', attention: 'low' }
    };

    // Analyze feedback to adjust attention
    const feedbackText = feedback.join(' ').toLowerCase();

    if (feedbackText.includes('keyword')) {
      regions.skills.attention = 'high';
    }
    if (feedbackText.includes('metric') || feedbackText.includes('action verb')) {
      regions.metrics.attention = 'high';
    }
    if (feedbackText.includes('contact')) {
      regions.contactInfo.attention = 'low';
    }
    if (feedbackText.includes('format') || feedbackText.includes('bullet')) {
      regions.formatting.attention = 'medium';
    }

    return regions;
  };

  const regions = getAttentionRegions();

  const getAttentionColor = (attention) => {
    if (attention === 'high') return { bg: 'bg-[#e7fbf0]', text: 'text-[#16835c]', fill: 'bg-[#36b37e]' };
    if (attention === 'medium') return { bg: 'bg-[#fff0d6]', text: 'text-[#a46516]', fill: 'bg-[#e79a32]' };
    return { bg: 'bg-[#f5edf7]', text: 'text-[#806a8a]', fill: 'bg-[#b69ac8]' };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="mx-auto w-full max-w-4xl rounded-[2rem] bg-white/68 p-5 shadow-[0_20px_70px_rgba(126,76,142,0.12)] ring-1 ring-white/70 backdrop-blur-xl sm:p-8"
    >
      <p className="mb-2 text-sm font-black uppercase tracking-[0.2em] text-[#89679e]">
        Recruiter Eye Tracking
      </p>
      <h3 className="mb-6 text-2xl font-black tracking-[-0.02em] text-[#33243f]">
        Where the skim probably lingered.
      </h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
        {Object.entries(regions).map(([key, region], index) => {
          const colors = getAttentionColor(region.attention);
          const attentionPercentage =
            region.attention === 'high' ? 90 : region.attention === 'medium' ? 55 : 25;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.08, duration: 0.4 }}
              className={`group relative cursor-default overflow-hidden rounded-3xl p-4 shadow-sm ring-1 ring-white/80 transition-all ${colors.bg}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/50" />
              </div>

              <div className="relative z-10">
                <p className="mb-3 text-sm font-black text-[#33243f]">{region.label}</p>

                <div className="h-2 overflow-hidden rounded-full bg-white/65">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${attentionPercentage}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${colors.fill}`}
                  />
                </div>

                <p className={`mt-2 text-xs font-black ${colors.text}`}>
                  {attentionPercentage}%
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-6 text-center text-sm text-[#766378]"
      >
        Fake heatmap, real lesson: recruiters skim for proof before personality.
      </motion.p>
    </motion.div>
  );
}
