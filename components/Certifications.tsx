"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, ExternalLink } from "lucide-react";
import { getCertificationsContent } from "@/lib/content-loader";
import GlowCard from "@/components/ui/GlowCard";
import { flipIn, staggerContainerFast } from "@/lib/animations";

const certContent = getCertificationsContent();

// Determine gradient based on certification type
function getCertGradient(issuer: string): { from: string; to: string; color: "purple" | "blue" | "green" | "cyan" } {
    const lowerIssuer = issuer.toLowerCase();
    if (lowerIssuer.includes("ai") || lowerIssuer.includes("gen") || lowerIssuer.includes("anthropic")) {
        return { from: "#8B5CF6", to: "#A78BFA", color: "purple" };
    } else if (lowerIssuer.includes("oracle") || lowerIssuer.includes("oci") || lowerIssuer.includes("cloud")) {
        return { from: "#3B82F6", to: "#60A5FA", color: "blue" };
    } else if (lowerIssuer.includes("tester") || lowerIssuer.includes("test")) {
        return { from: "#10B981", to: "#34D399", color: "green" };
    } else {
        return { from: "#06B6D4", to: "#22D3EE", color: "cyan" };
    }
}

// Get the type badge label
function getTypeBadge(type?: string): string {
    switch (type) {
        case "certification": return "Certification";
        case "workshop": return "Workshop";
        case "conference": return "Conference";
        case "bootcamp": return "Bootcamp";
        case "webinar": return "Webinar";
        case "course": return "Course";
        default: return "Credential";
    }
}

export default function Certifications() {
    const { heading, subheading, certifications } = certContent;

    return (
        <section id="certifications" className="portfolio-section">
            <div className="section-heading">
                <h2>{heading}</h2>
                <p>{subheading}</p>
            </div>

            {/* Certificate Card Gallery */}
            <motion.div
                variants={staggerContainerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl"
            >
                {certifications.map((cert, index) => {
                    const gradient = getCertGradient(cert.issuer);
                    const viewLink = cert.certImage || cert.verificationLink;

                    return (
                        <motion.div
                            key={index}
                            variants={flipIn}
                            custom={index}
                        >
                            <GlowCard
                                glowColor={gradient.color}
                                glowIntensity="md"
                                enableHover={true}
                                className="p-6 relative overflow-hidden h-full"
                            >
                                {/* Gradient Background */}
                                <div
                                    className="absolute inset-0 opacity-10 dark:opacity-15"
                                    style={{
                                        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                                    }}
                                />

                                {/* Sparkles decoration */}
                                <div className="absolute top-2 right-2 opacity-20 dark:opacity-30">
                                    <Sparkles className="w-8 h-8" style={{ color: gradient.from }} />
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Type Badge */}
                                    <div className="flex justify-center mb-3">
                                        <span
                                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                                            style={{
                                                color: gradient.from,
                                                backgroundColor: `${gradient.from}15`,
                                                border: `1px solid ${gradient.from}30`,
                                            }}
                                        >
                                            {getTypeBadge(cert.type)}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className="text-5xl mb-4 flex items-center justify-center">
                                        {cert.icon}
                                    </div>

                                    {/* Certification Name */}
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 text-center">
                                        {cert.name}
                                    </h3>

                                    {/* Issuer & Date */}
                                    <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                                        {cert.issuer}
                                    </p>
                                    {cert.month && cert.year && (
                                        <p className="text-xs text-slate-500 dark:text-slate-500 text-center mt-1">
                                            {cert.month} {cert.year}
                                        </p>
                                    )}

                                    {/* Spacer to push footer to bottom */}
                                    <div className="flex-1" />

                                    {/* Footer: Verified + View Details */}
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider">
                                                Verified
                                            </span>
                                        </div>
                                        {viewLink && viewLink !== "#" && (
                                            <a
                                                href={viewLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors"
                                                style={{ color: gradient.from }}
                                            >
                                                View Details
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
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
