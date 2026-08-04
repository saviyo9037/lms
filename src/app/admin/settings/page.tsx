"use client";

import { motion } from "framer-motion";
import { Settings, Bell, Shield, Palette, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminSettingsPage() {
  return (
    <div className="p-4 lg:p-6 pb-24">
      <div className="max-w-2xl space-y-5">
        {[
          {
            icon: <Bell size={18} className="text-purple-600" />,
            title: "Notifications",
            settings: [
              { label: "Email fee reminders to students", checked: true },
              { label: "SMS attendance alerts", checked: true },
              { label: "Assignment deadline notifications", checked: false },
              { label: "Placement opportunity alerts", checked: true },
            ],
          },
          {
            icon: <Shield size={18} className="text-emerald-600" />,
            title: "Security",
            settings: [
              { label: "Two-factor authentication", checked: false },
              { label: "Session timeout (30 mins)", checked: true },
              { label: "Audit log all admin actions", checked: true },
            ],
          },
          {
            icon: <Globe size={18} className="text-blue-600" />,
            title: "Academic Settings",
            settings: [
              { label: "Allow self punch-in/out", checked: true },
              { label: "Show leaderboard publicly", checked: true },
              { label: "Enable online exams", checked: false },
            ],
          },
        ].map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[14px] border border-slate-100 p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                {section.icon}
              </div>
              <h3 className="font-bold text-slate-800">{section.title}</h3>
            </div>
            <div className="space-y-3">
              {section.settings.map((setting, j) => (
                <div key={j} className="flex items-center justify-between">
                  <Label className="text-sm text-slate-600 font-normal cursor-pointer">{setting.label}</Label>
                  <Switch defaultChecked={setting.checked} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[14px] border border-slate-100 p-5"
        >
          <h3 className="font-bold text-slate-800 mb-4">Institute Information</h3>
          <div className="space-y-3">
            {[
              { label: "Institute Name", value: "Ostrax Institute of Management & Technology" },
              { label: "Location", value: "Perinthalmanna, Kerala" },
              { label: "Founder", value: "Najma" },
              { label: "Contact Email", value: "info@ostrax.edu" },
            ].map((f) => (
              <div key={f.label}>
                <Label className="text-xs font-semibold text-slate-500 mb-1 block">{f.label}</Label>
                <Input defaultValue={f.value} className="rounded-xl text-sm h-9" />
              </div>
            ))}
          </div>
          <Button className="mt-4 bg-[#4C1D95] hover:bg-purple-800 rounded-xl" size="sm">
            Save Changes
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
