export const recruiterReactions = {
  90: {
    text: "The ATS took a victory lap.",
    subtext: "This resume has main character energy.",
    color: 'bg-emerald-600',
    textColor: 'text-white'
  },
  85: {
    text: "Resume excellence detected. You're getting a callback.",
    subtext: "The hiring manager may actually read this.",
    color: 'bg-emerald-500',
    textColor: 'text-white'
  },
  80: {
    text: "The ATS lived. And the recruiter kept scrolling.",
    subtext: "Strong credentials. Interview potential: high.",
    color: 'bg-emerald-400',
    textColor: 'text-white'
  },
  70: {
    text: "Your resume survived the first pass.",
    subtext: "But the recruiter attention dropped after page one.",
    color: 'bg-amber-500',
    textColor: 'text-white'
  },
  60: {
    text: "The ATS survived, but barely.",
    subtext: "Keyword alignment is giving group assignment energy.",
    color: 'bg-amber-600',
    textColor: 'text-white'
  },
  45: {
    text: "This resume needs less mystery and more evidence.",
    subtext: "Recruiting bots are confused. Very confused.",
    color: 'bg-orange-600',
    textColor: 'text-white'
  },
  0: {
    text: "The ATS experienced an existential crisis.",
    subtext: "Start over. Bring formatting. Bring keywords. Bring hope.",
    color: 'bg-red-600',
    textColor: 'text-white'
  }
};

export const getReaction = (score) => {
  if (score >= 90) return recruiterReactions[90];
  if (score >= 85) return recruiterReactions[85];
  if (score >= 80) return recruiterReactions[80];
  if (score >= 70) return recruiterReactions[70];
  if (score >= 60) return recruiterReactions[60];
  if (score >= 45) return recruiterReactions[45];
  return recruiterReactions[0];
};
