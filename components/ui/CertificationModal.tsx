"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Building2, Calendar, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    certification: {
        name: string;
        issuer: string;
        icon?: string;
        year?: number;
        month?: string;
        type?: string;
        certImage?: string;
        description?: string;
        skills?: string[];
    };
}

export default function CertificationModal({
    isOpen,
    onClose,
    certification,
}: CertificationModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={cn(
                                "relative w-full max-w-2xl",
                                "bg-white dark:bg-slate-900",
                                "rounded-2xl shadow-2xl",
                                "border border-slate-200 dark:border-slate-700",
                                "overflow-hidden"
                            )}
                        >
                            {/* Header with gradient */}
                            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Icon */}
                                <div className="text-6xl mb-4">
                                    {certification.icon || "🏆"}
                                </div>

                                {/* Title */}
                                <h2 className="text-2xl font-bold mb-2">
                                    {certification.name}
                                </h2>

                                {/* Issuer */}
                                <div className="flex items-center gap-2 text-white/90">
                                    <Building2 className="w-5 h-5" />
                                    <span className="text-lg">{certification.issuer}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-6">
                                {/* Date */}
                                {(certification.month || certification.year) && (
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                Date Issued
                                            </p>
                                            <p className="font-semibold text-slate-900 dark:text-white">
                                                {certification.month} {certification.year}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Type */}
                                {certification.type && (
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                            <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                Credential Type
                                            </p>
                                            <p className="font-semibold text-slate-900 dark:text-white capitalize">
                                                {certification.type}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Description */}
                                {certification.description && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                            <FileText className="w-5 h-5" />
                                            <span className="font-semibold">About</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {certification.description}
                                        </p>
                                    </div>
                                )}

                                {/* Skills */}
                                {certification.skills && certification.skills.length > 0 && (
                                    <div className="space-y-3">
                                        <p className="font-semibold text-slate-700 dark:text-slate-300">
                                            Skills Covered
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {certification.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Certificate Image */}
                                {certification.certImage ? (
                                    <div className="mt-6">
                                        <a
                                            href={certification.certImage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                                        >
                                            <img
                                                src={certification.certImage}
                                                alt={`${certification.name} certificate`}
                                                className="w-full h-auto"
                                            />
                                        </a>
                                    </div>
                                ) : (
                                    <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                        <p className="text-sm text-amber-800 dark:text-amber-300">
                                            Certificate document will be available here once uploaded
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
