"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase, Building2, MapPin, CheckCircle2, Clock, FileCheck,
  ChevronRight, ArrowUpRight, Award, UserCheck, ShieldCheck, Download
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const CAMPUS_DRIVES = [
  {
    id: "drv-1",
    company: "Razorpay Software",
    role: "Junior Technical Support & Hardware Integration Lead",
    location: "Bengaluru / Kochi",
    package: "₹6.5 - ₹8.2 LPA",
    driveDate: "2026-08-25",
    eligibility: "Min 85% Attendance & SSR Diploma",
    eligible: true,
    status: "Shortlisted for Aptitude Test",
    stage: 2,
  },
  {
    id: "drv-2",
    company: "TCS iON Technical",
    role: "Electronics Systems Maintenance Engineer",
    location: "Kochi / Calicut",
    package: "₹4.8 - ₹5.5 LPA",
    driveDate: "2026-09-02",
    eligibility: "Min 80% Attendance & No Active Backlogs",
    eligible: true,
    status: "Application Submitted",
    stage: 1,
  },
  {
    id: "drv-3",
    company: "Infosys Campus",
    role: "Operations & HR Associate",
    location: "Trivandrum",
    package: "₹5.0 LPA",
    driveDate: "2026-09-10",
    eligibility: "Management Diploma with Min 80% Marks",
    eligible: false,
    status: "Not Eligible (Program mismatch)",
    stage: 0,
  },
];

const STAGES = ["Applied", "Shortlisted", "Aptitude Round", "Interview", "Offer Letter"];

export default function PlacementDrivePage() {
  const [selectedOffer, setSelectedOffer] = useState<typeof CAMPUS_DRIVES[0] | null>(null);

  return (
    <div className="p-4 lg:p-6 pb-24 space-y-6">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="purple-gradient-card rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <Badge className="bg-orange-500 border-none text-white font-bold text-[10px] uppercase">
              Ostrax Placement Cell ERP
            </Badge>
            <span className="text-purple-200 text-xs flex items-center gap-1">
              <ShieldCheck size={14} className="text-green-300" /> Verified Student Profile Active
            </span>
          </div>
          <h1 className="text-2xl font-black text-white m-0">Campus Recruitment & Job Drives</h1>
          <p className="text-xs text-purple-100/90 leading-relaxed m-0">
            Track live campus drives, view real-time eligibility checks, and follow application progress to final offer letters.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Drive Listings */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <h3 className="font-bold text-slate-800 text-base m-0 flex items-center gap-2">
          <Building2 size={18} className="text-purple-600" /> Active Campus Recruitment Drives
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {CAMPUS_DRIVES.map((drive) => (
            <Card key={drive.id} className="p-5 rounded-2xl border-slate-100 bg-white shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-slate-800 text-base m-0">{drive.company}</h4>
                    {drive.eligible ? (
                      <Badge className="bg-green-100 text-green-700 font-bold text-[10px]">
                        <CheckCircle2 size={12} className="mr-1" /> Eligible Candidate
                      </Badge>
                    ) : (
                      <Badge className="bg-slate-100 text-slate-500 font-medium text-[10px]">
                        Ineligible
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-purple-700">{drive.role}</div>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><MapPin size={13} /> {drive.location}</span>
                    <span className="flex items-center gap-1 font-bold text-slate-700"><Award size={13} className="text-orange-500" /> {drive.package}</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> Drive Date: {drive.driveDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {drive.eligible && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setSelectedOffer(drive)}
                          className="bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold px-4 py-2"
                        >
                          View Status Tracker <ChevronRight size={14} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg rounded-2xl">
                        <DialogHeader>
                          <DialogTitle className="font-bold text-slate-800 text-base">
                            Recruitment Stage Tracker — {selectedOffer?.company}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 pt-3">
                          <div className="space-y-4">
                            {STAGES.map((stg, i) => {
                              const isPassed = (selectedOffer?.stage ?? 0) >= i;
                              const isCurrent = (selectedOffer?.stage ?? 0) === i;
                              return (
                                <div key={i} className="flex items-center gap-3">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                      isPassed
                                        ? "bg-green-600 text-white shadow-sm"
                                        : isCurrent
                                        ? "bg-purple-600 text-white ring-4 ring-purple-100"
                                        : "bg-slate-100 text-slate-400"
                                    }`}
                                  >
                                    {isPassed ? <CheckCircle2 size={16} /> : i + 1}
                                  </div>
                                  <div className="flex-1">
                                    <div className={`text-xs font-bold ${isPassed || isCurrent ? "text-slate-800" : "text-slate-400"}`}>
                                      {stg}
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                      {isPassed ? "Completed verified" : isCurrent ? "Currently in progress" : "Pending next round"}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>

              {/* Recruitment Stage Progress Bar */}
              {drive.eligible && (
                <div className="pt-1">
                  <div className="flex justify-between text-xs text-slate-500 font-medium mb-1.5">
                    <span>Status: <strong className="text-purple-700">{drive.status}</strong></span>
                    <span>Stage {drive.stage + 1} of {STAGES.length}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-orange-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${((drive.stage + 1) / STAGES.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 flex flex-col h-full">
          <Card className="p-5 rounded-2xl border-slate-100 bg-gradient-to-br from-slate-900 to-purple-950 text-white shadow-md flex-1 flex flex-col justify-center text-center">
            <UserCheck size={32} className="mx-auto text-purple-400 mb-3" />
            <div className="text-[11px] text-purple-300 uppercase font-bold tracking-wider mb-2">ATS Resume Match</div>
            <div className="text-6xl font-black text-white mb-4">92%</div>
            <Badge className="bg-green-500/20 text-green-300 mx-auto border-none w-fit">Verified Ostrax Format</Badge>
          </Card>
        </div>
      </div>
    </div>
  );
}
