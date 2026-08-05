"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard, QrCode, CheckCircle2, Clock, FileText, Upload,
  ShieldCheck, AlertCircle, DollarSign, Award, ArrowUpRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const INSTALLMENTS = [
  { term: "Installment 1 (Admission)", amount: 15000, dueDate: "2024-01-15", status: "Paid", receiptNo: "REC-2024-089" },
  { term: "Installment 2 (Mid-Term)", amount: 12500, dueDate: "2024-06-15", status: "Paid", receiptNo: "REC-2024-412" },
  { term: "Installment 3 (OJT Stage)", amount: 12500, dueDate: "2024-11-15", status: "Pending", receiptNo: null },
  { term: "Caution Deposit", amount: 3000, dueDate: "2024-01-15", status: "Paid", receiptNo: "REC-2024-090" },
  { term: "Lab Kit Fee", amount: 2500, dueDate: "2024-03-10", status: "Paid", receiptNo: "REC-2024-201" },
  { term: "Exam & Certification Fee", amount: 1500, dueDate: "2024-08-01", status: "Paid", receiptNo: "REC-2024-388" },
];

const SCHOLARSHIPS = [
  { name: "Najma Founders Merit Concession", benefit: "20% Fee Reduction", criteria: "Min 90% Marks in Assessment", status: "Applied — Under Review" },
  { name: "Kerala Technical Skill Grant", benefit: "₹5,000 One-time Concession", criteria: "Perinthalmanna Resident & 85%+ Attendance", status: "Eligible" },
];

export default function FinanceEMIPage() {
  const [activeInstallment, setActiveInstallment] = useState<typeof INSTALLMENTS[0] | null>(null);

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
              Financial ERP & Installments
            </Badge>
            <span className="text-purple-200 text-xs flex items-center gap-1">
              <ShieldCheck size={14} className="text-green-300" /> GST Compliant Digital Receipts
            </span>
          </div>
          <h1 className="text-2xl font-black text-white m-0">Fees, EMI Schedule & Scholarships</h1>
          <p className="text-xs text-purple-100/90 leading-relaxed m-0">
            Transparent breakdown of course fee installments, payment receipts, caution deposits, and scholarship applications.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Installment Schedule */}
        <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
          <Card className="p-5 rounded-2xl border-slate-100 bg-white shadow-sm space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-purple-600" />
                <h3 className="font-bold text-slate-800 text-base m-0">Fee Installment Schedule</h3>
              </div>
              <Badge variant="outline" className="text-xs text-slate-600">
                Course Total: ₹40,000
              </Badge>
            </div>

            <div className="space-y-3">
              {INSTALLMENTS.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    item.status === "Pending" ? "border-orange-200 bg-orange-50/30" : "border-slate-100 bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      item.status === "Paid" ? "bg-green-100 text-green-700" : "bg-orange-500 text-white"
                    }`}>
                      {item.status === "Paid" ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm m-0">{item.term}</h4>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Due Date: {item.dueDate} {item.receiptNo && `• Receipt: ${item.receiptNo}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-end shrink-0">
                    <span className="text-sm font-black text-slate-800">₹{item.amount.toLocaleString()}</span>
                    {item.status === "Paid" ? (
                      <Button size="sm" variant="outline" className="rounded-xl border-slate-200 text-xs gap-1">
                        <FileText size={13} /> Receipt PDF
                      </Button>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => setActiveInstallment(item)}
                            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold gap-1 shadow-sm"
                          >
                            <QrCode size={13} /> Pay via UPI
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md rounded-2xl text-center">
                          <DialogHeader>
                            <DialogTitle className="font-bold text-slate-800 text-base">
                              Pay {activeInstallment?.term}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-2">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                              <div className="text-2xl font-black text-purple-900">₹{activeInstallment?.amount.toLocaleString()}</div>
                              <div className="text-xs text-slate-500">Scan UPI QR code using PhonePe, GPay, or Paytm</div>
                            </div>
                            <div className="w-44 h-44 mx-auto bg-slate-900 text-white rounded-xl flex items-center justify-center p-3 font-mono text-xs shadow-md">
                              [OSTRAX_UPI_QR_CODE]
                            </div>
                            <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold py-2.5">
                              Upload Payment Screenshot Proof
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Col: Scholarships & Caution Deposit */}
        <div className="space-y-6 flex flex-col">
          <Card className="p-5 rounded-2xl border-slate-100 bg-white shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-amber-500" />
              <h3 className="font-bold text-slate-800 text-base m-0">Scholarships & Concessions</h3>
            </div>

            <div className="space-y-3">
              {SCHOLARSHIPS.map((s, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 text-xs m-0">{s.name}</h4>
                    <Badge className="bg-purple-100 text-purple-700 text-[10px] font-bold">{s.benefit}</Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 m-0">{s.criteria}</p>
                  <div className="text-[10px] font-semibold text-orange-600 pt-1">{s.status}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Refundable Caution Deposit Ledger */}
          <Card className="p-5 rounded-2xl border-slate-100 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md space-y-2 flex-1 flex flex-col justify-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Caution Deposit Ledger</div>
            <div className="text-2xl font-black text-green-400">₹3,000 (Refundable)</div>
            <p className="text-xs text-slate-300 leading-relaxed m-0">
              Held for Lab hardware diagnostic kits. Full refund processed upon course completion and equipment clearance.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
