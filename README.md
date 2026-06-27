# ⚡ ResumeIQ Lite — AI Resume Analyzer

A clean, recruiter-ready portfolio project built with **React + Vite + Tailwind CSS + Gemini AI**.

**Live Demo** → Deploy to Vercel in 2 minutes (see below)

---

## What it does

| Feature | Description |
|---|---|
| 📄 Resume Upload | Upload a .txt or .pdf resume |
| 🎯 ATS Score | AI calculates your ATS compatibility score (0–100) |
| 💼 Job Match | Paste a job description → get a match % |
| 🔍 Skill Detection | Finds skills present in your resume |
| ❌ Skill Gaps | Suggests missing in-demand skills |
| 💡 AI Tips | 3–5 specific improvement recommendations |
| 🔒 Private | Nothing is stored — all analysis happens in memory |

---

## Tech Stack

- **React 18** + **Vite** — fast dev + build
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — smooth animations
- **Google Gemini AI** — resume analysis (via REST API)
- **Lucide React** — icons

No backend. No database. No auth. Just a clean React app.

---


## Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx       # Fixed top navigation
│   ├── Hero.jsx         # Landing hero section
│   ├── Features.jsx     # Feature cards grid
│   ├── UploadCard.jsx   # File upload + job desc input
│   ├── ATSScore.jsx     # Score ring visualization
│   ├── SkillChart.jsx   # Skills, gaps, AI tips
│   └── Footer.jsx       # Footer
│
├── pages/
│   └── Home.jsx         # Main page — wires everything together
│
├── services/
│   └── gemini.js        # Gemini API call + JSON parsing
│
├── utils/
│   └── parser.js        # File reader + score color helper
│
└── App.jsx              # Root component
```

---

## How the AI Analysis Works

```
User uploads resume (.txt or .pdf)
       ↓
FileReader extracts plain text
       ↓
Text sent to Gemini 1.5 Flash via REST API
       ↓
Gemini returns structured JSON:
  - atsScore (0-100)
  - jobMatchScore (0-100, if job desc provided)
  - detectedSkills []
  - missingSkills []
  - topStrengths []
  - aiSuggestions []
  - overallFeedback (string)
       ↓
React renders results with animations
```

---

## Note for Recruiters

This project demonstrates:
- **React component architecture** — clean separation of concerns
- **API integration** — direct Gemini REST calls with error handling
- **State management** — useState, file reading, async flows
- **Modern UI** — glassmorphism, gradients, Framer Motion animations
- **Responsive design** — works on mobile and desktop
- **Error handling** — invalid files, API errors, empty states
- **Deployment** — Vercel-ready with env variables
