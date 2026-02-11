"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AlertCircle, Lightbulb, TrendingUp, Building2, Calendar, Briefcase, ChevronDown, ChevronUp, FolderKanban } from "lucide-react";
import { getProjectsContent } from "@/lib/content-loader";
import { getGradient } from "@/data/config";
import GlowCard from "@/components/ui/GlowCard";
import FloatingBadge from "@/components/ui/FloatingBadge";
import { staggerContainerFast, staggerItem, fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Organization, Project } from "@/data/types";

const projectsContent = getProjectsContent();

// Extract metrics from impact text (e.g., "70%", "85%")
function extractMetric(text: string): string | null {
    const match = text.match(/(\d+)%/);
    return match ? match[0] : null;
}

// Map organization gradient names to colors
const orgGradientMap: Record<string, { from: string; to: string; color: "blue" | "purple" | "cyan" | "green" }> = {
    "blue-purple": { from: "#3B82F6", to: "#A78BFA", color: "blue" },
    "indigo-blue": { from: "#6366F1", to: "#60A5FA", color: "blue" },
    "purple-pink": { from: "#A855F7", to: "#EC4899", color: "purple" },
    "cyan-teal": { from: "#06B6D4", to: "#14B8A6", color: "cyan" },
    "green-emerald": { from: "#10B981", to: "#34D399", color: "green" },
};

interface OrganizationSectionProps {
    organization: Organization;
    index: number;
}

function OrganizationSection({ organization, index }: OrganizationSectionProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const gradient = orgGradientMap[organization.gradient] || orgGradientMap["blue-purple"];

    return (
        <motion.div
            variants={fadeInUp}
            className="mb-16"
        >
            {/* Organization Header Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-8"
            >
                <GlowCard
                    glowColor={gradient.color}
                    glowIntensity="md"
                    enableHover={false}
                    className="relative overflow-hidden"
                >
                    {/* Gradient background */}
                    <div
                        className="absolute inset-0 opacity-5 dark:opacity-10"
                        style={{
                            background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                        }}
                    />

                    <div className="relative z-10 p-6 md:p-8">
                        <div className="flex items-start justify-between gap-6">
                            {/* Left: Organization Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{
                                            background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                                        }}
                                    >
                                        <Building2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                                            {organization.name}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-600 dark:text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {organization.period}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="w-3.5 h-3.5" />
                                                {organization.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                    {organization.description}
                                </p>

                                <div className="flex items-center gap-2">
                                    <FolderKanban className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                                        {organization.totalProjects} {organization.totalProjects === 1 ? 'Project' : 'Projects'}
                                    </span>
                                </div>
                            </div>

                            {/* Right: Expand/Collapse Button */}
                            <motion.button
                                onClick={() => setIsExpanded(!isExpanded)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                                {isExpanded ? (
                                    <>
                                        <ChevronUp className="w-4 h-4" />
                                        Collapse
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-4 h-4" />
                                        Expand
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </GlowCard>
            </motion.div>

            {/* Projects Grid */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            variants={staggerContainerFast}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
                        >
                            {organization.projects.map((project, projectIndex) => {
                                const gradient = getGradient(project.gradient);
                                const isFeatured = projectIndex === 0 && organization.projects.length > 1;
                                const metric = extractMetric(project.impact);

                                return (
                                    <motion.div
                                        key={projectIndex}
                                        variants={staggerItem}
                                        className={cn(
                                            "relative",
                                            isFeatured
                                                ? "md:col-span-2 lg:col-span-7 lg:row-span-2"
                                                : "md:col-span-1 lg:col-span-5"
                                        )}
                                    >
                                        <GlowCard
                                            glowColor={
                                                project.gradient === "blue"
                                                    ? "blue"
                                                    : project.gradient === "purple"
                                                    ? "purple"
                                                    : project.gradient === "cyan"
                                                    ? "cyan"
                                                    : project.gradient === "green"
                                                    ? "green"
                                                    : "blue"
                                            }
                                            glowIntensity="md"
                                            enableHover={true}
                                            enableTilt={isFeatured}
                                            className={cn(
                                                "relative overflow-hidden h-full",
                                                isFeatured ? "p-8 md:p-10" : "p-6 md:p-8"
                                            )}
                                        >
                                            {/* Visual Header - Gradient Background */}
                                            <div
                                                className={cn(
                                                    "absolute top-0 left-0 right-0 opacity-10 dark:opacity-20",
                                                    isFeatured ? "h-32" : "h-24"
                                                )}
                                                style={{
                                                    background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                                                }}
                                            />

                                            {/* Grid pattern overlay */}
                                            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] grid-pattern pointer-events-none" />

                                            <div className="relative z-10">
                                                {/* Header */}
                                                <div className={cn("mb-6", isFeatured && "mb-8")}>
                                                    <h4
                                                        className={cn(
                                                            "font-bold text-slate-900 dark:text-white mb-3",
                                                            isFeatured ? "text-2xl md:text-3xl" : "text-xl"
                                                        )}
                                                    >
                                                        {project.title}
                                                    </h4>

                                                    {/* Tech Stack Badges */}
                                                    <div className={cn("flex flex-wrap gap-2", isFeatured && "gap-3")}>
                                                        {project.tech.map((tech, techIndex) => (
                                                            <FloatingBadge
                                                                key={tech}
                                                                variant="purple"
                                                                size={isFeatured ? "md" : "sm"}
                                                                delay={techIndex * 0.05}
                                                            >
                                                                {tech}
                                                            </FloatingBadge>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="space-y-4 text-sm">
                                                    {/* Problem */}
                                                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                                            <h5 className="font-bold text-red-700 dark:text-red-300 uppercase tracking-wider text-[10px]">
                                                                Challenge
                                                            </h5>
                                                        </div>
                                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                                                            {project.problem}
                                                        </p>
                                                    </div>

                                                    {/* Solution */}
                                                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                            <h5 className="font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider text-[10px]">
                                                                Solution
                                                            </h5>
                                                        </div>
                                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                                                            {project.solution}
                                                        </p>
                                                    </div>

                                                    {/* Impact */}
                                                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                            <h5 className="font-bold text-green-700 dark:text-green-300 uppercase tracking-wider text-[10px]">
                                                                Impact
                                                            </h5>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs flex-1">
                                                                {project.impact}
                                                            </p>
                                                            {metric && (
                                                                <div className="flex items-center justify-center bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg">
                                                                    <span className="text-2xl font-black text-green-700 dark:text-green-300">
                                                                        {metric}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </GlowCard>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function ProjectsEnhanced() {
    const { heading, subheading, organizations, projects: legacyProjects } = projectsContent;

    // Check if using new organization structure or legacy flat structure
    const hasOrganizations = organizations && organizations.length > 0;

    return (
        <section id="projects" className="portfolio-section">
            <div className="section-heading">
                <h2>{heading}</h2>
                <p>{subheading}</p>
            </div>

            <div className="max-w-7xl">
                {hasOrganizations ? (
                    // New: Organization-grouped structure
                    <motion.div
                        variants={staggerContainerFast}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {organizations!.map((org, index) => (
                            <OrganizationSection key={index} organization={org} index={index} />
                        ))}
                    </motion.div>
                ) : (
                    // Legacy: Flat projects structure (backward compatible)
                    <motion.div
                        variants={staggerContainerFast}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
                    >
                        {legacyProjects?.map((project: Project, index: number) => {
                            const gradient = getGradient(project.gradient);
                            const isFeatured = index === 0;
                            const metric = extractMetric(project.impact);

                            return (
                                <motion.div
                                    key={index}
                                    variants={staggerItem}
                                    className={cn(
                                        "relative",
                                        isFeatured
                                            ? "md:col-span-2 lg:col-span-7 lg:row-span-2"
                                            : "md:col-span-1 lg:col-span-5"
                                    )}
                                >
                                    <GlowCard
                                        glowColor={
                                            project.gradient === "blue"
                                                ? "blue"
                                                : project.gradient === "purple"
                                                ? "purple"
                                                : project.gradient === "cyan"
                                                ? "cyan"
                                                : project.gradient === "green"
                                                ? "green"
                                                : "blue"
                                        }
                                        glowIntensity="md"
                                        enableHover={true}
                                        enableTilt={isFeatured}
                                        className={cn(
                                            "relative overflow-hidden h-full",
                                            isFeatured ? "p-8 md:p-10" : "p-6 md:p-8"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "absolute top-0 left-0 right-0 opacity-10 dark:opacity-20",
                                                isFeatured ? "h-32" : "h-24"
                                            )}
                                            style={{
                                                background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                                            }}
                                        />
                                        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] grid-pattern pointer-events-none" />
                                        <div className="relative z-10">
                                            <div className={cn("mb-6", isFeatured && "mb-8")}>
                                                <h3
                                                    className={cn(
                                                        "font-bold text-slate-900 dark:text-white mb-3",
                                                        isFeatured ? "text-2xl md:text-3xl" : "text-xl"
                                                    )}
                                                >
                                                    {project.title}
                                                </h3>
                                                <div className={cn("flex flex-wrap gap-2", isFeatured && "gap-3")}>
                                                    {project.tech.map((tech, techIndex) => (
                                                        <FloatingBadge
                                                            key={tech}
                                                            variant="purple"
                                                            size={isFeatured ? "md" : "sm"}
                                                            delay={techIndex * 0.05}
                                                        >
                                                            {tech}
                                                        </FloatingBadge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-4 text-sm">
                                                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                                        <h4 className="font-bold text-red-700 dark:text-red-300 uppercase tracking-wider text-[10px]">
                                                            Challenge
                                                        </h4>
                                                    </div>
                                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                                                        {project.problem}
                                                    </p>
                                                </div>
                                                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                        <h4 className="font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider text-[10px]">
                                                            Solution
                                                        </h4>
                                                    </div>
                                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                                                        {project.solution}
                                                    </p>
                                                </div>
                                                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                        <h4 className="font-bold text-green-700 dark:text-green-300 uppercase tracking-wider text-[10px]">
                                                            Impact
                                                        </h4>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs flex-1">
                                                            {project.impact}
                                                        </p>
                                                        {metric && (
                                                            <div className="flex items-center justify-center bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg">
                                                                <span className="text-2xl font-black text-green-700 dark:text-green-300">
                                                                    {metric}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </GlowCard>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
