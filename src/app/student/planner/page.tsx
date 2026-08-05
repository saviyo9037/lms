"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Clock, Sparkles, AlertTriangle, CheckCircle2, Play, Pause,
  BookOpen, Brain, Zap, Layers, RefreshCw, BarChart3, Plus, RotateCcw
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const INITIAL_SCHEDULE = [
  { time: "09:00 AM - 10:30 AM", title: "Micro-Lesson: Motherboard Architecture", type: "Reading", course: "Smartphone Re-Engineering", duration: "90m", status: "completed" },
  { time: "11:00 AM - 12:15 PM", title: "Socratic Practice: Power IC Fault Diagnosis", type: "AI Practice", course: "Advanced Electronics", duration: "75m", status: "active" },
  { time: "02:00 PM - 03:30 PM", title: "Lab Prep: BGA Chip Re-balling Hands-on", type: "Lab Prep", course: "Practical Hardware", duration: "90m", status: "upcoming" },
  { time: "04:30 PM - 05:30 PM", title: "AI Spaced Repetition Flashcards Review", type: "Memory Revision", course: "General Tech Terms", duration: "60m", status: "upcoming" },
];

const WEAK_CONCEPTS = [
  { topic: "Qualcomm Power IC Circuitry", mastery: 42, recommendation: "Watch 12m remedial video & attempt 5 practice questions" },
  { topic: "Android Boot Sequence Debugging", mastery: 58, recommendation: "Review diagnostic flowchart node 4.2" },
  { topic: "Multi-meter Resistance Diagnostics", mastery: 85, recommendation: "Mastered — Keep revision every 7 days" },
];

export default function AIStudyPlannerPage() {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [focusActive, setFocusActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(1500); // 25 mins = 1500s
  const [timerMode, setTimerMode] = useState<"work" | "break">("work");

  // Pomodoro real-time countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (focusActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && focusActive) {
      if (timerMode === "work") {
        setTimerMode("break");
        setTimerSeconds(300); // 5 min break
      } else {
        setTimerMode("work");
        setTimerSeconds(1500); // 25 min work
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [focusActive, timerSeconds, timerMode]);

  const switchMode = (mode: "work" | "break") => {
    setTimerMode(mode);
    setFocusActive(false);
    setTimerSeconds(mode === "work" ? 1500 : 300);
  };

  const resetTimer = () => {
    setFocusActive(false);
    setTimerSeconds(timerMode === "work" ? 1500 : 300);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")} : ${String(secs).padStart(2, "0")}`;
  };

  const totalMax = timerMode === "work" ? 1500 : 300;
  const progressPercent = Math.round(((totalMax - timerSeconds) / totalMax) * 100);

  const regenerateSchedule = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="p-4 lg:p-6 pb-24 space-y-6">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="purple-gradient-card rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="space-y-1.5 max-w-xl z-10">
          <div className="flex items-center gap-2">
            <Badge className="bg-orange-500 border-none text-white font-bold text-[10px] uppercase tracking-wider">
              AI Adaptive Engine Active
            </Badge>
            <span className="text-purple-200 text-xs flex items-center gap-1">
              <Sparkles size={13} className="text-amber-300" /> High Workload Optimization Enabled
            </span>
          </div>
          <h1 className="text-2xl font-black text-white m-0">AI Personalized Study Planner</h1>
          <p className="text-xs text-purple-100/90 leading-relaxed">
            Your schedule is dynamically adjusted based on assignment deadlines, concept mastery scores, and your daily peak cognitive energy hours.
          </p>
        </div>

        <Button
          onClick={regenerateSchedule}
          disabled={isGenerating}
          className="bg-white text-purple-900 hover:bg-purple-50 font-bold rounded-xl shadow-lg border-none shrink-0 text-xs flex items-center gap-2 z-10"
        >
          <RefreshCw size={15} className={isGenerating ? "animate-spin text-purple-700" : "text-purple-700"} />
          {isGenerating ? "Re-optimizing..." : "Re-Optimize My Schedule"}
        </Button>
      </motion.div>

      {/* Grid Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: AI Recommended Daily Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5 rounded-2xl border-slate-100 shadow-sm bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-purple-600" />
                <h3 className="font-bold text-slate-800 text-base m-0">Today's Optimized Schedule</h3>
              </div>
              <Badge className="bg-purple-50 text-purple-700 font-semibold text-xs border border-purple-200">
                4 Sessions (4.5h Total)
              </Badge>
            </div>

            <div className="space-y-3">
              {schedule.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    item.status === "active"
                      ? "border-purple-500 bg-purple-50/50 dark:bg-purple-950/40 ring-2 ring-purple-500/20"
                      : item.status === "completed"
                      ? "border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40"
                      : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        item.status === "active"
                          ? "bg-purple-600 text-white shadow-sm"
                          : item.status === "completed"
                          ? "bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-400"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {item.status === "completed" ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <Clock size={18} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">{item.time}</span>
                        <Badge variant="outline" className="text-[10px] py-0 px-2 rounded-full border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                          {item.type}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mt-0.5 m-0">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-purple-300/80 m-0 mt-0.5">{item.course}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-end shrink-0">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      {item.duration}
                    </span>
                    {item.status === "active" && (
                      <Button
                        size="sm"
                        onClick={() => setFocusActive(true)}
                        className="bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold gap-1.5 shadow-sm"
                      >
                        <Play size={13} /> Start Focus Mode
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Workload Warning Alert */}
          <Card className="p-5 rounded-2xl border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/30 flex items-start gap-4">
            <div className="p-2.5 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5 shadow-sm">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="font-bold text-amber-900 dark:text-amber-300 text-sm m-0">High Workload Bottleneck Detected (Thursday)</h4>
              <p className="text-xs text-amber-800 dark:text-amber-200/90 mt-1 leading-relaxed m-0">
                You have 2 Lab Assignment submissions and a Communication Review scheduled on Thursday. AI Recommendation: Complete 45 mins of BGA Circuit diagrams today to smooth your effort.
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column: Diagnostic Concept Mastery & Focus Widget */}
        <div className="space-y-6 flex flex-col">
          {/* Concept Mastery Radar / Diagnostics */}
          <Card className="p-5 rounded-2xl border-slate-100 bg-white shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Brain size={18} className="text-purple-600" />
              <h3 className="font-bold text-slate-800 text-base m-0">Diagnostic Concept Mastery</h3>
            </div>
            <p className="text-xs text-slate-500 m-0">
              Evaluated based on your continuous quiz retakes & assignment performance.
            </p>

            <div className="space-y-4 pt-2">
              {WEAK_CONCEPTS.map((c, i) => (
                <div key={i} className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>{c.topic}</span>
                    <span className={c.mastery < 50 ? "text-red-600 font-bold" : c.mastery < 75 ? "text-amber-600 font-bold" : "text-green-600 font-bold"}>
                      {c.mastery}%
                    </span>
                  </div>
                  <Progress value={c.mastery} className="h-1.5 bg-slate-200" />
                  <p className="text-[11px] text-slate-500 m-0 flex items-center gap-1 mt-1">
                    <Zap size={11} className="text-purple-600 shrink-0" /> {c.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Pomodoro Timer Box */}
          <Card className="p-5 rounded-2xl border-purple-900/40 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white shadow-md flex-1 flex flex-col justify-between text-center space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Pomodoro Focus Timer</span>
              <div className="flex items-center gap-1 bg-white/10 rounded-lg p-0.5 border border-white/10">
                <button
                  onClick={() => switchMode("work")}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-all ${
                    timerMode === "work" ? "bg-purple-600 text-white shadow-sm" : "text-purple-200 hover:text-white"
                  }`}
                >
                  25m Work
                </button>
                <button
                  onClick={() => switchMode("break")}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-all ${
                    timerMode === "break" ? "bg-emerald-600 text-white shadow-sm" : "text-purple-200 hover:text-white"
                  }`}
                >
                  5m Break
                </button>
              </div>
            </div>

            <div className="space-y-2 py-2">
              <div className="text-4xl font-black font-mono tracking-wider text-white">
                {formatTimer(timerSeconds)}
              </div>
              <p className="text-[11px] text-purple-200/80 m-0">
                {timerMode === "work" ? "🔥 High-Focus Study Session" : "☕Short Recovery Break"}
              </p>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-3">
                <div
                  className={`h-full transition-all duration-300 ${
                    timerMode === "work" ? "bg-gradient-to-r from-purple-500 to-orange-500" : "bg-gradient-to-r from-emerald-500 to-teal-400"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-auto pt-2">
              <Button
                onClick={() => setFocusActive(!focusActive)}
                className={`rounded-xl text-xs font-bold px-5 py-2 shadow-md gap-1.5 transition-all ${
                  focusActive
                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                    : timerMode === "work"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {focusActive ? <Pause size={14} /> : <Play size={14} />}
                {focusActive ? "Pause Timer" : timerMode === "work" ? "Start 25m Focus" : "Start 5m Break"}
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={resetTimer}
                className="w-8 h-8 rounded-xl border-white/20 bg-white/10 text-purple-200 hover:text-white hover:bg-white/20 shrink-0"
                title="Reset Timer"
              >
                <RotateCcw size={13} />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
