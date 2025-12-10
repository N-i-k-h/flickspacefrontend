// src/components/ChatBot.tsx
import { useEffect, useRef, useState } from "react";
import { Send, Building2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

interface LeadData {
  name?: string;
  designation?: string;
  company?: string;
  location?: string;
  seats?: string;
  budget?: string;
  timeline?: string;
}

interface ChatBotProps {
  onClose?: () => void;
}

const questions = [
  "Hi! I'm your FlickSpace assistant. I'll help you find the perfect workspace. Let's start with your name?",
  "Great to meet you, {name}! What's your designation?",
  "Excellent! And which company are you with?",
  "Perfect! Which location are you looking for? (e.g., Bangalore, Mumbai, Delhi, Hyderabad)",
  "How many seats do you need?",
  "What's your budget per seat? (e.g., ₹10,000, ₹15,000)?",
  "When are you planning to move in? (e.g., Immediately, 30 days, 60 days)",
];

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: questions[0], isBot: true },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [leadData, setLeadData] = useState<LeadData>({});
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // refs
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Scroll inner messages container to bottom (no page scroll)
  const scrollMessagesToBottom = (behavior: ScrollBehavior = "auto") => {
    const el = messagesContainerRef.current;
    if (!el) return;
    // set scrollTop directly to avoid scrollIntoView which may scroll the page
    el.scrollTo({ top: el.scrollHeight, behavior });
  };

  useEffect(() => {
    // scroll only inside the chat box
    scrollMessagesToBottom("smooth");
  }, [messages]);

  useEffect(() => {
    // focus input but prevent browser from scrolling the page to it
    try {
      inputRef.current?.focus?.({ preventScroll: true });
    } catch {
      // some older browsers may not support the options object
      inputRef.current?.focus?.();
    }
  }, []);

  const processResponse = (response: string): string => {
    let text = response;
    if (leadData.name) {
      text = text.replace("{name}", leadData.name);
    }
    return text;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isComplete) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Update lead data based on current step
    const newLeadData = { ...leadData };
    switch (currentStep) {
      case 0:
        newLeadData.name = inputValue;
        break;
      case 1:
        newLeadData.designation = inputValue;
        break;
      case 2:
        newLeadData.company = inputValue;
        break;
      case 3:
        newLeadData.location = inputValue;
        break;
      case 4:
        newLeadData.seats = inputValue;
        break;
      case 5:
        newLeadData.budget = inputValue;
        break;
      case 6:
        newLeadData.timeline = inputValue;
        break;
    }
    setLeadData(newLeadData);
    setInputValue("");

    // Simulate typing delay (bot response)
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      if (currentStep < questions.length - 1) {
        const nextQuestion = processResponse(questions[currentStep + 1]);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: nextQuestion.replace("{name}", newLeadData.name || ""),
            isBot: true,
          },
        ]);
        setCurrentStep((prev) => prev + 1);
      } else {
        // Conversation complete
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: `Thank you, ${newLeadData.name}! Based on your requirements, I'll now show you the best workspace options in ${newLeadData.location}. Our team will also reach out within 24 hours to assist you further.`,
            isBot: true,
          },
        ]);
        setIsComplete(true);
      }
      // after messages added, ensure inner scroll to bottom
      setTimeout(() => scrollMessagesToBottom("smooth"), 50);
    }, 800);
  };

  return (
    <div className="w-full bg-secondary rounded-2xl shadow-2xl overflow-hidden border border-border/50">
      {/* Chat Header */}
      <div className="bg-card px-5 py-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-teal flex items-center justify-center shadow-md">
            <Building2 className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">FlickSpace AI</h3>
            <p className="text-xs text-muted-foreground">Your workspace finder</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Messages container (scrolls internally) */}
      <div
        ref={messagesContainerRef}
        className="h-72 overflow-y-auto p-4 space-y-3 bg-secondary"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.isBot ? "justify-start" : "justify-end"
            )}
          >
            {message.isBot && (
              <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center mr-2 flex-shrink-0">
                <Building2 className="w-4 h-4 text-accent-foreground" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                message.isBot
                  ? "bg-card text-foreground rounded-tl-sm shadow-soft border border-border/30"
                  : "bg-teal text-accent-foreground rounded-tr-sm"
              )}
            >
              {message.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center mr-2 flex-shrink-0">
              <Building2 className="w-4 h-4 text-accent-foreground" />
            </div>
            <div className="bg-card px-4 py-3 rounded-2xl rounded-tl-sm shadow-soft border border-border/30">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="p-4 bg-card border-t border-border">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isComplete ? "Chat complete!" : "Type your message..."}
            disabled={isComplete || isTyping}
            className="flex-1 px-5 py-3 bg-white rounded-full text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 transition-all border border-gray-300"
          />
          <Button
            type="button"
            variant="teal"
            size="icon"
            disabled={!inputValue.trim() || isComplete || isTyping}
            className="rounded-full w-11 h-11 shadow-md hover:shadow-lg transition-all"
            onClick={() => handleSubmit()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
