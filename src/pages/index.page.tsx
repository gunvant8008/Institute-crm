import Header from "@/components/Layout/Header";
import BarChart from "@/components/cards/BarChart";
import RecentOrders from "@/components/cards/RecentOrders";
import TopCards from "@/components/cards/TopCards";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <TopCards />
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 p-4">
        <div className="md:col-span-2">
          <BarChart />
        </div>
        <div className="col-span-1 ">
          <RecentOrders />
        </div>
      </div>
    </main>
  );
}
