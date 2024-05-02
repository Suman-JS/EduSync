import React from "react";

import NavbarRoutes from "@/components/NavbarRoutes";
import CourseMobileSidebar from "./CourseMobileSidebar";
import { CourseProgressType } from "@/lib/types";

const CourseNavbar = ({ course, progressCount }: CourseProgressType) => {
    return (
        <nav className="flex h-full items-center border-b bg-white p-4 shadow-sm">
            <CourseMobileSidebar
                course={course}
                progressCount={progressCount}
            />
            <NavbarRoutes />
        </nav>
    );
};

export default CourseNavbar;
