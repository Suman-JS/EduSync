import React from "react";
import { CourseProgressType } from "@/lib/types";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from "@/app/(course)/courses/[courseId]/_components/CourseSidebar";

const CourseMobileSidebar = ({ course, progressCount }: CourseProgressType) => {
    return (
        <Sheet>
            <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-white p-0">
                <CourseSidebar course={course} progressCount={progressCount} />
            </SheetContent>
        </Sheet>
    );
};

export default CourseMobileSidebar;
