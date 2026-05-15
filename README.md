# Can You Pass the ATS?

A fun, polished, rule-based resume scoring game inspired by interactive web toys like Neal.fun. See if your resume passes modern Applicant Tracking Systems (ATS)!

## 🎮 Phase 1 MVP Features

### Core Functionality
- **Resume Input**: Paste your resume for analysis
- **Role Selection**: Choose from 3 internship/entry-level roles:
  - Software Engineer Intern
  - Data Analyst Intern
  - Product / Tech Consultant
- **ATS Score**: Get a score from 0–100 based on:
  - Resume length (optimal: 400-800 words)
  - Formatting (bullet points, dates)
  - Contact information (email, phone)
  - Role-specific keywords
  - Action verbs (developed, created, built, etc.)
  - Quantifiable results (metrics, percentages)
- **Animated Score Meter**: Smooth Framer Motion animations
- **Recruiter Reaction**: Funny, encouraging feedback based on score
- **Detailed Feedback**: Actionable tips for improvement
- **Share Functionality**: Copy your score to share with friends

### Tech Stack
- **React** - UI components
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **JavaScript** - Pure JS, no TypeScript yet

### Design Philosophy
- Playful, modern aesthetic with gradients
- Fully responsive (mobile, tablet, desktop)
- No AI/LLM in Phase 1 (rule-based only)
- Fast feedback (no external API calls)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
cd ats-game
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
ats-game/
├── src/
│   ├── components/
│   │   ├── ResumeInput.jsx        # Resume textarea input
│   │   ├── RoleSelector.jsx       # Role selection buttons
│   │   ├── ScoreCard.jsx          # Animated score display (0-100)
│   │   ├── RecruiterReaction.jsx  # Funny reaction based on score
│   │   └── FeedbackList.jsx       # Actionable feedback items
│   ├── utils/
│   │   ├── scoreResume.js         # Core scoring algorithm
│   │   └── keywordBanks.js        # Role-specific keyword lists
│   ├── App.jsx                    # Main orchestrator component
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind directives
├── public/
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
└── package.json                   # Dependencies and scripts
```

---

## 🧮 Scoring Algorithm (Rule-Based)

The score is calculated from 0–100 based on multiple factors:

### Starting Score: 50/100

### Scoring Rules

| Factor | Points | Condition |
|--------|--------|-----------|
| **Length** | -15 | < 100 words |
| **Length** | +10 | 400–800 words |
| **Length** | -10 | > 1000 words |
| **Bullet Points** | +8 | Present |
| **Bullet Points** | -5 | Absent |
| **Dates** | +5 | Present (YYYY format) |
| **Dates** | -3 | Absent |
| **Contact Info** | +10 | Email + Phone both present |
| **Contact Info** | +5 | Only one present |
| **Contact Info** | -10 | Neither present |
| **Keywords** | +2 per keyword | Role-specific keywords (max +25) |
| **Action Verbs** | +8 | 5+ power verbs (developed, led, etc.) |
| **Action Verbs** | +3 | 1-4 power verbs |
| **Metrics** | +8 | Quantifiable results (%, numbers) |
| **GPA** | +3 | GPA mentioned |

---

## 🎨 UI Components

### ResumeInput
- Large textarea for pasting resume
- Helpful placeholder and tips

### RoleSelector
- Three button options with active state styling
- Hover animations

### ScoreCard
- Gradient background (green for high, red for low)
- Animated number counter (0→score over 2 seconds)
- Animated progress bar
- Color-coded labels

### RecruiterReaction
- Emoji reactions based on score
- Pulsing emoji animation

### FeedbackList
- Staggered entrance animation
- Emoji-prefixed tips (✅, ⚠️, ❌, 💡)

---

## 🔄 State Management

All state is local to `App.jsx`:
- `resume` - Textarea content
- `selectedRole` - Selected role
- `score` - Calculated ATS score (null until scanned)
- `feedback` - Array of feedback strings
- `isLoading` - Loading state

---

## 📱 Responsive Design

- Mobile-first approach with Tailwind
- Works on all screen sizes (mobile, tablet, desktop)
- Touch-friendly buttons and inputs

---

## 🎯 Phase 1 Limitations (By Design)

- ✅ No AI/LLM integration (rule-based only)
- ✅ No external API calls
- ✅ No user authentication
- ✅ No data persistence

---

## 🛠️ Development

### Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview build
```

---

## 💡 About

Built with ❤️ for students and job seekers. Made to help demystify ATS scoring and improve resume quality.

**Phase 1 MVP v1.0** - May 2026
