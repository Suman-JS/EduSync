import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import ToasterProvider from "@/components/provider/ToasterProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "EduSync",
    description:
        "EduSync is a online LMS platform. Teachers can upload their courses and students can learn from them.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <ToasterProvider />
                    <NextSSRPlugin
                        routerConfig={extractRouterConfig(ourFileRouter)}
                    />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
