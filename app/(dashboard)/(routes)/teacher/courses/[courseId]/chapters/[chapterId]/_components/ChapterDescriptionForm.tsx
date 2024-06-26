"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";

type ChapterDescriptionFormProps = {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
    description: z.string().min(1),
});

const ChapterDescriptionForm = ({
    initialData,
    courseId,
    chapterId,
}: ChapterDescriptionFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(
                `/api/courses/${courseId}/chapters/${chapterId}`,
                values
            );
            toast.success("Chapter updated successfully.");
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    const toggleEdit = () => {
        setIsEditing((current) => !current);
    };
    return (
        <div className="mt-6 rounded-md border bg-slate-100 p-4">
            <div className="flex items-center justify-between font-medium">
                Chapter description
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="mr-2 size-4" />
                            Edit description
                        </>
                    )}
                </Button>
            </div>
            {!isEditing ? (
                <div
                    className={cn(
                        "mt-2 text-sm",
                        !initialData.description && "italic text-slate-500"
                    )}
                >
                    {!initialData.description && "No description"}
                    {initialData.description && (
                        <Preview value={initialData.description} />
                    )}
                </div>
            ) : (
                <Form {...form}>
                    <form
                        className="mt-4 space-y-4"
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Editor {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};

export default ChapterDescriptionForm;
