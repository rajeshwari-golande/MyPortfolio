"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Quote,
  Sparkles,
} from "lucide-react";
import { sendChatMessage, ChatMessage, ChatCitation } from "@/lib/api";
import { sampleChatQuestions } from "@/lib/data";

interface Message {
  role: "user" | "assistant";
  content: string;
  citations?: ChatCitation[];
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Rajeshwari's AI Resume Assistant. Ask me about her projects, skills, experience, or technical background. I provide answers with citations from her portfolio data.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const history: ChatMessage[] = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await sendChatMessage(messageText, history);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.answer,
          citations: response.citations,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm temporarily unavailable. Please ensure the backend is running with a valid GEMINI_API_KEY configured.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <>
      <section id="ai-assistant" className="py-24 bg-gradient-to-b from-accent/5 to-transparent">
        <div className="section-container text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-mono mb-4">
            <Sparkles size={14} />
            Powered by Gemini · LangChain · FAISS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            AI Resume Assistant
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
            Recruiters can ask questions about Rajeshwari&apos;s background and get
            instant, citation-backed answers from her resume, projects, and experience.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
          >
            <MessageCircle size={20} />
            Start Conversation
          </button>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg h-[600px] max-h-[85vh] flex flex-col rounded-2xl border border-border bg-background shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-accent/10">
                    <Bot size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      AI Resume Assistant
                    </p>
                    <p className="text-xs text-muted">RAG-powered · With citations</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 text-muted hover:text-foreground rounded-lg hover:bg-surface-hover"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="p-1.5 rounded-lg bg-accent/10 h-fit">
                        <Bot size={14} className="text-accent" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
                        msg.role === "user"
                          ? "bg-accent text-background"
                          : "bg-surface border border-border text-muted"
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border space-y-2">
                          <p className="text-xs font-mono text-accent flex items-center gap-1">
                            <Quote size={12} />
                            Sources
                          </p>
                          {msg.citations.map((cite, j) => (
                            <div
                              key={j}
                              className="text-xs p-2 rounded bg-background border border-border"
                            >
                              <span className="text-accent font-mono">{cite.source}</span>
                              <p className="text-muted mt-1 line-clamp-2">{cite.excerpt}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="p-1.5 rounded-lg bg-surface h-fit">
                        <User size={14} className="text-muted" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-2">
                    <div className="p-1.5 rounded-lg bg-accent/10">
                      <Bot size={14} className="text-accent animate-pulse" />
                    </div>
                    <div className="bg-surface border border-border rounded-xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.1s]" />
                        <span className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {messages.length <= 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {sampleChatQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border text-muted hover:text-accent hover:border-accent/30 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={onSubmit} className="p-4 border-t border-border bg-surface">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about projects, skills, experience..."
                    className="flex-1 px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:border-accent/50 focus:outline-none"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="p-2.5 rounded-lg bg-accent text-background disabled:opacity-50 hover:bg-accent/90 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-accent text-background shadow-lg shadow-accent/30 hover:bg-accent/90 transition-all hover:scale-105"
          aria-label="Open AI Assistant"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </>
  );
}
