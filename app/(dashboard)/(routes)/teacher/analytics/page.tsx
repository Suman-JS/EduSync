import getAnalytics from "@/actions/getAnalytics";
import Chart from "@/app/(dashboard)/(routes)/teacher/analytics/_components/Chart";
import DataCard from "@/app/(dashboard)/(routes)/teacher/analytics/_components/DataCard";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const AnalyticsPage = async () => {
    const { userId } = auth();
    if (!userId) {
        return redirect("/");
    }

    const { data, totalReveneue, totalSales } = await getAnalytics(userId);

    return (
        <div className="p-6">
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <DataCard
                    label="Total Revenue"
                    value={totalReveneue}
                    shouldFormat
                />
                <DataCard label="Total Sales" value={totalSales} />
            </div>
            <Chart data={data} />
        </div>
    );
};

export default AnalyticsPage;
