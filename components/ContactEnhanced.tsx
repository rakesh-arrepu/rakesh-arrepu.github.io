"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { getContactContent, getPersonalInfo } from "@/lib/content-loader";
import { getIcon } from "@/data/config";
import { Mail, Linkedin, Github, FileText, Sparkles, ArrowRight, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const contactContent = getContactContent();
const personalInfo = getPersonalInfo();

export default function ContactEnhanced() {
    const { heading, subheading, introText, items: contacts } = contactContent;
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    // Separate contacts by type
    const emailContact = contacts.find(item => item.label === "Email");
    const linkedinContact = contacts.find(item => item.label === "LinkedIn");
    const githubContact = contacts.find(item => item.label === "GitHub");
    const resumeItem = contacts.find(item => item.label === "Resume");

    return (
        <section id="contact" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6">
            {/* Animated Gradient Mesh Background - Same as Hero */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                {/* Animated Blob 1 */}
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
                    style={{
                        background: "radial-gradient(circle, rgba(59, 130, 246, 0.8), transparent)",
                        left: "10%",
                        top: "10%",
                    }}
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -100, 50, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Animated Blob 2 */}
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
                    style={{
                        background: "radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent)",
                        right: "15%",
                        top: "20%",
                    }}
                    animate={{
                        x: [0, -80, 60, 0],
                        y: [0, 80, -40, 0],
                        scale: [1, 0.9, 1.1, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />

                {/* Animated Blob 3 */}
                <motion.div
                    className="absolute w-[450px] h-[450px] rounded-full blur-3xl opacity-30"
                    style={{
                        background: "radial-gradient(circle, rgba(6, 182, 212, 0.8), transparent)",
                        left: "40%",
                        bottom: "10%",
                    }}
                    animate={{
                        x: [0, 70, -70, 0],
                        y: [0, -60, 80, 0],
                        scale: [1, 1.1, 0.95, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 4,
                    }}
                />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto w-full">
                {/* Hero-Style Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    {/* Floating Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-blue-500/20 mb-6 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                            Available for Opportunities
                        </span>
                    </motion.div>

                    {/* Gradient Heading */}
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                            {heading}
                        </span>
                    </h2>

                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        {subheading}
                    </p>
                </motion.div>

                {/* Split Layout - Main Content Area */}
                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* Left Side - Contact Cards (60% width) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-3 space-y-6"
                    >
                        {/* Intro Text Card */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {introText}
                                </p>
                            </div>
                        </div>

                        {/* Primary Contact Methods Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Email Card */}
                            {emailContact && (
                                <ContactCard
                                    contact={emailContact}
                                    icon={Mail}
                                    gradient="from-blue-500 to-cyan-500"
                                    isHovered={hoveredCard === "email"}
                                    onHover={() => setHoveredCard("email")}
                                    onLeave={() => setHoveredCard(null)}
                                />
                            )}

                            {/* LinkedIn Card */}
                            {linkedinContact && (
                                <ContactCard
                                    contact={linkedinContact}
                                    icon={Linkedin}
                                    gradient="from-blue-600 to-blue-700"
                                    isHovered={hoveredCard === "linkedin"}
                                    onHover={() => setHoveredCard("linkedin")}
                                    onLeave={() => setHoveredCard(null)}
                                />
                            )}
                        </div>

                        {/* GitHub Card - Full Width */}
                        {githubContact && (
                            <ContactCard
                                contact={githubContact}
                                icon={Github}
                                gradient="from-slate-700 to-slate-900"
                                isHovered={hoveredCard === "github"}
                                onHover={() => setHoveredCard("github")}
                                onLeave={() => setHoveredCard(null)}
                                fullWidth
                            />
                        )}
                    </motion.div>

                    {/* Right Side - CTA & Resume Card (40% width) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Quick Action Card */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-cyan-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl overflow-hidden">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                                        <Send className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3">
                                        Ready to Connect?
                                    </h3>

                                    <p className="text-white/90 mb-6 text-sm leading-relaxed">
                                        Drop me a message on LinkedIn or send an email. I typically respond within 24 hours.
                                    </p>

                                    {emailContact && (
                                        <Link
                                            href={emailContact.href}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            <span>Send Email</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Resume Download Card */}
                        {resumeItem && (
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <Link
                                    href={resumeItem.href}
                                    target={resumeItem.external ? "_blank" : undefined}
                                    className="relative block"
                                >
                                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl hover:scale-[1.02] transition-transform duration-300">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                                <FileText className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                    Download Resume
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    PDF Format • Updated 2026
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                                View Complete Experience
                                            </span>
                                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* Stats Card */}
                        <div className="relative">
                            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-6 shadow-2xl">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                                            2K+
                                        </div>
                                        <div className="text-xs text-slate-600 dark:text-slate-400">
                                            LinkedIn Followers
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                                            24h
                                        </div>
                                        <div className="text-xs text-slate-600 dark:text-slate-400">
                                            Response Time
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-700/50"
                >
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// Contact Card Component
interface ContactCardProps {
    contact: {
        label: string;
        value: string;
        href: string;
        external?: boolean;
    };
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
    fullWidth?: boolean;
}

function ContactCard({ contact, icon: Icon, gradient, isHovered, onHover, onLeave, fullWidth }: ContactCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={cn("relative group", fullWidth && "col-span-full")}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {/* Glow Effect */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-r rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500",
                gradient
            )} />

            <Link
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                className="block relative"
            >
                <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl overflow-hidden">
                    {/* Icon */}
                    <motion.div
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={cn(
                            "w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-6 shadow-lg",
                            gradient
                        )}
                    >
                        <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {contact.label}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 font-medium mb-4 break-words">
                        {contact.value}
                    </p>

                    {/* Hover Arrow */}
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                        <span className="text-sm">Connect now</span>
                        <ArrowRight className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            isHovered && "translate-x-1"
                        )} />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
