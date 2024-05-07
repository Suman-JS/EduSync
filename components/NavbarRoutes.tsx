"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import SearchInput from "@/components/SearchInput";
import isTeacher from "@/lib/teacher";

const NavbarRoutes = () => {
    const { userId } = useAuth();
    const pathName = usePathname();

    const isTeacherPage = pathName?.startsWith("/teacher");
    const isCoursePage = pathName?.includes("/courses");
    const isSearchPage = pathName === "/search";

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="ml-auto flex gap-x-2">
                {isTeacherPage || isCoursePage ? (
                    <Link href="/">
                        <Button size="sm" variant="ghost">
                            <LogOut className="mr-2 size-4" />
                            Exit
                        </Button>
                    </Link>
                ) : isTeacher(userId) ? (
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="ghost">
                            Teacher Mode
                        </Button>
                    </Link>
                ) : null}
                <UserButton afterSignOutUrl="/" />
            </div>
        </>
    );
};

export default NavbarRoutes;
