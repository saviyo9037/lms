"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ClipboardList, Send, CheckCircle2 } from "lucide-react";
import { facultyAssignments } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function FacultyAssignmentsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-4 lg:p-6 pb-24">
      <div className="flex justify-end mb-5">
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#4C1D95] hover:bg-purple-800 rounded-xl">
              <Plus size={15} className="mr-2" /> Issue New Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[16px] max-w-md">
            <DialogHeader>
              <DialogTitle className="font-bold">Issue New Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label className="text-xs font-semibold text-slate-500 mb-1.5 block">Title</Label>
                <Input placeholder="Assignment title..." className="rounded-xl text-sm h-10" />
              </div>
              <div>
                <Label className="text-xs font-semibold text-slate-500 mb-1.5 block">Course</Label>
                <Select>
                  <SelectTrigger className="rounded-xl text-sm h-10"><SelectValue placeholder="Select course" /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="SSR">SSR — Smartphone Service Re-Engineering</SelectItem>
                    <SelectItem value="STU">STU — Smartphone Technician Upgradation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold text-slate-500 mb-1.5 block">Due Date</Label>
                  <Input type="date" className="rounded-xl text-sm h-10" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-slate-500 mb-1.5 block">Points</Label>
                  <Input type="number" placeholder="50" className="rounded-xl text-sm h-10" />
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold text-slate-500 mb-1.5 block">Description</Label>
                <Textarea placeholder="Describe the assignment..." className="rounded-xl text-sm resize-none" rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)} className="rounded-xl">Cancel</Button>
              <Button
                onClick={() => { setSubmitted(true); setTimeout(() => { setCreateOpen(false); setSubmitted(false); }, 1500); }}
                className="bg-[#4C1D95] hover:bg-purple-800 rounded-xl"
              >
                {submitted ? <><CheckCircle2 size={14} className="mr-1" /> Issued!</> : <><Send size={14} className="mr-1" /> Issue Assignment</>}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {facultyAssignments.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-[14px] border border-slate-100 p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ClipboardList size={18} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{a.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-[10px]">{a.course}</Badge>
                    <span className="text-xs text-slate-400">Due: {a.dueDate}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center flex-shrink-0">
                <div className="bg-slate-50 rounded-lg px-3 py-2">
                  <div className="text-sm font-black text-slate-800">{a.submissions}</div>
                  <div className="text-[10px] text-slate-400">Submitted</div>
                </div>
                <div className="bg-emerald-50 rounded-lg px-3 py-2">
                  <div className="text-sm font-black text-emerald-700">{a.graded}</div>
                  <div className="text-[10px] text-slate-400">Graded</div>
                </div>
                <div className="bg-orange-50 rounded-lg px-3 py-2">
                  <div className="text-sm font-black text-orange-600">{a.total - a.graded}</div>
                  <div className="text-[10px] text-slate-400">Pending</div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Submission Progress</span>
                <span>{Math.round((a.submissions / a.total) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(a.submissions / a.total) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08 + 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
