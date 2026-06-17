"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useRef, useState, type FormEvent } from "react";
import type { Guest } from "@/lib/types";
import ResultCard from "./ResultCard";
import DidYouMean from "./DidYouMean";
import NotFound from "./NotFound";
import { SearchIcon } from "./icons";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "single"; guest: Guest }
  | { status: "multiple"; guests: Guest[] }
  | { status: "none" }
  | { status: "error" };

export default function SeatSearch() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setState({ status: "loading" });

    try {
      const response = await fetch("/api/seat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      if (!response.ok) {
        setState({ status: "error" });
        return;
      }

      const data: { matches: Guest[] } = await response.json();
      const matches = data.matches;

      if (matches.length === 0) {
        setState({ status: "none" });
        return;
      }

      const exact = matches.find(
        (guest) => guest.full_name.toLowerCase() === trimmed.toLowerCase()
      );

      if (matches.length === 1 || exact) {
        setState({ status: "single", guest: exact ?? matches[0] });
        return;
      }

      setState({ status: "multiple", guests: matches });
    } catch {
      setState({ status: "error" });
    }
  }

  function reset() {
    setState({ status: "idle" });
    setQuery("");
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  const showForm = state.status === "idle" || state.status === "loading";
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <AnimatePresence mode="wait">
      {showForm && (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
          transition={transition}
          className="flex flex-col gap-3"
        >
          <label htmlFor={inputId} className="text-base font-semibold text-royal">
            Enter your name to find your table
          </label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-royal/40" />
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              inputMode="text"
              autoComplete="name"
              placeholder="Type your full name"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-xl border border-gold/40 bg-ivory py-3.5 pl-11 pr-4 text-base text-ink placeholder:text-ink/40 transition focus:border-gold-deep focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
            />
          </div>
          <button
            type="submit"
            disabled={state.status === "loading" || query.trim().length === 0}
            className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold to-gold-deep px-5 py-3.5 text-[15px] font-semibold tracking-wide text-royal-deep ring-1 ring-gold-deep/40 shadow-[0_12px_28px_-8px_rgba(184,144,43,0.6),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-200 hover:brightness-105 hover:shadow-[0_16px_34px_-8px_rgba(184,144,43,0.7),inset_0_1px_0_rgba(255,255,255,0.45)] active:translate-y-px active:shadow-[0_6px_16px_-8px_rgba(184,144,43,0.55),inset_0_1px_0_rgba(255,255,255,0.3)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
          >
            {state.status === "loading" ? (
              <>
                <span
                  aria-hidden
                  className="h-4 w-4 animate-spin rounded-full border-2 border-royal-deep/30 border-t-royal-deep"
                />
                Searching…
              </>
            ) : (
              "Find my seat"
            )}
          </button>
        </motion.form>
      )}

      {state.status === "single" && (
        <motion.div
          key="single"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
          transition={transition}
        >
          <ResultCard guest={state.guest} onReset={reset} />
        </motion.div>
      )}

      {state.status === "multiple" && (
        <motion.div
          key="multiple"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
          transition={transition}
        >
          <DidYouMean
            guests={state.guests}
            onSelect={(guest) => setState({ status: "single", guest })}
            onReset={reset}
          />
        </motion.div>
      )}

      {state.status === "none" && (
        <motion.div
          key="none"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
          transition={transition}
        >
          <NotFound onReset={reset} />
        </motion.div>
      )}

      {state.status === "error" && (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
          transition={transition}
          className="flex flex-col gap-3 text-center"
        >
          <p className="text-sm text-ink/70">
            Something went wrong on our end. Please try again in a moment.
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-sm text-gold-deep underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
          >
            Try again
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
