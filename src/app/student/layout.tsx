"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarContent } from "@/components/layout/SidebarContent";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { sidebarMenuItems, currentStudent } from "@/data/mockData";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/student/dashboard": { title: "Dashboard", subtitle: `${currentStudent.batch} · ${currentStudent.program}` },
  "/student/planner": { title: "AI Study Planner", subtitle: "Personalized daily schedule & concept diagnostics" },
  "/student/copilot": { title: "AI Socratic Copilot", subtitle: "24/7 guided tutoring & problem solving" },
  "/student/courses": { title: "My Courses", subtitle: "Browse your enrolled programs" },
  "/student/assignments": { title: "Assignments", subtitle: "Tasks, challenges & submissions" },
  "/student/placement": { title: "Placement Drive ERP", subtitle: "Campus recruitment, drives & offer tracking" },
  "/student/attendance": { title: "Attendance", subtitle: "Track your presence and leaves" },
  "/student/finance": { title: "Fees & EMI ERP", subtitle: "Installments, receipts, and scholarships" },
  "/student/profile": { title: "Profile", subtitle: "Manage your account" },
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pageInfo = pageTitles[pathname] || { title: "Apzxrtra LMS", subtitle: "Learning Management System" };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Desktop Sidebar ─────────────────────────────────────────── */}
      <aside className="hidden lg:flex w-[220px] shrink-0 bg-sidebar border-r border-border h-screen overflow-y-auto flex-col">
        <SidebarContent menuItems={sidebarMenuItems} role="student" />
      </aside>

      {/* ── Mobile Sidebar Overlay ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            {/* Sidebar panel */}
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[240px] bg-sidebar z-50 overflow-y-auto shadow-[4px_0_20px_rgba(0,0,0,0.15)] lg:hidden"
            >
              <SidebarContent
                menuItems={sidebarMenuItems}
                role="student"
                onClose={() => setMobileOpen(false)}
                isSheet
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content Column ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          menuItems={sidebarMenuItems}
          role="student"
          userName={currentStudent.name}
          userInitials={currentStudent.initials}
          onMenuOpen={() => setMobileOpen(true)}
        />

        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 overflow-y-auto"
        >
          {children}
        </motion.main>
      </div>

      <WhatsAppButton />
    </div>
  );
}
