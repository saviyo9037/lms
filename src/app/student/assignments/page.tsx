"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList, Upload, Star, Clock, CheckCircle2, AlertCircle,
  ChevronRight, Zap, MessageSquare, Trophy
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assignments } from "@/data/mockData";
import { formatDate, getDaysUntil } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending: { label: "Pending", className: "badge-pending", icon: <Clock size={12} /> },
  submitted: { label: "Submitted", className: "badge-submitted", icon: <CheckCircle2 size={12} /> },
  graded: { label: "Graded", className: "badge-graded", icon: <Star size={12} /> },
  overdue: { label: "Overdue", className: "badge-overdue", icon: <AlertCircle size={12} /> },
};

export default function AssignmentsPage() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<typeof assignments[0] | null>(null);
  const [uploadText, setUploadText] = useState("");
  const [uploadDone, setUploadDone] = useState(false);

  const handleUpload = () => {
    setUploadDone(true);
    setTimeout(() => {
      setUploadOpen(false);
      setUploadDone(false);
      setUploadText("");
    }, 1500);
  };

  const pending = assignments.filter((a) => a.status === "pending");
  const submitted = assignments.filter((a) => a.status === "submitted" || a.status === "graded");
  const overdue = assignments.filter((a) => a.status === "overdue");
  const challenges = assignments.filter((a) => a.type === "challenge");

  return (
    <div className="p-4 lg:p-6 pb-24">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: assignments.length, color: "text-slate-700 dark:text-slate-100", bg: "bg-slate-100 dark:bg-slate-800" },
          { label: "Pending", value: pending.length, color: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-950/50" },
          { label: "Submitted", value: submitted.length, color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-950/50" },
          { label: "Overdue", value: overdue.length, color: "text-red-700 dark:text-red-400", bg: "bg-red-100 dark:bg-red-950/50" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={cn("metric-card text-center border border-transparent dark:border-slate-800", s.bg)}
          >
            <div className={cn("text-2xl font-black", s.color)}>{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="all">
        <TabsList className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 mb-5 gap-1">
          <TabsTrigger value="all" className="rounded-lg text-xs font-semibold data-[state=active]:bg-[#4C1D95] data-[state=active]:text-white px-4 py-2">
            All ({assignments.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="rounded-lg text-xs font-semibold data-[state=active]:bg-[#4C1D95] data-[state=active]:text-white px-4 py-2">
            Pending ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="challenges" className="rounded-lg text-xs font-semibold data-[state=active]:bg-[#F97316] data-[state=active]:text-white px-4 py-2">
            <Zap size={12} className="mr-1" /> Challenges ({challenges.length})
          </TabsTrigger>
        </TabsList>

        {["all", "pending", "challenges"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-3 mt-0">
            {(tab === "all" ? assignments : tab === "pending" ? pending : challenges).map((assignment, idx) => {
              const status = statusConfig[assignment.status as keyof typeof statusConfig];
              const daysLeft = getDaysUntil(assignment.dueDate);

              return (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className={cn(
                    "rounded-[14px] border p-4 hover:shadow-md transition-all duration-200",
                    assignment.type === "challenge"
                      ? "border-orange-200 dark:border-orange-900/50 bg-gradient-to-r from-orange-50/50 to-white dark:from-orange-950/20 dark:to-slate-900/90"
                      : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/90"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5",
                      assignment.type === "challenge"
                        ? "bg-orange-100 dark:bg-orange-950/60"
                        : "bg-purple-100 dark:bg-purple-950/60"
                    )}>
                      {assignment.type === "challenge" ? (
                        <Zap size={18} className="text-orange-600 dark:text-orange-400" />
                      ) : (
                        <ClipboardList size={18} className="text-purple-600 dark:text-purple-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{assignment.title}</h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-[11px] bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-semibold">
                              {assignment.course}
                            </span>
                            <span className={status.className + " flex items-center gap-1"}>
                              {status.icon} {status.label}
                            </span>
                            {assignment.type === "challenge" && (
                              <span className="text-[10px] bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full font-bold">
                                🏆 Leaderboard Challenge
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs font-bold text-slate-600 dark:text-slate-300">{assignment.points} pts</div>
                          {assignment.grade !== null && (
                            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{assignment.grade}/{assignment.points}</div>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-300 mt-2 leading-relaxed line-clamp-2">
                        {assignment.description}
                      </p>

                      {assignment.feedback && (
                        <div className="mt-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-lg p-2.5 flex items-start gap-2">
                          <MessageSquare size={13} className="text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-blue-700 dark:text-blue-200 leading-relaxed">{assignment.feedback}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-400">
                          <Clock size={12} />
                          <span>Due: {formatDate(assignment.dueDate)}</span>
                          {assignment.status === "pending" && (
                            <span className={cn(
                              "ml-1 font-semibold",
                              daysLeft < 3 ? "text-red-500" : daysLeft < 7 ? "text-amber-500" : "text-slate-400"
                            )}>
                              ({daysLeft > 0 ? `${daysLeft}d left` : "Overdue"})
                            </span>
                          )}
                        </div>

                        {(assignment.status === "pending" || assignment.status === "overdue") && (
                          <Dialog open={uploadOpen && selectedAssignment?.id === assignment.id} onOpenChange={(open) => {
                            setUploadOpen(open);
                            if (open) setSelectedAssignment(assignment);
                          }}>
                            <DialogTrigger asChild>
                              <Button size="sm" className="h-7 text-xs bg-[#4C1D95] hover:bg-purple-800 rounded-lg">
                                <Upload size={12} className="mr-1" /> Submit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-[16px] max-w-md">
                              <DialogHeader>
                                <DialogTitle className="text-base font-bold">Submit Assignment</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-2">
                                <div className="bg-purple-50 rounded-xl p-3">
                                  <div className="text-sm font-semibold text-purple-800">{assignment.title}</div>
                                  <div className="text-xs text-purple-600 mt-0.5">{assignment.course} · {assignment.points} points</div>
                                </div>

                                {/* File upload area */}
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-purple-300 transition-colors cursor-pointer">
                                  <Upload size={24} className="mx-auto mb-2 text-slate-400" />
                                  <p className="text-sm text-slate-500 font-medium">Drop files or click to upload</p>
                                  <p className="text-xs text-slate-400 mt-1">PDF, DOC, MP4 — max 50MB</p>
                                </div>

                                <Textarea
                                  placeholder="Add a note to your submission (optional)..."
                                  value={uploadText}
                                  onChange={(e) => setUploadText(e.target.value)}
                                  className="rounded-xl text-sm resize-none"
                                  rows={3}
                                />
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setUploadOpen(false)} className="rounded-xl">
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleUpload}
                                  disabled={uploadDone}
                                  className="bg-[#4C1D95] hover:bg-purple-800 rounded-xl"
                                >
                                  {uploadDone ? <><CheckCircle2 size={14} className="mr-1" /> Submitted!</> : "Submit Assignment"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
