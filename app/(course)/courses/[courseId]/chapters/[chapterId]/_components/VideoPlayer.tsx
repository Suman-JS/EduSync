"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { toast } from "react-hot-toast";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import useConfettiStore from "@/hooks/useConfettiStore";

type VideoPlayerProps = {
    chapterId: string;
    title: string;
    courseId: string;
    nextChapterId?: string;
    playbackId: string;
    isLocked: boolean;
    completeOnEnd: boolean;
};

const VideoPlayer = ({
    chapterId,
    title,
    courseId,
    nextChapterId,
    playbackId,
    isLocked,
    completeOnEnd,
}: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();

    const handleVideoEnd = async () => {
        try {
            if (completeOnEnd) {
                await axios.put(
                    `/api/courses/${courseId}/chapters/${chapterId}/progress`,
                    {
                        isCompleted: true,
                    }
                );
            }

            if (!nextChapterId) {
                toast.success("Hurry! You have completed the course.");
                confetti.onOpen();
            }

            router.refresh();

            if (nextChapterId) {
                toast.success("Chapter completed, starting next chapter.");
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="size-8 animate-spin text-secondary" />
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-slate-800 text-secondary">
                    <Lock className="size-8" />
                    <p className="text-sm">This chapter is locked</p>
                </div>
            )}
            {!isLocked && (
                <MuxPlayer
                    title={title}
                    className={cn(!isReady && "hidden")}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={handleVideoEnd}
                    autoPlay
                    loop={false}
                    backwardSeekOffset={10}
                    forwardSeekOffset={10}
                    playbackId={playbackId}
                />
            )}
        </div>
    );
};

export default VideoPlayer;
