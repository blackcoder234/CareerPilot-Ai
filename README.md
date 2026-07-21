# CareerPilot AI

Your Personal AI Career Advisor. Upload your resume, set your target role, and get instant, actionable feedback powered by Google Gemini.

## 🚀 Features
- **Premium UI:** Glassmorphism, smooth animations, and a responsive layout using Tailwind CSS.
- **AI Resume Analyzer:** Upload your PDF resume and receive a streaming markdown analysis tailored to your specific career goals.
- **Robust Authentication:** NextAuth integration supporting Google, GitHub, and Custom Email/Password Sign Up.
- **Global Error Handling:** Industry-standard `react-hot-toast` notifications.
- **Database:** MongoDB persistence for user profiles and resume analysis history.

## 🛠️ Tech Stack
- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/) & [Google Gemini](https://ai.google.dev/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) & `bcryptjs`
- **Database:** [MongoDB](https://www.mongodb.com/) via Mongoose
- **PDF Parsing:** `pdf-parse`

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/blackcoder234/CareerPilot-Ai.git
   cd CareerPilot-Ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication Secret
   # Generate one using: openssl rand -base64 32
   NEXTAUTH_SECRET=your_nextauth_secret

   # NextAuth Base URL (Required for production)
   NEXTAUTH_URL=http://localhost:3000

   # OAuth Providers (Optional but recommended)
   GOOGLE_CLIENT_ID=your_google_id
   GOOGLE_CLIENT_SECRET=your_google_secret
   GITHUB_ID=your_github_id
   GITHUB_SECRET=your_github_secret

   # AI Provider
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🚀 Vercel Deployment Instructions

This project is fully ready for deployment on [Vercel](https://vercel.com/).

1. **Push your code to GitHub.**
2. **Import the repository into Vercel.**
3. **Configure Environment Variables in Vercel:**
   During the import process, or in your project settings (`Settings > Environment Variables`), you **MUST** add the following variables:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET` (crucial for production sessions)
   - `NEXTAUTH_URL` (set this to your vercel deployment URL, e.g., `https://careerpilot-ai.vercel.app`)
   - `GOOGLE_GENERATIVE_AI_API_KEY`
   - *If using OAuth:* `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`
4. **Deploy!** 
   Vercel will automatically build the Next.js App Router and deploy it. The `.gitignore` is already correctly configured to safely ignore your local `.env` while preserving Next.js build caches.

## 📝 License
This project is open-source.
