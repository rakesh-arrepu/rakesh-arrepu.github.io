"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
    User,
    Calendar,
    TrendingUp,
    Award,
    Code,
    BookOpen,
    Zap,
    Sparkles,
    Target,
    LucideIcon,
} from "lucide-react";
import { getAboutContent } from "@/lib/content-loader";
import GlowCard from "@/components/ui/GlowCard";
import GradientBorder from "@/components/ui/GradientBorder";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { JourneyMilestone } from "@/data/types";

const aboutContent = getAboutContent();

// Icon mapping for journey timeline
const iconMap: Record<string, LucideIcon> = {
    BookOpen,
    Code,
    Zap,
    Target,
    Sparkles,
    Award,
    TrendingUp,
    User,
};

export default function About() {
    const { heading, subheading, bio, journeyTimeline } = aboutContent;
    const [hoveredYear, setHoveredYear] = useState<string | null>(null);

    return (
        <section id="about" className="portfolio-section">
            <div className="section-heading">
                <h2>{heading}</h2>
                <p>{subheading}</p>
            </div>

            {/* Simplified Layout - Bio Card + Horizontal Impact Metrics */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-7xl space-y-6"
            >
                {/* Bio Card - Full Width with Timeline Story */}
                <motion.div variants={staggerItem}>
                    <GradientBorder
                        gradient="blue-purple"
                        borderWidth={2}
                        animate={true}
                        className="h-full"
                    >
                        <GlowCard
                            glowColor="blue"
                            glowIntensity="md"
                            enableTilt={false}
                            className="p-8 md:p-10 relative overflow-hidden"
                        >
                            {/* Subtle pattern overlay */}
                            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] dot-pattern pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                            My Journey
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            10 years of continuous growth & innovation
                                        </p>
                                    </div>
                                </div>

                                {/* Bio Summary */}
                                <p className="text-slate-600 dark:text-slate-300 leading-[1.8] text-[14px] mb-8">
                                    {bio}
                                </p>

                                {/* Journey Timeline */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">
                                        Career Evolution Timeline
                                    </h4>

                                    {/* Timeline Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                        {journeyTimeline.map((milestone: JourneyMilestone, index: number) => {
                                            const Icon = iconMap[milestone.iconName] || Code;
                                            const isHovered = hoveredYear === milestone.year;

                                            return (
                                                <motion.div
                                                    key={milestone.year}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.05 }}
                                                    onHoverStart={() => setHoveredYear(milestone.year)}
                                                    onHoverEnd={() => setHoveredYear(null)}
                                                    whileHover={{ scale: 1.05, y: -5 }}
                                                    className="relative group cursor-pointer"
                                                >
                                                    <div
                                                        className={cn(
                                                            "p-4 rounded-xl border transition-all duration-300",
                                                            "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700",
                                                            "group-hover:shadow-lg group-hover:border-blue-400 dark:group-hover:border-blue-500"
                                                        )}
                                                    >
                                                        {/* Icon */}
                                                        <div
                                                            className={cn(
                                                                "w-10 h-10 rounded-lg mb-3 flex items-center justify-center bg-gradient-to-br",
                                                                milestone.color
                                                            )}
                                                        >
                                                            <Icon className="w-5 h-5 text-white" />
                                                        </div>

                                                        {/* Year */}
                                                        <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                                                            {milestone.year}
                                                        </p>

                                                        {/* Phase */}
                                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                                            {milestone.phase}
                                                        </p>

                                                        {/* Skill Count */}
                                                        <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                                                            <Code className="w-3 h-3" />
                                                            <span className="text-xs font-bold">
                                                                {milestone.skills.length} Skills
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Hover Tooltip */}
                                                    {isHovered && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64"
                                                        >
                                                            <div className="bg-slate-900 dark:bg-slate-800 text-white p-4 rounded-xl shadow-2xl border border-slate-700">
                                                                <p className="text-sm font-bold mb-2">
                                                                    {milestone.title}
                                                                </p>
                                                                <p className="text-xs text-slate-400 mb-3">
                                                                    {milestone.milestone}
                                                                </p>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {milestone.skills.map((skill: string) => (
                                                                        <span
                                                                            key={skill}
                                                                            className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full"
                                                                        >
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Learning Curve Indicator */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6 }}
                                        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                        Continuous Learning Path
                                                    </p>
                                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                                        From manual testing to AI-powered automation
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                    43+
                                                </p>
                                                <p className="text-[10px] text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                                    Skills Acquired
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </GlowCard>
                    </GradientBorder>
                </motion.div>

                {/* Impact Metrics - Horizontal Grid */}
                <motion.div variants={staggerItem}>
                    <GlowCard
                        glowColor="purple"
                        glowIntensity="md"
                        enableHover={true}
                        className="p-6 md:p-8 relative overflow-hidden"
                    >
                        {/* Gradient mesh background */}
                        <div className="absolute inset-0 opacity-10 dark:opacity-20">
                            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
                            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Impact Metrics
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Measurable achievements
                                    </p>
                                </div>
                            </div>

                            {/* Horizontal Grid Statistics */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Years of Experience */}
                                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-100 dark:border-blue-800/50">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                            Experience
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <AnimatedCounter
                                            value={10}
                                            duration={2}
                                            className="text-4xl font-bold text-blue-700 dark:text-blue-300"
                                        />
                                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                            + Years
                                        </span>
                                    </div>
                                </div>

                                {/* Skills Count */}
                                <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-800/50">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                                            Technologies
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <AnimatedCounter
                                            value={43}
                                            duration={2}
                                            delay={0.2}
                                            className="text-4xl font-bold text-purple-700 dark:text-purple-300"
                                        />
                                        <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                                            Skills
                                        </span>
                                    </div>
                                </div>

                                {/* LinkedIn Network */}
                                <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800/50">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                                            Network
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <AnimatedCounter
                                            value={2000}
                                            duration={2}
                                            delay={0.4}
                                            className="text-4xl font-bold text-green-700 dark:text-green-300"
                                        />
                                        <span className="text-xl font-bold text-green-600 dark:text-green-400">
                                            + Followers
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlowCard>
                </motion.div>
            </motion.div>
        </section>
    );
}
