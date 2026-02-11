import { Variants } from "framer-motion";

/**
 * Animation Library for Portfolio
 * Contains reusable Framer Motion animation variants and configurations
 */

// ============================================================================
// BASIC ANIMATIONS
// ============================================================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// ============================================================================
// SCALE ANIMATIONS
// ============================================================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const scaleInSpring: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// ============================================================================
// CONTAINER & STAGGER ANIMATIONS
// ============================================================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// ============================================================================
// SPECIAL EFFECTS
// ============================================================================

export const slideInFromBottom: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const flipIn: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -90,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const expandWidth: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2, ease: "easeInOut" },
      opacity: { duration: 0.3 },
    },
  },
};

// ============================================================================
// HOVER ANIMATIONS
// ============================================================================

export const hoverLift = {
  scale: 1.02,
  y: -5,
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
};

export const hoverGlow = {
  scale: 1.05,
  boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
};

export const tiltHover = {
  rotateX: 5,
  rotateY: 5,
  scale: 1.05,
  transition: {
    duration: 0.4,
    ease: "easeOut",
  },
};

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

export const pageTransition = {
  type: "tween",
  ease: [0.4, 0, 0.2, 1],
  duration: 0.5,
};

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// ============================================================================
// CUSTOM TIMING FUNCTIONS
// ============================================================================

export const easings = {
  easeInOutCubic: [0.4, 0, 0.2, 1],
  easeOutCubic: [0, 0, 0.2, 1],
  easeInCubic: [0.4, 0, 1, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeOutQuart: [0.25, 1, 0.5, 1],
  spring: {
    type: "spring",
    stiffness: 100,
    damping: 15,
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Creates a staggered delay for child animations
 * @param index - Index of the child element
 * @param baseDelay - Base delay before stagger starts
 * @param increment - Delay increment per child
 */
export const staggerDelay = (
  index: number,
  baseDelay: number = 0,
  increment: number = 0.1
) => {
  return baseDelay + index * increment;
};

/**
 * Viewport animation config for scroll-triggered animations
 * Use with whileInView prop
 */
export const viewportConfig = {
  once: true,
  margin: "-100px",
  amount: 0.3,
};

/**
 * Creates a custom stagger container with configurable timing
 */
export const createStaggerContainer = (
  staggerDelay: number = 0.1,
  delayChildren: number = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    },
  },
});
