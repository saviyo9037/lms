"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Clock, GraduationCap } from "lucide-react";
import { allCourses } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function AdminAcademicsPage() {
  return (
    <div className="p-4 lg:p-6 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {allCourses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-[14px] border border-slate-100 p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}aa)` }}
              >
                {course.shortTitle}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm leading-tight line-clamp-1">{course.title}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={course.category === "Technical" ? "badge-technical" : "badge-management"}>
                    {course.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{course.duration}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center mb-3">
              <div className="bg-slate-50 rounded-lg p-2">
                <div className="text-sm font-black text-slate-800">{course.enrolledStudents}</div>
                <div className="text-[10px] text-slate-400">Students</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <div className="text-sm font-black text-slate-800">{course.modules}</div>
                <div className="text-[10px] text-slate-400">Modules</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <div className="text-sm font-black" style={{ color: course.color }}>{course.rating}★</div>
                <div className="text-[10px] text-slate-400">Rating</div>
              </div>
            </div>
            <div className="text-xs text-slate-500 mb-2">Completion Rate</div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${course.progress}%`, background: `linear-gradient(90deg, ${course.color}, ${course.color}88)` }}
              />
            </div>
            <div className="text-xs font-semibold mt-1" style={{ color: course.color }}>{course.progress}%</div>
            <div className="mt-2 text-[11px] text-slate-400">{course.instructor}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
