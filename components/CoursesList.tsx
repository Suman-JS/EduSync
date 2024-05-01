import React from "react";

import { Category, Course } from "@prisma/client";
import CourseCard from "@/components/CourseCard";

type CoursesWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

type CoursesListProps = {
    items: CoursesWithProgressWithCategory[];
};

const CoursesList = ({ items }: CoursesListProps) => {
    return (
        <div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                {items.map((item) => (
                    <CourseCard
                        key={item.id}
                        id={item.id}
                        tittle={item.title}
                        imageUrl={item.imageUrl!}
                        chapterLength={item.chapters.length}
                        price={item.price!}
                        progress={item.progress}
                        category={item?.category?.name!}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="mt-10 text-center text-sm text-muted-foreground">
                    No courses found!
                </div>
            )}
        </div>
    );
};

export default CoursesList;
