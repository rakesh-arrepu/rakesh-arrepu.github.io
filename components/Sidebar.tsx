"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    House,
    UserRound,
    BriefcaseBusiness,
    Rocket,
    BadgeCheck,
    Mail,
    Linkedin,
    Github,
    FileText,
    Menu,
    X,
    BrainCircuit,
    Send,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { getPersonalInfo, getContactContent } from "@/lib/content-loader";

// Brand colors for social icon glow effects (Behance/Dribbble inspired)
const SOCIAL_BRAND: Record<string, { color: string; shadow: string }> = {
    Mail:     { color: "#3b82f6", shadow: "0 0 20px rgba(59,130,246,0.5), 0 0 40px rgba(59,130,246,0.2)" },
    Linkedin: { color: "#0A66C2", shadow: "0 0 20px rgba(10,102,194,0.5), 0 0 40px rgba(10,102,194,0.2)" },
    Github:   { color: "#8b5cf6", shadow: "0 0 20px rgba(139,92,246,0.5), 0 0 40px rgba(139,92,246,0.2)" },
    FileText: { color: "#06b6d4", shadow: "0 0 20px rgba(6,182,212,0.5), 0 0 40px rgba(6,182,212,0.2)" },
    Phone:    { color: "#10b981", shadow: "0 0 20px rgba(16,185,129,0.5), 0 0 40px rgba(16,185,129,0.2)" },
    Twitter:  { color: "#1DA1F2", shadow: "0 0 20px rgba(29,161,242,0.5), 0 0 40px rgba(29,161,242,0.2)" },
};

// Framer Motion Link wrapper
const MotionLink = motion.create(Link);

const personalInfo = getPersonalInfo();
const contactContent = getContactContent();

const navItems = [
    { label: "Home",           icon: House,             href: "#home",           color: "#3b82f6" },  // blue
    { label: "About",          icon: UserRound,         href: "#about",          color: "#8b5cf6" },  // violet
    { label: "Skills",         icon: BrainCircuit,      href: "#skills",         color: "#06b6d4" },  // cyan
    { label: "Experience",     icon: BriefcaseBusiness, href: "#experience",     color: "#f59e0b" },  // amber
    { label: "Projects",       icon: Rocket,            href: "#projects",       color: "#ef4444" },  // red
    { label: "Certifications", icon: BadgeCheck,        href: "#certifications", color: "#10b981" },  // emerald
    { label: "Contact",        icon: Send,              href: "#contact",        color: "#ec4899" },  // pink
];

export default function Sidebar() {
    const [activeSection, setActiveSection] = useState("home");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map((item) => item.href.substring(1));
            let current = "home";

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 120) {
                        current = section;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Dispatch custom event when collapsed state changes so layout can respond
    useEffect(() => {
        const event = new CustomEvent("sidebar-toggle", {
            detail: { collapsed },
        });
        window.dispatchEvent(event);
        // Also set a CSS variable on root for the main content offset
        document.documentElement.style.setProperty(
            "--sidebar-w",
            collapsed ? "72px" : "240px"
        );
    }, [collapsed]);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const el = document.getElementById(href.substring(1));
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const sidebarWidth = collapsed ? "w-[72px]" : "w-[240px]";

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="fixed top-5 left-5 z-50 lg:hidden p-2.5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-2xl shadow-black/40 border border-white/10 hover:border-blue-500/50 transition-all duration-200"
                aria-label="Toggle menu"
            >
                {mobileOpen ? (
                    <X className="w-5 h-5" />
                ) : (
                    <Menu className="w-5 h-5" />
                )}
            </button>

            {/* Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen ${sidebarWidth} bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white z-40 flex flex-col overflow-hidden transition-all duration-300 ease-in-out lg:translate-x-0 border-r border-white/10 shadow-2xl ${mobileOpen ? "translate-x-0 w-[240px]" : "-translate-x-full"
                    }`}
            >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

                {/* Profile Section */}
                <div
                    className={`relative flex flex-col items-center py-6 px-3 border-b border-white/10 transition-all duration-300 ${collapsed && !mobileOpen ? "py-4" : ""
                        }`}
                >
                    <div
                        className={`rounded-full overflow-hidden border-[3px] border-blue-500/40 shadow-xl shadow-blue-500/20 mb-3 transition-all duration-300 hover:border-blue-400/60 hover:shadow-blue-400/30 ${collapsed && !mobileOpen ? "w-[44px] h-[44px]" : "w-[80px] h-[80px]"
                            }`}
                    >
                        <Image
                            src="/circle-picture-rakesh.jpeg"
                            alt={personalInfo.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {(!collapsed || mobileOpen) && (
                        <>
                            <h1 className="text-base font-bold tracking-wide whitespace-nowrap">
                                {personalInfo.name}
                            </h1>
                            <p className="text-xs text-blue-400/80 mt-0.5">
                                {personalInfo.role}
                            </p>

                            {/* Social Icons — animated with Framer Motion */}
                            <div className="flex gap-3 mt-3">
                                {contactContent.items.map((social, i) => {
                                    const IconMap: Record<string, typeof Mail> = {
                                        Mail, Linkedin, Github, FileText
                                    };
                                    const Icon = IconMap[social.iconName] || Mail;
                                    const brand = SOCIAL_BRAND[social.iconName] || SOCIAL_BRAND.Mail;

                                    // Variants for coordinated parent→child animation
                                    const containerVariants = {
                                        rest: {
                                            y: 0,
                                            scale: 1,
                                            rotate: 0,
                                            boxShadow: "0 0 0px rgba(0,0,0,0)",
                                            borderColor: "rgba(255,255,255,0.08)",
                                            backgroundColor: "rgba(255,255,255,0.04)",
                                        },
                                        hover: {
                                            y: -6,
                                            scale: 1.2,
                                            rotate: [0, -10, 8, -4, 0],
                                            boxShadow: brand.shadow,
                                            borderColor: `${brand.color}66`,
                                            backgroundColor: `${brand.color}18`,
                                        },
                                        tap: { scale: 0.88, y: 0 },
                                    };

                                    const glowVariants = {
                                        rest: { opacity: 0, scale: 0.5 },
                                        hover: { opacity: 1, scale: 1.8 },
                                    };

                                    const iconVariants = {
                                        rest: { scale: 1, color: brand.color },
                                        hover: { scale: 1.15, color: "#ffffff" },
                                    };

                                    return (
                                        <MotionLink
                                            key={social.label}
                                            href={social.href}
                                            target={social.external ? "_blank" : undefined}
                                            aria-label={social.label}
                                            className="relative w-9 h-9 rounded-xl flex items-center justify-center border cursor-pointer"
                                            variants={containerVariants}
                                            initial="rest"
                                            whileHover="hover"
                                            whileTap="tap"
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 15,
                                                rotate: { duration: 0.5, ease: "easeInOut" },
                                                delay: i * 0.07,
                                            }}
                                        >
                                            {/* Glow pulse — expands behind icon on hover */}
                                            <motion.span
                                                className="absolute inset-0 rounded-xl pointer-events-none"
                                                variants={glowVariants}
                                                transition={{ duration: 0.35, ease: "easeOut" }}
                                                style={{
                                                    background: `radial-gradient(circle, ${brand.color}30 0%, transparent 70%)`,
                                                }}
                                            />
                                            {/* Icon — color shifts to white on hover */}
                                            <motion.span
                                                className="relative z-10 flex items-center justify-center"
                                                variants={iconVariants}
                                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                            >
                                                <Icon className="w-4 h-4" />
                                            </motion.span>
                                        </MotionLink>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>

                {/* Navigation */}
                <nav className="relative flex-1 py-4 px-2 overflow-y-auto">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.href.substring(1);
                            return (
                                <li key={item.href}>
                                    <button
                                        onClick={() => handleNavClick(item.href)}
                                        title={collapsed && !mobileOpen ? item.label : undefined}
                                        className={`relative w-full flex items-center gap-3 rounded-xl text-[13px] font-medium transition-all duration-200 ${collapsed && !mobileOpen
                                                ? "justify-center px-2 py-3"
                                                : "px-3 py-2.5"
                                            } ${isActive
                                                ? "text-white shadow-lg"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                            }`}
                                        style={isActive ? {
                                            background: `linear-gradient(to right, ${item.color}cc, ${item.color}99)`,
                                            boxShadow: `0 4px 15px ${item.color}40`,
                                        } : undefined}
                                    >
                                        {/* Active indicator line */}
                                        {isActive && !collapsed && (
                                            <div
                                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                        )}
                                        <Icon
                                            className={`flex-shrink-0 ${collapsed && !mobileOpen ? "w-5 h-5" : "w-4 h-4"}`}
                                            style={isActive ? undefined : { color: item.color }}
                                        />
                                        {(!collapsed || mobileOpen) && <span className={isActive ? "font-semibold" : ""}>{item.label}</span>}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer with Collapse Toggle */}
                <div className="relative border-t border-white/5">
                    {(!collapsed || mobileOpen) && (
                        <div className="px-4 py-2 text-[10px] text-slate-600 text-center">
                            © {new Date().getFullYear()} {personalInfo.name}
                        </div>
                    )}
                    {/* Collapse Toggle (desktop only) */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={`hidden lg:flex w-full items-center justify-center gap-2 py-2.5 text-slate-500 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer ${collapsed && !mobileOpen ? "border-t border-white/5" : ""}`}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed && !mobileOpen ? (
                            <ChevronRight className="w-4 h-4" />
                        ) : (
                            <>
                                <ChevronLeft className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-medium">Collapse</span>
                            </>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
}
