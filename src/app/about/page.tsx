"use client";

import { motion } from "framer-motion";
import {
  Award, MapPin, GraduationCap, Users, TrendingUp, IndianRupee,
  CheckCircle2, ArrowLeft, Star, Building2
} from "lucide-react";
import { riseValues, hiringPartners } from "@/data/mockData";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sticky nav */}
      <div className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <span className="text-white font-black text-sm">O</span>
          </div>
          <div>
            <div className="text-[#4C1D95] font-black text-base">ostrax</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">institute of mgmt & tech</div>
          </div>
        </div>
        <Link href="/student/dashboard" className="text-xs text-purple-600 font-semibold flex items-center gap-1 hover:text-purple-700">
          <ArrowLeft size={13} /> Back to LMS
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] text-white py-20 px-6">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-32 left-10 w-56 h-56 bg-white/5 rounded-full" />
        <div className="absolute top-8 right-1/3 w-14 h-14 bg-orange-400/20 rounded-full" />

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-purple-200 mb-6">
              <MapPin size={12} />
              Perinthalmanna, Malappuram, Kerala
            </div>
            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-4">
              Ostrax Institute of<br />
              <span className="text-orange-400">Management & Technology</span>
            </h1>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto leading-relaxed">
              Founded by <strong className="text-white">Najma</strong> with a vision to create industry-ready professionals
              through hands-on, skill-based education and 100% placement support.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
              {[
                { value: "95%", label: "Placement Rate" },
                { value: "1,248+", label: "Students Enrolled" },
                { value: "8", label: "Programs Offered" },
                { value: "₹10–18 LPA", label: "Average Salary" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-[14px] p-4"
                >
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-purple-300 text-xs mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* R.I.S.E Values */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-1.5 text-xs font-semibold text-purple-700 mb-3">
              <Star size={12} fill="currentColor" /> Core Values
            </div>
            <h2 className="text-3xl font-black text-slate-800">Our R.I.S.E. Values</h2>
            <p className="text-slate-500 mt-2 text-sm">The four pillars that guide everything we do at Ostrax</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {riseValues.map((rv, i) => (
              <motion.div
                key={rv.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-[14px] border p-6 transition-all duration-200 hover:shadow-md"
                style={{ borderColor: `${rv.color}30`, boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shadow-sm"
                    style={{ background: rv.bg, color: rv.color }}
                  >
                    {rv.letter}
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: rv.color }}>
                      {rv.letter} stands for
                    </div>
                    <div className="text-xl font-black text-slate-800">{rv.value}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{rv.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-800">Our Programs</h2>
            <p className="text-slate-500 mt-2 text-sm">Skill-based education with guaranteed placement support</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-purple-50 border border-purple-100 rounded-[14px] p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center">
                  <GraduationCap size={16} className="text-purple-700" />
                </div>
                <h3 className="font-bold text-purple-800">Technical Programs</h3>
              </div>
              <ul className="space-y-2 text-sm text-purple-700">
                {[
                  "Smartphone Service Re-Engineering (18 months)",
                  "Smartphone Technician Upgradation (15 days)",
                  "Glass Changing Master Program (1 month)",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-purple-500 flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-[14px] p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center">
                  <Building2 size={16} className="text-orange-700" />
                </div>
                <h3 className="font-bold text-orange-800">Management Programs (6 months)</h3>
              </div>
              <ul className="space-y-2 text-sm text-orange-700">
                {[
                  "HR Management (360 hrs: 240 institutional + 120 internship)",
                  "Sales Management",
                  "Logistics & Supply Chain / Warehouse Management",
                  "Hospital & Office Administration",
                  "Business & Office Administration",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Eligibility */}
          <div className="mt-5 bg-slate-50 border border-slate-200 rounded-[14px] p-4 text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Minimum Eligibility</div>
            <div className="text-lg font-black text-slate-800">Plus Two (10+2) — Any Stream</div>
            <div className="text-sm text-slate-500 mt-0.5">Open to all freshers and working professionals</div>
          </div>
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-1.5 text-xs font-semibold text-orange-700 mb-3">
              <Award size={12} /> Placement Partners
            </div>
            <h2 className="text-3xl font-black text-slate-800">Our Hiring Partners</h2>
            <p className="text-slate-500 mt-2 text-sm">Graduates placed at leading companies across India</p>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-6">
            {hiringPartners.map((partner) => (
              <motion.div
                key={partner.name}
                whileHover={{ scale: 1.05, y: -3 }}
                className="bg-white rounded-[14px] border border-slate-100 p-3 flex flex-col items-center justify-center aspect-square shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white text-xs font-black mb-1">
                  {partner.logo}
                </div>
                <div className="text-[10px] text-slate-500 text-center font-medium">{partner.name}</div>
              </motion.div>
            ))}
          </div>

          {/* Salary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#4C1D95] to-[#6D28D9] rounded-[14px] p-6 text-white text-center"
          >
            <IndianRupee size={32} className="mx-auto mb-2 text-orange-300" />
            <div className="text-3xl font-black text-orange-300">₹10 – 18 LPA</div>
            <div className="text-purple-200 text-sm mt-1">Average salary outcomes for our graduates</div>
            <div className="text-purple-300 text-xs mt-2">Based on 2023–2025 placement data</div>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-white">
              <Award size={13} className="text-orange-300" />
              95% Placement Rate — 5 consecutive years
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <span className="text-white font-black text-lg">O</span>
            </div>
            <div>
              <div className="text-white font-black text-xl">ostrax</div>
              <div className="text-slate-400 text-[10px] uppercase tracking-widest">institute of management & technology</div>
            </div>
          </div>
          <p className="text-slate-400 text-xs">Founded by Najma · Perinthalmanna, Malappuram, Kerala</p>
          <p className="text-slate-500 text-[11px] mt-1">© 2026 Ostrax Institute. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/student/dashboard" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
              ← Go to Student Portal
            </Link>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
