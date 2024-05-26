import getDashboardCourses from "@/actions/getDashboardCourses";
import InfoCard from "@/app/(dashboard)/(routes)/(root)/_components/InfoCard";
import CoursesList from "@/components/CoursesList";
import { auth } from "@clerk/nextjs";
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const { completedCourses, coursesInProgress } =
        await getDashboardCourses(userId);

    return (
        <div className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoCard
                    icon={Clock}
                    label="In Progress"
                    numberOfItems={coursesInProgress.length}
                />
                <InfoCard
                    icon={CheckCircle}
                    label="Completed"
                    numberOfItems={completedCourses.length}
                    varient="success"
                />
            </div>
            <CoursesList items={[...coursesInProgress, ...completedCourses]} />
        </div>
    );
}
