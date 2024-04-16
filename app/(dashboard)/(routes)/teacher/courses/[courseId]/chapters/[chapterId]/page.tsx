import ChapterAccessForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/ChapterAccessForm";
import ChapterDescriptionForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/ChapterDescriptionForm";
import ChapterTitleForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/ChapterTitleForm";
import { ChapterVideoForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/ChapterVideoForm";
import { IconBadge } from "@/components/IconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ChapterIdPage = async ({
    params,
}: {
    params: { courseId: string; chapterId: string };
}) => {
    const { userId } = auth();
    if (!userId) {
        return redirect("/");
    }

    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId,
        },
        include: {
            muxData: true,
        },
    });

    if (!chapter) {
        return redirect("/");
    }

    const requireFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl,
    ];

    const totalFields = requireFields.length;

    const completedFields = requireFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <Link
                        href={`/teacher/courses/${params.courseId}`}
                        className="mb-6 flex items-center text-sm transition-all hover:opacity-75"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to course setup
                    </Link>
                    <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">
                                Chapter creation
                            </h1>
                            <span className="text-sm text-slate-700">
                                Complete all the fields {completionText}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className="text-xl">Customize your chapter</h2>
                        </div>
                        <ChapterTitleForm
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                        />
                        <ChapterDescriptionForm
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={Eye} />
                            <h2 className="text-xl">Chapter access</h2>
                        </div>
                        <ChapterAccessForm
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                        />
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={Video} />
                        <h2 className="text-xl">Add a video</h2>
                    </div>
                    <ChapterVideoForm
                        initialData={chapter}
                        courseId={params.courseId}
                        chapterId={params.chapterId}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChapterIdPage;
