# ATS Game

A playful, local-only resume feedback game for students and early-career candidates.

## What it does

- Choose SWE, Data, or Product / Tech Consulting.
- Paste a resume and reveal a score with seven concise feedback items.
- Open the scoring breakdown, edit, and try again.
- Copy a score without sharing resume content.

## How scoring works

Transparent text heuristics award up to 100 points: role keywords (25), measurable results (20), sections and dates (15), length (10), bullets (10), action verbs (10), and contact details (10).

## Tech

React · Vite · Tailwind CSS 4 · Framer Motion · JavaScript. No backend, AI, external APIs, storage, or remote fonts. Resume text lives in React state and disappears on refresh.

## Run locally

Node.js 22.12+ recommended (Vite 8).

```sh
npm install
npm run dev
```

```sh
npm run build
npm run lint
npm test
```

## Disclaimer

This is an educational resume feedback game, not a real ATS or a prediction of recruiter outcomes. Text patterns can miss context; include only truthful, relevant information.
