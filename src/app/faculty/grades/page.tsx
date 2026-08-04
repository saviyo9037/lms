"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2, MessageSquare, Send } from "lucide-react";
import { studentsList } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const submissions = studentsList.slice(0, 8).map((s, i) => ({
  ...s,
  assignment: "PCB Fault Diagnosis Report",
  submittedAt: "2026-08-04",
  graded: i % 3 === 0,
  score: i % 3 === 0 ? 38 + i : null,
  feedback: i % 3 === 0 ? "Good diagnosis report. PCB analysis was thorough." : null,
}));

export default function FacultyGradesPage() {
  const [gradeOpen, setGradeOpen] = useState(false);
  const [selected, setSelected] = useState<typeof submissions[0] | null>(null);
  const [gradeSaved, setGradeSaved] = useState(false);

  return (
    <div className="p-4 lg:p-6 pb-24">
      <div className="bg-purple-50 border border-purple-100 rounded-[14px] p-4 mb-5">
        <div className="font-bold text-purple-800">PCB Fault Diagnosis Report</div>
        <div className="text-xs text-purple-600 mt-0.5">SSR · 50 points · {submissions.filter(s => !s.graded).length} pending reviews</div>
      </div>

      <div className="space-y-3">
        {submissions.map((sub, i) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-[14px] border border-slate-100 p-4 flex items-center gap-3 hover:shadow-sm transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {sub.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800 text-sm">{sub.name}</div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span>{sub.id}</span>
                <span>·</span>
                <span>Submitted: {sub.submittedAt}</span>
              </div>
              {sub.feedback && (
                <div className="flex items-start gap-1.5 mt-2 text-xs text-blue-700 bg-blue-50 rounded-lg px-2 py-1.5">
                  <MessageSquare size={12} className="flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{sub.feedback}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {sub.graded ? (
                <div className="text-center">
                  <div className="text-lg font-black text-emerald-600">{sub.score}/50</div>
                  <div className="text-[10px] text-slate-400">Graded</div>
                </div>
              ) : (
                <Button
                  size="sm"
                  className="bg-[#4C1D95] hover:bg-purple-800 rounded-xl h-8 text-xs"
                  onClick={() => { setSelected(sub); setGradeOpen(true); }}
                >
                  <Star size={12} className="mr-1" /> Grade
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grade Dialog */}
      {selected && (
        <Dialog open={gradeOpen} onOpenChange={setGradeOpen}>
          <DialogContent className="rounded-[16px] max-w-md">
            <DialogHeader>
              <DialogTitle className="font-bold">Grade Submission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="font-semibold text-slate-800 text-sm">{selected.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">PCB Fault Diagnosis Report</div>
              </div>
              <div>
                <Label className="text-xs font-semibold text-slate-500 mb-1.5 block">Score (out of 50)</Label>
                <Input type="number" max={50} min={0} placeholder="Enter score" className="rounded-xl text-sm h-10" />
              </div>
              <div>
                <Label className="text-xs font-semibold text-slate-500 mb-1.5 block">Feedback</Label>
                <Textarea
                  placeholder="Write feedback for the student..."
                  className="rounded-xl text-sm resize-none"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setGradeOpen(false)} className="rounded-xl">Cancel</Button>
              <Button
                onClick={() => { setGradeSaved(true); setTimeout(() => { setGradeOpen(false); setGradeSaved(false); }, 1500); }}
                className="bg-[#4C1D95] hover:bg-purple-800 rounded-xl"
              >
                {gradeSaved ? <><CheckCircle2 size={14} className="mr-1" /> Saved!</> : <><Send size={14} className="mr-1" /> Save Grade</>}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
