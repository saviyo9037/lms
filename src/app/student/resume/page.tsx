"use client";

import { motion } from "framer-motion";
import { Briefcase, Download, Plus, Edit2, Mail, Phone, MapPin, Globe } from "lucide-react";
import { currentStudent } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ResumePage() {
  return (
    <div className="p-4 lg:p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">Build and download your professional profile</p>
        <Button className="bg-[#4C1D95] hover:bg-purple-800 rounded-xl" size="sm">
          <Download size={14} className="mr-2" /> Download PDF
        </Button>
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[14px] border border-slate-100 overflow-hidden"
          style={{ boxShadow: "0 4px 24px rgba(15,23,42,0.08)" }}
        >
          {/* Resume Header */}
          <div className="bg-gradient-to-r from-[#4C1D95] to-[#6D28D9] p-8 text-white">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-xl font-black">
                {currentStudent.initials}
              </div>
              <div>
                <h1 className="text-2xl font-black">{currentStudent.name}</h1>
                <p className="text-purple-200 text-sm mt-0.5">{currentStudent.program} — {currentStudent.stage}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="flex items-center gap-1 text-purple-200 text-xs">
                    <Mail size={12} /> {currentStudent.email}
                  </div>
                  <div className="flex items-center gap-1 text-purple-200 text-xs">
                    <Phone size={12} /> {currentStudent.phone}
                  </div>
                  <div className="flex items-center gap-1 text-purple-200 text-xs">
                    <MapPin size={12} /> Perinthalmanna, Kerala
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* About */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-slate-800">Professional Summary</h2>
                <button className="text-xs text-purple-600 flex items-center gap-1 hover:text-purple-700"><Edit2 size={12} /> Edit</button>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Motivated Smartphone Service Re-Engineering student at Apzxrtra Institute, Perinthalmanna. 8 months into
                On-Job Training with 94% attendance. Skilled in hardware diagnostics, PCB repair, and display module servicing.
                Ranked #12 out of 240 students. Seeking opportunities to apply technical expertise in a professional service environment.
              </p>
            </div>

            <Separator />

            {/* Skills */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-slate-800">Technical Skills</h2>
                <button className="text-xs text-purple-600 flex items-center gap-1 hover:text-purple-700"><Plus size={12} /> Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Smartphone Hardware Diagnostics", "PCB Repair", "OLED/LCD Replacement",
                  "BGA Soldering", "Software Flashing", "Water Damage Repair",
                  "Camera Module Servicing", "Battery Systems", "Customer Service",
                  "Service Center Management",
                ].map((skill) => (
                  <Badge key={skill} className="bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-full font-medium text-xs border border-purple-100">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Education */}
            <div>
              <h2 className="font-bold text-slate-800 mb-3">Education</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">Smartphone Service Re-Engineering</div>
                    <div className="text-xs text-purple-700 font-medium">Apzxrtra Institute of Management & Technology</div>
                    <div className="text-xs text-slate-500 mt-0.5">2024 – 2025 (18 months) · Perinthalmanna, Kerala</div>
                    <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                      6 months institutional training + 12 months On-Job Training (OJT) at certified service centers.
                      Currently in OJT phase — Month 8 of 12.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">Plus Two (Commerce)</div>
                    <div className="text-xs text-blue-700 font-medium">Government Higher Secondary School, Perinthalmanna</div>
                    <div className="text-xs text-slate-500 mt-0.5">2022 – 2024</div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Achievements */}
            <div>
              <h2 className="font-bold text-slate-800 mb-3">Achievements</h2>
              <div className="space-y-2">
                {[
                  { title: "Leaderboard Rank #12", desc: "Out of 240 students — Batch 2024-B" },
                  { title: "Weekly Challenge Winner", desc: "Fastest glass change — 18 min 42 sec (Aug 2026)" },
                  { title: "94% Attendance", desc: "Perfect attendance streak of 18 consecutive days" },
                ].map((a) => (
                  <div key={a.title} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-slate-800">{a.title}</span>
                      <span className="text-sm text-slate-500"> — {a.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
