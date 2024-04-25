"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

const SearchInput = () => {
    return (
        <div className="relative">
            <SearchIcon className="absolute left-3 top-3 size-4 text-slate-600" />
            <Input/>
        </div>
    );
};

export default SearchInput;
