"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";

interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment[] };
    courseId: string;
}

const formSchema = z.object({
    url: z.string().min(1),
});

export const AttachmentForm = ({
    initialData,
    courseId,
}: AttachmentFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toast.success("Course updated successfully.");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong!");
        }
    };
    console.log(initialData.attachments);

    return (
        <div className="mt-6 rounded-md border bg-slate-100 p-4">
            <div className="flex items-center justify-between font-medium">
                Course attachments
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && <>Cancel</>}
                    {!isEditing && (
                        <>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add a file
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    {initialData.attachments.length === 0 && (
                        <p className="mt-2 text-sm italic text-slate-500">
                            No attachments yet.
                        </p>
                    )}
                    {initialData.attachments.length > 0 && (
                        <div className="space-y-2">
                            {initialData.attachments.map((attachment) => (
                                <div
                                    key={attachment.id}
                                    className="flex w-full items-center rounded-md border border-sky-200 bg-sky-100 p-3 text-sky-700"
                                >
                                    <File className="mr-2 h-4 w-4 flex-shrink-0" />
                                    <p className="line-clamp-1 text-sm">
                                        {attachment.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endPoint="courseAttachments"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url });
                            }
                        }}
                    />
                    <div className="mt-4 text-xs text-muted-foreground">
                        Add anything your students might need to complete the
                        course.
                    </div>
                </div>
            )}
        </div>
    );
};
