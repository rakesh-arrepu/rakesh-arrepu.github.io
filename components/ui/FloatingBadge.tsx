"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingBadgeProps {
  children: ReactNode;
  variant?: "blue" | "purple" | "green" | "cyan" | "orange" | "gray";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  delay?: number;
  className?: string;
}

const variantMap = {
  blue: "bg-blue-100 dark:bg-blue-600/90 text-blue-700 dark:text-white border-blue-200 dark:border-blue-500",
  purple: "bg-purple-100 dark:bg-purple-600/90 text-purple-700 dark:text-white border-purple-200 dark:border-purple-500",
  green: "bg-green-100 dark:bg-green-600/90 text-green-700 dark:text-white border-green-200 dark:border-green-500",
  cyan: "bg-cyan-100 dark:bg-cyan-600/90 text-cyan-700 dark:text-white border-cyan-200 dark:border-cyan-500",
  orange: "bg-orange-100 dark:bg-orange-600/90 text-orange-700 dark:text-white border-orange-200 dark:border-orange-500",
  gray: "bg-slate-100 dark:bg-slate-700/90 text-slate-700 dark:text-white border-slate-200 dark:border-slate-600",
};

const sizeMap = {
  sm: "text-xs px-2 py-1 gap-1",
  md: "text-sm px-3 py-1.5 gap-1.5",
  lg: "text-base px-4 py-2 gap-2",
};

const iconSizeMap = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export default function FloatingBadge({
  children,
  variant = "blue",
  size = "md",
  icon,
  delay = 0,
  className = "",
}: FloatingBadgeProps) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center",
        "font-medium rounded-full border",
        "transition-all duration-300",
        "hover:scale-105 hover:shadow-md",
        variantMap[variant],
        sizeMap[size],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        y: -2,
        transition: {
          duration: 0.2,
        },
      }}
    >
      {icon && (
        <span className={cn("flex-shrink-0", iconSizeMap[size])}>
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap">{children}</span>
    </motion.span>
  );
}
