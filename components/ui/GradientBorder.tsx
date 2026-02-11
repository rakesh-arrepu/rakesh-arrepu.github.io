"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientBorderProps {
  children: ReactNode;
  gradient?: "blue-purple" | "cyan-blue" | "green-emerald" | "purple-pink" | "orange-red";
  borderWidth?: number;
  borderRadius?: string;
  className?: string;
  animate?: boolean;
}

const gradientMap = {
  "blue-purple": "linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.8))",
  "cyan-blue": "linear-gradient(135deg, rgba(6, 182, 212, 0.8), rgba(59, 130, 246, 0.8))",
  "green-emerald": "linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(52, 211, 153, 0.8))",
  "purple-pink": "linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.8))",
  "orange-red": "linear-gradient(135deg, rgba(245, 158, 11, 0.8), rgba(239, 68, 68, 0.8))",
};

export default function GradientBorder({
  children,
  gradient = "blue-purple",
  borderWidth = 1,
  borderRadius = "16px",
  className = "",
  animate = false,
}: GradientBorderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        animate && "gradient-animate",
        className
      )}
      style={{
        borderRadius,
      }}
    >
      {/* Gradient border layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          padding: `${borderWidth}px`,
          background: gradientMap[gradient],
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          borderRadius,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10"
        style={{
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
