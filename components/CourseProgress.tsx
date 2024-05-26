import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type CourseProgressProps = {
    value: number;
    varient?: "default" | "success";
    size?: "default" | "sm";
};

const colorByVarient = {
    default: "text-sky-700",
    success: "text-emerald-700",
};

const sizeByVarient = {
    default: "text-sm",
    sm: "text-xs",
};

const CourseProgress = ({ varient, value, size }: CourseProgressProps) => {
    return (
        <div>
            <Progress className="h-2" value={value} variant={varient} />
            <p
                className={cn(
                    "mt-2 font-medium text-sky-700",
                    colorByVarient[varient || "default"],
                    sizeByVarient[size || "default"]
                )}
            >
                {Math.round(value)}% Complete
            </p>
        </div>
    );
};

export default CourseProgress;
