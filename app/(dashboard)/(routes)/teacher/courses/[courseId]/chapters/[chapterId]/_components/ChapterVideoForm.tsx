"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, VideoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";

interface ChapterVideoFormProps {
    initialData: Chapter & {
        muxData?: MuxData | null;
    };
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId,
}: ChapterVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(
                `/api/courses/${courseId}/chapters/${chapterId}`,
                values
            );
            toast.success("Chapter updated successfully.");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="mt-6 rounded-md border bg-slate-100 p-4">
            <div className="flex items-center justify-between font-medium">
                Chapter video
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && <>Cancel</>}
                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add a video
                        </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit video
                        </>
                    )}
                </Button>
            </div>
            {!isEditing &&
                (!initialData.videoUrl ? (
                    <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
                        <VideoIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative mt-2 aspect-video">
                        {/* //! TODO: Replace it with video */}
                        Video uploaded!
                    </div>
                ))}
            {isEditing && (
                <div>
                    <FileUpload
                        endPoint="chapterVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url });
                            }
                        }}
                    />
                    <div className="mt-4 text-xs text-muted-foreground">
                        Upload this chapter&apos;s video
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="mt-2 text-xs text-muted-foreground">
                    Videos can take a few minutes to process. Refresh the page
                    if video does not appear.
                </div>
            )}
        </div>
    );
};
