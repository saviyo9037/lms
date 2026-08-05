"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Send, Bot, User, Brain, Lightbulb, HelpCircle,
  RotateCcw, AlertCircle, Code, CheckCircle2, ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const PRESET_TOPICS = [
  "Qualcomm Power IC Boot Loop Troubleshooting",
  "How to calculate HR Payroll PF & ESI Concessions",
  "BGA Re-balling Temperature Curves Explained",
  "Explain React useEffect Cleanup Function",
];

const INITIAL_MESSAGES = [
  {
    sender: "bot",
    text: "Hello Arjun! I'm your Socratic AI Tutor. I don't just give answers — I guide you step-by-step so you truly master the concept. What topic or problem are we solving today?",
    time: "Just now",
  },
  {
    sender: "user",
    text: "Why does the smartphone PCB overheat during fast charging?",
    time: "2 mins ago",
  },
  {
    sender: "bot",
    text: "Great question! Let's think through the physics. When current flows through a conductor with internal resistance, heat ($P = I^2 R$) is generated. During fast charging, is the charging Voltage increased or Current increased, and how does the PMIC (Power Management IC) regulate that power?",
    time: "1 min ago",
  },
];

export default function AISocraticCopilotPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"socratic" | "simplified" | "rigor">("socratic");

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input, time: "Just now" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate Socratic Response
    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        text: `That's a good observation about "${input}". Before I confirm, consider this: what happens to the switching frequency of the buck regulator when the thermal sensor detects over 45°C? What would be your first diagnostic step on the multimeter?`,
        time: "Just now",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="p-4 lg:p-6 pb-24 space-y-6">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="purple-gradient-card rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <Badge className="bg-orange-500 border-none text-white font-bold text-[10px] uppercase">
              24/7 AI Socratic Tutor
            </Badge>
            <span className="text-purple-200 text-xs flex items-center gap-1">
              <Brain size={13} className="text-amber-300" /> Deep Conceptual Learning Active
            </span>
          </div>
          <h1 className="text-2xl font-black text-white m-0">Ostrax AI Copilot Tutor</h1>
          <p className="text-xs text-purple-100/90 leading-relaxed m-0">
            Ask any question on technical hardware, management diplomas, or coding. I guide your reasoning step-by-step.
          </p>
        </div>

        {/* Mode Selector Pill */}
        <div className="flex bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/20 z-10 shrink-0">
          <button
            onClick={() => setMode("socratic")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === "socratic" ? "bg-white text-purple-950 shadow-sm" : "text-purple-100 hover:text-white"
            }`}
          >
            Socratic Mode
          </button>
          <button
            onClick={() => setMode("simplified")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === "simplified" ? "bg-white text-purple-950 shadow-sm" : "text-purple-100 hover:text-white"
            }`}
          >
            Explain Simply
          </button>
          <button
            onClick={() => setMode("rigor")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === "rigor" ? "bg-white text-purple-950 shadow-sm" : "text-purple-100 hover:text-white"
            }`}
          >
            Academic Rigor
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat Interface */}
        <div className="lg:col-span-2 flex flex-col h-[600px]">
          <Card className="flex-1 p-4 rounded-2xl border-slate-100 bg-white shadow-sm flex flex-col overflow-hidden">
            {/* Message History */}
            <div className="flex-1 overflow-y-auto space-y-4 p-2 hide-scrollbar">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <Bot size={18} />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-purple-700 text-white rounded-tr-none font-medium shadow-sm"
                        : "bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none"
                    }`}
                  >
                    <p className="m-0 whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`text-[10px] block mt-1.5 ${
                        msg.sender === "user" ? "text-purple-200" : "text-slate-400"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <User size={18} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="mt-3 flex gap-2 pt-3 border-t border-slate-100">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Socratic Copilot a technical query..."
                className="flex-1 rounded-xl border-slate-200 text-sm h-11 focus-visible:ring-purple-600"
              />
              <Button
                type="submit"
                className="bg-purple-700 hover:bg-purple-800 text-white rounded-xl h-11 px-5 text-xs font-bold gap-2 shrink-0 shadow-md"
              >
                <Send size={15} /> Ask AI
              </Button>
            </form>
          </Card>
        </div>

        {/* Right Sidebar: Preset Topics & Escalation */}
        <div className="space-y-6 flex flex-col h-full">
          <Card className="p-4 rounded-2xl border-slate-100 bg-white shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <Lightbulb size={16} className="text-amber-500" /> Topic Suggestions
            </div>
            <div className="space-y-2">
              {PRESET_TOPICS.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => setInput(topic)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-100 hover:border-purple-200 bg-slate-50 hover:bg-purple-50/50 text-slate-700 text-xs font-semibold transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="line-clamp-2">{topic}</span>
                  <ChevronRight size={13} className="text-slate-400 shrink-0" />
                </button>
              ))}
            </div>
          </Card>

          {/* Instructor Escalation Card */}
          <Card className="p-4 rounded-2xl border-purple-100 bg-purple-50/40 space-y-3 text-center flex-1 flex flex-col justify-center">
            <HelpCircle size={24} className="text-purple-600 mx-auto" />
            <h4 className="font-bold text-purple-950 text-xs m-0">Still stuck after AI explanation?</h4>
            <p className="text-[11px] text-purple-800/80 m-0">
              Escalate this exact thread directly to your faculty instructor for office hours review.
            </p>
            <Button variant="outline" size="sm" className="w-full rounded-xl border-purple-300 text-purple-700 hover:bg-purple-100 font-bold text-xs">
              Request Instructor Escalation
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
