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
import { Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import ChaptersList from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/ChaptersList";

type ChaptersFormProps = {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
};

const formSchema = z.object({
    title: z.string().min(1, { message: "Chapter title is required!" }),
});

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values);
            toast.success("Chapter created successfully.");
            toggleCreating();
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    const toggleCreating = () => {
        setIsCreating((current) => !current);
    };
    return (
        <div className="mt-6 rounded-md border bg-slate-100 p-4">
            <div className="flex items-center justify-between font-medium">
                Course chapters
                <Button variant="ghost" onClick={toggleCreating}>
                    {isCreating ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add a chapter
                        </>
                    )}
                </Button>
            </div>
            {isCreating && (
                <Form {...form}>
                    <form
                        className="mt-4 space-y-4"
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Introduction to the course.'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                        >
                            Create
                        </Button>
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div
                    className={cn(
                        "mt-2 text-sm",
                        !initialData.chapters.length && "italic text-slate-500"
                    )}
                >
                    {!initialData.chapters.length && "No chapters"}

                    <ChaptersList
                        onEdit={() => {}}
                        onReorder={() => {}}
                        items={initialData.chapters || []}
                    />
                </div>
            )}
            {!isCreating && (
                <p className="mt-4 text-sm text-muted-foreground">
                    Drag & drop to re-order the chapters
                </p>
            )}
        </div>
    );
};

export default ChaptersForm;
