"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type SidebarItemProps = {
    icon: LucideIcon;
    label: string;
    href: string;
};

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
    const pathName = usePathname();
    const router = useRouter();

    const isActive =
        (pathName === "/" && href === "/") ||
        pathName === href ||
        pathName?.startsWith(`${href}/`);

    const handleClick = () => {
        router.push(href);
    };

    return (
        <button
            onClick={handleClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600",
                isActive &&
                    "bg-sky-200/20 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    className={cn("text-slate-500", isActive && "text-sky-700")}
                    size={22}
                />
                {label}
            </div>
            <div
                className={cn(
                    "ml-auto h-[3.2rem] border-2 border-sky-700 opacity-0 transition-all",
                    isActive && "opacity-100"
                )}
            />
        </button>
    );
};

export default SidebarItem;
