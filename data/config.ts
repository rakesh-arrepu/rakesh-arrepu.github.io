// Configuration mappings for icons and gradients
import {
  Mail,
  Linkedin,
  Github,
  FileText,
  Twitter,
  Phone,
  FlaskConical,
  Plug,
  FileCheck,
  Sparkles,
  Bot,
  Brain,
  Database,
  Blocks,
  Monitor,
  ClipboardCheck,
  Wind,
  Bug,
  Code,
  type LucideIcon,
} from "lucide-react";
import type { IconName, GradientName } from "./types";
import type { IconType } from "react-icons";

// Brand logos from react-icons
import { SiSelenium, SiCucumber, SiJavascript, SiTypescript, SiPostman, SiJenkins, SiDocker, SiAmazonwebservices, SiOracle, SiGithub, SiGitlab, SiBitbucket, SiJira, SiDotnet } from "react-icons/si";
import { DiJava, DiPython } from "react-icons/di";

// Icon mapping: string name -> React component
export const ICON_MAP: Record<IconName, LucideIcon> = {
  Mail,
  Linkedin,
  Github,
  FileText,
  Twitter,
  Phone,
};

// Skill icon mapping: skill name (from JSON) -> icon component
// Uses react-icons for brand logos, Lucide for fallbacks
export const SKILL_ICON_MAP: Record<string, IconType | LucideIcon> = {
  // Test Automation Frameworks
  "Selenium": SiSelenium,
  "Playwright": Code,          // No SI icon; uses Lucide Code
  "Karate DSL": Code,          // No SI icon
  "Karate": Code,
  "TestNG": FlaskConical,
  "Cucumber": SiCucumber,
  "SpecFlow": FlaskConical,

  // API & Services Testing
  "REST Assured": Plug,
  "REST Sharp": SiDotnet,
  "Postman": SiPostman,
  "SoapUI": Plug,
  "PACT Contract Testing": FileCheck,

  // Programming & Scripting
  "Java": DiJava,
  "Python": DiPython,
  "C#": SiDotnet,
  "JavaScript": SiJavascript,
  "TypeScript": SiTypescript,

  // AI & Emerging Tech
  "Generative AI": Sparkles,
  "Agentic AI": Bot,
  "LLM": Brain,
  "RAG": Database,
  "AI Agents": Bot,
  "MCP": Blocks,

  // DevOps & Cloud
  "Jenkins": SiJenkins,
  "Docker": SiDocker,
  "OCI": SiOracle,
  "AWS": SiAmazonwebservices,

  // SCM & Version Control
  "GitHub": SiGithub,
  "GitLab": SiGitlab,
  "BitBucket": SiBitbucket,
  "Azure": SiDotnet,

  // Tools & Management
  "Jira": SiJira,
  "HP ALM": Monitor,
  "Qmetry": ClipboardCheck,
  "Zephyr": Wind,
  "Bug DB": Bug,
};

// Category-level fallback icons (when skill name isn't in the map)
const CATEGORY_FALLBACK: Record<string, LucideIcon> = {
  "Test Automation Frameworks": FlaskConical,
  "API & Services Testing": Plug,
  "Programming & Scripting": Code,
  "AI & Emerging Tech": Brain,
  "DevOps & Cloud": SiDocker as unknown as LucideIcon,
  "SCM & Version Control": SiGithub as unknown as LucideIcon,
  "Tools & Management": ClipboardCheck,
};

/**
 * Get skill icon by name with category fallback
 */
export function getSkillIcon(skillName: string, category?: string): IconType | LucideIcon {
  const icon = SKILL_ICON_MAP[skillName];
  if (icon) return icon;

  if (category && CATEGORY_FALLBACK[category]) {
    return CATEGORY_FALLBACK[category];
  }

  return Code; // ultimate fallback
}

// Brand-native icon colors (official hex from Simple Icons / Devicons)
export const SKILL_BRAND_COLORS: Record<string, string> = {
  "Selenium": "#43B02A",
  "Cucumber": "#23D96C",
  "JavaScript": "#F7DF1E",
  "TypeScript": "#3178C6",
  "Postman": "#FF6C37",
  "Jenkins": "#D24939",
  "Docker": "#2496ED",
  "AWS": "#FF9900",
  "OCI": "#F80000",
  "GitHub": "#181717",
  "GitLab": "#FC6D26",
  "BitBucket": "#0052CC",
  "Jira": "#0052CC",
  "C#": "#512BD4",
  "REST Sharp": "#512BD4",
  "Azure": "#512BD4",
  "Java": "#007396",
  "Python": "#3776AB",
};

// Dark mode overrides for icons whose brand color is invisible on dark backgrounds
const SKILL_BRAND_COLORS_DARK: Record<string, string> = {
  "GitHub": "#f1f5f9",
};

/**
 * Get brand color for a skill icon. Returns null for skills without a brand color
 * (Lucide fallback icons), so the caller can fall back to proficiency-tier color.
 */
export function getSkillBrandColor(skillName: string, isDark = false): string | null {
  if (isDark && SKILL_BRAND_COLORS_DARK[skillName]) {
    return SKILL_BRAND_COLORS_DARK[skillName];
  }
  return SKILL_BRAND_COLORS[skillName] ?? null;
}

// Company logo mapping: company name (substring match) -> logo file path + brand color
export interface CompanyBrand {
  logo: string;          // path under /logos/ in public folder
  color: string;         // brand accent color
  invertInDark?: boolean; // true if logo has dark colors that vanish on dark backgrounds
}

export const COMPANY_BRAND_MAP: Record<string, CompanyBrand> = {
  "Oracle": { logo: "/logos/oracle.svg", color: "#C74634" },
  "ValueLabs": { logo: "/logos/valuelabs.svg", color: "#2ABFAB", invertInDark: true },
  "Sails": { logo: "/logos/sails.png", color: "#00B8F0" },
  "Syntel": { logo: "/logos/syntel.png", color: "#006B52" },
};

/**
 * Get company brand info by matching company name substring
 */
export function getCompanyBrand(companyName: string): CompanyBrand | null {
  for (const [key, brand] of Object.entries(COMPANY_BRAND_MAP)) {
    if (companyName.includes(key)) return brand;
  }
  return null;
}

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
