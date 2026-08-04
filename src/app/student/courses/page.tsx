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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">8 Programs</Badge>
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">2 Categories</Badge>
            </div>
            <p className="text-sm text-slate-500">Technical programs (skill-based OJT) + Management diplomas</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-xl border-slate-200 bg-white text-sm h-10"
            />
          </div>
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
