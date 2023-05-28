import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { OrderList } from "../../types/orderTypes";
import Link from "next/link";
import ButtonLink from "@/AppComponents/basic/ButtonLink";

type OrderProps = {
  order: OrderList;
};

const Order = ({ order }: OrderProps) => {
  return (
    <div className="grid items-center justify-between grid-cols-3 gap-4 p-2 my-3 text-sm rounded-lg bg-gray-50 hover:bg-gray-100 lg:grid-cols-8">
      <div className="flex">
        <div className="p-3 bg-orange-200 rounded-lg">
          <FaShoppingBag className="text-orange-800" />
        </div>
        <div className="pl-4">
          <Link
            href={`/orders/${order.id}`}
            className="text-sm font-semibold cursor-pointer text-cyan-600"
          >
            Order Id: {order.id}
          </Link>
          <p className="text-xs text-gray-800 ">{order.orderDate}</p>
        </div>
      </div>
      <p className="text-right text-gray-600 sm:text-left">
        <Link
          href={`user/${order.userId}`}
          className="block cursor-pointer text-cyan-600"
        >
          {order?.instituteName}
        </Link>
        <span className="block">{order?.phone1}</span>
      </p>
      <p className="hidden lg:flex">￡{order.totalAmount}</p>
      <p className="hidden lg:flex">￡{order.totalDiscount}</p>
      <p className="hidden lg:flex">￡{order.paidAmount}</p>
      <p
        className={`${
          order.dueAmount > 0
            ? "bg-red-100 text-red-600 p-1 rounded-md lg:flex hidden"
            : "lg:flex hidden"
        }`}
      >
        ￡{order.dueAmount > 0 ? order.dueAmount : "N/A"}
      </p>
      <p className="hidden lg:flex">
        {order.dueAmount > 0 ? order.dueDate : "N/A"}
      </p>
      <div>
        <ButtonLink
          href={`/orders/edit/${order.id}`}
          variant="dark"
          className={`${order.dueAmount > 0 ? "inline-block" : "hidden"}`}
        >
          Pay Balance
        </ButtonLink>
      </div>
    </div>
  );
};

export default Order;
