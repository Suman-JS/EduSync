import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursePage = () => {
    return (
        <div className="p-6">
            <Link href="/teacher/create">
                <Button>New Course</Button>
            </Link>
        </div>
    );
};

export default CoursePage;
