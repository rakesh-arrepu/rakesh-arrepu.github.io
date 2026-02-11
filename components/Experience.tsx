"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
    Briefcase,
    MapPin,
    Calendar,
    ChevronDown,
    ChevronUp,
    Building2,
    CheckCircle2,
} from "lucide-react";
import { getExperienceContent } from "@/lib/content-loader";
import GlowCard from "@/components/ui/GlowCard";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import { cn } from "@/lib/utils";

const expContent = getExperienceContent();

function renderBold(text: string) {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
        i % 2 === 1 ? (
            <strong key={i} className="text-blue-600 dark:text-blue-400 font-semibold">
                {part}
            </strong>
        ) : (
            <span key={i}>{part}</span>
        )
    );
}

// Extract metrics from achievement text (e.g., "70%", "85%", "50%")
function extractMetric(text: string): string | null {
    const match = text.match(/(\d+)%/);
    return match ? match[0] : null;
}

export default function Experience() {
    const { heading, subheading, jobs: experience } = expContent;
    const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set([0]));

    const toggleJob = (index: number) => {
        const newExpanded = new Set(expandedJobs);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedJobs(newExpanded);
    };

    return (
        <section id="experience" className="portfolio-section">
            <div className="section-heading">
                <h2>{heading}</h2>
                <p>{subheading}</p>
            </div>

            {/* Timeline Container */}
            <div className="max-w-6xl relative">
                {/* Timeline Line (Gradient, Center) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 hidden lg:block">
                    <motion.div
                        className="h-full w-full bg-gradient-to-b from-blue-600 via-purple-500 to-cyan-500"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            duration: 1.5,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        style={{ transformOrigin: "top" }}
                    />
                </div>

                {/* Jobs */}
                <div className="space-y-16">
                    {experience.map((job, index) => {
                        const isLeft = index % 2 === 0;
                        const isExpanded = expandedJobs.has(index);
                        const hasMany = job.achievements.length > 6;
                        const visibleAchievements = isExpanded
                            ? job.achievements
                            : job.achievements.slice(0, 6);

                        return (
                            <div key={index} className="relative">
                                {/* Timeline Node */}
                                <motion.div
                                    className="absolute left-1/2 top-8 transform -translate-x-1/2 z-10 hidden lg:block"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.3,
                                        type: "spring",
                                        stiffness: 200,
                                    }}
                                >
                                    <div className="relative">
                                        {/* Outer glow ring */}
                                        <motion.div
                                            className="absolute inset-0 w-6 h-6 rounded-full bg-blue-500/30 blur-md"
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.5, 0.8, 0.5],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                        {/* Inner node */}
                                        <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-4 border-white dark:border-slate-900 shadow-lg" />
                                    </div>
                                </motion.div>

                                {/* Job Card - Alternating Left/Right */}
                                <motion.div
                                    variants={isLeft ? fadeInLeft : fadeInRight}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={cn(
                                        "lg:w-[calc(50%-40px)]",
                                        isLeft ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"
                                    )}
                                >
                                    <GlowCard
                                        glowColor={index % 4 === 0 ? "blue" : index % 4 === 1 ? "purple" : index % 4 === 2 ? "cyan" : "green"}
                                        glowIntensity="md"
                                        enableHover={true}
                                        className="p-8 relative overflow-hidden"
                                    >
                                        {/* Gradient Border (Left or Right) */}
                                        <div
                                            className={cn(
                                                "absolute top-0 w-1 h-full rounded-r-full",
                                                isLeft ? "left-0" : "right-0",
                                                index % 4 === 0 && "bg-gradient-to-b from-blue-600 to-cyan-500",
                                                index % 4 === 1 && "bg-gradient-to-b from-purple-600 to-pink-500",
                                                index % 4 === 2 && "bg-gradient-to-b from-cyan-600 to-blue-500",
                                                index % 4 === 3 && "bg-gradient-to-b from-green-600 to-emerald-500"
                                            )}
                                        />

                                        {/* Header */}
                                        <div className="mb-6">
                                            {/* Company Icon */}
                                            <div
                                                className={cn(
                                                    "w-12 h-12 rounded-xl mb-4 flex items-center justify-center",
                                                    index % 4 === 0 && "bg-gradient-to-br from-blue-500 to-cyan-500",
                                                    index % 4 === 1 && "bg-gradient-to-br from-purple-500 to-pink-500",
                                                    index % 4 === 2 && "bg-gradient-to-br from-cyan-500 to-blue-500",
                                                    index % 4 === 3 && "bg-gradient-to-br from-green-500 to-emerald-500"
                                                )}
                                            >
                                                <Building2 className="w-6 h-6 text-white" />
                                            </div>

                                            {/* Role Title */}
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                                {job.role}
                                            </h3>

                                            {/* Meta Information */}
                                            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
                                                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                    <Briefcase className="w-4 h-4 text-blue-500" />
                                                    {job.company}
                                                </span>
                                                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                    <MapPin className="w-4 h-4 text-blue-500" />
                                                    {job.location}
                                                </span>
                                            </div>

                                            {/* Period Badge */}
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-blue-500" />
                                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                    {job.period}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        <div className="space-y-3">
                                            {visibleAchievements.map((achievement, i) => {
                                                const metric = extractMetric(achievement);
                                                return (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{
                                                            duration: 0.4,
                                                            delay: i * 0.05,
                                                        }}
                                                        className="flex items-start gap-3 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <div className="flex-1">
                                                            {renderBold(achievement)}
                                                            {/* Metric Badge */}
                                                            {metric && (
                                                                <span className="inline-block ml-2 px-2 py-0.5 text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                                                                    {metric}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* Show More/Less Button */}
                                        {hasMany && (
                                            <motion.button
                                                onClick={() => toggleJob(index)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                            >
                                                {isExpanded ? (
                                                    <>
                                                        <ChevronUp className="w-4 h-4" />
                                                        Show Less
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown className="w-4 h-4" />
                                                        Show {job.achievements.length - 6} More
                                                    </>
                                                )}
                                            </motion.button>
                                        )}
                                    </GlowCard>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
