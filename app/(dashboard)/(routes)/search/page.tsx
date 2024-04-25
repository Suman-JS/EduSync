import Categories from "@/app/(dashboard)/(routes)/search/_components/Categories";
import { db } from "@/lib/db";
import React from "react";

const SearchPage = async () => {
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    return (
        <div className="p-6">
            <Categories items={categories} />
        </div>
    );
};

export default SearchPage;
