import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { getOrder } from "../../axios/userApi";
import { ProductInOrder } from "../../types/userTypes";
import { FaProductHunt } from "react-icons/fa";

export const OrderDetails = ({ id }: { id: number }) => {
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery(["order", id], () => (id ? getOrder(id) : null));
  console.log(order, isLoading, isError);

  return (
    <div>
      <div className="py-14 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto px-4">
        <div className="item-start flex flex-col justify-start space-y-2">
          <h1 className="lg:text-4xl lg:leading-9 text-3xl font-semibold leading-7 text-gray-800">
            Order #{order?.id}
          </h1>
          <h1 className="lg:text-xl lg:leading-9 text-3xl font-semibold leading-7 text-gray-800">
            User Id #{order?.userId}
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600">
            {order?.orderDate}
          </p>
        </div>
        <div className="xl:flex-row xl:space-x-8 md:space-y-6 xl:space-y-0 flex flex-col items-stretch justify-center w-full mt-10 space-y-4">
          <div className="md:space-y-6 xl:space-y-8 flex flex-col items-start justify-start w-full space-y-4">
            <div className="bg-gray-50 md:py-6 md:p-6 xl:p-8 flex flex-col items-start justify-start w-full px-4 py-4">
              <p className="md:text-xl xl:leading-5 text-lg font-semibold leading-6 text-gray-800">
                Products
              </p>
              <div className="gap-x-8 grid w-full grid-cols-6 font-semibold">
                <span>Price</span>
                <span>Name</span>
                <span>Validity</span>
                <span>Discount</span>
                <span>Validity From</span>
                <span>Validity Until</span>
              </div>

              <ul className="flex flex-col w-full gap-8 py-8">
                {order?.products?.map((product: ProductInOrder) => (
                  <li key={product.id} className="w-full">
                    <div className="gap-x-8 grid grid-cols-6">
                      <div className="flex">
                        <div className="p-3 bg-orange-200 rounded-lg">
                          <FaProductHunt className="text-orange-800" />
                        </div>
                        <div className="flex flex-col pl-4">
                          <span>￡{product.productPrice}</span>
                          <span>Id:{product.id}</span>
                        </div>
                      </div>
                      <p>{product.productName}</p>

                      <p>{product.validityInMonths}</p>
                      <p>{product.discount}</p>
                      <p>{product.validityFrom}</p>
                      <p>{product.validityUntil}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:flex-row md:space-y-0 md:space-x-6 xl:space-x-8 flex flex-col items-stretch justify-center w-full space-y-4">
              <div className="md:p-6 xl:p-8 bg-gray-50 flex flex-col w-full px-4 py-6 space-y-6">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex flex-col items-center justify-center w-full pb-4 space-y-4 border-b border-gray-200">
                  <div className="flex justify-between w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Total Amount
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      ￡{order?.totalAmount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Total Discount{" "}
                      <span className="p-1 text-xs font-medium leading-3 text-gray-800 bg-gray-200">
                        REFERRAL
                      </span>
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      ￡ {order?.totalDiscount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Payable Amount
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      ￡{order?.payableAmount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Paid Amount
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      ￡{order?.paidAmount}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">
                    Due Amount
                  </p>
                  <p className="text-base font-semibold leading-4 text-gray-600">
                    ￡{order?.dueAmount}
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">
                    Due Date
                  </p>
                  <p className="text-base font-semibold leading-4 text-gray-600">
                    {order?.dueAmount !== undefined
                      ? order?.dueAmount > 0
                        ? order?.dueDate
                        : "N/A"
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="md:p-6 xl:p-8 bg-gray-50 flex flex-col justify-center w-full px-4 py-6 space-y-6">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex flex-col items-center justify-start">
                      <p className="text-lg font-semibold leading-6 text-gray-800">
                        DPD Delivery
                        <br />
                        <span className="font-normal">
                          Delivery with 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 text-gray-800">
                    $8.00
                  </p>
                </div>
                <div className="flex items-center justify-center w-full">
                  <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 w-96 md:w-full py-5 text-base font-medium leading-4 text-white bg-gray-800">
                    View Carrier Details
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 xl:w-96 md:items-start md:p-6 xl:p-8 flex flex-col items-center justify-between w-full px-4 py-6">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="md:flex-row xl:flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 flex flex-col items-stretch justify-start w-full h-full">
              <div className="flex flex-col items-start justify-start flex-shrink-0">
                <div className="md:justify-start flex items-center justify-center w-full py-8 space-x-4 border-b border-gray-200">
                  <div className=" flex flex-col items-start justify-start space-y-2">
                    <p className="text-base font-semibold leading-4 text-left text-gray-800">
                      David Kent
                    </p>
                    <p className="text-sm leading-5 text-gray-600">
                      10 Previous Orders
                    </p>
                  </div>
                </div>

                <div className="md:justify-start flex items-center justify-center w-full py-4 space-x-4 border-b border-gray-200">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-sm leading-5 text-gray-800 cursor-pointer">
                    david89@gmail.com
                  </p>
                </div>
              </div>
              <div className="xl:h-full md:mt-0 flex flex-col items-stretch justify-between w-full mt-6">
                <div className="md:justify-start xl:flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 xl:space-y-12 md:space-y-0 md:flex-row md:items-start flex flex-col items-center justify-center space-y-4">
                  <div className="md:justify-start md:items-start xl:mt-8 flex flex-col items-center justify-center space-y-4">
                    <p className="md:text-left text-base font-semibold leading-4 text-center text-gray-800">
                      Shipping Address
                    </p>
                    <p className="lg:w-full xl:w-48 md:text-left w-48 text-sm leading-5 text-center text-gray-600">
                      180 North King Street, Northhampton MA 1060
                    </p>
                  </div>
                  <div className="md:justify-start md:items-start flex flex-col items-center justify-center space-y-4">
                    <p className="md:text-left text-base font-semibold leading-4 text-center text-gray-800">
                      Billing Address
                    </p>
                    <p className="lg:w-full xl:w-48 md:text-left w-48 text-sm leading-5 text-center text-gray-600">
                      180 North King Street, Northhampton MA 1060
                    </p>
                  </div>
                </div>
                <div className="md:justify-start md:items-start flex items-center justify-center w-full">
                  <button className="md:mt-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 w-96 2xl:w-full py-5 mt-6 text-base font-medium leading-4 text-gray-800 border border-gray-800">
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    </div>
  );
};
