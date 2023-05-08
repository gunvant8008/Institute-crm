import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../axios/ordersApi";
import Loading from "@/AppComponents/basic/Loading";
import Order from "../cards/Order";

const OrdersList = () => {
  const {
    isLoading,
    isError,
    data: orders,
  } = useQuery(["orders"], getAllOrders);

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
        <div className="lg:grid-cols-8 grid items-center justify-between grid-cols-3 gap-4 p-2 my-3 font-semibold">
          <span>Order No / Date</span>
          <span>Name & Mob No</span>
          <span className="lg:grid hidden">Total</span>
          <span className="lg:grid hidden">Discount</span>
          <span className="lg:grid hidden">Paid</span>
          <span className="lg:grid hidden">Balance</span>
          <span className="lg:grid hidden">Due Date</span>
          <span>Actions</span>
        </div>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <Order order={order} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrdersList;
