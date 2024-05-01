import { IconBadge } from "@/components/IconBadge";
import { formatPrice } from "@/lib/format";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type CoursecardProps = {
    id: string;
    tittle: string;
    imageUrl: string;
    chapterLength: number;
    price: number;
    progress: number | null;
    category: string;
};

const CourseCard = ({
    id,
    tittle,
    imageUrl,
    chapterLength,
    price,
    progress,
    category,
}: CoursecardProps) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm ">
                <div className="relative aspect-video w-full overflow-hidden rounded-md">
                    <Image
                        src={imageUrl}
                        alt={tittle}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="line-clamp-2 text-lg font-medium transition group-hover:text-sky-700 md:text-base">
                        {tittle}
                    </div>
                    <p className="text-xs text-muted-foreground">{category}</p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <IconBadge size="sm" icon={BookOpen} />
                            <span>
                                {chapterLength}{" "}
                                {chapterLength === 1 ? "Chapter" : "Chapters"}
                            </span>
                        </div>
                    </div>
                    {progress !== null ? (
                        <div>{/* //! TODO: Progress Component */}</div>
                    ) : (
                        <p className="text-base font-medium text-slate-700 md:text-sm">
                            {formatPrice(price)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
