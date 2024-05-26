import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import isTeacher from "@/lib/teacher";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { title } = await req.json();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!title) {
            return new NextResponse("Bad Request", { status: 400 });
        }

        const course = await db.course.create({
            data: {
                userId,
                title,
            },
        });

        return NextResponse.json(course, { status: 201 });
    } catch (error) {
        console.error("[COURSES]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
