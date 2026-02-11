"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    CheckCircle2,
    ExternalLink,
    Calendar,
    Award,
    Building2,
    Sparkles,
    Filter,
    FileText
} from "lucide-react";
import { getCertificationsContent } from "@/lib/content-loader";
import GlowCard from "@/components/ui/GlowCard";
import GradientBorder from "@/components/ui/GradientBorder";
import CertificationModal from "@/components/ui/CertificationModal";
import { staggerContainerFast, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

const certContent = getCertificationsContent();

// Enhanced certification type with support for different credential types
interface EnhancedCertification {
    name: string;
    issuer: string;
    icon?: string;
    year?: number;
    month?: string;
    category?: string;
    type?: "certification" | "workshop" | "conference" | "course";
    verificationLink?: string;
    description?: string;
    skills?: string[];
}

// Category configuration
const categories = [
    { id: "all", label: "All Credentials", color: "blue" },
    { id: "cloud", label: "Cloud & Infrastructure", color: "blue" },
    { id: "ai", label: "AI & Emerging Tech", color: "purple" },
    { id: "testing", label: "Testing & QA", color: "green" },
    { id: "development", label: "Full Stack Development", color: "cyan" },
    { id: "events", label: "Events & Workshops", color: "orange" },
];

// Auto-categorize certifications based on keywords and type
function getCertCategory(cert: EnhancedCertification): string {
    // If it's a workshop or conference, categorize as events
    if (cert.type === "workshop" || cert.type === "conference") return "events";

    const text = (cert.name + " " + cert.issuer).toLowerCase();
    if (text.includes("cloud") || text.includes("oci") || text.includes("oracle")) return "cloud";
    if (text.includes("ai") || text.includes("generative") || text.includes("agentic") || text.includes("llm")) return "ai";
    if (text.includes("test") || text.includes("qa") || text.includes("automation")) return "testing";
    if (text.includes("full stack") || text.includes("development") || text.includes("developer")) return "development";
    return "all";
}

// Get gradient colors and border gradient based on category
function getCategoryGradient(category: string): {
    from: string;
    to: string;
    color: "blue" | "purple" | "green" | "cyan";
    borderGradient: "blue-purple" | "cyan-blue" | "green-emerald" | "purple-pink" | "orange-red";
} {
    switch (category) {
        case "cloud":
            return { from: "#3B82F6", to: "#60A5FA", color: "blue", borderGradient: "cyan-blue" };
        case "ai":
            return { from: "#A855F7", to: "#C084FC", color: "purple", borderGradient: "purple-pink" };
        case "testing":
            return { from: "#10B981", to: "#34D399", color: "green", borderGradient: "green-emerald" };
        case "development":
            return { from: "#06B6D4", to: "#22D3EE", color: "cyan", borderGradient: "cyan-blue" };
        case "events":
            return { from: "#F59E0B", to: "#EF4444", color: "purple", borderGradient: "orange-red" };
        default:
            return { from: "#3B82F6", to: "#60A5FA", color: "blue", borderGradient: "blue-purple" };
    }
}

// Get type badge display info
function getTypeBadge(type?: string): { label: string; color: string } {
    switch (type) {
        case "workshop":
            return { label: "Workshop", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400" };
        case "conference":
            return { label: "Conference", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400" };
        case "course":
            return { label: "Course", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400" };
        case "certification":
        default:
            return { label: "Certification", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" };
    }
}

export default function CertificationsEnhanced() {
    const { heading, subheading, certifications } = certContent;
    const [activeCategory, setActiveCategory] = useState("all");
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [selectedCert, setSelectedCert] = useState<EnhancedCertification | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (cert: EnhancedCertification) => {
        setSelectedCert(cert);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedCert(null), 300);
    };

    // Convert legacy certifications to enhanced format
    const enhancedCerts: EnhancedCertification[] = certifications.map(cert => ({
        ...cert,
        category: getCertCategory(cert),
        // Use year from data if available, otherwise try to extract from name
        year: cert.year || (cert.name.includes("2025") ? 2025 : cert.name.includes("2024") ? 2024 : undefined),
        // Keep verificationLink from data, or set placeholder only if missing
        verificationLink: cert.verificationLink || "#verify-credential",
    }));

    // Filter certifications by category
    const filteredCerts = activeCategory === "all"
        ? enhancedCerts
        : enhancedCerts.filter(cert => cert.category === activeCategory);

    return (
        <section id="certifications" className="portfolio-section">
            <div className="section-heading">
                <h2>{heading}</h2>
                <p>{subheading}</p>
            </div>

            <div className="max-w-7xl">
                {/* Category Filter Tabs */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
                    <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400 flex-shrink-0" />
                    <div className="flex gap-2">
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                                    activeCategory === category.id
                                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                )}
                            >
                                {category.label}
                                {category.id === "all" && (
                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                                        {enhancedCerts.length}
                                    </span>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Certification Cards Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        variants={staggerContainerFast}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredCerts.map((cert, index) => {
                            const category = cert.category || "all";
                            const gradient = getCategoryGradient(category);
                            const isHovered = hoveredCard === index;
                            const hasValidLink = cert.verificationLink && cert.verificationLink !== "#verify-credential" && cert.verificationLink !== "#";

                            return (
                                <motion.div
                                    key={index}
                                    variants={staggerItem}
                                    custom={index}
                                    onHoverStart={() => setHoveredCard(index)}
                                    onHoverEnd={() => setHoveredCard(null)}
                                    className="flex"
                                >
                                    <GradientBorder
                                        gradient={gradient.borderGradient}
                                        borderWidth={2}
                                        animate={isHovered}
                                        className="w-full flex flex-col"
                                    >
                                        <GlowCard
                                            glowColor={gradient.color}
                                            glowIntensity="md"
                                            enableHover={true}
                                            className="p-6 relative overflow-hidden flex flex-col flex-1"
                                        >
                                            {/* Gradient Background */}
                                            <div
                                                className="absolute inset-0 opacity-5 dark:opacity-10"
                                                style={{
                                                    background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                                                }}
                                            />

                                            {/* Sparkles decoration */}
                                            <div className="absolute top-2 right-2 opacity-20 dark:opacity-30">
                                                <Sparkles
                                                    className="w-6 h-6"
                                                    style={{ color: gradient.from }}
                                                />
                                            </div>

                                            <div className="relative z-10 flex flex-col h-full">
                                                {/* Year Badge */}
                                                {cert.year && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.2 }}
                                                        className="absolute -top-3 -left-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                                                            color: "white",
                                                        }}
                                                    >
                                                        {cert.year}
                                                    </motion.div>
                                                )}

                                                {/* Icon */}
                                                <div className="text-5xl mb-4 text-center">
                                                    {cert.icon || "🏆"}
                                                </div>

                                                {/* Certification Name */}
                                                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 text-center line-clamp-2 min-h-[3rem]">
                                                    {cert.name}
                                                </h3>

                                                {/* Type Badge */}
                                                {cert.type && (
                                                    <div className="flex justify-center mb-2">
                                                        <span className={cn(
                                                            "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                                                            getTypeBadge(cert.type).color
                                                        )}>
                                                            {getTypeBadge(cert.type).label}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Issuer */}
                                                <div className="flex items-center justify-center gap-2 mb-3 min-h-[2.5rem]">
                                                    <Building2 className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium text-center line-clamp-2">
                                                        {cert.issuer}
                                                    </p>
                                                </div>

                                                {/* Month/Date if available */}
                                                {cert.month && (
                                                    <div className="flex items-center justify-center gap-1 mb-3 text-xs text-slate-500 dark:text-slate-400">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>{cert.month} {cert.year}</span>
                                                    </div>
                                                )}

                                                {/* Verified Badge */}
                                                <div className="flex items-center justify-center gap-2 py-3 border-t border-slate-200 dark:border-slate-700">
                                                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                    <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider">
                                                        Certified
                                                    </span>
                                                </div>

                                                {/* Verification Button / View Details (always shown for consistent height) */}
                                                {hasValidLink ? (
                                                    <motion.a
                                                        href={cert.verificationLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.02 }}
                                                        className={cn(
                                                            "mt-3 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300",
                                                            "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
                                                        )}
                                                    >
                                                        <Award className="w-4 h-4" />
                                                        Verify Credential
                                                        <ExternalLink className="w-3 h-3" />
                                                    </motion.a>
                                                ) : (
                                                    <motion.button
                                                        onClick={() => openModal(cert)}
                                                        whileHover={{ scale: 1.02 }}
                                                        className={cn(
                                                            "mt-3 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300",
                                                            "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                                                        )}
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                        View Details
                                                        <Sparkles className="w-3 h-3" />
                                                    </motion.button>
                                                )}
                                            </div>
                                        </GlowCard>
                                    </GradientBorder>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Empty State */}
                {filteredCerts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 text-slate-600 dark:text-slate-400"
                    >
                        <Award className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="text-lg font-medium">No certifications in this category yet</p>
                    </motion.div>
                )}

                {/* Stats Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800/50"
                >
                    <div className="flex items-center justify-center gap-8 text-center">
                        <div>
                            <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
                                {enhancedCerts.length}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                Certifications
                            </p>
                        </div>
                        <div className="h-12 w-px bg-slate-300 dark:bg-slate-600" />
                        <div>
                            <p className="text-3xl font-black text-purple-600 dark:text-purple-400">
                                {new Set(enhancedCerts.map(c => c.issuer)).size}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                Organizations
                            </p>
                        </div>
                        <div className="h-12 w-px bg-slate-300 dark:bg-slate-600" />
                        <div>
                            <p className="text-3xl font-black text-green-600 dark:text-green-400">
                                2025
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                Latest Year
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Certification Details Modal */}
            {selectedCert && (
                <CertificationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    certification={selectedCert}
                />
            )}
        </section>
    );
}
