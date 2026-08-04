"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown, Edit, Eye, Trash2, UserPlus } from "lucide-react";
import { studentsList } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function AdminStudentsPage() {
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");

  const filtered = studentsList.filter((s) =>
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
     s.id.toLowerCase().includes(search.toLowerCase())) &&
    (filterCourse === "All" || s.course === filterCourse)
  );

  const courses = ["All", ...new Set(studentsList.map((s) => s.course))];

  return (
    <div className="p-4 lg:p-6 pb-24">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
        <div className="flex gap-2">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-xl border-slate-200 bg-white text-sm h-10 w-64"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-xl h-10 gap-2 border-slate-200">
                <Filter size={14} /> {filterCourse} <ChevronDown size={13} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl">
              {courses.map((c) => (
                <DropdownMenuItem key={c} onClick={() => setFilterCourse(c)} className="text-sm cursor-pointer">
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className="bg-[#4C1D95] hover:bg-purple-800 rounded-xl h-10" size="sm">
          <UserPlus size={14} className="mr-2" /> Add Student
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[14px] border border-slate-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Student ID", "Name", "Course", "Batch", "Attendance", "Fee Status", "Stage", "Rank", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((student, idx) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3 text-xs text-slate-400 font-mono">{student.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {student.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-xs">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge-technical">{student.course}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{student.batch}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            student.attendance >= 90 ? "bg-purple-600" :
                            student.attendance >= 75 ? "bg-amber-500" : "bg-red-500"
                          )}
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize",
                      student.feeStatus === "paid" ? "bg-emerald-100 text-emerald-700" :
                      student.feeStatus === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-600"
                    )}>
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{student.stage}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold text-purple-700">#{student.rank}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-purple-50 text-purple-600 transition-colors">
                        <Edit size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">Showing {filtered.length} of {studentsList.length} students</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-xs rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">Prev</button>
            <button className="px-3 py-1 text-xs rounded-lg bg-[#4C1D95] text-white">1</button>
            <button className="px-3 py-1 text-xs rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">2</button>
            <button className="px-3 py-1 text-xs rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
