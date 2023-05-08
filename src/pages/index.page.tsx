import { getDashboardData } from "@/features/dashboard/axios/dashboardApi";
import BarChart from "@/features/dashboard/cards/BarChart";
import RecentOrders from "@/features/dashboard/cards/RecentOrders";
import TopCards from "@/features/dashboard/cards/TopCards";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery(["dashboard-data"], getDashboardData);
  return (
    <main className="min-h-screen bg-gray-100">
      <TopCards
        thisMonthEnquiries={data?.thisMonthEnquiries}
        lastMonthEnquiries={data?.lastMonthEnquiries}
        thisMonthActiveUsers={data?.thisMonthActiveUsers}
        lastMonthActiveUsers={data?.lastMonthActiveUsers}
        thisMonthRevenue={data?.thisMonthRevenue}
        lastMonthRevenue={data?.lastMonthRevenue}
        thisYearRevenue={data?.thisYearRevenue}
        lastYearRevenue={data?.lastYearRevenue}
      />
      <div className="md:grid-cols-3 grid grid-cols-1 gap-4 p-4">
        <div className="md:col-span-2">
          <BarChart monthWiseRevenue={data?.monthWiseRevenue} />
        </div>
        <div className=" col-span-1">
          <RecentOrders recentOrders={data?.last15Orders} />
        </div>
      </div>
    </main>
  );
}
