import isTeacher from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();
    if (!isTeacher) {
        throw new Error("Unauthorized");
    }
    return { userId };
};

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
            console.log("Course image uploaded!");
        }),

    courseAttachments: f(["text", "image", "video", "audio", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
            console.log("Course attachments uploaded!");
        }),

    chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
            console.log("Chapter video uploaded!");
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
