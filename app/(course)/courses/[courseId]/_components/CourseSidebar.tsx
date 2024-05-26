import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import CourseSidebarItem from "./CourseSidebarItem";
import { CourseProgressType } from "@/lib/types";
import CourseProgress from "@/components/CourseProgress";

const CourseSidebar = async ({ course, progressCount }: CourseProgressType) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId: course.id,
            },
        },
    });

    return (
        <aside className="flex h-full flex-col overflow-y-auto border-r shadow-sm">
            <div className="flex flex-col border-b p-8">
                <h1 className="font-semibold">{course.title}</h1>

                {purchase && (
                    <div className="mt-10">
                        <CourseProgress
                            varient="success"
                            value={progressCount}
                        />
                    </div>
                )}
            </div>
            <div className="flex w-full flex-col">
                {course.chapters.map((chapter) => (
                    <CourseSidebarItem
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!chapter.isFree && !purchase}
                    />
                ))}
            </div>
        </aside>
    );
};

export default CourseSidebar;
