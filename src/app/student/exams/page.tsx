"use client";

import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle2, Trophy, Lock, AlertCircle } from "lucide-react";
import { exams } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

export default function ExamsPage() {
  const upcoming = exams.filter((e) => e.status === "upcoming");
  const completed = exams.filter((e) => e.status === "completed");

  return (
    <div className="p-4 lg:p-6 pb-24">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Upcoming", value: upcoming.length, color: "text-purple-700", bg: "bg-purple-50" },
          { label: "Completed", value: completed.length, color: "text-emerald-700", bg: "bg-emerald-50" },
          { label: "Average Score", value: "86%", color: "text-blue-700", bg: "bg-blue-50" },
          { label: "Best Grade", value: "A+", color: "text-orange-700", bg: "bg-orange-50" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={cn("metric-card text-center", s.bg)}
          >
            <div className={cn("text-2xl font-black", s.color)}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 text-sm">Upcoming Exams</h3>
        {upcoming.map((exam, i) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-[14px] border border-purple-100 p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText size={22} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <h4 className="font-bold text-slate-800">{exam.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="badge-technical">{exam.course}</span>
                      <span className="badge-pending">Upcoming</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-purple-700">{exam.totalMarks}</div>
                    <div className="text-xs text-slate-400">Total Marks</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {[
                    { icon: <Clock size={13} />, label: "Date", value: formatDate(exam.date) },
                    { icon: <Clock size={13} />, label: "Time", value: exam.time },
                    { icon: <Clock size={13} />, label: "Duration", value: exam.duration },
                  ].map((info) => (
                    <div key={info.label} className="bg-slate-50 rounded-lg p-2.5">
                      <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-0.5">
                        {info.icon} {info.label}
                      </div>
                      <div className="text-sm font-semibold text-slate-700">{info.value}</div>
                    </div>
                  ))}
                </div>
                {exam.syllabus && (
                  <div className="mt-3">
                    <div className="text-xs font-semibold text-slate-500 mb-2">Syllabus Topics:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {exam.syllabus.map((topic) => (
                        <span key={topic} className="text-[10px] bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-100">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        <h3 className="font-bold text-slate-800 text-sm mt-6">Completed Exams</h3>
        {completed.map((exam, i) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-[14px] border border-emerald-100 p-5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={22} className="text-emerald-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">{exam.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="badge-technical">{exam.course}</span>
                  <span className="badge-graded">Graded</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-600">{exam.score}/{exam.totalMarks}</div>
                <div className="text-xs text-slate-400">Score</div>
                <div className="text-lg font-black text-purple-700">{exam.grade}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
