"use client";

import { motion } from "framer-motion";
import { Users, ClipboardList, Star, TrendingUp, ChevronRight } from "lucide-react";
import { facultyProfile, facultyAssignments, studentPerformanceData, coursePerformance } from "@/data/mockData";
import { MetricCard } from "@/components/shared/MetricCard";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import Link from "next/link";

export default function FacultyDashboard() {
  return (
    <div className="p-4 lg:p-6 pb-24 space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#0EA5E9] to-[#0369A1] rounded-[14px] p-5 text-white"
        style={{ boxShadow: "0 4px 24px rgba(14,165,233,0.25)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">Faculty Portal</div>
            <h2 className="text-xl font-black">Welcome, {facultyProfile.name} 👋</h2>
            <p className="text-blue-200 text-sm mt-1">{facultyProfile.role}</p>
            <div className="flex gap-2 mt-3">
              {facultyProfile.courses.map((c) => (
                <span key={c} className="text-[11px] bg-white/20 text-white px-2.5 py-0.5 rounded-full font-semibold">{c}</span>
              ))}
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-3xl font-black">{facultyProfile.studentsCount}</div>
            <div className="text-blue-200 text-xs">Students Under You</div>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard title="My Students" value={facultyProfile.studentsCount} icon={<Users size={18} className="text-blue-600" />} iconBg="bg-blue-100" delay={0} />
        <MetricCard title="Active Assignments" value={facultyAssignments.length} icon={<ClipboardList size={18} className="text-purple-600" />} iconBg="bg-purple-100" delay={0.07} />
        <MetricCard title="Pending Reviews" value={24} icon={<Star size={18} className="text-orange-600" />} iconBg="bg-orange-100" delay={0.14} />
        <MetricCard title="Avg Class Score" value="81%" icon={<TrendingUp size={18} className="text-emerald-600" />} iconBg="bg-emerald-100" progress={81} progressColor="green" delay={0.21} />
      </div>

      {/* Assignments Summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-[14px] border border-slate-100 p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">Assignment Submissions</h3>
          <Link href="/faculty/assignments" className="text-xs text-purple-600 font-semibold hover:text-purple-700">
            View All <ChevronRight size={14} className="inline" />
          </Link>
        </div>
        <div className="space-y-3">
          {facultyAssignments.map((a, i) => (
            <div key={a.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-800 truncate">{a.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-[10px]">{a.course}</Badge>
                  <span className="text-[11px] text-slate-400">Due: {a.dueDate}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-black text-slate-800">{a.submissions}/{a.total}</div>
                <div className="text-[10px] text-slate-400">Submitted</div>
                <div className="text-[11px] text-orange-600 font-semibold">{a.total - a.graded} to grade</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Student Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-[14px] border border-slate-100 p-5"
      >
        <h3 className="font-bold text-slate-800 mb-4">Student Performance — SSR Batch</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studentPerformanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Bar dataKey="score" fill="#4C1D95" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
