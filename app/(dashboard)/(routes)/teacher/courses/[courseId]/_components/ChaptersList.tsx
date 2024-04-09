"use client";

import { Chapter } from "@prisma/client";
import React from "react";

type ChaptersListProps = {
    items: Chapter[];
    onReorder: (updateData: { id: string; position: number }[]) => void;
    onEdit: (id: string) => void;
};

const ChaptersList = ({ items, onEdit, onReorder }: ChaptersListProps) => {
    return <div>ChaptersList</div>;
};

export default ChaptersList;
