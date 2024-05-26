import Logo from "@/app/(dashboard)/_components/Logo";
import SidebarRoutes from "@/app/(dashboard)/_components/SidebarRoutes";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
    return (
        <aside className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm">
            <div className="p-6 py-3">
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <div className="flex w-full flex-col">
                <SidebarRoutes />
            </div>
            <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"></div>
        </aside>
    );
};

export default Sidebar;
