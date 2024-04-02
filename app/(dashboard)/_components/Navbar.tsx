import MobileSidebar from "@/app/(dashboard)/_components/MobileSidebar";
import NavbarRoutes from "@/components/NavbarRoutes";
import React from "react";

const Navbar = () => {
    return (
        <nav className="flex h-full items-center border-b bg-white p-4 shadow-sm">
            <MobileSidebar />
            <NavbarRoutes />
        </nav>
    );
};

export default Navbar;
