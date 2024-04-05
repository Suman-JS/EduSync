import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/IconBadge";
import { LayoutDashboard } from "lucide-react";
import TitleForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/TitleForm";
import DescriptionForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/DescriptionForm";
import { ImageForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/ImageForm";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }
    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        },
    });

    if (!course) {
        return redirect("/");
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Course setup</h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields {completionText}
                    </span>
                </div>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">Customize your course</h2>
                    </div>
                    <div>
                        <TitleForm initialData={course} courseId={course.id} />
                        <DescriptionForm
                            initialData={course}
                            courseId={course.id}
                        />

                        <ImageForm initialData={course} courseId={course.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseIdPage;
