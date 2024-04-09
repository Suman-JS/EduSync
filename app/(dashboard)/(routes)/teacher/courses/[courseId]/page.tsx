import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
    CircleDollarSign,
    File,
    LayoutDashboard,
    ListChecks,
} from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/IconBadge";

import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import { ImageForm } from "./_components/ImageForm";
import { CategoryForm } from "./_components/CategoryForm";
import PriceForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/PriceForm";
import { AttachmentForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/AttachmentForm";
import ChaptersForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/ChaptersForm";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId,
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                },
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
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
        course.chapters.some((chapter) => chapter.isPublished),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    return (
        <>
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
                        <TitleForm initialData={course} courseId={course.id} />
                        <DescriptionForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <ImageForm initialData={course} courseId={course.id} />
                        <CategoryForm
                            initialData={course}
                            courseId={course.id}
                            options={categories.map((category) => ({
                                label: category.name,
                                value: category.id,
                            }))}
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={ListChecks} />
                                <h2 className="text-xl">Course chapters</h2>
                            </div>
                            <div>
                                <ChaptersForm
                                    initialData={course}
                                    courseId={course.id}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={CircleDollarSign} />
                                <h2 className="text-xl">Sell your course</h2>
                            </div>
                            <PriceForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={File} />
                                <h2 className="text-xl">
                                    Resources & Attachments
                                </h2>
                            </div>
                            <AttachmentForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseIdPage;
