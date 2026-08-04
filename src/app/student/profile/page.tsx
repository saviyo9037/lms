"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, BookOpen, Award, Edit2 } from "lucide-react";
import { currentStudent } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <div className="p-4 lg:p-6 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[14px] border border-slate-100 p-6 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white text-2xl font-black mx-auto mb-3 shadow-lg">
            {currentStudent.initials}
          </div>
          <h2 className="font-black text-slate-800 text-lg">{currentStudent.name}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{currentStudent.program}</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">{currentStudent.batch}</Badge>
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">{currentStudent.stage}</Badge>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-left">
            {[
              { icon: <Mail size={14} />, label: currentStudent.email },
              { icon: <Phone size={14} />, label: currentStudent.phone },
              { icon: <BookOpen size={14} />, label: currentStudent.rollNo },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                <span className="text-slate-400">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 bg-[#4C1D95] hover:bg-purple-800 rounded-xl" size="sm">
            <Edit2 size={14} className="mr-2" /> Edit Profile
          </Button>
        </motion.div>

        {/* Edit Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-[14px] border border-slate-100 p-6 space-y-5"
        >
          <h3 className="font-bold text-slate-800">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Full Name", value: currentStudent.name },
              { label: "Email Address", value: currentStudent.email },
              { label: "Phone Number", value: currentStudent.phone },
              { label: "Roll Number", value: currentStudent.rollNo },
              { label: "Batch", value: currentStudent.batch },
              { label: "Program", value: currentStudent.program },
            ].map((field) => (
              <div key={field.label}>
                <Label className="text-xs font-semibold text-slate-500 mb-1.5 block">{field.label}</Label>
                <Input defaultValue={field.value} className="rounded-xl text-sm h-10" />
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex gap-3">
            <Button className="bg-[#4C1D95] hover:bg-purple-800 rounded-xl" size="sm">
              Save Changes
            </Button>
            <Button variant="outline" className="rounded-xl" size="sm">
              Reset
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
