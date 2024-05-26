"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

const SearchInput = () => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl(
            {
                url: pathName,
                query: {
                    categoryId: currentCategoryId,
                    title: debouncedValue,
                },
            },
            {
                skipEmptyString: true,
                skipNull: true,
            }
        );
        router.push(url);
    }, [currentCategoryId, pathName, debouncedValue, router]);

    return (
        <div className="relative">
            <SearchIcon className="absolute left-3 top-3 size-4 text-slate-600" />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full rounded-full bg-slate-100 pl-9 focus-visible:ring-slate-200 md:w-[300px]"
                placeholder="Search for a course..."
            />
        </div>
    );
};

export default SearchInput;
