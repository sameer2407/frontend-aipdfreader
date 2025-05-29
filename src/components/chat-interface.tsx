"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Bot, User, Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle input blur to ensure proper mobile behavior
  const handleInputBlur = () => {
    // Small delay to ensure the keyboard is fully closed
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const fetchData = async (query: string) => {
    // debugger; // Debug point 1: Function entry
    setLoading(true);
    const userMessage: Message = { role: "user", content: query };
    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);

    try {
      // debugger; // Debug point 2: Before API call
      console.log("Sending request...");
      const res = await fetch("/api/proxy-pdf-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });

      // debugger; // Debug point 3: After API call, before parsing response
      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      // debugger; // Debug point 4: After parsing response
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].content =
          data.answer || "No answer provided";
        return updated;
      });
    } catch (err) {
      // debugger; // Debug point 5: Error handling
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: `⚠️ Error: ${
            err instanceof Error ? err.message : "Something went wrong"
          }`,
        },
      ]);
    } finally {
      // debugger; // Debug point 6: Function completion
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    fetchData(input.trim());
    setInput("");
    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-col h-full w-full max-h-[100dvh]">
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2 bg-background">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
            <div className="text-center space-y-2 px-4">
              <p className="text-xl font-semibold">Welcome to AI PDF Reader</p>
              <p className="text-sm text-muted-foreground/80">
                Upload a PDF to start chatting with your document
              </p>
            </div>
            <Button size="lg" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload PDF
            </Button>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-2 p-2 rounded-lg",
                message.role === "assistant" ? "bg-muted/50" : "bg-primary/5"
              )}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary/10 shrink-0">
                {message.role === "assistant" ? (
                  <Bot className="w-3 h-3" />
                ) : (
                  <User className="w-3 h-3" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="shrink-0 border-t px-2 py-2 bg-background"
      >
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={handleInputBlur}
            placeholder="Ask me anything about the pdf..."
            className="flex-1 h-10 text-sm outline-none"
            disabled={loading}
            autoFocus
          />
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
