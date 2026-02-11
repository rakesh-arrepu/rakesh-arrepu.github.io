"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { getSkillsContent } from "@/lib/content-loader";
import CircularProgress, { getSkillColor } from "@/components/ui/CircularProgress";
import GlowCard from "@/components/ui/GlowCard";
import { staggerContainerFast, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

const skillsContent = getSkillsContent();

export default function Skills() {
    const { heading, subheading, categories: skills } = skillsContent;
    const [activeTab, setActiveTab] = useState(0);

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
                        // Shortened category names for better display
                        const categoryMap: Record<string, string> = {
                            "Test Automation Frameworks": "Automation",
                            "Programming & Scripting": "Programming",
                            "Cloud & DevOps": "Cloud/DevOps",
                            "AI & Emerging Tech": "AI & ML",
                            "API Testing & Performance": "API Testing",
                            "Tools & Management": "Tools"
                        };
                        const displayName = categoryMap[category.category] || category.category;

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
                                {/* Active indicator */}
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
                                <span className="relative z-10">{displayName}</span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Skills Grid with Animation */}
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
                            const skillColor = getSkillColor(skill.level);

                            return (
                                <motion.div
                                    key={skill.name}
                                    variants={staggerItem}
                                    custom={index}
                                >
                                    <GlowCard
                                        glowColor={skillColor}
                                        glowIntensity="sm"
                                        enableHover={true}
                                        className="p-5 flex flex-col items-center text-center h-full"
                                    >
                                        {/* Circular Progress */}
                                        <CircularProgress
                                            percentage={skill.level}
                                            size={80}
                                            strokeWidth={6}
                                            showPercentage={true}
                                            animateOnView={true}
                                            className="mb-4"
                                        />

                                        {/* Skill Name */}
                                        <h4 className="font-mono text-xs font-semibold text-slate-900 dark:text-white mb-1">
                                            {skill.name}
                                        </h4>

                                        {/* Proficiency Badge */}
                                        <span
                                            className={cn(
                                                "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                                                skill.level >= 90 &&
                                                    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
                                                skill.level >= 80 &&
                                                    skill.level < 90 &&
                                                    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
                                                skill.level >= 70 &&
                                                    skill.level < 80 &&
                                                    "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400",
                                                skill.level < 70 &&
                                                    "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                                            )}
                                        >
                                            {skill.level >= 90
                                                ? "Master"
                                                : skill.level >= 80
                                                ? "Proficient"
                                                : skill.level >= 70
                                                ? "Competent"
                                                : "Learning"}
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
