"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, ClipboardList, CalendarCheck,
  FileText, Briefcase, User, Users, GraduationCap, BarChart3,
  Settings, Star, TrendingUp, X, ChevronRight, Sun, Moon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={18} />,
  BookOpen: <BookOpen size={18} />,
  ClipboardList: <ClipboardList size={18} />,
  CalendarCheck: <CalendarCheck size={18} />,
  FileText: <FileText size={18} />,
  Briefcase: <Briefcase size={18} />,
  User: <User size={18} />,
  Users: <Users size={18} />,
  GraduationCap: <GraduationCap size={18} />,
  BarChart3: <BarChart3 size={18} />,
  Settings: <Settings size={18} />,
  Star: <Star size={18} />,
  TrendingUp: <TrendingUp size={18} />,
};

interface SidebarProps {
  menuItems: { label: string; href: string; icon: string }[];
  role?: "student" | "admin" | "faculty";
  onClose?: () => void;
  isSheet?: boolean;
}

export function SidebarContent({ menuItems, role = "student", onClose, isSheet }: SidebarProps) {
  const pathname = usePathname();
  const { mode, toggleMode } = useTheme();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4 border-b border-slate-100">
        {isSheet && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        )}
        <div className="flex items-center gap-3">
          <img 
            src="/ostrax_logo_final.webp" 
            alt="Ostrax Institute of Management & Technology" 
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Role pill */}
        <div className="mt-3">
          <span className={cn(
            "text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider",
            role === "admin" ? "bg-orange-100 text-orange-700" :
            role === "faculty" ? "bg-blue-100 text-blue-700" :
            "bg-purple-100 text-purple-700"
          )}>
            {role === "admin" ? "Admin Portal" : role === "faculty" ? "Faculty Portal" : "Student Portal"}
          </span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="section-heading px-2 mb-3">Menu</div>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} onClick={onClose}>
              <div className={cn("sidebar-item", isActive && "active")}>
                <span className={cn(
                  "transition-colors",
                  isActive ? "text-purple-600" : "text-slate-400"
                )}>
                  {iconMap[item.icon]}
                </span>
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <ChevronRight size={14} className="text-purple-400" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Switch portals */}
      <div className="px-3 pb-2 space-y-1">
        <div className="section-heading px-2">Portals</div>
        {role !== "student" && (
          <Link href="/student/dashboard">
            <div className="sidebar-item text-xs">
              <User size={15} className="text-slate-400" />
              Student Portal
            </div>
          </Link>
        )}
        {role !== "admin" && (
          <Link href="/admin/dashboard">
            <div className="sidebar-item text-xs">
              <Settings size={15} className="text-slate-400" />
              Admin Portal
            </div>
          </Link>
        )}
        {role !== "faculty" && (
          <Link href="/faculty/dashboard">
            <div className="sidebar-item text-xs">
              <GraduationCap size={15} className="text-slate-400" />
              Faculty Portal
            </div>
          </Link>
        )}
        <button
          onClick={toggleMode}
          className="w-full sidebar-item text-xs text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 cursor-pointer font-medium"
        >
          {mode === "dark" ? (
            <>
              <Sun size={15} className="text-purple-400" />
              Light Mode
            </>
          ) : (
            <>
              <Moon size={15} className="text-purple-600" />
              Dark Mode
            </>
          )}
        </button>
      </div>
    </div>
  );
}
