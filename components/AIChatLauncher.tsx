"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { MessageCircle, X } from "lucide-react";

import { AnimateShine } from "@/components/AnimateShine";
import { GlassButton } from "@/components/GlassButton";

const STORAGE_KEY = "vetra-chat-session";

function createConversationId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `vetra-${Date.now().toString(36)}-${Math.random()
    .toString(16)
    .slice(2, 10)}`;
}

export function AIChatLauncher(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setConversationId(stored);
      return;
    }

    const generated = createConversationId();
    window.localStorage.setItem(STORAGE_KEY, generated);
    setConversationId(generated);
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const sessionLabel = useMemo(
    () =>
      conversationId ? (conversationId.split("-")[1] ?? "session") : "session",
    [conversationId]
  );

  return (
    <div
      className="fixed bottom-6 right-6 z-[80] flex flex-col items-end gap-4"
      data-ai-chat-root
    >
      {isOpen ? (
        <div className="relative w-[min(420px,calc(100vw-3rem))] overflow-hidden rounded-3xl border border-white/12 bg-black/80 p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 glass-surface-deep gpu-accelerated">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(126,34,206,0.35),transparent_70%)]" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">
                Session {sessionLabel}
              </p>
              <h3 className="text-lg font-semibold text-white">
                Ask Vetra about the component kit
              </h3>
            </div>
            <button
              className="rounded-full border border-white/10 p-3 text-secondary hover:text-white transition-colors focus-visible touch-target"
              onClick={toggleOpen}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 glass-surface">
            <p className="text-sm text-secondary">
              <AnimateShine
                text="Streaming responses ready — wire up your API route to go live."
                speed={12}
              />
            </p>
            <ul className="space-y-2 text-xs text-secondary">
              <li>• Swap in your endpoint at `/app/api/chat/route.ts`.</li>
              <li>• Stream responses with Server Sent Events or WebSockets.</li>
              <li>• Persist threads with Supabase, Planetscale, or KV.</li>
            </ul>
          </div>

          <form
            className="relative mt-4 flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!draft.trim()) {
                return;
              }
              // Placeholder: integrate with actual chat backend.
              setDraft("");
            }}
          >
            <label
              htmlFor="vetra-chat-input"
              className="text-xs text-secondary"
            >
              Your Message
            </label>
            <textarea
              id="vetra-chat-input"
              className="min-h-[96px] w-full resize-none rounded-2xl border border-white/10 bg-black/60 p-4 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 glass-surface touch-target"
              placeholder="Try: Generate a hero section with spotlight hover states."
              value={draft}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDraft(event.target.value);
              }}
            />
            <div className="flex items-center justify-between text-xs text-secondary">
              <span>
                Stubbed demo. Connect your AI backend to enable replies.
              </span>
              <GlassButton
                accent="#7E22CE"
                className="px-4 py-2 text-xs"
                onClick={toggleOpen}
              >
                Close
              </GlassButton>
            </div>
          </form>
        </div>
      ) : null}

      <GlassButton
        accent="#6B1F87"
        active={isOpen}
        className="gap-2"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-pressed={isOpen}
      >
        <MessageCircle className="h-4 w-4" />
        {isOpen ? "Hide Assistant" : "Ask Vetra AI"}
      </GlassButton>
    </div>
  );
}
