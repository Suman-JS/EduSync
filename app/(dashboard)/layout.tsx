import Navbar from "@/app/(dashboard)/_components/Navbar";
import Sidebar from "@/app/(dashboard)/_components/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <div className="fixed inset-y-0 z-50 h-[80px] w-full md:pl-56">
                <Navbar />
            </div>
            <div className="fixed inset-y-0 z-50 hidden h-full w-56 flex-col md:flex">
                <Sidebar />
            </div>
            <main className="h-full md:pl-56">{children}</main>
        </div>
    );
};

export default DashboardLayout;
