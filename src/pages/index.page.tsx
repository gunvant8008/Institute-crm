import BarChart from "@/features/user/components/cards/BarChart";
import RecentOrders from "@/features/user/components/cards/RecentOrders";
import TopCards from "@/features/user/components/cards/TopCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* <TopCards /> */}
      <div className="md:grid-cols-3 grid grid-cols-1 gap-4 p-4">
        <div className="md:col-span-2">{/* <BarChart /> */}</div>
        <div className=" col-span-1">
          {/* <RecentOrders /> */}
          <h2>Not rendering anything related to orders and revenue.</h2>
        </div>
      </div>
    </main>
  );
}
