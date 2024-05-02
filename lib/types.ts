import { Course, Chapter, UserProgress } from "@prisma/client";

type CourseProgressType = {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
};

export type { CourseProgressType };
