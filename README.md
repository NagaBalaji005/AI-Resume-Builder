# AI Resume Builder

A modern, AI-powered resume builder that creates ATS-optimized, professional resumes. Built with React, Vite, and Tailwind CSS, featuring secure authentication and a cloud PostgreSQL backend (Neon).

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-cyan)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.11.3-green)
![Express](https://img.shields.io/badge/Express-4.18.2-orange)

---

## 🚀 Features

- **4-Step Resume Creation**: Template selection → Information input → ATS optimization → Final resume
- **AI-Powered ATS Optimization**: Intelligent keyword matching and formatting for Applicant Tracking Systems
- **User Authentication**: Secure signup/signin with JWT tokens and Neon PostgreSQL database
- **Multiple Professional Templates**: Creative, Modern Tech, Executive Professional, and Student
- **Real-time Preview**: See your resume as you build it
- **PDF Export**: Download your resume as a professional PDF
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

---

## 🛠️ Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, html2canvas, jsPDF
- **Backend**: Express (serverless functions), Neon PostgreSQL, bcryptjs, jsonwebtoken
- **Dev Tools**: ESLint, PostCSS, Autoprefixer, Nodemon

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Neon (or other cloud) PostgreSQL database

### 1. Clone the repository
```bash
git clone <repository-url>
cd ai-resume-builder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```env
DB_USER=your_neon_user
DB_PASSWORD=your_neon_password
DB_HOST=your_neon_host
DB_NAME=your_neon_db
DB_PORT=5432
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

### 4. Set up Neon PostgreSQL database
- [Create a free Neon account](https://neon.tech)
- Create a new project and database
- Copy your connection details and use them in your `.env` and Vercel dashboard
- **Create tables** (in Neon SQL Editor):
```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS resumes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  template VARCHAR(50) NOT NULL,
  resume_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_resumes_updated_at 
  BEFORE UPDATE ON resumes 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

### 5. Start development server
```bash
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173)

---

## 🚀 Deployment (Vercel)

1. **Push to GitHub**
2. **Deploy to Vercel** ([vercel.com](https://vercel.com))
   - Connect your GitHub repo
   - Set environment variables in the Vercel dashboard (same as `.env`)
   - Deploy with default settings

---

## 📁 Project Structure

```
ai-resume-builder/
├── api/                    # Backend API (Vercel serverless)
│   └── auth/
│       ├── signup.js       # Signup endpoint
│       └── signin.js       # Signin endpoint
│   ├── profile.js          # User profile endpoint
│   └── health.js           # Health check endpoint
├── src/
│   ├── components/
│   │   ├── forms/          # Form components for each section
│   │   ├── templates/      # Resume template components
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Footer.jsx      # Footer
│   │   ├── ContactModal.jsx
│   │   ├── TemplateSelection.jsx
│   │   ├── UserInformation.jsx
│   │   ├── ATSRefining.jsx
│   │   ├── FinalResume.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── DebugInfo.jsx
│   ├── services/
│   │   └── api.js          # API service utility
│   ├── templates/          # HTML template files
│   ├── utils/
│   │   └── ats.js          # ATS optimization utilities
│   ├── types/
│   │   └── resume.js       # Resume data types
│   ├── assets/             # Images and static assets
│   ├── App.jsx             # Main app
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind config
├── postcss.config.js       # PostCSS config
├── eslint.config.js        # ESLint config
├── vercel.json             # Vercel config
└── README.md               # This file
```

---

## 🎯 Usage Guide

1. **Sign Up / Sign In**: Create an account or log in securely (JWT-based)
2. **Select Template**: Choose from 4 professional templates
3. **Enter Resume Info**: Fill in personal, work, education, skills, and more
4. **ATS Optimization**: Get AI-powered suggestions and real-time scoring
5. **Preview & Export**: Download your resume as a PDF

---

## 🔒 Security & Best Practices
- Passwords are hashed with bcryptjs
- JWT tokens for authentication
- Input validation on all endpoints
- Environment variables for all secrets
- CORS and secure headers enabled

---

## 🧑‍💻 Contributing
1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License
MIT License

---

**Built with ❤️ using React, Vite, Tailwind CSS, and Neon** 