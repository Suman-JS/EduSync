"use client";

import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type ChapterActionsProps = {
    disabled: boolean;
    isPublished: boolean;
    courseId: string;
    chapterId: string;
};

const ChapterActions = ({
    disabled,
    chapterId,
    courseId,
    isPublished,
}: ChapterActionsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(
                `/api/courses/${courseId}/chapters/${chapterId}`
            );
            toast.success("Chapter deleted successfully.");
            router.push(`/teacher/courses/${courseId}`);
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePublish = async () => {
        try {
            setIsLoading(true);
            if (isPublished) {
                await axios.patch(
                    `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
                );
                toast.success("Chapter unpublished successfully!");
            } else {
                await axios.patch(
                    `/api/courses/${courseId}/chapters/${chapterId}/publish`
                );
                toast.success("Chapter published successfully!");
            }
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={handlePublish}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={handleDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="size-4" />
                </Button>
            </ConfirmModal>
        </div>
    );
};

export default ChapterActions;
