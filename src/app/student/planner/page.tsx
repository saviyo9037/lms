"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Clock, Sparkles, AlertTriangle, CheckCircle2, Play,
  BookOpen, Brain, Zap, Layers, RefreshCw, BarChart3, Plus
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
  const [timerSeconds, setTimerSeconds] = useState(1500);

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
            <Badge className="bg-orange-500 text-white font-bold text-[10px] uppercase tracking-wider">
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
                      ? "border-purple-500 bg-purple-50/40 ring-2 ring-purple-500/20"
                      : item.status === "completed"
                      ? "border-slate-200 bg-slate-50/60 opacity-80"
                      : "border-slate-100 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        item.status === "active"
                          ? "bg-purple-600 text-white"
                          : item.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
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
                        <span className="text-xs font-mono text-slate-500 font-semibold">{item.time}</span>
                        <Badge variant="outline" className="text-[10px] py-0 px-2 rounded-full">
                          {item.type}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mt-0.5 m-0">{item.title}</h4>
                      <p className="text-xs text-slate-500 m-0 mt-0.5">{item.course}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-end shrink-0">
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {item.duration}
                    </span>
                    {item.status === "active" && (
                      <Button
                        size="sm"
                        onClick={() => setFocusActive(true)}
                        className="bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold gap-1.5"
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
          <Card className="p-5 rounded-2xl border-amber-200 bg-amber-50/50 flex items-start gap-4">
            <div className="p-2.5 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="font-bold text-amber-900 text-sm m-0">High Workload Bottleneck Detected (Thursday)</h4>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed m-0">
                You have 2 Lab Assignment submissions and a Communication Review scheduled on Thursday. AI Recommendation: Complete 45 mins of BGA Circuit diagrams today to smooth your effort.
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column: Diagnostic Concept Mastery & Focus Widget */}
        <div className="space-y-6">
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
          <Card className="p-5 rounded-2xl border-slate-100 bg-gradient-to-br from-slate-900 to-purple-950 text-white shadow-md space-y-4 text-center">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Pomodoro Focus Timer</span>
              <Badge className="bg-purple-500/20 text-purple-200 text-[10px]">25m / 5m Cycle</Badge>
            </div>

            <div className="text-4xl font-black font-mono tracking-tight text-white py-2">
              25 : 00
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={() => setFocusActive(!focusActive)}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold px-6 py-2 shadow-md"
              >
                {focusActive ? "Pause Timer" : "Start 25m Focus"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
