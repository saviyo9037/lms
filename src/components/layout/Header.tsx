"use client";

import { useState } from "react";
import { Bell, Menu, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { SidebarContent } from "./SidebarContent";
import { notifications } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface HeaderProps {
  title: string;
  subtitle?: string;
  menuItems: { label: string; href: string; icon: string }[];
  role?: "student" | "admin" | "faculty";
  userName?: string;
  userInitials?: string;
  onMenuOpen: () => void;
}

export function Header({ title, subtitle, menuItems, role = "student", userName, userInitials, onMenuOpen }: HeaderProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const { mode, toggleMode } = useTheme();

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center px-6 gap-3 sticky top-0 z-30 shrink-0">
      {/* Mobile hamburger — plain button, no asChild nesting */}
      <button
        onClick={onMenuOpen}
        className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer mobile-menu-btn"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[15px] font-bold text-slate-800 leading-none m-0 whitespace-nowrap overflow-hidden text-ellipsis">{title}</h1>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-1 whitespace-nowrap overflow-hidden text-ellipsis">{subtitle}</p>
        )}
      </div>

      {/* Search bar */}
      <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-[10px] px-3 py-1.5 w-[220px] search-bar-desktop">
        <Search size={14} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-[13px] text-slate-600 w-full"
        />
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleMode}
        title="Toggle Dark Mode"
        className="p-2 rounded-lg text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-colors cursor-pointer flex items-center gap-1.5 border border-purple-200/60 dark:border-purple-800/40 text-xs font-semibold"
      >
        {mode === "dark" ? (
          <Sun size={18} className="text-purple-400" />
        ) : (
          <Moon size={18} className="text-purple-600" />
        )}
      </button>

      {/* Notification bell */}
      <DropdownMenu>
        <DropdownMenuTrigger className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer outline-none">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 rounded-xl shadow-lg border-slate-100">
          <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
            <span className="font-semibold text-slate-800">Notifications</span>
            {unreadCount > 0 && (
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-xs">
                {unreadCount} new
              </Badge>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-72 overflow-y-auto">
            {notifications.map((notif) => (
              <DropdownMenuItem key={notif.id} className="px-4 py-3 cursor-pointer focus:bg-slate-50">
                <div className="flex gap-3 w-full">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    notif.type === "warning" ? "bg-yellow-500" :
                    notif.type === "success" ? "bg-green-500" : "bg-blue-500"
                  } ${!notif.read ? "opacity-100" : "opacity-0"}`} />
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${!notif.read ? "text-slate-800" : "text-slate-500"}`}>
                      {notif.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notif.message}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{notif.time}</div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="px-4 py-2 text-center text-xs text-purple-600 font-medium cursor-pointer justify-center hover:bg-purple-50">
            View all notifications
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Avatar */}
      <DropdownMenu>
        <DropdownMenuTrigger className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 text-white text-[13px] font-bold border-none cursor-pointer shrink-0 flex items-center justify-center shadow-md outline-none">
          {userInitials || "AK"}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52 rounded-xl border-slate-100">
          <DropdownMenuLabel className="px-4 py-3">
            <div className="font-semibold text-slate-800 text-sm">{userName || "Arjun Krishnan"}</div>
            <div className="text-xs text-slate-500 mt-0.5">ostrax.edu</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/student/profile">
            <DropdownMenuItem className="cursor-pointer text-sm">My Profile</DropdownMenuItem>
          </Link>
          <Link href="/student/resume">
            <DropdownMenuItem className="cursor-pointer text-sm">My Resume</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link href="/about">
            <DropdownMenuItem className="cursor-pointer text-sm">About Ostrax</DropdownMenuItem>
          </Link>
          <Link href="/admin/dashboard">
            {/* <DropdownMenuItem className="cursor-pointer text-sm text-purple-600">Admin Portal</DropdownMenuItem> */}
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
