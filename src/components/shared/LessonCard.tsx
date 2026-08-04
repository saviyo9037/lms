"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Clock, CheckCircle2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  id: string;
  title: string;
  course: string;
  duration: string;
  completed: boolean;
  thumbnail: string;
  module: string;
  instructor: string;
  index?: number;
}

const thumbnailGradients: Record<string, string> = {
  purple: "from-purple-600 to-purple-800",
  blue: "from-sky-500 to-blue-700",
  orange: "from-orange-400 to-orange-600",
  green: "from-emerald-500 to-emerald-700",
};

export function LessonCard({
  id, title, course, duration, completed, thumbnail, module, instructor, index = 0
}: LessonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="lesson-card"
    >
      {/* Thumbnail */}
      <div className={cn(
        "h-28 relative overflow-hidden bg-gradient-to-br",
        thumbnailGradients[thumbnail] || thumbnailGradients.purple
      )}>
        {/* Decorative circles */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute -bottom-6 -left-2 w-16 h-16 bg-white/10 rounded-full" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          {completed ? (
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <CheckCircle2 size={22} className="text-white" />
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-11 h-11 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-lg"
            >
              <Play size={20} className="text-white fill-white ml-0.5" />
            </motion.div>
          )}
        </div>

        {/* Course badge */}
        <div className="absolute top-2 left-2">
          <span className="text-[10px] font-bold bg-black/30 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
            {course}
          </span>
        </div>

        {completed && (
          <div className="absolute top-2 right-2">
            <span className="text-[10px] font-bold bg-emerald-500/80 text-white px-2 py-0.5 rounded-full">
              Done
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">{module}</div>
        <div className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 mb-2">{title}</div>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Clock size={11} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={11} />
            <span className="truncate max-w-[80px]">{instructor.split(" ")[0]}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
