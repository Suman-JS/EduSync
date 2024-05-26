import { IconBadge } from "@/components/IconBadge";
import { LucideIcon } from "lucide-react";
import React from "react";

type InfoCardProps = {
    icon: LucideIcon;
    label: string;
    numberOfItems: number;
    varient?: "default" | "success";
};

const InfoCard = ({
    varient,
    icon: Icon,
    label,
    numberOfItems,
}: InfoCardProps) => {
    return (
        <div className="flex items-center gap-x-2 rounded-md border p-3">
            <IconBadge variant={varient} icon={Icon} />
            <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-gray-500">
                    {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
                </p>
            </div>
        </div>
    );
};

export default InfoCard;
