"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Loader2,
  MessageCircleMore,
  Minus,
  SendHorizonal,
  Sparkles,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type AssistantMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const starterPrompts = [
  "What subjects does Midu teach?",
  "What are his achievements?",
  "How can I contact him?"
];

const initialMessage: AssistantMessage = {
  id: "assistant-welcome",
  role: "assistant",
  content:
    "Hi, I’m Midu’s AI assistant. Ask me about subjects, achievements, experience, or how to get in touch."
};

function createMessage(role: AssistantMessage["role"], content: string): AssistantMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content
  };
}

export function TutorAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([initialMessage]);
  const [hasDismissedPrompts, setHasDismissedPrompts] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const showWelcomeState = messages.length === 1 && messages[0]?.id === initialMessage.id;
  const showPromptSuggestions = showWelcomeState && !hasDismissedPrompts && !isInputFocused;

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "40px";
    const nextHeight = Math.min(textarea.scrollHeight, 144);
    textarea.style.height = `${Math.max(nextHeight, 40)}px`;
    textarea.style.overflowY = textarea.scrollHeight > 144 ? "auto" : "hidden";
  }, [draft]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        minimizeAssistant();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const resetAssistant = () => {
    setDraft("");
    setMessages([initialMessage]);
    setHasDismissedPrompts(false);
    setIsInputFocused(false);
    setIsPending(false);
  };

  const minimizeAssistant = () => {
    setIsOpen(false);
  };

  const closeAssistant = () => {
    resetAssistant();
    setIsOpen(false);
  };

  const openAssistant = () => {
    setIsOpen(true);
  };

  const sendMessage = async (input: string) => {
    const trimmed = input.trim();

    if (!trimmed || isPending) {
      return;
    }

    setHasDismissedPrompts(true);
    setIsInputFocused(false);

    const nextUserMessage = createMessage("user", trimmed);
    const conversation = [...messages, nextUserMessage].slice(-10);

    setMessages(conversation);
    setDraft("");
    setIsPending(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: conversation.map(({ role, content }) => ({ role, content }))
        })
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok || !payload.message) {
        throw new Error(payload.message || "Assistant unavailable");
      }

      setMessages((current) => [...current, createMessage("assistant", payload.message as string)]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "The assistant is unavailable right now.";

      toast.error(message);
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "I’m unavailable right now. Please use the contact form and Midu will get back to you."
        )
      ]);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="assistant-panel"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-auto flex h-[min(70vh,34rem)] w-[min(92vw,22rem)] flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/95 shadow-[0_24px_80px_rgba(15,23,42,0.22)] backdrop-blur"
            role="dialog"
            aria-label="Midu's AI assistant"
          >
            <div className="border-b border-border/70 bg-gradient-to-br from-primary/14 via-card to-card px-5 py-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Badge className="gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    Midu's Assistant
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button
                    id="midu-ai-minimize"
                    data-role="midu-ai-minimize"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-2xl"
                    aria-label="Minimize assistant"
                    onClick={minimizeAssistant}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button
                    id="midu-ai-close"
                    data-role="midu-ai-close"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-2xl"
                    aria-label="Close assistant"
                    onClick={closeAssistant}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="scrollbar-hidden flex-1 overflow-y-auto px-4 py-4"
            >
              {showWelcomeState ? (
                <div className="flex h-full flex-col justify-center">
                  <div
                    className="mx-auto flex max-w-sm flex-col items-center text-center"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                      <Bot className="h-6 w-6" />
                    </div>
                    <h4 className="font-display text-2xl font-semibold">Welcome to Midu AI</h4>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Explore Midu’s portfolio through AI.
                    </p>

                    {showPromptSuggestions ? (
                      <div className="mt-8 flex w-full flex-col gap-2">
                        {starterPrompts.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            data-role="midu-ai-suggestion"
                            className="rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-sm text-foreground transition hover:border-primary/30 hover:bg-primary/5"
                            onClick={() => void sendMessage(prompt)}
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-[1.5rem] px-4 py-3 text-sm leading-6 shadow-sm",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "border border-border/70 bg-background/80 text-foreground"
                        )}
                      >
                        {message.role === "assistant" ? (
                          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            <Bot className="h-3.5 w-3.5" />
                            Midu AI
                          </div>
                        ) : null}

                        {message.role === "assistant" ? (
                          <div className="assistant-markdown">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a: ({ ...props }) => (
                                  <a
                                    {...props}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-primary underline underline-offset-4"
                                  />
                                ),
                                code: ({ className, children, ...props }) => {
                                  const isBlock = Boolean(className);

                                  if (isBlock) {
                                    return (
                                      <code className={cn("block overflow-x-auto", className)} {...props}>
                                        {children}
                                      </code>
                                    );
                                  }

                                  return (
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-[0.92em]" {...props}>
                                      {children}
                                    </code>
                                  );
                                }
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isPending ? (
                <div className="flex justify-start">
                  <div className="rounded-[1.5rem] border border-border/70 bg-background/80 px-4 py-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Thinking...
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-border/70 px-4 py-4">
              <div className="flex items-end gap-2">
                <Textarea
                  ref={textareaRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onFocus={() => {
                    setIsInputFocused(true);
                    setHasDismissedPrompts(true);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void sendMessage(draft);
                    }
                  }}
                  placeholder="Ask about Midu’s portfolio..."
                  className="scrollbar-hidden h-[40px] min-h-[40px] max-h-[144px] flex-1 resize-none overflow-y-hidden rounded-[1rem] border border-border/70 bg-background/75 px-3.5 py-[0.45rem] shadow-none focus-visible:ring-0"
                />
                <Button
                  id="midu-ai-send"
                  data-role="midu-ai-send"
                  type="button"
                  className="h-[40px] w-[40px] shrink-0 rounded-[1rem] px-0"
                  onClick={() => void sendMessage(draft)}
                  disabled={isPending || !draft.trim()}
                  aria-label="Send message"
                >
                  {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <SendHorizonal className="h-3.5 w-3.5" />}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {!isOpen ? (
          <motion.div
            key="assistant-launcher"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            className="pointer-events-auto flex justify-end"
          >
            <Button
              id="midu-ai-launcher"
              data-role="midu-ai-launcher"
              type="button"
              className="group relative h-14 w-14 rounded-full px-0 shadow-[0_18px_45px_rgba(37,99,235,0.28)]"
              onClick={openAssistant}
              aria-label="Open Midu's AI assistant"
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-primary/25"
                animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.1, 0.45] }}
                transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <span className="relative flex items-center justify-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                  <MessageCircleMore className="h-5 w-5" />
                </span>
              </span>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
