import React from "react";

import { db } from "@/lib/db";

import Categories from "@/app/(dashboard)/(routes)/search/_components/Categories";
import SearchInput from "@/components/SearchInput";

import { getCourses } from "@/actions/getCourses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "@/components/CoursesList";

type SearchPageProps = {
    searchParams: {
        title: string;
        categoryId: string;
    };
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    const courses = await getCourses({
        userId,
        ...searchParams,
    });

    return (
        <>
            <div className="block px-6 pt-6 md:mb-0 md:hidden">
                <SearchInput />
            </div>
            <div className="space-y-4 p-6">
                <Categories items={categories} />
                <CoursesList items={courses} />
            </div>
        </>
    );
};

export default SearchPage;
