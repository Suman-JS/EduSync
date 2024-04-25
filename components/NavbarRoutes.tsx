"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import SearchInput from "@/components/SearchInput";

const NavbarRoutes = () => {
    const pathName = usePathname();

    const isTeacherPage = pathName?.startsWith("/teacher");
    const isPlayerPage = pathName?.includes("/chapter");
    const isSearchPage = pathName === "/search";

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="ml-auto flex gap-x-2">
                {isTeacherPage || isPlayerPage ? (
                    <Link href="/">
                        <Button size="sm" variant="ghost">
                            <LogOut className="mr-2 size-4" />
                            Exit
                        </Button>
                    </Link>
                ) : (
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="ghost">
                            Teacher Mode
                        </Button>
                    </Link>
                )}
                <UserButton afterSignOutUrl="/" />
            </div>
        </>
    );
};

export default NavbarRoutes;
