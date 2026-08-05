"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Users, BookOpen, TrendingUp, Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  duration: string;
  durationBreakdown: string;
  description: string;
  modules: number;
  lessonsCount: number;
  enrolledStudents: number;
  progress: number;
  color: string;
  tags: string[];
  instructor: string;
  rating: number;
  reviews: number;
  certificationType: string;
  index?: number;
}

export function CourseCard({
  id, title, shortTitle, category, duration, durationBreakdown,
  description, modules, lessonsCount, enrolledStudents, progress,
  color, tags, instructor, rating, reviews, certificationType, index = 0
}: CourseCardProps) {
  const isTechnical = category === "Technical";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-[14px] border border-slate-100 overflow-hidden cursor-pointer group"
      style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.03)" }}
    >


      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Short title badge */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow-sm"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
            >
              {shortTitle}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm leading-tight line-clamp-2 group-hover:text-purple-700 transition-colors">
                {title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={isTechnical ? "badge-technical" : "badge-management"}>
                  {category}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{certificationType}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">{description}</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
              <Clock size={11} />
              <span className="text-[10px]">Duration</span>
            </div>
            <div className="text-xs font-bold text-slate-700">{duration}</div>
          </div>
          <div className="text-center border-x border-slate-100">
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
              <BookOpen size={11} />
              <span className="text-[10px]">Modules</span>
            </div>
            <div className="text-xs font-bold text-slate-700">{modules}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
              <Users size={11} />
              <span className="text-[10px]">Enrolled</span>
            </div>
            <div className="text-xs font-bold text-slate-700">{enrolledStudents}</div>
          </div>
        </div>

        {/* Progress */}
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-slate-500 font-medium">Your Progress</span>
              <span className="text-[11px] font-bold" style={{ color }}>{progress}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, delay: index * 0.07 + 0.3 }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
              />
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full font-medium border border-slate-100">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div>
            <div className="flex items-center gap-1">
              <Star size={11} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-slate-700">{rating}</span>
              <span className="text-xs text-slate-400">({reviews})</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{instructor}</div>
          </div>
          <Link href={`/student/courses/${id}`}>
            <motion.button
              whileHover={{ x: 3 }}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style={{ color, background: `${color}15` }}
            >
              View Course
              <ArrowRight size={12} />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
