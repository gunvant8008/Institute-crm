import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUser } from "../../../user/axios/userApi";
import Link from "next/link";
import { getOrder } from "../../axios/ordersApi";
import Loading from "@/AppComponents/basic/Loading";
import { ProductInOrder } from "@/features/product/types/productTypes";
import ProductInfo from "@/features/product/components/cards/ProductInfo";
import TermsAndConditions from "../cards/TermsAndConditions";

export const OrderDetails = ({ id }: { id: number }) => {
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery(["order", id], () => (id ? getOrder(id) : null));

  const { data: user } = useQuery(["user", order?.userId], () =>
    order?.userId ? getUser(order?.userId) : null,
  );

  if (isError) {
    return <h2>Something went wrong!</h2>;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="py-14 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto px-4">
        <div className="item-start flex justify-between space-y-2">
          <div>
            <h1 className="lg:text-4xl lg:leading-9 text-3xl font-semibold leading-7 text-gray-800">
              Order #{order?.id}
            </h1>
            <h1 className="lg:text-xl lg:leading-9 text-3xl font-semibold leading-7 text-gray-800">
              User Id #{order?.userId}
            </h1>
          </div>
          <p className="text-base font-medium leading-6 text-gray-600">
            Date: {order?.orderDate}
          </p>
          <div className="flex flex-col text-base font-medium leading-6 text-gray-600">
            <span className="font-semibold">Support</span>
            <span className="text-sm">📧 info@igyanam.com</span>
            <span className="text-sm">📞 +91-9999999999</span>
          </div>
        </div>
        <div className="xl:flex-row xl:space-x-8 md:space-y-6 xl:space-y-0 flex flex-col items-stretch justify-center w-full mt-10 space-y-4">
          <div className="md:space-y-6 xl:space-y-8 flex flex-col items-start justify-start w-full space-y-4">
            <div className="bg-gray-50 md:py-6 md:p-6 xl:p-8 flex flex-col items-start justify-start w-full space-y-2">
              <p className="md:text-xl xl:leading-5 text-lg font-semibold leading-6 text-gray-600">
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
                {order?.products?.map((product: ProductInOrder) => {
                  if (product?.isSelected)
                    return (
                      <li
                        key={product.id}
                        className="w-full p-2 bg-gray-100 rounded-md shadow-md"
                      >
                        <ProductInfo product={product} />
                      </li>
                    );
                })}
              </ul>
            </div>
            <div className="md:flex-row md:space-y-0 md:space-x-6 xl:space-x-8 flex flex-col items-stretch justify-center w-full space-y-4">
              <div className="md:p-6 xl:p-8 bg-gray-50 flex flex-col w-full px-4 py-6 space-y-6">
                <h3 className="text-xl font-semibold leading-5 text-gray-600">
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
                      Total Discount
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
              <TermsAndConditions />
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
                      Institute: {user?.instituteName}
                    </p>
                    <p className="text-sm leading-4 text-left text-gray-800">
                      Owner: {user?.ownersName}
                    </p>
                    <p className="text-sm leading-4 text-left text-gray-800">
                      Manager: {user?.managersName}
                    </p>
                  </div>
                </div>

                <div className="md:justify-start flex items-center justify-center w-full py-4 space-x-4 border-b border-gray-200">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm leading-5 text-gray-800 cursor-pointer">
                      ✉️ {user?.email}
                    </p>
                    <p className="text-sm leading-5 text-gray-600">
                      📞 {user?.phone1}
                    </p>
                    <p className="text-sm leading-5 text-gray-600">
                      📞 {user?.phone2}
                    </p>
                  </div>
                </div>
              </div>
              <div className="xl:h-full md:mt-0 flex flex-col items-stretch justify-between w-full mt-6">
                <div className="md:justify-start xl:flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 xl:space-y-12 md:space-y-0 md:flex-row md:items-start flex flex-col items-center justify-center space-y-4">
                  <div className="md:justify-start md:items-start flex flex-col items-center justify-center pt-4 space-y-2">
                    <p className="md:text-left text-base font-semibold leading-4 text-center text-gray-800">
                      Address
                    </p>
                    <p className="lg:w-full xl:w-48 md:text-left w-48 text-sm leading-5 text-center text-gray-600">
                      {user?.address}
                    </p>
                  </div>
                </div>
                <div className="md:justify-start md:items-start flex items-center justify-center w-full">
                  <Link
                    href={`/edituser/${user?.id as number}`}
                    className="p-3 text-gray-800 border border-gray-800"
                  >
                    Edit Customer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};