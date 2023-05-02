import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../axios/userApi";
import Loading from "../basic/Loading";
import Link from "next/link";

const OrdersList = () => {
  const {
    isLoading,
    isError,
    data: orders,
  } = useQuery(["orders"], getAllOrders);

  console.log(orders);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h3>Something went wrong!</h3>;
  }
  if (orders.length === 0) {
    return <h3>No data found!</h3>;
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h2 className="p-4 text-2xl">Orders List</h2>
      <div className="w-full p-4 overflow-y-auto bg-white border rounded-lg">
        <div className="md:grid-cols-8 sm:grid-cols-3 grid items-center justify-between grid-cols-2 gap-4 p-2 my-3 font-semibold">
          <span>Order No / Date</span>
          <span className="sm:text-left text-right">Name & Mob No</span>
          <span className="md:grid hidden">Total</span>
          <span className="sm:grid hidden">Discount</span>
          <span className="sm:grid hidden">Paid</span>
          <span className="sm:grid hidden">Balance</span>
          <span className="sm:grid hidden">Due Date</span>
          <span className="sm:grid hidden">Actions</span>
        </div>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <div className="bg-gray-50 hover:bg-gray-100 grid items-center justify-between grid-cols-8 gap-4 p-2 my-3 text-sm rounded-lg">
                <div className="flex">
                  <div className="p-3 bg-orange-200 rounded-lg">
                    <FaShoppingBag className="text-orange-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-cyan-600 text-sm font-semibold cursor-pointer">
                      Order Id: {order.id}
                    </p>
                    <p className=" text-xs text-gray-800">{order.orderDate}</p>
                  </div>
                </div>
                <p className="sm:text-left text-right text-gray-600">
                  <Link
                    href={`user/${order.userId}`}
                    className="text-cyan-600 block cursor-pointer"
                  >
                    {/* REVIEW: added institute name & phone extra in order page */}
                    {order?.instituteName}
                  </Link>
                  <span className="block">{order?.phone1}</span>
                </p>
                <p className="md:flex hidden">￡{order.totalAmount}</p>
                <p className="md:flex hidden">￡{order.totalDiscount}</p>
                <p className="md:flex hidden">￡{order.paidAmount}</p>
                <p
                  className={`${
                    order.dueAmount > 0
                      ? "bg-red-100 text-red-600 p-1 rounded-md"
                      : ""
                  }`}
                >
                  ￡{order.dueAmount > 0 ? order.dueAmount : "N/A"}
                </p>
                <p className="md:flex hidden">
                  {order.dueAmount > 0 ? order.dueDate : "N/A"}
                </p>
                <div className="sm:flex items-center justify-between hidden">
                  <BsThreeDotsVertical />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrdersList;
