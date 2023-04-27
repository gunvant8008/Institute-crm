import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getAllProducts, getUser } from "../../axios/userApi";
import Link from "next/link";
import { TextFieldWithLabel } from "../basic/TextFieldWithLabel";
import { Product } from "../../types/userTypes";
import { FaProductHunt } from "react-icons/fa";
import { useForm } from "react-hook-form";

type SingleProductProps = {
  product: Product;
  register?: unknown;
};

export const SingleProduct = ({ product, register }: SingleProductProps) => {
  const [selected, setSelected] = useState(false);
  return (
    <div className="bg-gray-50 hover:bg-gray-100 grid grid-cols-5 p-2 my-3 rounded-lg">
      <div className="flex">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => setSelected(!selected)}
          className="p-1 m-2"
        />
        <div className="p-3 bg-orange-200 rounded-lg">
          <FaProductHunt className="text-orange-800" />
        </div>
        <div className="pl-4">
          <p className="font-bold text-gray-800">
            ￡{product.productPrice?.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Id:{product.id}</p>
        </div>
      </div>
      <p className="sm:text-left text-right text-gray-600">
        <span>{product.productName}</span>
      </p>
      <p className="md:flex hidden">{product.validityInMonths}</p>
      <div className="sm:flex items-center justify-between hidden">
        <input
          name="Discount"
          placeholder="0"
          type="number"
          className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
          disabled={selected === false}
          {...register("discount")}
        />
      </div>
      <div className="">
        <input
          name="validityFrom"
          type="date"
          className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
          disabled={selected === false}
          {...register("validityFrom")}
        />
      </div>
    </div>
  );
};

const NewOrder = ({ id }: { id: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    isLoading,
    isError,
    data: userData,
  } = useQuery(["user", id.toString()], () => (id ? getUser(id) : null));

  const { data: products } = useQuery(["products"], () => getAllProducts());
  if (isError) {
    return (
      <div className="flex items-center justify-center gap-4 mt-10">
        <p>Something went wrong!</p>
        <Link className="self-center p-2 bg-teal-800" href="/list">
          Try again{" "}
        </Link>
      </div>
    );
  }

  if (isLoading || !userData) {
    return <h2>Loading...</h2>;
  }

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-y-10 flex flex-col items-center p-8 bg-gray-100">
        <h2 className="p-4 text-2xl text-center">New Order</h2>
        <div
          className=" bg-gray-200 p-8 rounded-xl shadow-lg flex flex-col gap-4 w-[70vw]"
          // REVIEW: Typescript error removed after adding void
          //  onSubmit={handleSubmit(onSubmit)}
        >
          {/* User detail section */}
          <div>
            <div className=" flex flex-wrap items-start gap-10">
              <TextFieldWithLabel
                labelText="Id"
                inputType="number"
                //  placeholder={userData.id.toString()}
                defaultValue={userData.id.toString()}
                readOnly
                className="p-1 text-gray-400 rounded-md"
                inputProps={register("userId")}
              />
              <TextFieldWithLabel
                labelText="Institute Name"
                inputType="text"
                defaultValue={userData.instituteName}
                readOnly
                //  error={errors.instituteName?.message as string}
                //   inputProps={register("instituteName")}
              />
              <TextFieldWithLabel
                labelText="Owner's Name"
                inputType="text"
                placeholder={userData.ownersName}
                readOnly
                //  error={errors.ownersName?.message as string}
                //  inputProps={register("ownersName")}
              />
              <TextFieldWithLabel
                labelText="Manager's Name"
                inputType="text"
                placeholder={userData.managersName}
                readOnly
                //  error={errors.managersName?.message as string}
                //  inputProps={register("managersName")}
              />

              <TextFieldWithLabel
                labelText="Phone"
                inputType="number"
                placeholder={userData.phone1}
                readOnly
                //  error={errors.phone1?.message as string}
                //  inputProps={register("phone1")}
              />

              <TextFieldWithLabel
                labelText="Email"
                inputType="email"
                placeholder={userData.email}
                readOnly
                //  error={errors.email?.message as string}
                //  inputProps={register("email")}
              />

              <div className="flex items-start w-full gap-10">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Lead Type
                  <input
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder={userData.leadType}
                    readOnly
                  ></input>
                </label>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Lead Source
                  <input
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder={userData.leadSource}
                    readOnly
                  ></input>
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Add products section */}
        <div className="flex flex-col w-full gap-4 p-8">
          <h2 className="text-2xl text-gray-600">Add Products/Services</h2>
          <div className="grid grid-cols-5 font-semibold">
            <span>Price</span>
            <span>Name</span>
            <span>Validity</span>
            <span>Discount</span>
            <span>Start From</span>
          </div>
          <ul>
            {products?.map((product: Product) => (
              <li key={product.id}>
                <SingleProduct register={register} product={product} />
              </li>
            ))}
          </ul>
        </div>
        {/* order details section */}
        <div className="flex flex-wrap justify-between w-full px-20">
          {/* Left section */}
          <div className="flex flex-col text-gray-600 divide-y-2">
            <div className="gap-y-3 flex flex-col py-4">
              <p>Payment Mode*</p>
              <div className="flex gap-4" {...register("paymentMode")}>
                <label className="flex gap-1">
                  <input checked type="radio" {...register("paymentMode")} />
                  Online
                </label>
                <label className="flex gap-1">
                  <input type="radio" {...register("paymentMode")} />
                  Wallet
                </label>
                <label className="flex gap-1">
                  <input type="radio" {...register("paymentMode")} />
                  Cheque
                </label>
                <label className="flex gap-1">
                  <input type="radio" {...register("paymentMode")} />
                  Cash
                </label>
              </div>
            </div>
            <div className=" py-4">
              <label className="flex items-center gap-4">
                Paid By
                <input
                  type="text"
                  className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                  {...register("paidBy")}
                />
              </label>
            </div>

            <div className="gap-y-3 flex flex-col py-4">
              <p>Receiving Account</p>
              <div className="flex gap-4">
                <label className="flex gap-1">
                  <input type="radio" {...register("receivingAccount")} />
                  Account 1
                </label>
                <label className="flex gap-1">
                  <input type="radio" {...register("receivingAccount")} />
                  Account 2
                </label>
                <label className="flex gap-1">
                  <input type="radio" {...register("receivingAccount")} />
                  Account 3
                </label>
                <label className="flex gap-1">
                  <input type="radio" {...register("receivingAccount")} />
                  Account 4
                </label>
              </div>
            </div>
          </div>
          {/* Right section */}
          <div className="flex flex-col justify-between text-gray-600 divide-y-2 min-w-[25rem] ">
            <div className=" py-4">
              <label className="flex items-center justify-between gap-4">
                Total Amount
                <input
                  type="number"
                  className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                  {...register("totalAmount")}
                />
              </label>
            </div>
            <div className=" py-4">
              <label className="flex items-center justify-between gap-4">
                Total Discount
                <input
                  type="number"
                  className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                  {...register("totalDiscount")}
                />
              </label>
            </div>
            <div className=" py-4">
              <label className="flex items-center justify-between gap-4">
                payableAmount
                <input
                  type="number"
                  className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                  {...register("payableAmount")}
                />
              </label>
            </div>
            <div className=" py-4">
              <label className="flex items-center justify-between gap-4">
                Paid Amount
                <input
                  type="text"
                  className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                  {...register("paidAmount")}
                />
              </label>
            </div>
            <div className=" py-4">
              <label className="flex items-center justify-between gap-4">
                Due Amount
                <input
                  type="text"
                  className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                  {...register("dueAmount")}
                />
              </label>
            </div>
            <div className=" py-4">
              <label className="flex items-center justify-between gap-4">
                Due Date
                <input
                  type="date"
                  className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                  {...register("dueDate")}
                />
              </label>
            </div>
            <div className=" py-4">
              <label className="flex items-center justify-between gap-4">
                Order Date
                <input
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                  {...register("orderDate")}
                />
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="p-2 bg-blue-200 rounded-md">
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewOrder;
