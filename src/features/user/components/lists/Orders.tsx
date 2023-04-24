import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { data } from "../../../../data/data";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../axios/userApi";
import Loading from "../basic/Loading";
import Link from "next/link";

const Orders = () => {
  const { isLoading, isError, data: users } = useQuery(["users"], getUsers);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h3>Something went wrong!</h3>;
  }
  if (users.length === 0) {
    return <h3>No data found!</h3>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <div className="w-full p-4 m-auto overflow-y-auto bg-white border rounded-lg">
          <div className="md:grid-cols-4 sm:grid-cols-3 grid items-center justify-between grid-cols-2 p-2 my-3 cursor-pointer">
            <span>Order</span>
            <span className="sm:text-left text-right">Status</span>
            <span className="md:grid hidden">Order Date</span>
            <span className="sm:grid hidden">Due Date</span>
          </div>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <Link href={`/user/${user.id}`}>
                  <div className="bg-gray-50 hover:bg-gray-100 md:grid-cols-4 sm:grid-cols-3 grid items-center justify-between grid-cols-2 p-2 my-3 rounded-lg cursor-pointer">
                    <div className="flex">
                      <div className="p-3 bg-orange-200 rounded-lg">
                        <FaShoppingBag className="text-orange-800" />
                      </div>
                      <div className="pl-4">
                        <p className="font-bold text-gray-800">
                          ￡{user.amountPaid.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-800">
                          {user.instituteName}
                        </p>
                      </div>
                    </div>
                    <p className="sm:text-left text-right text-gray-600">
                      <span
                        className={
                          user.amountDue === 0
                            ? "bg-blue-200 p-2 rounded-lg"
                            : "bg-red-200 p-2 rounded-lg"
                        }
                      >
                        {user.amountDue === 0
                          ? "Completed"
                          : `Due:￡${user.amountDue.toLocaleString()}`}
                      </span>
                    </p>
                    <p className="md:flex hidden">
                      {new Date(user.datePurchased).toLocaleDateString()}
                    </p>
                    <div className="sm:flex items-center justify-between hidden">
                      <p>{new Date(user.dueDate).toLocaleDateString()}</p>
                      <BsThreeDotsVertical />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Orders;
