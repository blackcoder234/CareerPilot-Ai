# CareerPilot AI - Project State & Documentation

This document serves as the master reference for the current state of **CareerPilot AI**. It is designed to quickly onboard any developer or AI assistant to the project's architecture, completed features, and future roadmap.

## 🚀 What is CareerPilot AI?
CareerPilot AI is an advanced, AI-powered career coaching SaaS platform. Its mission is to democratize career advancement by providing personalized, expert guidance to help professionals land their dream jobs. The application leverages large language models (LLMs) to provide real-time resume analysis, automated profile building, and eventually, interview simulations and job matching.

**Tech Stack:**
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS (emphasizing modern glassmorphism, dark/light modes, and dynamic glowing effects)
- **Authentication**: NextAuth.js
- **Database**: MongoDB (via Mongoose)
- **AI Integration**: Vercel AI SDK (`ai` package) powered by Google Gemini models.
- **File Parsing**: `pdf-parse` (Configured as a `serverExternalPackages` in Turbopack to prevent build issues with native bindings).

---

## ✅ What is Done (Current Features)

### 1. Core Architecture & UI
- **Global Page Loader**: Integrated `nextjs-toploader` for lightning-fast, neon-glowing navigation transitions.
- **Authentication**: Full login/register flows.
- **Sleek Navigation**: Modern Navbar with a Headless UI dropdown for authenticated users (displaying Avatar and Name).
- **SaaS Static Pages**: Fully styled placeholder pages for standard business needs: `/about`, `/contact`, `/privacy`, and `/terms`.

### 2. The Profile System (`/profile`)
- A highly dynamic, glassmorphism-styled user profile interface.
- Supports complex arrays for **Experience** and **Education**, allowing users to manually add, edit, or remove multiple roles and degrees.
- Connected to a robust backend model (`models/Profile.ts`) and API routes for saving data to MongoDB.

### 3. AI Resume Analyzer (`/resume`)
- **PDF Parsing**: Users can upload a resume PDF. The backend extracts the text using `pdf-parse`.
- **Real-time Feedback**: Streams an immediate ATS score and actionable feedback directly to the UI using Gemini via the Vercel AI SDK (`streamText`).
- **AI Auto-Fill (Opt-in)**: Once analysis is complete, users are prompted to "Auto-Fill Profile". If clicked, the `/api/profile/extract` route uses Gemini's `generateObject` (with Zod schemas) to strictly extract Experience, Education, and Skills from the resume and automatically save them to the database.

---

## 🚧 What Needs to be Built (The Roadmap)

We have scaffolded placeholder "Coming Soon" pages for three massive upcoming features. These are the next priorities:

### 1. AI Interview Simulator (`/interview`)
- **Goal**: Realistic, voice-to-voice mock interviews.
- **Features to build**:
  - WebRTC or browser audio capture for real-time voice conversations.
  - Dynamic generation of technical and behavioral questions based on the user's uploaded resume and target role.
  - Post-interview feedback dashboards scoring communication, technical accuracy, and confidence.

### 2. AI Job Matches (`/jobs`)
- **Goal**: A highly personalized job board.
- **Features to build**:
  - Ingestion of job postings (via API or scraping).
  - An AI matching engine that cross-references the user's Profile/Resume with job requirements to calculate a "Match Probability".
  - A "Missing Skills" analyzer for each job.
  - One-click tailored Cover Letter generation.

### 3. Coding Arena (`/coding`)
- **Goal**: Technical interview preparation for software engineers.
- **Features to build**:
  - An embedded, interactive code editor (e.g., using Monaco Editor).
  - A backend execution environment to run and test code securely.
  - AI-generated, LeetCode-style challenges categorized by Big Tech companies.
  - An AI assistant that provides hints (not direct answers) when the user gets stuck.

---

## ⚠️ Important Technical Notes
- **pdf-parse & Next.js Turbopack**: `pdf-parse` relies on native bindings (`@napi-rs/canvas`) that break Next.js edge and server bundling. To fix this, `pdf-parse` is explicitly listed in `serverExternalPackages` inside `next.config.ts`. Furthermore, in the API routes, it MUST be imported using standard Node `require` (bypassing TypeScript's ES6 checks) to prevent `no default export` build failures. 
*(Example: `const pdfParse = require("pdf-parse");`)*
