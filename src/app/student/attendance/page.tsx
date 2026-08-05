"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2, XCircle, AlertCircle, CalendarDays, Clock, TrendingUp,
  FileText, Send
} from "lucide-react";
import { attendanceStats, punchHistory } from "@/data/mockData";
import { MetricCard } from "@/components/shared/MetricCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Generate last 30 days heatmap data starting from Monday
function generateHeatmapDays() {
  const days = [];
  // Last 30 days ending today (Aug 5, 2026)
  const data: Record<string, string> = {
    "2026-07-07": "present", "2026-07-08": "present", "2026-07-09": "present", "2026-07-10": "present", "2026-07-11": "present", "2026-07-12": "present", "2026-07-13": "present",
    "2026-07-14": "present", "2026-07-15": "present", "2026-07-16": "present", "2026-07-17": "present", "2026-07-18": "present", "2026-07-19": "present", "2026-07-20": "present",
    "2026-07-21": "present", "2026-07-22": "present", "2026-07-23": "present", "2026-07-24": "present", "2026-07-25": "present", "2026-07-26": "present", "2026-07-27": "present",
    "2026-07-28": "present", "2026-07-29": "absent", "2026-07-30": "present", "2026-07-31": "late",
    "2026-08-01": "absent", "2026-08-02": "late", "2026-08-03": "present", "2026-08-04": "present", "2026-08-05": "today",
  };

  // Start from Monday July 7
  const start = new Date("2026-07-07");
  for (let i = 0; i < 35; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    const dateNum = String(d.getDate()).padStart(2, "0");
    const status = data[key] || (i >= 30 ? "future" : "weekend");
    days.push({ date: dateNum, key, status });
  }
  return days;
}

const heatmapDays = generateHeatmapDays();
const heatmapLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const calDays = heatmapDays;
const dayLabels = heatmapLabels;

export default function AttendancePage() {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState<string | null>(null);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [leaveSent, setLeaveSent] = useState(false);

  const handlePunch = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setIsPunchedIn(!isPunchedIn);
    setPunchTime(timeStr);
  };

  return (
    <div className="p-4 lg:p-6 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left — 2/3 */}
        <div className="lg:col-span-2 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MetricCard
              title="Attendance"
              value={`${attendanceStats.percentage}%`}
              subtitle={`${attendanceStats.presentDays} days present`}
              icon={<TrendingUp size={18} className="text-purple-600" />}
              iconBg="bg-purple-100"
              progress={attendanceStats.percentage}
              progressColor="purple"
              delay={0}
            />
            <MetricCard
              title="Present Days"
              value={attendanceStats.presentDays}
              subtitle={`of ${attendanceStats.totalDays} total`}
              icon={<CheckCircle2 size={18} className="text-emerald-600" />}
              iconBg="bg-emerald-100"
              delay={0.07}
            />
            <MetricCard
              title="Absent Days"
              value={attendanceStats.absentDays}
              subtitle="This semester"
              icon={<XCircle size={18} className="text-red-500" />}
              iconBg="bg-red-100"
              delay={0.14}
            />
            <MetricCard
              title="Leave Balance"
              value={attendanceStats.leaveBalance}
              subtitle="Days remaining"
              icon={<CalendarDays size={18} className="text-blue-600" />}
              iconBg="bg-blue-100"
              delay={0.21}
            />
          </div>

          {/* Attendance Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-[14px] border border-slate-100 p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-base">Attendance Heatmap (Last 30 Days)</h3>
                <p className="text-xs text-slate-400 mt-0.5">· 7-column 1:1 square matrix</p>
              </div>
              <a href="#" className="text-xs font-semibold text-orange-500 hover:underline">View attendance portal →</a>
            </div>

            {/* Day Column Labels */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {heatmapLabels.map((d) => (
                <div key={d} className="text-center text-[10px] font-bold text-slate-400 tracking-wider">{d}</div>
              ))}
            </div>

            {/* Heatmap Grid */}
            <div className="grid grid-cols-7 gap-2">
              {heatmapDays.map((d, i) => {
                const tileColor =
                  d.status === "today" ? "bg-green-100 border-green-300" :
                  d.status === "present" ? "bg-green-100 border-green-200" :
                  d.status === "absent" ? "bg-red-100 border-red-200" :
                  d.status === "late" ? "bg-orange-100 border-orange-200" :
                  d.status === "future" ? "bg-slate-100 border-slate-200" :
                  "bg-slate-50 border-slate-100";

                const dotColor =
                  d.status === "today" ? "bg-green-500" :
                  d.status === "present" ? "bg-green-500" :
                  d.status === "absent" ? "bg-red-500" :
                  d.status === "late" ? "bg-orange-400" :
                  "bg-slate-300";

                const dateColor =
                  d.status === "today" ? "text-green-800 font-black" :
                  d.status === "present" ? "text-green-800" :
                  d.status === "absent" ? "text-red-700" :
                  d.status === "late" ? "text-orange-700" :
                  "text-slate-400";

                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${tileColor}`}
                  >
                    <span className={`text-sm font-bold ${dateColor}`}>{d.date}</span>
                    <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                  </div>
                );
              })}
            </div>

            {/* Legend & Rate */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500"><div className="w-3 h-3 rounded-full bg-green-500" />Present</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500"><div className="w-3 h-3 rounded-full bg-orange-400" />Late</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500"><div className="w-3 h-3 rounded-full bg-red-500" />Absent</div>
              </div>
              <span className="text-sm font-black text-slate-800">{attendanceStats.percentage}% Attendance Rate</span>
            </div>
          </motion.div>

          {/* Punch History */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-[14px] border border-slate-100 p-5"
          >
            <h3 className="font-bold text-slate-800 mb-4">Recent Punch History</h3>
            <div className="space-y-2">
              {punchHistory.map((entry, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    entry.status === "present" ? "bg-purple-100" :
                    entry.status === "absent" ? "bg-red-100" : "bg-yellow-100"
                  )}>
                    {entry.status === "present" ? (
                      <CheckCircle2 size={16} className="text-purple-600" />
                    ) : entry.status === "absent" ? (
                      <XCircle size={16} className="text-red-500" />
                    ) : (
                      <AlertCircle size={16} className="text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-700">{entry.date}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>In: {entry.punchIn}</span>
                      {entry.punchOut !== "--" && <><span>·</span><span>Out: {entry.punchOut}</span></>}
                    </div>
                  </div>
                  <span className={cn(
                    "text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize",
                    entry.status === "present" ? "bg-purple-100 text-purple-700" :
                    entry.status === "absent" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-700"
                  )}>
                    {entry.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — 1/3 */}
        <div className="space-y-4">
          {/* Punch In/Out Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="punch-card"
          >
            <div className="text-orange-100 text-xs font-semibold uppercase tracking-wider mb-1">Today's Attendance</div>
            <div className="text-white text-2xl font-black">
              {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="text-orange-200 text-xs mb-5">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>

            {punchTime && (
              <div className="bg-white/20 rounded-xl px-3 py-2 mb-4 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-white" />
                <span className="text-white text-xs font-semibold">
                  {isPunchedIn ? `Punched In at ${punchTime}` : `Punched Out at ${punchTime}`}
                </span>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePunch}
              className={cn(
                "w-full py-3 rounded-xl font-bold text-sm transition-all duration-200",
                isPunchedIn
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-white text-orange-600 hover:bg-orange-50 shadow-md"
              )}
            >
              {isPunchedIn ? "⏹ Punch Out for Today" : "▶ Punch In for Today"}
            </motion.button>

            {/* Streak */}
            <div className="mt-4 bg-white/20 rounded-xl px-4 py-3 text-center">
              <div className="text-white font-black text-2xl">{attendanceStats.consecutivePresent}</div>
              <div className="text-orange-100 text-xs">Day Streak 🔥</div>
            </div>
          </motion.div>

          {/* Leave Request */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-[14px] border border-slate-100 p-4"
          >
            <h4 className="font-bold text-slate-800 text-sm mb-1">Apply for Leave</h4>
            <p className="text-xs text-slate-500 mb-4">{attendanceStats.leaveBalance} days remaining</p>

            <Dialog open={leaveOpen} onOpenChange={setLeaveOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-[#4C1D95] hover:bg-purple-800 rounded-xl text-sm h-10">
                  <FileText size={15} className="mr-2" />
                  Request Leave
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-[16px] max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-bold">Leave Application</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">From Date</Label>
                      <Input type="date" className="rounded-xl text-sm h-10" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">To Date</Label>
                      <Input type="date" className="rounded-xl text-sm h-10" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">Leave Type</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl text-sm h-10">
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="medical">Medical Leave</SelectItem>
                        <SelectItem value="personal">Personal Leave</SelectItem>
                        <SelectItem value="family">Family Emergency</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">Reason</Label>
                    <Textarea
                      placeholder="Briefly explain your reason..."
                      className="rounded-xl text-sm resize-none"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setLeaveOpen(false)} className="rounded-xl">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => { setLeaveSent(true); setTimeout(() => { setLeaveOpen(false); setLeaveSent(false); }, 1500); }}
                    className="bg-[#4C1D95] hover:bg-purple-800 rounded-xl"
                  >
                    {leaveSent ? <><CheckCircle2 size={14} className="mr-1" /> Submitted!</> : <><Send size={14} className="mr-1" /> Submit Request</>}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-[14px] p-4 text-white"
          >
            <div className="text-purple-200 text-xs font-semibold uppercase tracking-wider mb-3">Attendance Summary</div>
            <div className="space-y-2">
              {[
                { label: "Total Working Days", value: attendanceStats.totalDays },
                { label: "Days Present", value: attendanceStats.presentDays },
                { label: "Days Absent", value: attendanceStats.absentDays },
                { label: "Late Arrivals", value: attendanceStats.lateDays },
              ].map((s) => (
                <div key={s.label} className="flex justify-between items-center py-1.5 border-b border-purple-500/30 last:border-0">
                  <span className="text-purple-200 text-xs">{s.label}</span>
                  <span className="text-white font-bold text-sm">{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
