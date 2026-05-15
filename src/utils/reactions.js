export const recruiterReactions = {
  90: {
    emoji: '🤩',
    text: "Recruiter forwarded this to the hiring manager 👀",
    color: 'bg-gradient-to-r from-emerald-400 to-green-500',
    textColor: 'text-white',
    alt: "I'm calling HR right now. You're hired!"
  },
  85: {
    emoji: '😍',
    text: "Stripe recruiter slightly impressed.",
    color: 'bg-gradient-to-r from-green-400 to-emerald-500',
    textColor: 'text-white',
    alt: "Stellar resume! Interview scheduled ASAP."
  },
  80: {
    emoji: '😊',
    text: "Actually readable. Rare achievement.",
    color: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    textColor: 'text-white',
    alt: "Nice work! Your resume passed our ATS."
  },
  70: {
    emoji: '🤔',
    text: "ATS found React and calmed down.",
    color: 'bg-gradient-to-r from-blue-400 to-indigo-500',
    textColor: 'text-white',
    alt: "Not bad. Could be better though."
  },
  60: {
    emoji: '😐',
    text: "Not bad. Recruiter stayed for 12 seconds.",
    color: 'bg-gradient-to-r from-amber-400 to-orange-500',
    textColor: 'text-white',
    alt: "This might survive internship season."
  },
  45: {
    emoji: '😕',
    text: "Your bullet point needs therapy.",
    color: 'bg-gradient-to-r from-orange-400 to-red-500',
    textColor: 'text-white',
    alt: "This resume has some issues."
  },
  0: {
    emoji: '😬',
    text: "This resume was fighting for its life.",
    color: 'bg-gradient-to-r from-red-500 to-pink-600',
    textColor: 'text-white',
    alt: "Yikes. Major overhaul needed!"
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
