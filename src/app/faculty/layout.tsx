"use client";

import { useState, useEffect } from "react";
import { SidebarContent } from "@/components/layout/SidebarContent";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { facultyMenuItems, facultyProfile } from "@/data/mockData";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/faculty/dashboard": { title: "Faculty Dashboard", subtitle: `${facultyProfile.name} — ${facultyProfile.role}` },
  "/faculty/assignments": { title: "Assignments", subtitle: "Issue and review student submissions" },
  "/faculty/grades": { title: "Grade Submissions", subtitle: "Review and grade student work" },
};

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pageInfo = pageTitles[pathname] || { title: "Faculty Portal", subtitle: "Ostrax LMS" };

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <aside className="hidden lg:flex w-[220px] shrink-0 bg-white border-r border-slate-100 h-screen overflow-y-auto flex-col sidebar-desktop">
        <SidebarContent menuItems={facultyMenuItems} role="faculty" />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden" />
            <motion.div initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[240px] bg-white z-50 overflow-y-auto shadow-[4px_0_20px_rgba(0,0,0,0.15)] lg:hidden">
              <SidebarContent menuItems={facultyMenuItems} role="faculty" onClose={() => setMobileOpen(false)} isSheet />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          menuItems={facultyMenuItems}
          role="faculty"
          userName={facultyProfile.name}
          userInitials={facultyProfile.initials}
          onMenuOpen={() => setMobileOpen(true)}
        />
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto"
        >
          {children}
        </motion.main>
      </div>
      <WhatsAppButton />
    </div>
  );
}
