import React from "react";
import Image from "next/image";

const Logo = () => {
    const isDarkMode = false;
    return (
        <>
            {isDarkMode ? (
                <Image alt="Logo" src="/logo-white.png" priority />
            ) : (
                <Image alt="Logo" src="/logo-color.png" priority />
            )}
        </>
    );
};

export default Logo;
