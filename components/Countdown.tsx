"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Countdown() {
  const target = new Date(EVENT.dateTimeISO).getTime();
  const [timeLeft, setTimeLeft] = useState<ReturnType<
    typeof getTimeLeft
  > | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    const initial = setTimeout(() => setTimeLeft(getTimeLeft(target)), 0);
    return () => {
      clearInterval(id);
      clearTimeout(initial);
    };
  }, [target]);

  const units = [
    { label: "Days", value: timeLeft?.days },
    { label: "Hours", value: timeLeft?.hours },
    { label: "Minutes", value: timeLeft?.minutes },
    { label: "Seconds", value: timeLeft?.seconds },
  ];

  return (
    <section className="bg-royal-deep px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] tracking-[0.3em] text-gold uppercase">
          Counting down to
        </p>
        <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
          The Celebration
        </h2>

        <div className="mt-12 grid grid-cols-4 gap-3 sm:gap-6">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-6 backdrop-blur-sm"
            >
              <div className="relative h-12 w-full overflow-hidden sm:h-16">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={unit.value ?? "pending"}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -16 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute inset-0 flex items-center justify-center font-display text-3xl text-gold-pale sm:text-5xl"
                  >
                    {unit.value !== undefined
                      ? String(unit.value).padStart(2, "0")
                      : "—"}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-[10px] tracking-[0.25em] text-ivory/60 uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
