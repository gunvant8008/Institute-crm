import { getDashboardData } from "@/features/user/axios/userApi";
import BarChart from "@/features/user/components/cards/BarChart";
import RecentOrders from "@/features/user/components/cards/RecentOrders";
import TopCards from "@/features/user/components/cards/TopCards";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery(["dashboard-data"], getDashboardData);
  // const {last15Orders, thisMonthEnquiries, lastMonthEnquiries, thisMonthRevenue, lastMonthRevenue} = data || undefined
  return (
    <main className="min-h-screen bg-gray-100">
      <TopCards
        thisMonthEnquiries={data?.thisMonthEnquiries}
        lastMonthEnquiries={data?.lastMonthEnquiries}
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
