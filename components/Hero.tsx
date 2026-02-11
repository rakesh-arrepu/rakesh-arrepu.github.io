"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, Eye, MapPin, Mail, Phone, Linkedin, Github, Briefcase, Calendar, Zap, Target } from "lucide-react";
import { getHeroContent, getPortfolioContent } from "@/lib/content-loader";
import { staggerContainer, staggerItem } from "@/lib/animations";
import FloatingBadge from "@/components/ui/FloatingBadge";

const heroContent = getHeroContent();
const portfolioContent = getPortfolioContent();

export default function Hero() {
    const { greeting, name, roles } = heroContent;
    const { personal, about, contact } = portfolioContent;
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    // Get location from about details
    const location = about.details.find(d => d.label === "Location")?.value || "Hyderabad, India";

    // Get social links from contact
    const linkedInLink = contact.items.find(i => i.iconName === "Linkedin")?.href || "";
    const githubLink = contact.items.find(i => i.iconName === "Github")?.href || "";

    // Stats data with better context
    const stats = [
        {
            label: "Years of Experience",
            value: "10+",
            unit: "Years",
            description: "Industry Experience",
            color: "from-blue-400 to-cyan-600"
        },
        {
            label: "Technologies Mastered",
            value: "43+",
            unit: "Skills",
            description: "Automation & Testing",
            color: "from-purple-400 to-pink-600"
        },
        {
            label: "Professional Certifications",
            value: "6",
            unit: "Certs",
            description: "AI & Cloud Focused",
            color: "from-green-400 to-emerald-600"
        },
    ];

    // Primary skills to display
    const primarySkills = [
        "Selenium", "Playwright", "Cypress", "Java", "Python", "REST Assured", "AI Testing", "Jenkins"
    ];

    // Industries served
    const industries = ["Cloud", "Airlines", "Healthcare", "Logistics"];

    // Typewriter effect
    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting) {
            if (displayText.length < currentRole.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentRole.substring(0, displayText.length + 1));
                }, 80);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 2000);
            }
        } else {
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(currentRole.substring(0, displayText.length - 1));
                }, 40);
            } else {
                // Use setTimeout to schedule state updates asynchronously
                timeout = setTimeout(() => {
                    setIsDeleting(false);
                    setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                }, 100);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentRoleIndex, roles]);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden bg-slate-900"
        >
            {/* Animated gradient mesh background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-600 blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 2, ease: "easeInOut" }}
                    className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] rounded-full bg-purple-600 blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.08, 0.15, 0.08],
                    }}
                    transition={{ duration: 12, repeat: Infinity, delay: 4, ease: "easeInOut" }}
                    className="absolute top-[50%] right-[40%] w-[400px] h-[400px] rounded-full bg-cyan-500 blur-[130px]"
                />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Main content container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20">
                <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-center">
                    {/* Left: Text Content (60%) */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="text-white"
                    >
                        <motion.p
                            variants={staggerItem}
                            className="text-lg md:text-xl text-slate-400 mb-3 font-medium tracking-wide"
                        >
                            {greeting}
                        </motion.p>

                        <motion.h1
                            variants={staggerItem}
                            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-cyan-400">
                                {name}
                            </span>
                        </motion.h1>

                        <motion.div
                            variants={staggerItem}
                            className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-8 min-h-[80px] md:min-h-[60px]"
                        >
                            <span className="block mb-2 text-slate-400 text-base">I&apos;m a</span>
                            <span className="text-cyan-400 font-bold font-mono">
                                {displayText}
                                <span className="animate-pulse text-cyan-300">|</span>
                            </span>
                        </motion.div>

                        {/* Primary Skills */}
                        <motion.div
                            variants={staggerItem}
                            className="flex flex-wrap gap-2 mb-6"
                        >
                            {primarySkills.map((skill, index) => (
                                <FloatingBadge
                                    key={skill}
                                    variant="blue"
                                    size="sm"
                                    delay={0.1 * index}
                                >
                                    {skill}
                                </FloatingBadge>
                            ))}
                        </motion.div>

                        {/* Industries Served */}
                        <motion.div
                            variants={staggerItem}
                            className="flex items-center gap-2 text-slate-400 text-sm mb-8"
                        >
                            <Zap className="w-4 h-4 text-cyan-400" />
                            <span className="font-medium">Serving:</span>
                            <span className="text-slate-300">{industries.join(" • ")}</span>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={staggerItem}
                            className="flex gap-3 mb-10"
                        >
                            <motion.a
                                href="#projects"
                                className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] flex items-center gap-2"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    View Projects
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.a>

                            <motion.a
                                href="#contact"
                                className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] flex items-center gap-2"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Let&apos;s Connect
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.a>

                            <motion.a
                                href="/Rakesh Arrepu_SDET.pdf"
                                download
                                className="group relative px-6 py-3 bg-slate-800/80 border-2 border-slate-700 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:border-green-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Download className="w-4 h-4" />
                                Download Resume
                            </motion.a>
                        </motion.div>

                        {/* Stats Cards */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-3 gap-4"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    variants={staggerItem}
                                    custom={index}
                                    className="relative group"
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] overflow-hidden">
                                        {/* Background gradient glow */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                        <div className="relative z-10">
                                            <div className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br ${stat.color} mb-2`}>
                                                {stat.value}
                                            </div>
                                            <div className="text-[11px] text-slate-300 font-bold tracking-wide uppercase mb-1">
                                                {stat.unit}
                                            </div>
                                            <div className="text-[9px] text-slate-500 font-medium leading-tight">
                                                {stat.description}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right: Glassmorphism Card with Personal Details */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 100 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        className="hidden lg:block relative"
                    >
                        {/* Current Focus Badge - Above right card */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="absolute -top-14 left-0 right-0 z-30 flex justify-center"
                        >
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500/90 to-pink-500/90 border border-purple-400/60 rounded-full shadow-xl backdrop-blur-sm">
                                <Target className="w-4 h-4 text-purple-100" />
                                <span className="text-xs text-white font-bold tracking-wide whitespace-nowrap">Currently Exploring: AI Agents & MCP</span>
                            </div>
                        </motion.div>

                        {/* Floating decorative elements */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

                        {/* Glassmorphism card */}
                        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />

                            <div className="relative z-10 space-y-6">
                                {/* Role Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="flex items-center gap-3 pb-4 border-b border-white/10"
                                >
                                    <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
                                        <Briefcase className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Role</p>
                                        <p className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Test Specialist</p>
                                    </div>
                                </motion.div>

                                {/* Personal Details */}
                                <div className="space-y-4">
                                    {/* Location */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 }}
                                        className="flex items-center gap-3 text-slate-300"
                                    >
                                        <div className="p-2.5 bg-blue-500/20 rounded-lg">
                                            <MapPin className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Location</p>
                                            <p className="text-sm font-medium">{location}</p>
                                        </div>
                                    </motion.div>

                                    {/* Email */}
                                    <motion.a
                                        href={`mailto:${personal.email}`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.9 }}
                                        className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group"
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="p-2.5 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                                            <Mail className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Email</p>
                                            <p className="text-sm font-medium break-all">{personal.email}</p>
                                        </div>
                                    </motion.a>

                                    {/* Phone */}
                                    <motion.a
                                        href={`tel:${personal.phone}`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.0 }}
                                        className="flex items-center gap-3 text-slate-300 hover:text-green-400 transition-colors group"
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="p-2.5 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                                            <Phone className="w-5 h-5 text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Phone</p>
                                            <p className="text-sm font-medium">{personal.phone}</p>
                                        </div>
                                    </motion.a>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                {/* Social Links */}
                                <div className="space-y-3">
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">Connect With Me</p>

                                    {/* LinkedIn */}
                                    <motion.a
                                        href={linkedInLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.1 }}
                                        className="flex items-center justify-between p-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition-all group"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Linkedin className="w-5 h-5 text-blue-400" />
                                            <span className="text-sm font-medium text-slate-300">LinkedIn</span>
                                        </div>
                                        <span className="text-xs text-blue-400 font-semibold">2K+ Followers</span>
                                    </motion.a>

                                    {/* GitHub */}
                                    <motion.a
                                        href={githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2 }}
                                        className="flex items-center justify-between p-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 rounded-lg transition-all group"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Github className="w-5 h-5 text-purple-400" />
                                            <span className="text-sm font-medium text-slate-300">GitHub</span>
                                        </div>
                                        <span className="text-xs text-purple-400 font-semibold">28 Repos</span>
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.7 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <a href="#about" className="flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group">
                    <span className="text-xs uppercase tracking-widest font-semibold">Scroll Down</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-6 h-6" />
                    </motion.div>
                </a>
            </motion.div>
        </section>
    );
}
