import Logo from "@/app/(dashboard)/_components/Logo";
import SidebarRoutes from "@/app/(dashboard)/_components/SidebarRoutes";
import React from "react";

const Sidebar = () => {
    return (
        <aside className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm">
            <div className="p-6 pb-3 pt-3">
                <Logo />
            </div>
            <div className="flex w-full flex-col">
                <SidebarRoutes />
            </div>
        </aside>
    );
};

export default Sidebar;
