"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

type CourseEnrollButtonProps = {
    courseId: string;
    price: number;
};

const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
    return (
        <Button className="w-full md:w-auto" size="sm">
            Enroll for {formatPrice(price)}
        </Button>
    );
};

export default CourseEnrollButton;
