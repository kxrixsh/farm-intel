"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Bot } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  text: string;
}

export default function FarmChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Namaste! Main hoon FARM AI. Mandi net returns, localized rainfall window ya government subsidy ke baare mein kuch bhi pucho.",
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Gateway offline. Please try again." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Farm Intel local network mesh unreachable." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 rounded-full bg-[#071710] border border-[#66ee7f]/40 px-4 py-3 text-white shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[#66ee7f]"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#66ee7f] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#66ee7f]"></span>
          </div>
          <Bot size={18} className="text-[#66ee7f]" />
          <span className="text-xs font-semibold tracking-wide">FARM AI</span>
        </button>
      )}

      {isOpen && (
        <div className="flex h-[520px] w-[360px] sm:w-[400px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#07130e]/95 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-[#091f14] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#66ee7f]/20 text-[#66ee7f]">
                <Sparkles size={15} />
              </div>
              <div>
                <span className="text-sm font-bold text-white block">FARM AI Copilot</span>
                <span className="text-[10px] font-mono text-[#66ee7f] block">● Real-time Decision Engine</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#66ee7f]/20 text-[#66ee7f] mt-0.5">
                    <Bot size={13} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-3.5 py-2.5 leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#66ee7f] text-[#050b08] font-semibold"
                      : "bg-white/5 border border-white/10 text-white/85"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-white/40 text-[11px] font-mono">
                <Bot size={13} className="text-[#66ee7f] animate-pulse" />
                Computing telemetry...
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSend} className="border-t border-white/10 bg-[#06100b] p-3">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about crops, mandis, or subsidies..."
                className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-3.5 pr-10 text-xs text-white placeholder:text-white/30 focus:border-[#66ee7f] focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-[#66ee7f] text-[#050b08] transition-transform hover:scale-105 disabled:opacity-30"
              >
                <Send size={13} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}