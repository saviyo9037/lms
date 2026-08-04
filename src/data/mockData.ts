// ─── Ostrax LMS Mock Data ───────────────────────────────────────────────────

export const currentStudent = {
  id: "STU001",
  name: "Arjun Krishnan",
  initials: "AK",
  email: "arjun.krishnan@ostrax.edu",
  phone: "+91 98765 43210",
  batch: "2024 Batch B",
  program: "Smartphone Service Re-Engineering",
  programShort: "SSR",
  stage: "OJT",
  stageMonth: 8,
  stageTotalMonths: 18,
  rollNo: "OST-2024-047",
  joinDate: "2024-01-15",
  dueDate: "2025-07-15",
  leaderboardRank: 12,
  totalStudents: 240,
  courseProgress: 68,
  attendance: 94,
  pendingFee: 12500,
  avatar: null,
};

export const sidebarMenuItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: "LayoutDashboard" },
  { label: "AI Study Planner", href: "/student/planner", icon: "TrendingUp" },
  { label: "AI Socratic Copilot", href: "/student/copilot", icon: "Star" },
  { label: "Courses", href: "/student/courses", icon: "BookOpen" },
  { label: "Assignments", href: "/student/assignments", icon: "ClipboardList" },
  { label: "Placement Drive", href: "/student/placement", icon: "Briefcase" },
  { label: "Attendance", href: "/student/attendance", icon: "CalendarCheck" },
  { label: "Fees & EMI", href: "/student/finance", icon: "FileText" },
  { label: "Profile", href: "/student/profile", icon: "User" },
];

export const adminMenuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { label: "Students", href: "/admin/students", icon: "Users" },
  { label: "Academics", href: "/admin/academics", icon: "GraduationCap" },
  { label: "Reports", href: "/admin/reports", icon: "BarChart3" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
];

export const facultyMenuItems = [
  { label: "Dashboard", href: "/faculty/dashboard", icon: "LayoutDashboard" },
  { label: "Assignments", href: "/faculty/assignments", icon: "ClipboardList" },
  { label: "Grades", href: "/faculty/grades", icon: "Star" },
];

// ─── Courses ─────────────────────────────────────────────────────────────────

export const technicalCourses = [
  {
    id: "tc-001",
    title: "Smartphone Service Re-Engineering",
    shortTitle: "SSR",
    category: "Technical",
    duration: "18 Months",
    durationBreakdown: "6 months institutional + 12 months OJT",
    description:
      "Comprehensive smartphone repair and service engineering program covering hardware diagnostics, PCB repair, software flashing, and business management for service centers.",
    modules: 24,
    lessonsCount: 96,
    enrolledStudents: 142,
    progress: 68,
    color: "#4C1D95",
    icon: "Smartphone",
    thumbnail: "/thumbnails/ssr.jpg",
    tags: ["Hardware", "Software", "Business", "OJT"],
    instructor: "Mohammed Shafi",
    rating: 4.8,
    reviews: 89,
    certificationType: "Diploma",
    eligibility: "Plus Two / 10+2",
    modules_list: [
      { id: 1, title: "Introduction to Smartphone Architecture", duration: "8 hrs", completed: true, lessons: 4 },
      { id: 2, title: "Display & Touch Systems", duration: "12 hrs", completed: true, lessons: 6 },
      { id: 3, title: "Battery & Charging Systems", duration: "10 hrs", completed: true, lessons: 5 },
      { id: 4, title: "Camera Module Repair", duration: "14 hrs", completed: true, lessons: 7 },
      { id: 5, title: "Motherboard Level Repair", duration: "20 hrs", completed: false, lessons: 10, inProgress: true },
      { id: 6, title: "Software Flashing & Recovery", duration: "16 hrs", completed: false, lessons: 8 },
      { id: 7, title: "Water Damage Treatment", duration: "12 hrs", completed: false, lessons: 6 },
      { id: 8, title: "Business Management for Service Centers", duration: "18 hrs", completed: false, lessons: 9 },
    ],
  },
  {
    id: "tc-002",
    title: "Smartphone Technician Upgradation",
    shortTitle: "STU",
    category: "Technical",
    duration: "15 Days",
    durationBreakdown: "Intensive short course",
    description:
      "A focused 15-day intensive program for existing technicians to upgrade their skills in the latest smartphone repair techniques and tools.",
    modules: 6,
    lessonsCount: 24,
    enrolledStudents: 58,
    progress: 100,
    color: "#7C3AED",
    icon: "Zap",
    thumbnail: "/thumbnails/stu.jpg",
    tags: ["Upgrade", "Intensive", "Certified"],
    instructor: "Anoop Nair",
    rating: 4.6,
    reviews: 34,
    certificationType: "Certificate",
    eligibility: "Existing Technicians",
    modules_list: [
      { id: 1, title: "Advanced Diagnostics Tools", duration: "4 hrs", completed: true, lessons: 2 },
      { id: 2, title: "IC Level Soldering Techniques", duration: "8 hrs", completed: true, lessons: 4 },
      { id: 3, title: "Latest Model Teardowns", duration: "6 hrs", completed: true, lessons: 3 },
      { id: 4, title: "Software Unlocking Methods", duration: "6 hrs", completed: true, lessons: 3 },
      { id: 5, title: "Customer Service Excellence", duration: "4 hrs", completed: true, lessons: 2 },
      { id: 6, title: "Practical Assessment", duration: "8 hrs", completed: true, lessons: 4 },
    ],
  },
  {
    id: "tc-003",
    title: "Glass Changing Master Program",
    shortTitle: "GCM",
    category: "Technical",
    duration: "1 Month",
    durationBreakdown: "Classroom + practical",
    description:
      "Specialized program mastering the art of smartphone glass replacement, OLED refurbishment, and display unit repair.",
    modules: 4,
    lessonsCount: 16,
    enrolledStudents: 45,
    progress: 35,
    color: "#0EA5E9",
    icon: "Layers",
    thumbnail: "/thumbnails/gcm.jpg",
    tags: ["Glass", "Display", "Practical"],
    instructor: "Rahul Menon",
    rating: 4.7,
    reviews: 21,
    certificationType: "Certificate",
    eligibility: "10th Pass / Plus Two",
    modules_list: [
      { id: 1, title: "Types of Display Technologies", duration: "4 hrs", completed: true, lessons: 2 },
      { id: 2, title: "Glass Removal Techniques", duration: "8 hrs", completed: false, lessons: 4, inProgress: true },
      { id: 3, title: "OCA Lamination Process", duration: 10, completed: false, lessons: 5 },
      { id: 4, title: "Quality Checking & Finishing", duration: "6 hrs", completed: false, lessons: 3 },
    ],
  },
];

export const managementCourses = [
  {
    id: "mc-001",
    title: "HR Management",
    shortTitle: "HRM",
    category: "Management",
    duration: "6 Months",
    durationBreakdown: "360 hrs: 240 institutional + 120 internship",
    description:
      "Comprehensive HR management program covering talent acquisition, payroll management, labor laws, performance appraisal, and modern HR practices.",
    modules: 12,
    lessonsCount: 48,
    enrolledStudents: 89,
    progress: 45,
    color: "#059669",
    icon: "Users",
    thumbnail: "/thumbnails/hrm.jpg",
    tags: ["HR", "Payroll", "Labor Law", "Internship"],
    instructor: "Fathima Nasser",
    rating: 4.9,
    reviews: 56,
    certificationType: "Diploma",
    eligibility: "Plus Two minimum",
    modules_list: [
      { id: 1, title: "Introduction to HRM", duration: "20 hrs", completed: true, lessons: 10 },
      { id: 2, title: "Recruitment & Selection", duration: "24 hrs", completed: true, lessons: 12 },
      { id: 3, title: "Payroll Management", duration: "20 hrs", completed: false, lessons: 10, inProgress: true },
      { id: 4, title: "Labor Laws & Compliance", duration: "24 hrs", completed: false, lessons: 12 },
      { id: 5, title: "Performance Management", duration: "20 hrs", completed: false, lessons: 10 },
      { id: 6, title: "Internship Module", duration: "120 hrs", completed: false, lessons: 6 },
    ],
  },
  {
    id: "mc-002",
    title: "Sales Management",
    shortTitle: "SM",
    category: "Management",
    duration: "6 Months",
    durationBreakdown: "5 months classroom + 1 month internship",
    description:
      "Master the art of sales strategy, CRM tools, territory management, negotiation, and modern digital sales techniques.",
    modules: 10,
    lessonsCount: 40,
    enrolledStudents: 76,
    progress: 22,
    color: "#DC2626",
    icon: "TrendingUp",
    thumbnail: "/thumbnails/sm.jpg",
    tags: ["Sales", "CRM", "Negotiation", "Internship"],
    instructor: "Ajith Kumar",
    rating: 4.7,
    reviews: 43,
    certificationType: "Diploma",
    eligibility: "Plus Two minimum",
    modules_list: [],
  },
  {
    id: "mc-003",
    title: "Logistics & Supply Chain / Warehouse Management",
    shortTitle: "LSC",
    category: "Management",
    duration: "6 Months",
    durationBreakdown: "5 months classroom + 1 month internship",
    description:
      "End-to-end supply chain management, inventory control, warehouse operations, and logistics planning.",
    modules: 11,
    lessonsCount: 44,
    enrolledStudents: 62,
    progress: 0,
    color: "#D97706",
    icon: "Package",
    thumbnail: "/thumbnails/lsc.jpg",
    tags: ["Logistics", "Supply Chain", "Warehouse"],
    instructor: "Suresh Babu",
    rating: 4.5,
    reviews: 28,
    certificationType: "Diploma",
    eligibility: "Plus Two minimum",
    modules_list: [],
  },
  {
    id: "mc-004",
    title: "Hospital & Office Administration",
    shortTitle: "HOA",
    category: "Management",
    duration: "6 Months",
    durationBreakdown: "5 months classroom + 1 month internship",
    description:
      "Administrative skills for hospital and office environments: medical terminology, billing, reception management, and compliance.",
    modules: 9,
    lessonsCount: 36,
    enrolledStudents: 54,
    progress: 0,
    color: "#0891B2",
    icon: "Hospital",
    thumbnail: "/thumbnails/hoa.jpg",
    tags: ["Hospital", "Administration", "Medical"],
    instructor: "Deepa Rajendran",
    rating: 4.6,
    reviews: 31,
    certificationType: "Diploma",
    eligibility: "Plus Two minimum",
    modules_list: [],
  },
  {
    id: "mc-005",
    title: "Business & Office Administration",
    shortTitle: "BOA",
    category: "Management",
    duration: "6 Months",
    durationBreakdown: "5 months classroom + 1 month internship",
    description:
      "Complete office management, business communication, accounting basics, and corporate etiquette training.",
    modules: 10,
    lessonsCount: 40,
    enrolledStudents: 71,
    progress: 0,
    color: "#7C3AED",
    icon: "Building2",
    thumbnail: "/thumbnails/boa.jpg",
    tags: ["Business", "Office", "Communication"],
    instructor: "Meera Pillai",
    rating: 4.8,
    reviews: 47,
    certificationType: "Diploma",
    eligibility: "Plus Two minimum",
    modules_list: [],
  },
];

export const allCourses = [...technicalCourses, ...managementCourses];

// ─── Recent Lessons ───────────────────────────────────────────────────────────

export const recentLessons = [
  {
    id: "l-001",
    title: "Motherboard Schematic Reading",
    course: "SSR",
    duration: "42 min",
    completed: false,
    thumbnail: "purple",
    module: "Module 5",
    instructor: "Mohammed Shafi",
  },
  {
    id: "l-002",
    title: "BGA Chip Reballing Techniques",
    course: "SSR",
    duration: "38 min",
    completed: false,
    thumbnail: "blue",
    module: "Module 5",
    instructor: "Mohammed Shafi",
  },
  {
    id: "l-003",
    title: "OLED vs LCD — Deep Dive",
    course: "GCM",
    duration: "25 min",
    completed: true,
    thumbnail: "orange",
    module: "Module 1",
    instructor: "Rahul Menon",
  },
  {
    id: "l-004",
    title: "Payroll Calculations & PF",
    course: "HRM",
    duration: "31 min",
    completed: false,
    thumbnail: "green",
    module: "Module 3",
    instructor: "Fathima Nasser",
  },
  {
    id: "l-005",
    title: "Customer Handling — Role Play",
    course: "STU",
    duration: "28 min",
    completed: true,
    thumbnail: "purple",
    module: "Module 5",
    instructor: "Anoop Nair",
  },
];

// ─── Assignments ──────────────────────────────────────────────────────────────

export const assignments = [
  {
    id: "a-001",
    title: "PCB Fault Diagnosis Report",
    course: "SSR",
    dueDate: "2026-08-10",
    status: "pending",
    points: 50,
    type: "assignment",
    description: "Submit a detailed fault diagnosis report for the provided PCB samples using multimeter and oscilloscope readings.",
    feedback: null,
    grade: null,
    submittedAt: null,
  },
  {
    id: "a-002",
    title: "Payroll Calculation Exercise",
    course: "HRM",
    dueDate: "2026-08-07",
    status: "submitted",
    points: 30,
    type: "assignment",
    description: "Calculate gross salary, PF, ESI, and net salary for 10 sample employees.",
    feedback: "Good work! Minor errors in ESI calculation. Check the threshold limit.",
    grade: 26,
    submittedAt: "2026-08-05T10:30:00Z",
  },
  {
    id: "a-003",
    title: "Weekly Challenge: Fastest Glass Change",
    course: "GCM",
    dueDate: "2026-08-09",
    status: "graded",
    points: 100,
    type: "challenge",
    description: "Complete a full glass change on the practice device in under 20 minutes without defects. Video evidence required.",
    feedback: "Excellent technique! Completed in 18 min 42 sec. Top of the leaderboard this week!",
    grade: 95,
    submittedAt: "2026-08-04T14:15:00Z",
  },
  {
    id: "a-004",
    title: "Market Research: Mobile Repair Industry",
    course: "SSR",
    dueDate: "2026-08-15",
    status: "pending",
    points: 40,
    type: "assignment",
    description: "Prepare a 5-page market research report on the mobile repair industry in Kerala.",
    feedback: null,
    grade: null,
    submittedAt: null,
  },
  {
    id: "a-005",
    title: "Mock HR Interview",
    course: "HRM",
    dueDate: "2026-08-12",
    status: "overdue",
    points: 60,
    type: "assignment",
    description: "Conduct a mock HR interview with a classmate and submit a self-evaluation report.",
    feedback: null,
    grade: null,
    submittedAt: null,
  },
];

// ─── Attendance ───────────────────────────────────────────────────────────────

export const attendanceStats = {
  totalDays: 150,
  presentDays: 141,
  absentDays: 6,
  lateDays: 3,
  percentage: 94,
  leaveBalance: 6,
  consecutivePresent: 18,
};

export const attendanceCalendar = [
  // Week 1 of Aug 2026
  { date: "2026-08-03", status: "present" },
  { date: "2026-08-04", status: "present" },
  { date: "2026-08-05", status: "today" },
  // ... rest generated dynamically
];

export const punchHistory = [
  { date: "2026-08-04", punchIn: "09:02", punchOut: "05:45 PM", status: "present" },
  { date: "2026-08-03", punchIn: "08:58", punchOut: "05:30 PM", status: "present" },
  { date: "2026-08-02", punchIn: "09:15", punchOut: "05:20 PM", status: "late" },
  { date: "2026-08-01", punchIn: "--", punchOut: "--", status: "absent" },
  { date: "2026-07-31", punchIn: "09:00", punchOut: "05:45 PM", status: "present" },
];

// ─── Notifications ────────────────────────────────────────────────────────────

export const notifications = [
  {
    id: "n-001",
    title: "Fee Payment Reminder",
    message: "₹12,500 due on August 15, 2026. Avoid late payment penalty.",
    time: "2 hrs ago",
    type: "warning",
    read: false,
  },
  {
    id: "n-002",
    title: "Assignment Graded",
    message: "Your 'Weekly Challenge: Fastest Glass Change' has been graded. Score: 95/100",
    time: "5 hrs ago",
    type: "success",
    read: false,
  },
  {
    id: "n-003",
    title: "New Lesson Available",
    message: "Module 5: BGA Chip Reballing Techniques is now available.",
    time: "Yesterday",
    type: "info",
    read: true,
  },
  {
    id: "n-004",
    title: "Leaderboard Update",
    message: "You moved up to Rank #12! Keep pushing — Rank #10 is within reach.",
    time: "2 days ago",
    type: "success",
    read: true,
  },
];

// ─── Admin Data ───────────────────────────────────────────────────────────────

export const adminMetrics = {
  totalStudents: 1248,
  attendance: 94,
  feeCollection: "₹18.4L",
  placementRate: 95,
  activeCourses: 8,
  facultyCount: 24,
};

export const studentsList = [
  { id: "STU001", name: "Arjun Krishnan", batch: "2024-B", course: "SSR", attendance: 94, feeStatus: "pending", stage: "OJT", rank: 12 },
  { id: "STU002", name: "Priya Suresh", batch: "2024-B", course: "HRM", attendance: 98, feeStatus: "paid", stage: "Classroom", rank: 3 },
  { id: "STU003", name: "Rahul Mohan", batch: "2024-A", course: "SM", attendance: 87, feeStatus: "paid", stage: "Internship", rank: 28 },
  { id: "STU004", name: "Sneha Nair", batch: "2024-B", course: "GCM", attendance: 100, feeStatus: "paid", stage: "Classroom", rank: 1 },
  { id: "STU005", name: "Arun Thomas", batch: "2023-A", course: "SSR", attendance: 76, feeStatus: "overdue", stage: "OJT", rank: 89 },
  { id: "STU006", name: "Divya Pillai", batch: "2024-B", course: "BOA", attendance: 91, feeStatus: "paid", stage: "Classroom", rank: 18 },
  { id: "STU007", name: "Mohammed Riyas", batch: "2024-A", course: "LSC", attendance: 96, feeStatus: "paid", stage: "Internship", rank: 7 },
  { id: "STU008", name: "Anjali Menon", batch: "2024-B", course: "HOA", attendance: 89, feeStatus: "pending", stage: "Classroom", rank: 34 },
  { id: "STU009", name: "Vishnu Kumar", batch: "2023-B", course: "SSR", attendance: 82, feeStatus: "paid", stage: "OJT", rank: 56 },
  { id: "STU010", name: "Lakshmi Devi", batch: "2024-A", course: "HRM", attendance: 97, feeStatus: "paid", stage: "Classroom", rank: 5 },
];

export const enrollmentTrend = [
  { month: "Jan", students: 85, completed: 12 },
  { month: "Feb", students: 120, completed: 18 },
  { month: "Mar", students: 160, completed: 25 },
  { month: "Apr", students: 145, completed: 30 },
  { month: "May", students: 190, completed: 42 },
  { month: "Jun", students: 210, completed: 55 },
  { month: "Jul", students: 245, completed: 68 },
  { month: "Aug", students: 280, completed: 78 },
];

export const coursePerformance = [
  { course: "SSR", avgScore: 78, enrolled: 142 },
  { course: "HRM", avgScore: 84, enrolled: 89 },
  { course: "SM", avgScore: 76, enrolled: 76 },
  { course: "GCM", avgScore: 88, enrolled: 45 },
  { course: "LSC", avgScore: 71, enrolled: 62 },
  { course: "BOA", avgScore: 82, enrolled: 71 },
  { course: "HOA", avgScore: 79, enrolled: 54 },
  { course: "STU", avgScore: 91, enrolled: 58 },
];

export const feeCollectionData = [
  { month: "Apr", collected: 14.2, target: 16 },
  { month: "May", collected: 15.8, target: 16 },
  { month: "Jun", collected: 13.5, target: 16 },
  { month: "Jul", collected: 17.2, target: 16 },
  { month: "Aug", collected: 18.4, target: 16 },
];

// ─── Faculty Data ─────────────────────────────────────────────────────────────

export const facultyProfile = {
  name: "Mohammed Shafi",
  initials: "MS",
  role: "Senior Faculty — Technical",
  courses: ["SSR", "STU"],
  studentsCount: 200,
};

export const facultyAssignments = [
  { id: "fa-001", title: "PCB Fault Diagnosis Report", course: "SSR", dueDate: "2026-08-10", submissions: 28, total: 42, graded: 20 },
  { id: "fa-002", title: "Weekly Challenge: Fastest Glass Change", course: "GCM", dueDate: "2026-08-09", submissions: 38, total: 42, graded: 38 },
  { id: "fa-003", title: "Market Research: Mobile Repair Industry", course: "SSR", dueDate: "2026-08-15", submissions: 5, total: 42, graded: 0 },
];

export const studentPerformanceData = [
  { name: "Arjun K", score: 78 },
  { name: "Priya S", score: 92 },
  { name: "Rahul M", score: 65 },
  { name: "Sneha N", score: 95 },
  { name: "Arun T", score: 58 },
  { name: "Divya P", score: 81 },
  { name: "Mohammed R", score: 87 },
  { name: "Anjali M", score: 74 },
];

// ─── R.I.S.E Values ───────────────────────────────────────────────────────────

export const riseValues = [
  {
    letter: "R",
    value: "Respect",
    description: "We honor every student's potential and create an environment of mutual respect and dignity.",
    color: "#4C1D95",
    bg: "#EDE9FE",
  },
  {
    letter: "I",
    value: "Integrity",
    description: "We uphold the highest ethical standards in teaching, assessment, and placement.",
    color: "#F97316",
    bg: "#FFF7ED",
  },
  {
    letter: "S",
    value: "Social Responsibility",
    description: "We are committed to empowering communities through quality education and skill development.",
    color: "#059669",
    bg: "#ECFDF5",
  },
  {
    letter: "E",
    value: "Excellence",
    description: "We pursue excellence in every program, ensuring our graduates are industry-ready from day one.",
    color: "#0EA5E9",
    bg: "#F0F9FF",
  },
];

export const hiringPartners = [
  { name: "Google", logo: "G" },
  { name: "Amazon", logo: "A" },
  { name: "Infosys", logo: "I" },
  { name: "Razorpay", logo: "R" },
  { name: "Wipro", logo: "W" },
  { name: "TCS", logo: "T" },
  { name: "iQOO Service", logo: "iQ" },
  { name: "Samsung Care", logo: "S" },
];

// ─── Leaderboard ──────────────────────────────────────────────────────────────

export const leaderboard = [
  { rank: 1, name: "Sneha Nair", course: "GCM", points: 980, badge: "🥇" },
  { rank: 2, name: "Lakshmi Devi", course: "HRM", points: 965, badge: "🥈" },
  { rank: 3, name: "Priya Suresh", course: "HRM", points: 948, badge: "🥉" },
  { rank: 4, name: "Mohammed Riyas", course: "LSC", points: 932, badge: "" },
  { rank: 5, name: "Lakshmi Devi", course: "HRM", points: 921, badge: "" },
  { rank: 12, name: "Arjun Krishnan", course: "SSR", points: 845, badge: "⭐", isCurrentUser: true },
];

// ─── Exams ────────────────────────────────────────────────────────────────────

export const exams = [
  {
    id: "ex-001",
    title: "Mid-Term Technical Assessment",
    course: "SSR",
    date: "2026-08-20",
    time: "10:00 AM",
    duration: "3 hours",
    status: "upcoming",
    totalMarks: 100,
    passingMarks: 40,
    syllabus: ["Display Systems", "Battery & Charging", "Camera Module", "Motherboard Basics"],
  },
  {
    id: "ex-002",
    title: "Payroll Management Quiz",
    course: "HRM",
    date: "2026-07-25",
    time: "02:00 PM",
    duration: "1 hour",
    status: "completed",
    totalMarks: 50,
    passingMarks: 25,
    score: 43,
    grade: "A",
  },
  {
    id: "ex-003",
    title: "Practical Assessment — Glass Change",
    course: "GCM",
    date: "2026-08-12",
    time: "11:00 AM",
    duration: "2 hours",
    status: "upcoming",
    totalMarks: 100,
    passingMarks: 50,
  },
];

// ─── Performance Chart Data ───────────────────────────────────────────────────

export const performanceData = [
  { week: "W1", score: 72, avg: 65 },
  { week: "W2", score: 68, avg: 67 },
  { week: "W3", score: 75, avg: 68 },
  { week: "W4", score: 80, avg: 70 },
  { week: "W5", score: 78, avg: 71 },
  { week: "W6", score: 85, avg: 72 },
  { week: "W7", score: 82, avg: 73 },
  { week: "W8", score: 88, avg: 74 },
];
