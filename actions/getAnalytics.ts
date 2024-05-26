import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
    course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
    const grouped: { [courseTitle: string]: number } = {};

    purchases.forEach((purchase) => {
        const courseTitle = purchase.course.title;
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0;
        }
        grouped[courseTitle] += purchase.course.price!;
    });

    return grouped;
};

const getAnalytics = async (userId: string) => {
    try {
        const purchases = await db.purchase.findMany({
            where: {
                course: {
                    userId,
                },
            },
            include: {
                course: true,
            },
        });

        const groupedEarnings = groupByCourse(purchases);

        const data = Object.entries(groupedEarnings).map(
            ([courseTitle, total]) => ({
                name: courseTitle,
                total,
            })
        );

        const totalReveneue = data.reduce((acc, curr) => acc + curr.total, 0);

        const totalSales = purchases.length;

        return {
            data,
            totalReveneue,
            totalSales,
        };
    } catch (error) {
        console.error("[GET_ANALYTICS]", error);
        return {
            data: [],
            totalReveneue: 0,
            totalSales: 0,
        };
    }
};

export default getAnalytics;
