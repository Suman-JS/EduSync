"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuroraBackground showRadialGradient={true}>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.7,
                    duration: 0.7,
                    ease: "circInOut",
                }}
                className="relative flex flex-col items-center justify-center gap-4 px-4"
            >
                <div className="flex h-full items-center justify-center">
                    {children}
                </div>
            </motion.div>
        </AuroraBackground>
    );
};

export default AuthLayout;
