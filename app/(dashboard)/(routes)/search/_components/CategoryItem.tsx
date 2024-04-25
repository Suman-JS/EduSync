"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import { IconType } from "react-icons";
import qs from "query-string";

type CategoryItemProps = {
    label: string;
    icon?: IconType;
    value?: string;
};

const CategoryItem = ({ label, icon: Icon, value }: CategoryItemProps) => {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get("categoryId");
    const currentTitle = searchParams.get("title");

    const isSelected = currentCategoryId === value;

    const handleClick = () => {
        const url = qs.stringifyUrl(
            {
                url: pathName,
                query: {
                    title: currentTitle,
                    categoryId: isSelected ? null : value,
                },
            },
            {
                skipNull: true,
                skipEmptyString: true,
            }
        );

        router.push(url);
    };

    return (
        <button
            className={cn(
                "flex items-center gap-x-1 rounded-full border border-slate-200 px-3 py-2 text-sm transition-all hover:border-sky-700",
                isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
            )}
            type="button"
            onClick={handleClick}
        >
            {Icon && <Icon size={20} className="text-blue-600" />}
            <div className="truncate">{label}</div>
        </button>
    );
};

export default CategoryItem;
