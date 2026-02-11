// Zod validation schemas for portfolio content
import { z } from "zod";

const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

const heroSectionSchema = z.object({
  greeting: z.string(),
  name: z.string().min(1, "Hero name is required"),
  roles: z.array(z.string()).min(1, "At least one role is required"),
  backgroundImage: z.string().optional(),
});

const aboutDetailSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const journeyMilestoneSchema = z.object({
  year: z.string(),
  phase: z.string(),
  title: z.string(),
  skills: z.array(z.string()),
  milestone: z.string(),
  color: z.string(),
  iconName: z.string(),
});

const aboutSectionSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  bio: z.string(),
  details: z.array(aboutDetailSchema),
  journeyTimeline: z.array(journeyMilestoneSchema),
});

const skillItemSchema = z.object({
  name: z.string(),
  level: z.number().min(0).max(100, "Skill level must be between 0 and 100"),
});

const skillCategorySchema = z.object({
  category: z.string(),
  items: z.array(skillItemSchema),
});

const skillsSectionSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  categories: z.array(skillCategorySchema),
});

const jobSchema = z.object({
  role: z.string(),
  company: z.string(),
  period: z.string(),
  location: z.string(),
  achievements: z.array(z.string()),
});

const experienceSectionSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  jobs: z.array(jobSchema),
});

const projectSchema = z.object({
  title: z.string(),
  tech: z.array(z.string()),
  problem: z.string(),
  solution: z.string(),
  impact: z.string(),
  gradient: z.enum(["blue", "indigo", "purple", "cyan", "green"]),
});

const organizationSchema = z.object({
  name: z.string(),
  period: z.string(),
  role: z.string(),
  totalProjects: z.number(),
  description: z.string(),
  gradient: z.enum(["blue-purple", "indigo-blue", "purple-pink", "cyan-teal", "green-emerald"]),
  projects: z.array(projectSchema),
});

const projectsSectionSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  projects: z.array(projectSchema).optional(), // Legacy flat structure (optional)
  organizations: z.array(organizationSchema).optional(), // New organization-grouped structure (optional)
}).refine(
  (data) => data.projects !== undefined || data.organizations !== undefined,
  {
    message: "Either 'projects' or 'organizations' must be defined",
  }
);

const certificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  icon: z.string(),
  type: z.enum(["certification", "workshop", "conference", "course", "bootcamp", "webinar"]).optional(),
  year: z.number().optional(),
  month: z.string().optional(),
  verificationLink: z.string().optional(),
  certImage: z.string().optional(),
  description: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

const certificationsSectionSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  certifications: z.array(certificationSchema),
});

const contactItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  href: z.string(),
  iconName: z.enum(["Mail", "Linkedin", "Github", "FileText", "Twitter", "Phone"]),
  external: z.boolean().optional(),
});

const contactSectionSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  introText: z.string(),
  items: z.array(contactItemSchema),
});

export const portfolioSchema = z.object({
  personal: personalInfoSchema,
  hero: heroSectionSchema,
  about: aboutSectionSchema,
  skills: skillsSectionSchema,
  experience: experienceSectionSchema,
  projects: projectsSectionSchema,
  certifications: certificationsSectionSchema,
  contact: contactSectionSchema,
});

export type PortfolioContent = z.infer<typeof portfolioSchema>;
