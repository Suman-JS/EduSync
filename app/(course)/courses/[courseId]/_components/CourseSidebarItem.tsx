"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type CourseSidebarItemProps = {
    id: string;
    label: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean;
};

const CourseSidebarItem = ({
    id,
    label,
    isCompleted,
    isLocked,
    courseId,
}: CourseSidebarItemProps) => {
    const pathName = usePathname();
    const router = useRouter();

    const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
    const isActive = pathName?.includes(id);

    const handleClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    };

    return (
        <button
            onClick={handleClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600",

                isActive &&
                    "bg-slate-200/20 text-slate-700 hover:bg-slate-200/20 hover:text-slate-700",

                isCompleted && "text-emerald-700 hover:text-emerald-700",
                isCompleted && isActive && "bg-emerald-200/20"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    className={cn(
                        "text-slate-500",
                        isActive && "text-slate-700",
                        isCompleted && "text-emerald-700"
                    )}
                    size={22}
                />
                {label}
            </div>
            <div
                className={cn(
                    "ml-auto h-full border-2 border-slate-700 opacity-0 transition-all",
                    isActive && "opacity-100",
                    isCompleted && "border-emerald-700"
                )}
            />
        </button>
    );
};

export default CourseSidebarItem;
