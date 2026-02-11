// Content loader with Zod validation
// Switch between v1 (flat projects) and v2 (organization-grouped projects)
// import portfolioData from "@/data/portfolio-content.json"; // v1: Flat projects array
import portfolioData from "@/data/portfolio-content-v2.json"; // v2: Organization-grouped projects
import type { PortfolioContent } from "@/data/types";
import { portfolioSchema } from "@/data/schema";

import React from "react";

let cachedContent: PortfolioContent | null = null;

/**
 * Render markdown bold (**text**) as styled <strong> elements
 */
export function renderBold(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? React.createElement("strong", { key: i, className: "text-blue-600 dark:text-blue-400 font-semibold" }, part)
      : React.createElement("span", { key: i }, part)
  );
}

/**
 * Get the full portfolio content with validation
 * @returns Validated portfolio content
 * @throws Error if content is invalid
 */
export function getPortfolioContent(): PortfolioContent {
  if (cachedContent) {
    return cachedContent;
  }

  try {
    // Validate data at load time using Zod
    const validated = portfolioSchema.parse(portfolioData);
    cachedContent = validated as PortfolioContent;
    return cachedContent;
  } catch (error) {
    console.error("Portfolio content validation failed:", error);
    throw new Error(
      "Invalid portfolio content structure. Please check portfolio-content.json"
    );
  }
}

/**
 * Get personal information section
 */
export function getPersonalInfo() {
  return getPortfolioContent().personal;
}

/**
 * Get hero section content
 */
export function getHeroContent() {
  return getPortfolioContent().hero;
}

/**
 * Get about section content
 */
export function getAboutContent() {
  return getPortfolioContent().about;
}

/**
 * Get skills section content
 */
export function getSkillsContent() {
  return getPortfolioContent().skills;
}

/**
 * Get experience section content
 */
export function getExperienceContent() {
  return getPortfolioContent().experience;
}

/**
 * Get projects section content
 */
export function getProjectsContent() {
  return getPortfolioContent().projects;
}

/**
 * Get certifications section content
 */
export function getCertificationsContent() {
  return getPortfolioContent().certifications;
}

/**
 * Get contact section content
 */
export function getContactContent() {
  return getPortfolioContent().contact;
}
