"use client";

import { motion, useReducedMotion } from "framer-motion";
import { STORY_MILESTONES } from "@/lib/event";

export default function Story() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-ivory px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-[11px] tracking-[0.3em] text-gold-deep uppercase">
            Our story
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            A Journey Worth Celebrating
          </h2>
        </motion.div>

        <div className="relative mt-16 flex flex-col gap-12">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px bg-gold/25 sm:left-1/2"
          />

          {STORY_MILESTONES.map((milestone, index) => (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: reduceMotion ? 0 : index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex gap-6 pl-8 sm:pl-0"
            >
              <span
                aria-hidden
                className="absolute top-1.5 left-0 h-3.5 w-3.5 rotate-45 border border-gold bg-ivory sm:left-1/2 sm:-translate-x-1/2"
              />
              <div
                className={
                  index % 2 === 0
                    ? "sm:mr-auto sm:w-[calc(50%-2.5rem)] sm:text-right"
                    : "sm:ml-auto sm:w-[calc(50%-2.5rem)]"
                }
              >
                <h3 className="font-display text-xl text-royal sm:text-2xl">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
