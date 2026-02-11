// Configuration mappings for icons and gradients
import {
  Mail,
  Linkedin,
  Github,
  FileText,
  Twitter,
  Phone,
  type LucideIcon,
} from "lucide-react";
import type { IconName, GradientName } from "./types";

// Icon mapping: string name -> React component
export const ICON_MAP: Record<IconName, LucideIcon> = {
  Mail,
  Linkedin,
  Github,
  FileText,
  Twitter,
  Phone,
};

// Gradient mapping: string name -> Tailwind classes
export const GRADIENT_MAP: Record<
  GradientName,
  { from: string; to: string }
> = {
  blue: { from: "from-blue-500", to: "to-cyan-400" },
  indigo: { from: "from-indigo-500", to: "to-purple-400" },
  purple: { from: "from-purple-500", to: "to-pink-400" },
  cyan: { from: "from-cyan-500", to: "to-blue-400" },
  green: { from: "from-green-500", to: "to-emerald-400" },
};

/**
 * Get icon component by name
 * @param iconName - Name of the icon from lucide-react
 * @returns LucideIcon component (defaults to Mail if not found)
 */
export function getIcon(iconName: string): LucideIcon {
  const icon = ICON_MAP[iconName as IconName];
  if (!icon) {
    console.warn(`Icon "${iconName}" not found, using Mail as fallback`);
    return Mail;
  }
  return icon;
}

/**
 * Get gradient classes by name
 * @param gradientName - Name of the gradient preset
 * @returns Object with Tailwind gradient class strings
 */
export function getGradient(gradientName: string): { from: string; to: string } {
  const gradient = GRADIENT_MAP[gradientName as GradientName];
  if (!gradient) {
    console.warn(`Gradient "${gradientName}" not found, using blue as fallback`);
    return GRADIENT_MAP.blue;
  }
  return gradient;
}
