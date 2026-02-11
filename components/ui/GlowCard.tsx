"use client";

import { motion, HTMLMotionProps, TargetAndTransition } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  glowColor?: "blue" | "purple" | "green" | "orange" | "cyan";
  glowIntensity?: "sm" | "md" | "lg";
  enableHover?: boolean;
  enableTilt?: boolean;
  className?: string;
}

const glowColorMap = {
  blue: "hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
  purple: "hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]",
  green: "hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
  orange: "hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]",
  cyan: "hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
};

export default function GlowCard({
  children,
  glowColor = "blue",
  glowIntensity = "md",
  enableHover = true,
  enableTilt = false,
  className,
  ...motionProps
}: GlowCardProps) {
  // Note: glowIntensity is accepted but not currently used
  void glowIntensity;

  // Build hover animation object only when needed
  const getHoverAnimation = (): TargetAndTransition | undefined => {
    if (!enableHover && !enableTilt) return undefined;

    const animation: TargetAndTransition = {};

    if (enableHover) {
      animation.scale = 1.02;
      animation.y = -5;
    }

    if (enableTilt) {
      animation.rotateX = 2;
      animation.rotateY = 2;
    }

    animation.transition = {
      duration: enableTilt ? 0.4 : 0.3,
      ease: "easeOut",
    };

    return animation;
  };

  return (
    <motion.div
      className={cn(
        "content-card",
        "transition-all duration-300 ease-out",
        enableHover && glowColorMap[glowColor],
        enableTilt && "transform-gpu",
        className
      )}
      whileHover={getHoverAnimation()}
      style={{
        transformStyle: enableTilt ? "preserve-3d" : undefined,
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
