"use client";

import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, Users, BookOpen, Star, Play, CheckCircle2,
  Lock, Download, Share2, Award, ChevronDown, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { allCourses } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function CourseDetailPage() {
  const params = useParams();
  const course = allCourses.find((c) => c.id === params.id);

  if (!course) {
    return (
      <div className="p-6 text-center py-24">
        <BookOpen size={48} className="mx-auto mb-4 text-slate-300" />
        <h2 className="text-xl font-bold text-slate-600 mb-2">Course Not Found</h2>
        <Link href="/student/courses" className="text-purple-600 text-sm hover:underline">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  const completedModules = course.modules_list.filter((m) => m.completed).length;

  return (
    <div className="pb-24">
      {/* Hero */}
      <div
        className="relative overflow-hidden p-6 text-white"
        style={{ background: `linear-gradient(135deg, ${course.color} 0%, ${course.color}99 100%)` }}
      >
        <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 right-32 w-40 h-40 bg-white/5 rounded-full" />

        <Link href="/student/courses" className="inline-flex items-center gap-1.5 text-white/70 text-sm mb-4 hover:text-white transition-colors">
          <ArrowLeft size={16} />
          Back to Courses
        </Link>

        <div className="relative max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              {course.category}
            </span>
            <span className="text-[11px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full">
              {course.certificationType}
            </span>
          </div>
          <h1 className="text-2xl font-black leading-tight mb-2">{course.title}</h1>
          <p className="text-white/80 text-sm leading-relaxed mb-4">{course.description}</p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-white/80">
              <Clock size={14} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80">
              <BookOpen size={14} />
              <span>{course.modules} Modules · {course.lessonsCount} Lessons</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80">
              <Users size={14} />
              <span>{course.enrolledStudents} Students</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-yellow-300 fill-yellow-300" />
              <span className="font-semibold">{course.rating}</span>
              <span className="text-white/60">({course.reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {course.progress > 0 && (
          <div className="mt-5 max-w-sm">
            <div className="flex justify-between text-xs text-white/80 mb-1.5">
              <span>Your Progress</span>
              <span className="font-bold text-white">{course.progress}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="modules">
              <TabsList className="bg-white border border-slate-200 rounded-xl p-1 mb-5">
                <TabsTrigger value="modules" className="rounded-lg text-xs font-semibold data-[state=active]:bg-[#4C1D95] data-[state=active]:text-white">
                  Modules
                </TabsTrigger>
                <TabsTrigger value="overview" className="rounded-lg text-xs font-semibold data-[state=active]:bg-[#4C1D95] data-[state=active]:text-white">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="materials" className="rounded-lg text-xs font-semibold data-[state=active]:bg-[#4C1D95] data-[state=active]:text-white">
                  Materials
                </TabsTrigger>
              </TabsList>

              <TabsContent value="modules">
                {course.modules_list.length > 0 ? (
                  <Accordion type="single" collapsible defaultValue="module-5" className="space-y-2">
                    {course.modules_list.map((mod) => (
                      <AccordionItem
                        key={mod.id}
                        value={`module-${mod.id}`}
                        className={cn(
                          "border border-slate-100 rounded-xl overflow-hidden bg-white",
                          mod.inProgress && "border-purple-200 ring-1 ring-purple-100"
                        )}
                      >
                        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-50 [&[data-state=open]]:bg-purple-50">
                          <div className="flex items-center gap-3 text-left w-full">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                              mod.completed ? "bg-emerald-100" : mod.inProgress ? "bg-purple-100" : "bg-slate-100"
                            )}>
                              {mod.completed ? (
                                <CheckCircle2 size={16} className="text-emerald-600" />
                              ) : mod.inProgress ? (
                                <Play size={14} className="text-purple-600" />
                              ) : (
                                <Lock size={14} className="text-slate-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className={cn(
                                "text-sm font-semibold",
                                mod.completed ? "text-slate-500" : mod.inProgress ? "text-purple-700" : "text-slate-700"
                              )}>
                                Module {mod.id}: {mod.title}
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">{mod.duration} · {mod.lessons} lessons</div>
                            </div>
                            {mod.inProgress && (
                              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-[10px]">
                                In Progress
                              </Badge>
                            )}
                            {mod.completed && (
                              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px]">
                                Completed
                              </Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="pt-2 space-y-2">
                            {Array.from({ length: mod.lessons }, (_, i) => (
                              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer group">
                                <div className={cn(
                                  "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
                                  mod.completed ? "bg-emerald-50" : "bg-slate-100"
                                )}>
                                  {mod.completed ? (
                                    <CheckCircle2 size={13} className="text-emerald-500" />
                                  ) : (
                                    <Play size={12} className="text-slate-400 group-hover:text-purple-600" />
                                  )}
                                </div>
                                <span className="text-xs text-slate-600 group-hover:text-slate-800 transition-colors flex-1">
                                  Lesson {i + 1}: {mod.title} — Part {i + 1}
                                </span>
                                <span className="text-[10px] text-slate-400">~{8 + i * 3} min</span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="bg-white rounded-[14px] border border-slate-100 p-8 text-center">
                    <BookOpen size={36} className="mx-auto mb-3 text-slate-300" />
                    <p className="text-sm text-slate-500">Module details coming soon</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="overview">
                <div className="bg-white rounded-[14px] border border-slate-100 p-5 space-y-5">
                  <div>
                    <h3 className="font-bold text-slate-800 mb-2">Duration Breakdown</h3>
                    <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 leading-relaxed">
                      {course.durationBreakdown}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-2">Eligibility</h3>
                    <p className="text-sm text-slate-600">{course.eligibility}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="materials">
                <div className="bg-white rounded-[14px] border border-slate-100 p-5 space-y-3">
                  {["Course Syllabus.pdf", "Reference Handbook.pdf", "Lab Manual.pdf", "Assessment Guide.pdf"].map((file) => (
                    <div key={file} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <span className="text-[10px] font-bold text-red-600">PDF</span>
                        </div>
                        <span className="text-sm text-slate-700 group-hover:text-purple-700 transition-colors">{file}</span>
                      </div>
                      <Download size={15} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right - Sidebar */}
          <div className="space-y-4">
            {/* Video Player Placeholder */}
            <div className="bg-slate-900 rounded-[14px] overflow-hidden aspect-video flex items-center justify-center relative group cursor-pointer">
              <div className={cn(
                "absolute inset-0",
                `bg-gradient-to-br from-[${course.color}]/40 to-transparent`
              )} style={{ background: `linear-gradient(135deg, ${course.color}50, transparent)` }} />
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40"
              >
                <Play size={28} className="text-white fill-white ml-1" />
              </motion.div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-white text-xs font-semibold truncate">
                  Module 5: Motherboard Schematic Reading
                </div>
                <div className="text-white/60 text-[10px] mt-0.5">Continue from 12:34</div>
              </div>
            </div>

            {/* Instructor card */}
            <div className="bg-white rounded-[14px] border border-slate-100 p-4">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Instructor</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700">
                  {course.instructor.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-slate-800 text-sm">{course.instructor}</div>
                  <div className="text-xs text-slate-500">Senior Faculty</div>
                </div>
              </div>
            </div>

            {/* Progress summary */}
            <div className="bg-white rounded-[14px] border border-slate-100 p-4">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Progress Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Completed Modules</span>
                  <span className="font-bold text-slate-800">{completedModules}/{course.modules_list.length || course.modules}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Overall Progress</span>
                  <span className="font-bold" style={{ color: course.color }}>{course.progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${course.progress}%`, background: `linear-gradient(90deg, ${course.color}, ${course.color}88)` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
