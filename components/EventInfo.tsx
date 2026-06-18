"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EVENT } from "@/lib/event";
import { CalendarIcon, ClockIcon, PinIcon } from "./icons";

const DETAILS = [
  { Icon: CalendarIcon, label: "Date", value: EVENT.date },
  { Icon: ClockIcon, label: "Time", value: EVENT.time },
  { Icon: PinIcon, label: "Venue", value: EVENT.address },
] as const;

export default function EventInfo() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-royal px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] tracking-[0.3em] text-gold uppercase">
            Join us
          </p>
          <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
            The Celebration Details
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {DETAILS.map(({ Icon, label, value }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: reduceMotion ? 0 : index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-9 backdrop-blur-sm"
            >
              <Icon className="h-7 w-7 text-gold" />
              <p className="text-[11px] tracking-[0.25em] text-gold/80 uppercase">
                {label}
              </p>
              <p className="font-display text-lg leading-snug text-ivory">
                {value}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-sm text-ivory/65"
        >
          Scan the QR code at the entrance, or search your name above, to
          find your table.
        </motion.p>
      </div>
    </section>
  );
}
