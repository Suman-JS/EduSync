"use client";

import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import useConfettiStore from "@/hooks/useConfettiStore";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type CourseActionsProps = {
    disabled: boolean;
    isPublished: boolean;
    courseId: string;
};

const CourseActions = ({
    disabled,
    courseId,
    isPublished,
}: CourseActionsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/courses/${courseId}`);
            toast.success("Course deleted successfully.");
            router.push("/teacher/courses");
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
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course unpublished successfully!");
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Course published successfully!");
                confetti.onOpen();
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

export default CourseActions;
