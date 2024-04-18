"use client";

import React from "react";
import ReactConfetti from "react-confetti";
import useConfettiStore from "@/hooks/useConfettiStore";

const ConfettiProvider = () => {
    const confetti = useConfettiStore();

    if (!confetti.isOpen) return null;

    return (
        <ReactConfetti
            className="pointer-events-none z-[100]"
            numberOfPieces={500}
            recycle={false}
            onConfettiComplete={() => {
                confetti.onClose();
            }}
        />
    );
};

export default ConfettiProvider;
