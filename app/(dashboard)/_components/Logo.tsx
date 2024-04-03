import React from "react";
import Image from "next/image";

const Logo = () => {
    const isDarkMode = false;
    return (
        <>
            {isDarkMode ? (
                <Image
                    height={140}
                    width={160}
                    alt="Logo"
                    src="/logo-white.png"
                />
            ) : (
                <Image
                    height={140}
                    width={160}
                    alt="Logo"
                    src="/logo-color.png"
                />
            )}
        </>
    );
};

export default Logo;
