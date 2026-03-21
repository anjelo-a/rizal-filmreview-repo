"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { film } from "@/data/film";
import { withBasePath } from "@/lib/withBasePath";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const bannerUrl = withBasePath("/images/rizal-hero-cinematic.jpeg");
  const backgroundY = useTransform(
    scrollY,
    [0, 700],
    [0, prefersReducedMotion ? 0 : 160],
  );
  const vignetteOpacity = useTransform(
    scrollY,
    [0, 500],
    [0.42, 0.68],
  );
  const lightSweepX = useTransform(
    scrollY,
    [0, 900],
    ["-8%", "12%"],
  );

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#090705]"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerUrl})` }}
          initial={prefersReducedMotion ? false : { scale: 1.12, opacity: 0.68 }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  scale: [1.04, 1.08, 1.04],
                  opacity: [0.88, 1, 0.9],
                  x: [0, 10, 0],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 16,
                  times: [0, 0.5, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10"
        style={{
          opacity: vignetteOpacity,
          background:
            "linear-gradient(90deg, rgba(5,4,3,0.92) 0%, rgba(5,4,3,0.8) 24%, rgba(15,10,7,0.42) 52%, rgba(8,5,4,0.72) 100%)",
        }}
      />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_72%_32%,rgba(243,191,110,0.22),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(247,210,150,0.1),transparent_22%)]" />
      <motion.div
        className="absolute inset-y-0 z-10 w-[44vw] bg-[linear-gradient(90deg,rgba(243,190,107,0.12),rgba(243,190,107,0))] blur-3xl"
        style={{ x: lightSweepX }}
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.18, 0.34, 0.18], scaleY: [0.96, 1.04, 0.96] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(4,3,2,0.38)_0%,rgba(4,3,2,0.08)_38%,rgba(4,3,2,0.72)_100%)]" />

      <motion.div
        className="relative z-20 mx-auto flex w-full max-w-7xl items-center px-6 py-24 sm:px-8 lg:px-12"
      >
        <motion.div
          className="max-w-3xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: 1, y: [0, -6, 0] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                  y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                }
          }
        >
          <motion.p
            className="text-[11px] uppercase tracking-[0.44em] text-[#d8bc82] sm:text-xs"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Historical Film Review
          </motion.p>
          <motion.h1
            className="mt-5 max-w-[12ch] font-serif text-[clamp(3.2rem,8vw,6.8rem)] leading-[0.9] tracking-[-0.04em] text-[#fff7eb] drop-shadow-[0_14px_34px_rgba(0,0,0,0.38)]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {film.title}
          </motion.h1>
          <motion.div
            className="mt-6 h-px w-24 bg-gradient-to-r from-[#e3c07b] to-transparent"
            initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0.4 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.28, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left center" }}
          />
          <motion.p
            className="mt-6 max-w-2xl text-base leading-8 text-[#f1e6d2]/88 sm:text-lg md:text-[1.35rem]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {film.tagline}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
