"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  delay?: number;
}

export default function AnimatedCounter({
  value,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
  delay = 0,
}: AnimatedCounterProps) {
  // Note: duration is accepted but not used as useSpring handles timing
  void duration;

  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      }
    });

    return () => unsubscribe();
  }, [springValue, prefix, suffix, decimals]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {prefix}0{suffix}
    </motion.span>
  );
}

/**
 * Helper component for displaying percentage metrics
 */
export function PercentageCounter({
  value,
  duration = 2,
  className = "",
  delay = 0,
}: Omit<AnimatedCounterProps, "suffix" | "prefix">) {
  return (
    <AnimatedCounter
      value={value}
      duration={duration}
      suffix="%"
      decimals={0}
      className={className}
      delay={delay}
    />
  );
}

/**
 * Helper component for displaying time metrics (hours, days, etc.)
 */
export function TimeCounter({
  value,
  unit = "hours",
  duration = 2,
  className = "",
  delay = 0,
}: Omit<AnimatedCounterProps, "suffix"> & { unit?: string }) {
  return (
    <AnimatedCounter
      value={value}
      duration={duration}
      suffix={` ${unit}`}
      decimals={0}
      className={className}
      delay={delay}
    />
  );
}

/**
 * Helper component for displaying plus/minus metrics
 */
export function DeltaCounter({
  value,
  duration = 2,
  suffix = "",
  className = "",
  delay = 0,
}: Omit<AnimatedCounterProps, "prefix">) {
  const prefix = value >= 0 ? "+" : "";
  const colorClass = value >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";

  return (
    <AnimatedCounter
      value={value}
      duration={duration}
      prefix={prefix}
      suffix={suffix}
      decimals={0}
      className={`${colorClass} ${className}`}
      delay={delay}
    />
  );
}
