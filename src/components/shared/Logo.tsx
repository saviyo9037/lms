import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, showTagline = true, size = "md" }: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-11 h-11 text-base",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      {/* Emblem */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#4C1D95] via-[#6D28D9] to-[#F97316] text-white font-black shadow-md shadow-purple-900/20 shrink-0",
          iconSizes[size]
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6 p-0.5 drop-shadow"
        >
          {/* Stylized Modern 'A' geometric facets */}
          <path
            d="M16 4L6 26H11.5L16 16.5L20.5 26H26L16 4Z"
            fill="white"
            fillOpacity="0.95"
          />
          <path
            d="M11 19.5L16 9.5L21 19.5H11Z"
            fill="url(#goldGradient)"
          />
          <circle cx="16" cy="16" r="2.5" fill="#F97316" />
          <defs>
            <linearGradient id="goldGradient" x1="11" y1="9.5" x2="21" y2="19.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F97316" />
              <stop offset="1" stopColor="#FB923C" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "font-black tracking-tight bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#F97316] dark:from-purple-300 dark:via-purple-200 dark:to-orange-400 bg-clip-text text-transparent leading-none",
              textSizes[size]
            )}
          >
            APZXRTRA
          </span>
          <span className="text-[9px] font-extrabold uppercase px-1 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 leading-none">
            LMS
          </span>
        </div>
        {showTagline && (
          <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5 leading-none">
            INSTITUTE OF MGMT & TECH
          </span>
        )}
      </div>
    </div>
  );
}
