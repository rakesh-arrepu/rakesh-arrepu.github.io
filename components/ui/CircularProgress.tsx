"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: "green" | "blue" | "cyan" | "purple";
  showPercentage?: boolean;
  animateOnView?: boolean;
  className?: string;
}

const colorMap = {
  green: {
    from: "#10B981",
    to: "#34D399",
    glow: "rgba(16, 185, 129, 0.3)",
  },
  blue: {
    from: "#3B82F6",
    to: "#60A5FA",
    glow: "rgba(59, 130, 246, 0.3)",
  },
  cyan: {
    from: "#06B6D4",
    to: "#22D3EE",
    glow: "rgba(6, 182, 212, 0.3)",
  },
  purple: {
    from: "#8B5CF6",
    to: "#A78BFA",
    glow: "rgba(139, 92, 246, 0.3)",
  },
};

/**
 * Get color based on skill level
 * - 90-100%: Green (mastery)
 * - 80-89%: Blue (proficient)
 * - 70-79%: Cyan (competent)
 * - Below 70%: Purple (learning)
 */
export function getSkillColor(percentage: number): "green" | "blue" | "cyan" | "purple" {
  if (percentage >= 90) return "green";
  if (percentage >= 80) return "blue";
  if (percentage >= 70) return "cyan";
  return "purple";
}

export default function CircularProgress({
  percentage,
  size = 80,
  strokeWidth = 6,
  color,
  showPercentage = true,
  animateOnView = true,
  className = "",
}: CircularProgressProps) {
  // Always show the progress (animation is handled by Framer Motion)
  const isVisible = true;

  // Auto-determine color based on percentage if not provided
  const selectedColor = color || getSkillColor(percentage);
  const colors = colorMap[selectedColor];

  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  // Gradient ID - use useState to generate once and remain stable
  const [gradientId] = useState(() => `gradient-${selectedColor}-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`);

  // Remove unused animateOnView to suppress warning
  void animateOnView;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Define gradient */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.from} />
            <stop offset="100%" stopColor={colors.to} />
          </linearGradient>
          <filter id={`glow-${gradientId}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-slate-200 dark:text-slate-700"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            filter: `url(#glow-${gradientId})`,
          }}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: isVisible ? offset : circumference,
          }}
          transition={{
            duration: 1.5,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.2,
          }}
        />
      </svg>

      {/* Percentage text */}
      {showPercentage && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.5,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.8,
          }}
        >
          <span
            className="text-sm font-bold font-mono"
            style={{
              color: colors.from,
              textShadow: `0 0 10px ${colors.glow}`,
            }}
          >
            {percentage}%
          </span>
        </motion.div>
      )}
    </div>
  );
}
