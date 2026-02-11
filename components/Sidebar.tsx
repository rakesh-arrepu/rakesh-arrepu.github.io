"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Home,
    User,
    Briefcase,
    FolderKanban,
    Award,
    Mail,
    Linkedin,
    Github,
    FileText,
    Menu,
    X,
    Code2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { getPersonalInfo, getContactContent, getAboutContent } from "@/lib/content-loader";

const personalInfo = getPersonalInfo();
const contactContent = getContactContent();
const aboutContent = getAboutContent();

const navItems = [
    { label: "Home", icon: Home, href: "#home" },
    { label: "About", icon: User, href: "#about" },
    { label: "Skills", icon: Code2, href: "#skills" },
    { label: "Experience", icon: Briefcase, href: "#experience" },
    { label: "Projects", icon: FolderKanban, href: "#projects" },
    { label: "Certifications", icon: Award, href: "#certifications" },
    { label: "Contact", icon: Mail, href: "#contact" },
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
                {/* Collapse Toggle (desktop only) */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex absolute top-5 -right-0 w-6 h-6 items-center justify-center rounded-l-md bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white z-50 transition-all duration-200 shadow-lg hover:shadow-blue-500/50"
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? (
                        <ChevronRight className="w-3.5 h-3.5" />
                    ) : (
                        <ChevronLeft className="w-3.5 h-3.5" />
                    )}
                </button>

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
                            src="/profile.png"
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
                                {aboutContent.details.find((d) => d.label === "Role")?.value || "Principal QA Engineer"}
                            </p>

                            {/* Social Icons */}
                            <div className="flex gap-2 mt-3">
                                {contactContent.items.map((social) => {
                                    const IconMap: Record<string, typeof Mail> = {
                                        Mail, Linkedin, Github, FileText
                                    };
                                    const Icon = IconMap[social.iconName] || Mail;
                                    return (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        target={social.external ? "_blank" : undefined}
                                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 group"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:scale-110 transition-all" />
                                    </Link>
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
                                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        {/* Active indicator line */}
                                        {isActive && !collapsed && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r-full" />
                                        )}
                                        <Icon
                                            className={`flex-shrink-0 ${isActive ? "drop-shadow-sm" : ""} ${collapsed && !mobileOpen ? "w-5 h-5" : "w-4 h-4"
                                                }`}
                                        />
                                        {(!collapsed || mobileOpen) && <span className={isActive ? "font-semibold" : ""}>{item.label}</span>}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                {(!collapsed || mobileOpen) && (
                    <div className="px-4 py-3 text-[10px] text-slate-600 text-center border-t border-white/5">
                        © {new Date().getFullYear()} {personalInfo.name}
                    </div>
                )}
            </aside>
        </>
    );
}
