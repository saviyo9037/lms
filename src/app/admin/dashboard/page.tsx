"use client";

import { motion } from "framer-motion";
import {
  Users, TrendingUp, IndianRupee, Award, BookOpen, UserCheck,
  GraduationCap, ArrowUpRight, ChevronRight
} from "lucide-react";
import {
  adminMetrics, enrollmentTrend, coursePerformance, feeCollectionData, studentsList
} from "@/data/mockData";
import { MetricCard } from "@/components/shared/MetricCard";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, LineChart, Line, Legend
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-4 lg:p-6 pb-24 space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#4C1D95] to-[#7C3AED] rounded-[14px] p-5 text-white"
        style={{ boxShadow: "0 4px 24px rgba(76,29,149,0.25)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-purple-200 text-xs font-semibold uppercase tracking-wider mb-1">Admin Portal</div>
            <h2 className="text-xl font-black">Welcome back, Najma 👋</h2>
            <p className="text-purple-200 text-sm mt-1">Apzxrtra Institute of Management & Technology</p>
            <p className="text-purple-300 text-xs mt-0.5">Perinthalmanna, Kerala · Founded by Najma</p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-3xl font-black text-orange-300">{adminMetrics.totalStudents.toLocaleString()}</div>
            <div className="text-purple-200 text-xs">Active Students</div>
          </div>
        </div>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <MetricCard
          title="Total Students"
          value={adminMetrics.totalStudents.toLocaleString()}
          subtitle="Across all programs"
          icon={<Users size={18} className="text-purple-600" />}
          iconBg="bg-purple-100"
          trend={{ value: 12, label: "vs last month" }}
          delay={0}
        />
        <MetricCard
          title="Attendance Rate"
          value={`${adminMetrics.attendance}%`}
          subtitle="Institute-wide average"
          icon={<UserCheck size={18} className="text-emerald-600" />}
          iconBg="bg-emerald-100"
          progress={adminMetrics.attendance}
          progressColor="green"
          delay={0.07}
        />
        <MetricCard
          title="Fee Collection"
          value={adminMetrics.feeCollection}
          subtitle="This academic month"
          icon={<IndianRupee size={18} className="text-orange-600" />}
          iconBg="bg-orange-100"
          trend={{ value: 7, label: "above target" }}
          delay={0.14}
        />
        <MetricCard
          title="Placement Rate"
          value={`${adminMetrics.placementRate}%`}
          subtitle="Industry placements"
          icon={<Award size={18} className="text-yellow-600" />}
          iconBg="bg-yellow-100"
          progress={adminMetrics.placementRate}
          progressColor="orange"
          delay={0.21}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Enrollment Trend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-[14px] border border-slate-100 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800">Enrollment Trend</h3>
              <p className="text-xs text-slate-500 mt-0.5">New students per month — 2026</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-3 h-1 bg-purple-600 rounded-full" /><span className="text-slate-500">Enrolled</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-1 bg-orange-400 rounded-full" /><span className="text-slate-500">Completed</span></div>
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4C1D95" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#4C1D95" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Area type="monotone" dataKey="students" stroke="#4C1D95" strokeWidth={2} fill="url(#enrollGrad)" dot={false} />
                <Area type="monotone" dataKey="completed" stroke="#F97316" strokeWidth={2} fill="url(#compGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Course Performance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[14px] border border-slate-100 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800">Course Performance</h3>
              <p className="text-xs text-slate-500 mt-0.5">Average score by program</p>
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursePerformance} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="course" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
                  formatter={(value) => [`${value}%`, "Avg Score"]}
                />
                <Bar dataKey="avgScore" fill="#4C1D95" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Fee Collection chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-[14px] border border-slate-100 p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-800">Fee Collection vs Target</h3>
            <p className="text-xs text-slate-500 mt-0.5">Monthly collection in Lakhs (₹)</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-black text-slate-800">{adminMetrics.feeCollection}</div>
            <div className="text-xs text-emerald-600 font-semibold">↑ 7% above target</div>
          </div>
        </div>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={feeCollectionData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
                formatter={(value) => [`₹${value}L`, ""]}
              />
              <Bar dataKey="collected" name="Collected" fill="#4C1D95" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="target" name="Target" fill="#e2e8f0" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-[14px] border border-slate-100 p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">Recent Students</h3>
          <Link href="/admin/students" className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
            View All <ChevronRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-100">
                {["Student", "Course", "Batch", "Attendance", "Fee", "Stage"].map((h) => (
                  <th key={h} className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider pr-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {studentsList.slice(0, 6).map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-bold flex-shrink-0">
                        {student.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-xs">{student.name}</div>
                        <div className="text-[10px] text-slate-400">{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="badge-technical">{student.course}</span>
                  </td>
                  <td className="py-3 pr-4 text-xs text-slate-600">{student.batch}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-purple-600"
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={cn(
                      "text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize",
                      student.feeStatus === "paid" ? "bg-emerald-100 text-emerald-700" :
                      student.feeStatus === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-600"
                    )}>
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="text-xs text-slate-600">{student.stage}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Bottom metric row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Active Courses", value: adminMetrics.activeCourses, icon: <BookOpen size={18} className="text-blue-600" />, bg: "bg-blue-100" },
          { label: "Faculty Members", value: adminMetrics.facultyCount, icon: <GraduationCap size={18} className="text-purple-600" />, bg: "bg-purple-100" },
          { label: "This Month Graduates", value: 18, icon: <Award size={18} className="text-yellow-600" />, bg: "bg-yellow-100" },
          { label: "Avg Leaderboard Score", value: "782 pts", icon: <TrendingUp size={18} className="text-emerald-600" />, bg: "bg-emerald-100" },
        ].map((card, i) => (
          <MetricCard
            key={card.label}
            title={card.label}
            value={card.value}
            icon={card.icon}
            iconBg={card.bg}
            delay={i * 0.05}
          />
        ))}
      </div>
    </div>
  );
}
