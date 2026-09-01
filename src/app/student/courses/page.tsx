"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, BookOpen, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseCard } from "@/components/shared/CourseCard";
import { technicalCourses, managementCourses } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

export default function CoursesPage() {
  const [search, setSearch] = useState("");

  const filterCourses = (courses: typeof technicalCourses) =>
    courses.filter(
      (c) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );

  const filteredTech = filterCourses(technicalCourses);
  const filteredMgmt = filterCourses(managementCourses);

  return (
    <div className="p-4 lg:p-6 pb-24">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="purple-gradient-card rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <Badge className="bg-orange-500 border-none text-white font-bold text-[10px] uppercase">
              Apzxrtra Program Catalog
            </Badge>
            <span className="text-purple-200 text-xs flex items-center gap-1">
              <BookOpen size={14} className="text-purple-300" /> 8 Specialized Programs
            </span>
          </div>
          <h1 className="text-2xl font-black text-white m-0">Course Programs & Diplomas</h1>
          <p className="text-xs text-purple-100/90 leading-relaxed m-0">
            Technical programs (skill-based OJT) + AI Integrated Management diplomas.
          </p>
        </div>

        <div className="relative w-full sm:w-72 z-10 shrink-0">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-200" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-purple-200 text-sm h-10 backdrop-blur-md"
          />
        </div>
      </motion.div>

      <Tabs defaultValue="all" className="space-y-5">
        <TabsList className="bg-white border border-slate-200 rounded-xl p-1 gap-1 h-auto flex-wrap">
          <TabsTrigger value="all" className="rounded-lg text-xs font-semibold data-[state=active]:bg-[#4C1D95] data-[state=active]:text-white px-4 py-2">
            All Programs
          </TabsTrigger>
          <TabsTrigger value="technical" className="rounded-lg text-xs font-semibold data-[state=active]:bg-[#4C1D95] data-[state=active]:text-white px-4 py-2">
            Technical
          </TabsTrigger>
          <TabsTrigger value="management" className="rounded-lg text-xs font-semibold data-[state=active]:bg-[#4C1D95] data-[state=active]:text-white px-4 py-2">
            Management
          </TabsTrigger>
        </TabsList>

        {/* All */}
        <TabsContent value="all" className="space-y-8 mt-0">
          {/* Technical */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-purple-600" />
              </div>
              <h2 className="font-bold text-slate-800">Technical Programs</h2>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{filteredTech.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredTech.map((course, i) => (
                <CourseCard key={course.id} {...course} index={i} />
              ))}
            </div>
          </div>

          {/* Management */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center">
                <BookOpen size={14} className="text-orange-600" />
              </div>
              <h2 className="font-bold text-slate-800">Management Programs</h2>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{filteredMgmt.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredMgmt.map((course, i) => (
                <CourseCard key={course.id} {...course} index={i} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredTech.map((course, i) => (
              <CourseCard key={course.id} {...course} index={i} />
            ))}
          </div>
          {filteredTech.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No technical courses found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="management" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMgmt.map((course, i) => (
              <CourseCard key={course.id} {...course} index={i} />
            ))}
          </div>
          {filteredMgmt.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No management courses found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
