import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getRecentUsers } from "@/features/user/axios/userApi";
import Link from "next/link";

const RecentOrders = () => {
  const { data: recentUsers } = useQuery(["recentUsers"], getRecentUsers);
  console.log(recentUsers);
  return (
    <div className="w-full relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1>Recent Orders</h1>
      <ul>
        {recentUsers?.map((user) => (
          <li key={user.id}>
            <Link href={`/user/${user.id}`}>
              <div className="bg-gray-50 hover:bg-gray-100 flex items-center p-2 my-3 rounded-lg cursor-pointer">
                <div className="p-3 bg-orange-200 rounded-lg">
                  <FaShoppingBag className="text-orange-800" />
                </div>
                <div className="pl-4">
                  <p className="font-bold text-gray-800">￡{user.amountPaid}</p>
                  <p className="text-sm text-gray-400">{user.instituteName}</p>
                </div>
                <p className="lg:flex md:hidden right-6 absolute text-sm">
                  {user.datePurchased?.toLocaleString("en-GB").substring(0, 10)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;
