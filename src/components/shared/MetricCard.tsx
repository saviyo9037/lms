"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  iconBg?: string;
  progress?: number;
  progressColor?: "orange" | "purple" | "green" | "blue";
  trend?: { value: number; label: string };
  className?: string;
  delay?: number;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  iconBg = "bg-purple-100",
  progress,
  progressColor = "purple",
  trend,
  className,
  delay = 0,
}: MetricCardProps) {
  const progressColors = {
    orange: "from-orange-400 to-orange-500",
    purple: "from-purple-600 to-purple-700",
    green: "from-emerald-400 to-emerald-600",
    blue: "from-sky-400 to-sky-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={cn("metric-card", className)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="mt-1 text-2xl font-black text-slate-800 leading-none">{value}</div>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1.5 leading-snug">{subtitle}</p>
          )}
        </div>
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", iconBg)}>
          {icon}
        </div>
      </div>

      {progress !== undefined && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-slate-400">Progress</span>
            <span className="text-xs font-semibold text-slate-600">{progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
              className={cn("h-full rounded-full bg-gradient-to-r", progressColors[progressColor])}
            />
          </div>
        </div>
      )}

      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <span className={cn(
            "text-xs font-semibold",
            trend.value >= 0 ? "text-emerald-600" : "text-red-500"
          )}>
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-slate-400">{trend.label}</span>
        </div>
      )}
    </motion.div>
  );
}
