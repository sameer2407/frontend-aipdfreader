"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Bot, User, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto m-2 px-2 md:px-4 py-2 space-y-4 bg-background">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4 md:space-y-6">
            <div className="text-center space-y-2">
              <p className="text-2xl md:text-3xl font-semibold">
                Welcome to AI PDF Reader
              </p>
              <p className="text-base md:text-lg text-muted-foreground/80">
                Upload a PDF to start chatting with your document
              </p>
            </div>
            <Button size="lg" className="gap-2">
              <Upload className="h-5 w-5" />
              Upload PDF
            </Button>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-lg m-4",
                message.role === "assistant" ? "bg-muted/50" : "bg-primary/5"
              )}
            >
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-primary/10">
                {message.role === "assistant" ? (
                  <Bot className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <User className="w-3 h-3 md:w-4 md:h-4" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm md:text-base">{message.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="shrink-0 border-t px-2 md:px-4 py-2 bg-background"
      >
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about the pdf..."
            className="flex-1 h-12 md:h-16 py-2 md:py-3 outline-none text-sm md:text-base"
          />
          <Button type="submit" size="icon" className="h-12 md:h-16">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
