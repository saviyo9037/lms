# 🎓 Apzxrtra LMS — Enterprise Learning Management System

<div align="center">

![Apzxrtra LMS](public/apzxrtra_logo.svg)

**A next-generation, AI-integrated Learning Management & Academic ERP System built for technical and vocational excellence.**

[![Next.js 15](https://img.shields.io/badge/Next.js-15.x-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Features](#-key-features) • [Portals](#-portal-architecture) • [Tech Stack](#-technology-stack) • [Getting Started](#-getting-started) • [Directory Structure](#-project-structure)

</div>

---

## 🌟 Overview

**Apzxrtra LMS** is a unified digital campus and learning operating system developed for **Apzxrtra Institute of Management & Technology** (Perinthalmanna, Kerala). It bridges technical hardware vocations (smartphone service re-engineering, micro-soldering, display refurbishment) and executive management diplomas (HR, B2B sales, logistics, hospital administration) with built-in AI copilots, biometric attendance tracking, placement ERP, and automated financial installments.

---

## 🚀 Key Features

### 🤖 1. AI Socratic Mentor & Study Planner
- **24/7 Socratic Copilot**: Step-by-step conceptual guidance rather than raw answers, helping students diagnose PCB schematics, micro-soldering faults, and management case studies.
- **Adaptive Study Planner**: AI-generated weekly study roadmaps based on attendance, upcoming deadlines, and quiz performance.

### 💼 2. Placement Drive ERP & ATS Resume Engine
- **Live Recruitment Drives**: Direct application pipeline to partner recruiters (Samsung Care, Xiaomi, Apple Resellers, DHL, Apollo Hospitals).
- **ATS Resume Matcher**: Automated resume scoring and verification for technical skill credentials.
- **Interactive Multi-Stage Tracker**: Real-time progress through Aptitude, Technical Assessment, HR Rounds, and Offer Letter release.

### 💳 3. Fees, EMI Schedule & Financial ERP
- **Installment Breakdown**: Transparent tracking of admission fees, mid-term dues, caution deposits, and exam fees.
- **Instant QR Code & Digital Receipts**: GST-compliant downloadable invoices and UPI payment integration.
- **Scholarship Portal**: Merit concession applications and regional technical skill grant workflows.

### ⏱️ 4. Biometric Attendance & Clock-In
- **Daily Biometric Sync**: Clock-in and clock-out timestamp records with laboratory hardware scanner IDs.
- **Analytics & Leave Balance**: Dynamic breakdown of theory vs. practical bench hours and consecutive streak counts.

### 📊 5. Comprehensive Academic & Exam System
- **Curriculum & Lesson Player**: Structured modules with video tutorials, duration tracking, and downloadable schematics.
- **Live Assignment Submissions**: File uploads, rubric criteria, deadlines, and faculty feedback.
- **Formal Examinations**: Hall ticket downloads, syllabus outlines, venue assignments, and instant grade books.

---

## 🏛️ Portal Architecture

The application is structured into three dedicated role-based portals + public showcase:

```
                  ┌─────────────────────────────────────┐
                  │          Apzxrtra LMS               │
                  └──────────────────┬──────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         │                           │                           │
┌────────┴────────┐         ┌────────┴────────┐         ┌────────┴────────┐
│  Student Portal │         │ Faculty Portal  │         │  Admin Portal   │
│  /student/*     │         │  /faculty/*     │         │  /admin/*       │
├─────────────────┤         ├─────────────────┤         ├─────────────────┤
│ • Dashboard     │         │ • Dashboard     │         │ • Dashboard     │
│ • AI Planner    │         │ • Assignment    │         │ • Students ERP  │
│ • AI Copilot    │         │   Review        │         │ • Academics     │
│ • Courses       │         │ • Grading Hub   │         │ • Reports & BI  │
│ • Assignments   │         │ • Batch Score   │         │ • Institution   │
│ • Exams         │         │   Analytics     │         │   Settings      │
│ • Placement ERP │         └─────────────────┘         └─────────────────┘
│ • Attendance    │
│ • Fees & EMI    │
│ • Resume/Profile│
└─────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
|---|---|---|
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) | Server and Client components with dynamic layouts |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type checking and robust type models |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & OKLCH | Tailored color system with purple `#4C1D95` & vibrant orange accents |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) | Smooth layout transitions, slide-ins, and micro-interactions |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/) | Accessible primitives, dialogs, dropdowns, and icon set |
| **Charts** | [Recharts](https://recharts.org/) | Responsive analytics, enrollment curves, and performance graphs |
| **Theme** | Light / Dark Mode | Full dual-theme support persisted in `localStorage` |

---

## 📁 Project Structure

```bash
lms/
├── public/                     # Static assets & SVG logos
│   └── apzxrtra_logo.svg       # Brand vector emblem
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/              # Public About & R.I.S.E values page
│   │   ├── admin/              # Administrator portal
│   │   │   ├── academics/      # Course management
│   │   │   ├── dashboard/      # Executive KPIs & metrics
│   │   │   ├── reports/        # BI & student analytics
│   │   │   ├── settings/       # Institute configuration
│   │   │   └── students/       # Full student directory ERP
│   │   ├── faculty/            # Faculty & Instructor portal
│   │   │   ├── assignments/    # Submissions review
│   │   │   ├── dashboard/      # Class benchmarks & workload
│   │   │   └── grades/         # Student evaluation center
│   │   ├── student/            # Student learning portal
│   │   │   ├── assignments/    # Homework & lab challenges
│   │   │   ├── attendance/     # Biometric logs & calendars
│   │   │   ├── copilot/        # AI Socratic mentor
│   │   │   ├── courses/        # Course catalog & syllabus
│   │   │   ├── dashboard/      # Daily overview & streak
│   │   │   ├── exams/          # Exam schedules & hall tickets
│   │   │   ├── finance/        # EMI schedule, fees & receipts
│   │   │   ├── placement/      # Campus recruitment ERP
│   │   │   ├── planner/        # AI schedule planner
│   │   │   ├── profile/        # Personal settings
│   │   │   └── resume/         # Verified ATS resume builder
│   │   ├── globals.css         # OKLCH design tokens & theme classes
│   │   └── layout.tsx          # Root layout & font configurations
│   ├── components/
│   │   ├── layout/             # Header, Sidebar, WhatsApp float
│   │   ├── shared/             # Logo, Metric cards, Badges
│   │   └── ui/                 # Radix UI primitives
│   ├── context/
│   │   └── ThemeContext.tsx    # Light/Dark mode state management
│   ├── data/
│   │   └── mockData.ts         # Comprehensive mock datasets
│   └── lib/
│       └── utils.ts            # Classnames & formatting helpers
├── package.json
└── tsconfig.json
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm**, **pnpm**, or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/saviyo9037/lms.git
   cd lms
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000) to explore the system.

### Build & Type-Check

To test the production build and type safety:

```bash
# Type check
npx tsc --noEmit

# Production build
npm run build

# Start production server
npm start
```

---

## 🎨 Design System & R.I.S.E Values

Apzxrtra LMS adheres to the institute's core **R.I.S.E.** philosophy:
- **R — Respect**: Inclusive student-first user experience.
- **I — Integrity**: Verified ATS credentials and transparent grading rubrics.
- **S — Social Responsibility**: Practical employability for community empowerment.
- **E — Excellence**: Pixel-perfect typography, responsive design, and smooth animations.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ❤️ for Apzxrtra Institute of Management & Technology</sub>
</div>
