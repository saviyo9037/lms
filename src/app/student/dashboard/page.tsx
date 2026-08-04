"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, BookOpen, Calendar, Trophy, Clock, ChevronRight,
  AlertCircle, IndianRupee, Zap, Target, Award, CheckCircle2,
  Play, ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { MetricCard } from "@/components/shared/MetricCard";
import { LessonCard } from "@/components/shared/LessonCard";
import {
  currentStudent, recentLessons, notifications, performanceData, leaderboard
} from "@/data/mockData";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

export default function StudentDashboard() {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const handlePunch = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setIsPunchedIn(!isPunchedIn);
    setPunchTime(timeStr);
  };

  // Avoid hydration mismatch for time-dependent content
  const today = new Date();
  const hour = mounted ? today.getHours() : 12;
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const miniCalDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 3 + i);
    return {
      day: dayNames[d.getDay()],
      date: d.getDate(),
      isToday: i === 3,
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
      status: i < 3 ? (i === 1 ? "absent" : "present") : i === 3 ? "today" : "future",
    };
  });

  return (
    <div className="p-4 lg:p-6 space-y-6 pb-24">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#6D28D9] p-6 text-white shadow-lg shadow-purple-900/15 border border-purple-500/20"
      >
        {/* Subtle glow effect */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-amber-300 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                Good {hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening"} 👋
              </div>
              <h2 className="text-2xl font-black leading-tight text-white drop-shadow-sm m-0">
                {currentStudent.name}
              </h2>
              <p className="text-purple-100/90 text-sm mt-1 font-medium">{currentStudent.program}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-purple-200 text-[11px] font-semibold">Roll No.</div>
              <div className="text-white font-black text-sm tracking-wide">{currentStudent.rollNo}</div>
              <div className="mt-1.5 inline-flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                <Zap size={12} />
                {currentStudent.stage} · Month {currentStudent.stageMonth}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="flex justify-between text-xs mb-1.5 font-semibold">
              <span className="text-purple-100">Overall Program Progress</span>
              <span className="text-white font-black text-sm">{currentStudent.courseProgress}%</span>
            </div>
            <div className="h-2.5 bg-black/20 backdrop-blur-xs rounded-full overflow-hidden p-0.5 border border-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentStudent.courseProgress}%` }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-orange-400 to-amber-300 rounded-full shadow-xs"
              />
            </div>
            <div className="flex justify-between text-[11px] text-purple-200/90 font-medium mt-1.5">
              <span>Month {currentStudent.stageMonth} of {currentStudent.stageTotalMonths}</span>
              <span>{currentStudent.stageTotalMonths - currentStudent.stageMonth} months remaining</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metric Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
      >
        <MetricCard
          title="Course Progress"
          value={`${currentStudent.courseProgress}%`}
          subtitle="SSR · Module 5 of 8"
          icon={<BookOpen size={18} className="text-orange-600" />}
          iconBg="bg-orange-100"
          progress={currentStudent.courseProgress}
          progressColor="orange"
          delay={0}
        />
        <MetricCard
          title="Attendance"
          value={`${currentStudent.attendance}%`}
          subtitle="141 / 150 days present"
          icon={<CheckCircle2 size={18} className="text-purple-600" />}
          iconBg="bg-purple-100"
          progress={currentStudent.attendance}
          progressColor="purple"
          delay={0.07}
        />
        <MetricCard
          title="Program Stage"
          value="OJT"
          subtitle={`Month ${currentStudent.stageMonth} of ${currentStudent.stageTotalMonths}`}
          icon={<Target size={18} className="text-blue-600" />}
          iconBg="bg-blue-100"
          trend={{ value: 8, label: "months ahead" }}
          delay={0.14}
        />
        <MetricCard
          title="Leaderboard Rank"
          value={`#${currentStudent.leaderboardRank}`}
          subtitle={`Out of ${currentStudent.totalStudents} students`}
          icon={<Trophy size={18} className="text-yellow-600" />}
          iconBg="bg-yellow-100"
          trend={{ value: 3, label: "since last week" }}
          delay={0.21}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left column — 2/3 */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Recent Lessons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-800">Continue Learning</h3>
                <p className="text-xs text-slate-500 mt-0.5">Pick up where you left off</p>
              </div>
              <Link href="/student/courses" className="flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                All Courses <ChevronRight size={14} />
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {recentLessons.map((lesson, idx) => (
                <LessonCard key={lesson.id} {...lesson} index={idx} />
              ))}
            </div>
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-[14px] border border-slate-100 p-5"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800">Performance Trend</h3>
                <p className="text-xs text-slate-500 mt-0.5">Weekly scores vs class average</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-1 bg-purple-600 rounded-full" />
                  <span className="text-slate-500">You</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-1 bg-slate-300 rounded-full" />
                  <span className="text-slate-500">Class avg</span>
                </div>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4C1D95" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#4C1D95" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[50, 100]} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
                    labelStyle={{ fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="avg" stroke="#cbd5e1" strokeWidth={2} fill="url(#avgGrad)" dot={false} />
                  <Area type="monotone" dataKey="score" stroke="#4C1D95" strokeWidth={2.5} fill="url(#scoreGrad)" dot={{ fill: "#4C1D95", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Fee Reminder */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-[14px] p-4 flex items-start gap-3"
          >
            <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <IndianRupee size={18} className="text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-amber-900 text-sm">Fee Payment Due</div>
              <div className="text-xs text-amber-700 mt-0.5">
                ₹{currentStudent.pendingFee.toLocaleString("en-IN")} due on August 15, 2026
              </div>
              <div className="text-[11px] text-amber-600 mt-1">Avoid late fee penalty of ₹500</div>
            </div>
            <button className="text-xs font-semibold bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors flex-shrink-0">
              Pay Now
            </button>
          </motion.div>
        </div>

        {/* Right column — 1/3 */}
        <div className="space-y-4">
          {/* Punch In/Out */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="punch-card"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-orange-100 text-xs font-semibold uppercase tracking-wider">Today</div>
                <div className="text-white font-black text-lg leading-tight">Attendance</div>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <CalendarIcon />
              </div>
            </div>

            <div className="text-white text-2xl font-black mb-1">
              {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="text-orange-100 text-xs mb-4">
              {today.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
            </div>

            {punchTime && (
              <div className="text-xs text-orange-100 mb-3 flex items-center gap-1">
                <CheckCircle2 size={12} />
                {isPunchedIn ? `Punched In at ${punchTime}` : `Punched Out at ${punchTime}`}
              </div>
            )}

            <button
              onClick={handlePunch}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                isPunchedIn
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-white text-orange-600 hover:bg-orange-50 shadow-md"
              }`}
            >
              {isPunchedIn ? "⏹ Punch Out" : "▶ Punch In"}
            </button>

            <div className="mt-3 grid grid-cols-3 gap-1 text-center">
              {[
                { label: "Present", value: "141" },
                { label: "Absent", value: "6" },
                { label: "Late", value: "3" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-white font-black text-lg leading-none">{s.value}</div>
                  <div className="text-orange-100 text-[10px] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mini Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-[14px] border border-slate-100 p-4"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-slate-800 text-sm">This Week</h4>
              <Link href="/student/attendance" className="text-xs text-purple-600 font-semibold hover:text-purple-700">
                Full View →
              </Link>
            </div>
            <div className="flex gap-1">
              {miniCalDays.map((d, i) => (
                <div key={i} className="flex-1 text-center">
                  <div className="text-[10px] text-slate-400 mb-1">{d.day}</div>
                  <div className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                    d.status === "today" ? "bg-orange-500 text-white" :
                    d.status === "present" ? "bg-purple-100 text-purple-700" :
                    d.status === "absent" ? "bg-red-100 text-red-500" :
                    "text-slate-300"
                  }`}>
                    {d.date}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3 text-[10px] text-slate-400">
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-purple-100 rounded-full border border-purple-300" />Present</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-100 rounded-full border border-red-300" />Absent</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-500 rounded-full" />Today</div>
            </div>
          </motion.div>

          {/* Leaderboard Snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="bg-white rounded-[14px] border border-slate-100 p-4"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <Trophy size={15} className="text-yellow-500" /> Leaderboard
              </h4>
              <span className="text-xs text-slate-400">Top 5</span>
            </div>
            <div className="space-y-2">
              {leaderboard.slice(0, 5).map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-2.5 p-2 rounded-lg ${
                    entry.isCurrentUser ? "bg-purple-50 border border-purple-100" : "hover:bg-slate-50"
                  } transition-colors`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
                    entry.rank === 1 ? "bg-yellow-400 text-yellow-900" :
                    entry.rank === 2 ? "bg-slate-300 text-slate-700" :
                    entry.rank === 3 ? "bg-amber-600 text-white" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {entry.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold truncate ${entry.isCurrentUser ? "text-purple-700" : "text-slate-700"}`}>
                      {entry.name} {entry.isCurrentUser && "(You)"}
                    </div>
                    <div className="text-[10px] text-slate-400">{entry.course}</div>
                  </div>
                  <div className="text-xs font-bold text-slate-600">{entry.points}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white rounded-[14px] border border-slate-100 p-4"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }}
          >
            <h4 className="font-bold text-slate-800 text-sm mb-3">Recent Alerts</h4>
            <div className="space-y-2.5">
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} className="flex gap-2.5 items-start">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    n.type === "warning" ? "bg-amber-500" :
                    n.type === "success" ? "bg-emerald-500" : "bg-blue-500"
                  } ${!n.read ? "opacity-100" : "opacity-40"}`} />
                  <div>
                    <div className={`text-xs font-semibold ${!n.read ? "text-slate-800" : "text-slate-400"}`}>
                      {n.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{n.message}</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
