import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getAllProducts, getUser } from "../../axios/userApi";
import Link from "next/link";
import { TextFieldWithLabel } from "../basic/TextFieldWithLabel";
import { Product, ProductInOrder } from "../../types/userTypes";
import { FaProductHunt } from "react-icons/fa";
import { useForm, useFormState } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormRegister, FieldValues, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const NewOrderSchema = z.object({
  userId: z.number(),
  products: z.array(
    z.object({
      id: z.number(),
      isSelected: z.boolean(),
      productName: z.string(),
      productPrice: z.number(),
      validityInMonths: z.number(),
      discount: z.number(),
      validityFrom: z.string(),
      validityUntil: z.string(),
    }),
  ),
  totalAmount: z.number(),
  totalDiscount: z.number(),
  payableAmount: z.number(),
  paidAmount: z.number(),
  dueAmount: z.number(),
  dueDate: z.string(),
  orderDate: z.string(),
  paymentMode: z.string(),
  paidBy: z.string(),
  receivingAccount: z.string(),
});

type TNewOrderSchema = z.infer<typeof NewOrderSchema>;

const NewOrder = ({ id }: { id: number }) => {
  const {
    register,
    watch,
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TNewOrderSchema>({
    resolver: zodResolver(NewOrderSchema),
    defaultValues: {
      userId: id,
      products: [],
      totalAmount: 0,
      totalDiscount: 0,
      payableAmount: 0,
      paidAmount: 0,
      dueAmount: 0,
      dueDate: "",
      orderDate: new Date().toISOString().split("T")[0],
      paymentMode: "",
      paidBy: "",
      receivingAccount: "",
    },
  });

  const productsFormState = getValues("products");

  function calculateOrderValues() {
    if (!productsFormState || !productsFormState.length)
      return {
        totalAmount: 0,
        totalDiscount: 0,
        payableAmount: 0,
        paidAmount: 0,
        dueAmount: 0,
      };
    let totalAmount = parseInt(getValues("totalAmount").toString());
    let totalDiscount = parseInt(getValues("totalDiscount").toString());
    let payableAmount = parseInt(getValues("payableAmount").toString());

    const paidAmount = parseInt(getValues("paidAmount").toString());
    let dueAmount = parseInt(getValues("dueAmount").toString());
    productsFormState.forEach((product) => {
      if (product.isSelected) {
        totalAmount += parseInt(product.productPrice.toString());
        totalDiscount += parseInt(product?.discount?.toString() || "0");
      }
    });
    payableAmount = totalAmount - totalDiscount;
    dueAmount = payableAmount - paidAmount;
    return { totalAmount, totalDiscount, payableAmount, paidAmount, dueAmount };
  }
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
  const onSubmit = (data: TNewOrderSchema) => {
    console.log(data);
    // mutate(data)
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-y-10 flex flex-col items-center p-8 bg-gray-100">
          <h2 className="p-4 text-2xl text-center">New Order</h2>
          <div className=" bg-gray-200 p-8 rounded-xl shadow-lg flex flex-col gap-4 w-[70vw]">
            {/* User detail section */}
            <div>
              <div className=" flex flex-wrap items-start gap-10">
                <input
                  className="p-1 text-gray-400 rounded-md"
                  readOnly
                  type="number"
                  {...register("userId")}
                  defaultValue={id}
                />
                <TextFieldWithLabel
                  labelText="Institute Name"
                  inputType="text"
                  defaultValue={userData.instituteName}
                  readOnly
                />
                <TextFieldWithLabel
                  labelText="Owner's Name"
                  inputType="text"
                  placeholder={userData.ownersName}
                  readOnly
                />
                <TextFieldWithLabel
                  labelText="Manager's Name"
                  inputType="text"
                  placeholder={userData.managersName}
                  readOnly
                />

                <TextFieldWithLabel
                  labelText="Phone"
                  inputType="number"
                  placeholder={userData.phone1}
                  readOnly
                />
                <TextFieldWithLabel
                  labelText="Email"
                  inputType="email"
                  placeholder={userData.email}
                  readOnly
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
            {/* Products Section- coming from api */}
            <ul>
              {products?.map((product: Product, index) => (
                <li key={product.id}>
                  <div className="bg-gray-50 hover:bg-gray-100 grid grid-cols-5 p-2 my-3 rounded-lg">
                    <div className="flex">
                      <input
                        type="checkbox"
                        {...register(`products.${index}.isSelected`)}
                        className="p-1 m-2"
                      />
                      <div className="p-3 bg-orange-200 rounded-lg">
                        <FaProductHunt className="text-orange-800" />
                      </div>
                      <div className="pl-4">
                        <label className="flex font-bold text-gray-800">
                          ￡
                          <input
                            type="number"
                            className=" w-13 font-bold text-gray-800"
                            readOnly
                            defaultValue={product.productPrice}
                            {...register(`products.${index}.productPrice`, {
                              valueAsNumber: true,
                            })}
                          />
                        </label>
                        <label className=" w-fit text-sm text-gray-500">
                          Id:
                          <input
                            type="number"
                            className="w-4 text-sm text-gray-500"
                            readOnly
                            defaultValue={product.id}
                            {...register(`products.${index}.id`, {
                              valueAsNumber: true,
                            })}
                          />
                        </label>
                      </div>
                    </div>

                    <input
                      type="text"
                      className="text-gray-600"
                      readOnly
                      value={product.productName}
                      {...register(`products.${index}.productName`)}
                    />

                    <input
                      type="number"
                      className="text-gray-600"
                      readOnly
                      value={product.validityInMonths}
                      {...register(`products.${index}.validityInMonths`, {
                        valueAsNumber: true,
                      })}
                    />

                    <input
                      placeholder="0"
                      disabled={!getValues(`products.${index}.isSelected`)}
                      type="number"
                      className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                      {...register(`products.${index}.discount`, {
                        valueAsNumber: true,
                      })}
                    />

                    <input
                      type="date"
                      disabled={!getValues(`products.${index}.isSelected`)}
                      className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                      {...register(`products.${index}.validityFrom`, {
                        valueAsNumber: true,
                      })}
                    />
                    <input
                      type="date"
                      className="hidden"
                      readOnly
                      value={new Date().toISOString().slice(0, 10)}
                      {...register(`products.${index}.validityUntil`)}
                    />
                  </div>
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
                <div className="flex gap-4">
                  <label className="flex gap-1">
                    <input
                      type="radio"
                      value="Online"
                      {...register("paymentMode")}
                    />
                    Online
                  </label>
                  <label className="flex gap-1">
                    <input
                      type="radio"
                      value="Wallet"
                      {...register("paymentMode")}
                    />
                    Wallet
                  </label>
                  <label className="flex gap-1">
                    <input
                      type="radio"
                      value="Cheque"
                      {...register("paymentMode")}
                    />
                    Cheque
                  </label>
                  <label className="flex gap-1">
                    <input
                      type="radio"
                      value="Cash"
                      {...register("paymentMode")}
                    />
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
                    <input
                      type="radio"
                      value="Account 1"
                      {...register("receivingAccount")}
                    />
                    Account 1
                  </label>
                  <label className="flex gap-1">
                    <input
                      type="radio"
                      value="Account 2"
                      {...register("receivingAccount")}
                    />
                    Account 2
                  </label>
                  <label className="flex gap-1">
                    <input
                      type="radio"
                      value="Account 3"
                      {...register("receivingAccount")}
                    />
                    Account 3
                  </label>
                  <label className="flex gap-1">
                    <input
                      type="radio"
                      value="Account 4"
                      {...register("receivingAccount")}
                    />
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
                    value={calculateOrderValues().totalAmount}
                    disabled
                    className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                    {...register("totalAmount", { valueAsNumber: true })}
                  />
                </label>
              </div>
              <div className=" py-4">
                <label className="flex items-center justify-between gap-4">
                  Total Discount
                  <input
                    type="number"
                    value={calculateOrderValues().totalDiscount}
                    disabled
                    className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                    {...register("totalDiscount", { valueAsNumber: true })}
                  />
                </label>
              </div>
              <div className=" py-4">
                <label className="flex items-center justify-between gap-4">
                  payableAmount
                  <input
                    disabled
                    value={calculateOrderValues().payableAmount}
                    type="number"
                    className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                    {...register("payableAmount", { valueAsNumber: true })}
                  />
                </label>
              </div>
              <div className=" py-4">
                <label className="flex items-center justify-between gap-4">
                  Paid Amount
                  <input
                    value={calculateOrderValues().paidAmount}
                    type="text"
                    className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                    {...register("paidAmount", { valueAsNumber: true })}
                  />
                </label>
              </div>
              <div className=" py-4">
                <label className="flex items-center justify-between gap-4">
                  Due Amount
                  <input
                    type="text"
                    value={calculateOrderValues().dueAmount}
                    disabled
                    className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                    {...register("dueAmount", { valueAsNumber: true })}
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
      <DevTool control={control} />
    </>
  );
};
export default NewOrder;
