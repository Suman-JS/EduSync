"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";

const NavbarRoutes = () => {
    return (
        <div className="ml-auto flex gap-x-2">
            <UserButton />
        </div>
    );
};

export default NavbarRoutes;
