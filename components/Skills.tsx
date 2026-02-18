"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getSkillsContent } from "@/lib/content-loader";
import { getSkillIcon, getSkillBrandColor } from "@/data/config";
import GlowCard from "@/components/ui/GlowCard";
import { staggerContainerFast, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

const skillsContent = getSkillsContent();

/** Map skill level (0-100) to a 1-5 dot rating */
function getDotRating(level: number): number {
    if (level >= 90) return 5;
    if (level >= 80) return 4;
    if (level >= 70) return 3;
    if (level >= 55) return 2;
    return 1;
}

/** Proficiency label and styling based on level */
function getProficiency(level: number) {
    if (level >= 90)
        return {
            label: "Expert",
            chipClass:
                "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
            dotFilled:
                "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]",
            glowColor: "green" as const,
            iconColor: "#10B981",
        };
    if (level >= 80)
        return {
            label: "Advanced",
            chipClass:
                "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/25",
            dotFilled:
                "bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.5)]",
            glowColor: "blue" as const,
            iconColor: "#3B82F6",
        };
    if (level >= 70)
        return {
            label: "Intermediate",
            chipClass:
                "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/25",
            dotFilled:
                "bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.5)]",
            glowColor: "cyan" as const,
            iconColor: "#06B6D4",
        };
    return {
        label: "Learning",
        chipClass:
            "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/25",
        dotFilled:
            "bg-purple-500 shadow-[0_0_6px_rgba(139,92,246,0.5)]",
        glowColor: "purple" as const,
        iconColor: "#8B5CF6",
    };
}

export default function Skills() {
    const { heading, subheading, categories: skills } = skillsContent;
    const [activeTab, setActiveTab] = useState(0);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return (
        <section id="skills" className="portfolio-section">
            <div className="section-heading">
                <h2>{heading}</h2>
                <p>{subheading}</p>
            </div>

            {/* Tabbed Navigation */}
            <div className="max-w-7xl">
                <div className="flex gap-3 mb-10 justify-center overflow-x-auto pb-2">
                    {skills.map((category, index) => {
                        const categoryMap: Record<string, string> = {
                            "Test Automation Frameworks": "Automation",
                            "Programming & Scripting": "Programming",
                            "Cloud & DevOps": "Cloud/DevOps",
                            "AI & Emerging Tech": "AI & ML",
                            "API Testing & Performance": "API Testing",
                            "API & Services Testing": "API Testing",
                            "Tools & Management": "Tools",
                            "DevOps & Cloud": "DevOps",
                            "SCM & Version Control": "SCM",
                        };
                        const displayName =
                            categoryMap[category.category] || category.category;

                        return (
                            <motion.button
                                key={category.category}
                                onClick={() => setActiveTab(index)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden whitespace-nowrap flex-shrink-0",
                                    activeTab === index
                                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                )}
                            >
                                {activeTab === index && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 -z-10"
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {displayName}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Skills Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        variants={staggerContainerFast}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                    >
                        {skills[activeTab].items.map((skill, index) => {
                            const dots = getDotRating(skill.level);
                            const proficiency = getProficiency(skill.level);
                            const SkillIcon = getSkillIcon(
                                skill.name,
                                skills[activeTab].category
                            );
                            const iconColor =
                                getSkillBrandColor(skill.name, isDark) ??
                                proficiency.iconColor;

                            return (
                                <motion.div
                                    key={skill.name}
                                    variants={staggerItem}
                                    custom={index}
                                >
                                    <GlowCard
                                        glowColor={proficiency.glowColor}
                                        glowIntensity="sm"
                                        enableHover={true}
                                        className="p-5 flex flex-col items-center text-center h-full"
                                    >
                                        {/* Skill Icon */}
                                        <SkillIcon
                                            size={28}
                                            style={{ color: iconColor }}
                                            className="mb-2 flex-shrink-0"
                                        />

                                        {/* Skill Name */}
                                        <h4 className="font-mono text-xs font-semibold text-slate-900 dark:text-white mb-3">
                                            {skill.name}
                                        </h4>

                                        {/* Dot Rating */}
                                        <div className="flex gap-2 mb-3">
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{
                                                            scale: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            scale: 1,
                                                            opacity: 1,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                0.3 + i * 0.08,
                                                            duration: 0.3,
                                                            ease: "easeOut",
                                                        }}
                                                        className={cn(
                                                            "w-3 h-3 rounded-full transition-all",
                                                            i < dots
                                                                ? proficiency.dotFilled
                                                                : "bg-slate-200 dark:bg-slate-700/60"
                                                        )}
                                                    />
                                                )
                                            )}
                                        </div>

                                        {/* Proficiency Chip */}
                                        <span
                                            className={cn(
                                                "text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border",
                                                proficiency.chipClass
                                            )}
                                        >
                                            {proficiency.label}
                                        </span>
                                    </GlowCard>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
