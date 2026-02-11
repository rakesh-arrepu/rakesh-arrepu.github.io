"use client";

import { motion } from "framer-motion";
import { AlertCircle, Lightbulb, TrendingUp } from "lucide-react";
import { getProjectsContent } from "@/lib/content-loader";
import { getGradient } from "@/data/config";
import GlowCard from "@/components/ui/GlowCard";
import FloatingBadge from "@/components/ui/FloatingBadge";
import { staggerContainerFast, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

const projectsContent = getProjectsContent();

// Extract metrics from impact text (e.g., "70%", "85%")
function extractMetric(text: string): string | null {
    const match = text.match(/(\d+)%/);
    return match ? match[0] : null;
}

export default function Projects() {
    const { heading, subheading, projects } = projectsContent;

    // Handle case where projects might be undefined (backward compatibility)
    if (!projects || projects.length === 0) {
        return (
            <section id="projects" className="portfolio-section">
                <div className="section-heading">
                    <h2>{heading}</h2>
                    <p>{subheading}</p>
                </div>
                <div className="text-center text-slate-600 dark:text-slate-400">
                    No projects available. Using organization-grouped structure instead.
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="portfolio-section">
            <div className="section-heading">
                <h2>{heading}</h2>
                <p>{subheading}</p>
            </div>

            {/* Bento Grid Layout */}
            <motion.div
                variants={staggerContainerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 max-w-7xl"
            >
                {projects.map((project, index) => {
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
                                        <h3
                                            className={cn(
                                                "font-bold text-slate-900 dark:text-white mb-3",
                                                isFeatured ? "text-2xl md:text-3xl" : "text-xl"
                                            )}
                                        >
                                            {project.title}
                                        </h3>

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

                                    {/* Content - Always visible for all projects */}
                                    <div className="space-y-4 text-sm">
                                        {/* Problem */}
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

                                        {/* Solution */}
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

                                        {/* Impact */}
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
        </section>
    );
}
