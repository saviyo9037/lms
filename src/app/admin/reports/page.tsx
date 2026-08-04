"use client";

import { motion } from "framer-motion";
import { studentPerformanceData, coursePerformance, enrollmentTrend } from "@/data/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#4C1D95", "#F97316", "#059669", "#0EA5E9", "#DC2626", "#D97706", "#7C3AED", "#0891B2"];

export default function AdminReportsPage() {
  return (
    <div className="p-4 lg:p-6 pb-24 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Performance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[14px] border border-slate-100 p-5"
        >
          <h3 className="font-bold text-slate-800 mb-4">Student Performance (SSR Batch)</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentPerformanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="score" fill="#4C1D95" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Enrollment by Course */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[14px] border border-slate-100 p-5"
        >
          <h3 className="font-bold text-slate-800 mb-4">Enrollment by Program</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={coursePerformance}
                  dataKey="enrolled"
                  nameKey="course"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={35}
                >
                  {coursePerformance.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Summary table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-[14px] border border-slate-100 p-5"
      >
        <h3 className="font-bold text-slate-800 mb-4">Program Performance Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {["Program", "Enrolled", "Avg Score", "Performance"].map((h) => (
                  <th key={h} className="pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pr-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {coursePerformance.map((course, i) => (
                <tr key={course.course} className="hover:bg-slate-50">
                  <td className="py-3 pr-6 font-semibold text-slate-800">{course.course}</td>
                  <td className="py-3 pr-6 text-slate-600">{course.enrolled}</td>
                  <td className="py-3 pr-6 font-bold text-purple-700">{course.avgScore}%</td>
                  <td className="py-3 pr-6">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-purple-600"
                          style={{ width: `${course.avgScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
