"use client";

import Link from "next/link";
import "./404page.css";

export default function NotFound() {
    return (
        <div className="parent">
            <div className="container">
                <div className="error">
                    <p className="p">4</p>
                    <span className="dracula">
                        <div className="con">
                            <div className="hair"></div>
                            <div className="hair-r"></div>
                            <div className="head"></div>
                            <div className="eye"></div>
                            <div className="eye eye-r"></div>
                            <div className="mouth"></div>
                            <div className="blod"></div>
                            <div className="blod blod2 "></div>
                        </div>
                    </span>
                    <p className="p">4</p>

                    <div className="translate-y-[-50px]">
                        <p className="error">
                            Oops, the page you&apos;re looking for Disappeared!
                        </p>
                        <Link href="/">
                            <button className="z-[9] mt-[20px] cursor-pointer  rounded-[10px] border-none bg-[#c0d7dd]  px-[20px] py-[10px] font-err text-[30px] text-[#33265c] shadow-btn transition-all duration-300 ease-linear hover:shadow-pnf">
                                Go Back
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
