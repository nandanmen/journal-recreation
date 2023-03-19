"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function Home() {
  const [open, toggle] = React.useReducer((s) => !s, false);
  return (
    <div className="h-screen flex flex-col text-white items-center justify-center bg-neutral-900">
      <motion.div
        className="w-[500px] aspect-[9/16] bg-black rounded-[24px] overflow-hidden"
        animate={{ backgroundColor: open ? "rgb(0,0,0)" : "rgb(38,38,38)" }}
      >
        <header className="mt-12 mb-4 space-y-4">
          <div className="w-fit mx-auto relative py-1 px-3">
            {!open && (
              <motion.div
                layoutId="active"
                className="absolute inset-0 bg-neutral-700 rounded-lg"
                style={{ borderRadius: 16 }}
              />
            )}
            <h1 className="flex gap-1 justify-center relative">
              <AnimatePresence mode="popLayout">
                {!open && (
                  <motion.span
                    animate={{ x: 0, opacity: 1 }}
                    initial={{ x: 8, opacity: 0 }}
                    exit={{ x: 8, opacity: 0 }}
                  >
                    14
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.span layout="position">March</motion.span>
              <motion.span layout="position" className="text-neutral-400">
                2023
              </motion.span>
            </h1>
          </div>
          {open && (
            <ul className="flex justify-center">
              {range(10, 20).map((i) => {
                return (
                  <li
                    className="text-center py-4 px-6 relative overflow-hidden shrink-0 rounded-lg"
                    key={i}
                  >
                    {i === 15 && (
                      <motion.div
                        layoutId="active"
                        className="absolute inset-0 bg-neutral-800"
                        style={{ borderRadius: 8 }}
                      />
                    )}
                    <div className="relative">
                      <p className="text-sm text-neutral-400 mb-2">
                        {days[i % days.length]}
                      </p>
                      <p>{i}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </header>
        <motion.article
          layout="position"
          className="h-full bg-neutral-800 rounded-[24px] pt-12 px-6 relative"
        >
          {open && (
            <button className="absolute left-1/2 top-0 -translate-x-1/2 text-neutral-400">
              <Icon />
            </button>
          )}
          <h1 className="text-2xl">Today was a weird day.</h1>
        </motion.article>
      </motion.div>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

const Icon = () => {
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M15.25 14.25L12 10.75L8.75 14.25"
      ></path>
    </svg>
  );
};
