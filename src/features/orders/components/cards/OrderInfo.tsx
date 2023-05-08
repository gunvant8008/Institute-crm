import Link from "next/link";
import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { Order } from "../../types/orderTypes";

type OrderInfoProps = {
  order: Order;
};

const OrderInfo = ({ order }: OrderInfoProps) => {
  return (
    <div className="grid grid-cols-9 gap-8 text-sm">
      <div className="flex">
        <div className="pl-2">
          <FaShoppingBag className=" text-orange-800" />
          <Link
            href={`/orders/${order.id}`}
            className="text-cyan-600 text-sm font-semibold cursor-pointer"
          >
            Order Id: {order.id}
          </Link>
          <p className=" text-xs text-gray-800">{order.orderDate}</p>
        </div>
      </div>
      <ul className="gap-y-2 flex flex-col">
        {order.products.map((product) => {
          if (product?.isSelected) {
            return (
              <li key={product.id} className="flex flex-col">
                <span className="font-semibold"> {product.productName}</span>
                <span className=" text-xs text-gray-600">
                  {" "}
                  From: {product.validityFrom}
                </span>
                <span className=" text-xs text-gray-600">
                  {" "}
                  Until: {product.validityUntil}
                </span>
              </li>
            );
          }
        })}
      </ul>
      <p>￡{order.totalAmount}</p>
      <p>￡{order.totalDiscount}</p>
      <p>￡{order.paidAmount}</p>
      <p>￡{order.dueAmount}</p>
      <p>{order.dueDate}</p>
      <p>{order.paymentMode}</p>
      <p>{order.paidBy}</p>
    </div>
  );
};

export default OrderInfo;
