"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getContactContent } from "@/lib/content-loader";
import { getIcon } from "@/data/config";
import { staggerContainerFast } from "@/lib/animations";
import GradientBorder from "@/components/ui/GradientBorder";

const contactContent = getContactContent();

// Animation variants
const slideUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
        },
    }),
};

export default function Contact() {
    const { heading, subheading, introText, items: contacts } = contactContent;

    // Separate resume from other contacts
    const resumeItem = contacts.find(item => item.label === "Resume");
    const contactItems = contacts.filter(item => item.label !== "Resume");

    return (
        <section id="contact" className="portfolio-section">
            <div className="section-heading">
                <h2>{heading}</h2>
                <p>{subheading}</p>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Hero-style intro text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 max-w-3xl mx-auto"
                >
                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                        {introText}
                    </p>
                </motion.div>

                {/* Contact Cards Grid */}
                <motion.div
                    variants={staggerContainerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
                >
                    {contactItems.map((contact, index) => {
                        const Icon = getIcon(contact.iconName);
                        const isEmail = contact.label === "Email";

                        return (
                            <motion.div
                                key={contact.label}
                                custom={index}
                                variants={slideUpVariant}
                                className="group"
                            >
                                <Link
                                    href={contact.href}
                                    target={contact.external ? "_blank" : undefined}
                                    className="block h-full"
                                >
                                    <GradientBorder
                                        gradient={isEmail ? "cyan-blue" : "blue-purple"}
                                        borderWidth={2}
                                        borderRadius="20px"
                                        animate={false}
                                        className="h-full hover:scale-[1.02] transition-transform duration-300"
                                    >
                                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[18px] h-full flex flex-col items-center text-center">
                                            {/* Icon with animated glow */}
                                            <motion.div
                                                className="relative mb-5"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                                                <div className="relative p-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white shadow-lg">
                                                    <Icon className="w-8 h-8" />
                                                </div>
                                            </motion.div>

                                            {/* Label */}
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                                {contact.label}
                                            </h3>

                                            {/* Value/Subtitle */}
                                            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium break-words">
                                                {contact.value}
                                            </p>
                                        </div>
                                    </GradientBorder>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Resume Download Button */}
                {resumeItem && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex justify-center"
                    >
                        <Link
                            href={resumeItem.href}
                            target={resumeItem.external ? "_blank" : undefined}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.05]"
                        >
                            {/* Animated gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift" />

                            {/* Content */}
                            <span className="relative z-10 flex items-center gap-3">
                                {(() => {
                                    const ResumeIcon = getIcon(resumeItem.iconName);
                                    return <ResumeIcon className="w-6 h-6" />;
                                })()}
                                {resumeItem.value}
                            </span>
                        </Link>
                    </motion.div>
                )}

                {/* Footer */}
                <div className="text-center text-sm text-slate-400 dark:text-slate-600 pt-12">
                    © {new Date().getFullYear()} Rakesh Arrepu. All rights reserved.
                </div>
            </div>
        </section>
    );
}
