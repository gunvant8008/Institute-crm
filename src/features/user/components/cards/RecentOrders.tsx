import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import { Order } from "../../types/userTypes";

type RecentOrdersProps = {
  recentOrders: Order[] | undefined;
};

const RecentOrders = ({ recentOrders }: RecentOrdersProps) => {
  return (
    <div className="w-full relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1>Recent Orders</h1>
      <ul>
        {recentOrders?.map((order) => (
          <li key={order.id}>
            <Link href={`/user/${order.userId}`}>
              <div className="bg-gray-50 hover:bg-gray-100 flex items-center p-2 my-3 rounded-lg cursor-pointer">
                <div className="p-3 bg-orange-200 rounded-lg">
                  <FaShoppingBag className="text-orange-800" />
                </div>
                <div className="pl-4">
                  <p className="font-bold text-gray-800">
                    ￡{order.paidAmount}
                  </p>
                  <p className="text-sm text-gray-400">
                    User Id: {order.userId}
                  </p>
                </div>
                <p className="lg:flex md:hidden right-6 absolute text-sm">
                  {order.orderDate}
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
