import React from "react";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/app/(dashboard)/_components/Sidebar";

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="bg-white p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
