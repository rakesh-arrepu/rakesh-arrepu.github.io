// TypeScript interfaces for portfolio content

export interface PortfolioContent {
  personal: PersonalInfo;
  hero: HeroSection;
  about: AboutSection;
  skills: SkillsSection;
  experience: ExperienceSection;
  projects: ProjectsSection;
  certifications: CertificationsSection;
  contact: ContactSection;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
}

export interface HeroSection {
  greeting: string;
  name: string;
  roles: string[];
  backgroundImage?: string;
}

export interface AboutDetail {
  label: string;
  value: string;
}

export interface JourneyMilestone {
  year: string;
  phase: string;
  title: string;
  skills: string[];
  milestone: string;
  color: string;
  iconName: string;
}

export interface AboutSection {
  heading: string;
  subheading: string;
  bio: string;
  details: AboutDetail[];
  journeyTimeline: JourneyMilestone[];
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface SkillsSection {
  heading: string;
  subheading: string;
  categories: SkillCategory[];
}

export interface Job {
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[]; // Supports **bold** markdown
}

export interface ExperienceSection {
  heading: string;
  subheading: string;
  jobs: Job[];
}

export type GradientName = "blue" | "indigo" | "purple" | "cyan" | "green";
export type OrganizationGradient = "blue-purple" | "indigo-blue" | "purple-pink" | "cyan-teal" | "green-emerald";

export interface Project {
  title: string;
  tech: string[];
  problem: string;
  solution: string;
  impact: string;
  gradient: GradientName;
}

export interface Organization {
  name: string;
  period: string;
  role: string;
  totalProjects: number;
  description: string;
  gradient: OrganizationGradient;
  projects: Project[];
}

export interface ProjectsSection {
  heading: string;
  subheading: string;
  projects?: Project[]; // Legacy flat structure (backward compatible)
  organizations?: Organization[]; // New organization-grouped structure
}

export interface Certification {
  name: string;
  issuer: string;
  icon: string; // emoji or unicode
  type?: "certification" | "workshop" | "conference" | "course" | "bootcamp" | "webinar";
  year?: number;
  month?: string;
  verificationLink?: string;
  certImage?: string;
  description?: string;
  skills?: string[];
}

export interface CertificationsSection {
  heading: string;
  subheading: string;
  certifications: Certification[];
}

export type IconName =
  | "Mail"
  | "Linkedin"
  | "Github"
  | "FileText"
  | "Twitter"
  | "Phone";

export interface ContactItem {
  label: string;
  value: string;
  href: string;
  iconName: IconName;
  external?: boolean;
}

export interface ContactSection {
  heading: string;
  subheading: string;
  introText: string;
  items: ContactItem[];
}
