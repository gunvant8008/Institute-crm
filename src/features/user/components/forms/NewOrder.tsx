import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { addOrder, getAllProducts, getUser } from "../../axios/userApi";
import Link from "next/link";
import { TextFieldWithLabel } from "../basic/TextFieldWithLabel";
import { Order, Product, ProductInOrder } from "../../types/userTypes";
import { FaProductHunt } from "react-icons/fa";
import { UseFormSetValue, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useFieldArray } from "react-hook-form";

// const NewOrderSchema = z.object({
//   userId: z.number(),
//   products: z.array(
//     z
//       .object({
//         id: z.number(),
//         isSelected: z.boolean(),
//         productName: z.string(),
//         productPrice: z.number(),
//         validityInMonths: z.number(),
//         //REVIEW: only want these optional when isSelected is false
//         discount: z
//         .number()
//         .optional()
//         .refine((val, data) => data.isSelected || val === undefined, {
//           message: 'Discount must be provided when isSelected is true'
//         }),
//       validityFrom: z
//         .string()
//         .optional()
//         .refine((val, data) => data.isSelected || val === undefined, {
//           message: 'Validity From must be provided when isSelected is true'
//         }),
//         validityUntil: z.string()
//       })
//   ),
//   totalAmount: z.number(),
//   totalDiscount: z.number(),
//   payableAmount: z.number(),
//   paidAmount: z.number(),
//   dueAmount: z.number(),
//   dueDate: z.string(),
//   orderDate: z.string(),
//   paymentMode: z.string(),
//   paidBy: z.string(),
//   receivingAccount: z.string()
// })

const ProductSchema = z.object({
  id: z.number(),
  isSelected: z.boolean().optional(),
  productName: z.string(),
  productPrice: z.number(),
  validityInMonths: z.number(),
  discount: z
    .number()
    .optional()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .refine((val, data) => !data?.isSelected || val !== undefined, {
      message: "Discount must be provided when Product is selected.",
    }),
  validityFrom: z
    .string()
    .optional()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .refine((val, data) => !data?.isSelected || val !== undefined, {
      message: "Validity From must be provided when Product is selected.",
    }),
  validityUntil: z.string(),
});

const NewOrderSchema = z.object({
  userId: z.number(),
  products: z.array(ProductSchema),
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
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addOrder, {
    onMutate: async (order: Order) => {
      await queryClient.cancelQueries(["orders"]);
      const previousOrders = queryClient.getQueryData<Order[]>(["orders"]);
      const newId = 0;
      const newOrder = queryClient.setQueryData(["order", newId.toString()], {
        ...order,
        id: 0,
      });
      queryClient.setQueryData(["orders"], (old: Order[] | undefined) => {
        return newOrder && old ? [newOrder, ...old] : old;
      });
      await router.push("/orders");
      return { previousOrders };
    },
    onError: (context: { previousOrders: Order[] }) => {
      queryClient.setQueryData(["orders"], context.previousOrders);
      // await queryClient.invalidateQueries(["photos"])
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["orders"]);
    },
  });

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
      products: [
        {
          id: 1,
          isSelected: false,
          productName: "Gyanam PCMB",
          productPrice: 40000,
          validityInMonths: 12,
          discount: 0,
          validityFrom: "",
          validityUntil: "",
        },
      ],
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

  function getNumber(value: string | number) {
    if (typeof value === "number") {
      return value;
    }
    return parseInt(value);
  }
  // REVIEW: I had to write this watch fn in order to enable product by checkbox click
  watch("products");
  function recalculate(
    products: ProductInOrder[],
    setValue: UseFormSetValue<FieldValues>,
  ) {
    const totalAmount = products.reduce((acc, curr) => {
      const value = curr.isSelected ? getNumber(curr.productPrice) : 0;
      return acc + value;
    }, 0);
    const totalDiscount = products.reduce((acc, curr) => {
      const value = curr.isSelected ? getNumber(curr.discount) : 0;
      return acc + value;
    }, 0);
    const payableAmount = totalAmount - totalDiscount;
    setValue("totalAmount", totalAmount);
    setValue("totalDiscount", totalDiscount || 0);
    setValue("payableAmount", payableAmount || 0);
  }

  const { fields, replace } = useFieldArray({
    control,
    name: "products",
  });
  const paidAmount = getNumber(getValues("paidAmount"));
  useEffect(() => {
    const dueAmount = getNumber(getValues("payableAmount")) - paidAmount || 0;
    setValue("dueAmount", dueAmount);
  }, [paidAmount, setValue, getValues]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name?.startsWith("products.")) {
        recalculate(getValues("products"), setValue);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, getValues, setValue]);
  const {
    isLoading,
    isError,
    data: userData,
  } = useQuery(["user", id.toString()], () => (id ? getUser(id) : null));
  const { data: products } = useQuery(["products"], () => getAllProducts());

  useEffect(() => {
    replace(products);
  }, [products, replace]);

  if (isError) {
    return (
      <div className="flex items-center justify-center gap-4 mt-10">
        <p>Something went wrong!</p>
        <Link className="self-center p-2 bg-teal-800" href="/enquiries">
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
    mutate(data);
  };
  console.log(getValues("products"));
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-y-10 flex flex-col items-center p-8 bg-gray-100">
          <h2 className="p-4 text-2xl text-center">New Order</h2>
          <div className=" bg-gray-200 p-8 rounded-xl shadow-lg flex flex-col gap-4 w-[70vw]">
            {/* User detail section */}
            <div>
              <div className=" flex flex-wrap items-start gap-10">
                <label className="flex flex-col">
                  User ID
                  <input
                    className="bg-gray-50 p-1 text-gray-400 rounded-md"
                    disabled
                    type="number"
                    {...register("userId")}
                    defaultValue={parseInt(id.toString())}
                  />
                </label>
                <TextFieldWithLabel
                  labelText="Institute Name"
                  inputType="text"
                  defaultValue={userData.instituteName}
                  readOnly
                  className="p-1 text-gray-400 rounded-md"
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
              {fields?.map((product: Product, index) => (
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
                      defaultValue={0}
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
                      {...register(`products.${index}.validityFrom`)}
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
                    // value={calculateOrderValues().totalAmount}
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
                    // value={calculateOrderValues().totalDiscount}
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
                    // value={calculateOrderValues().payableAmount}
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
                    // value={calculateOrderValues().paidAmount}
                    type="number"
                    className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                    {...register("paidAmount", { valueAsNumber: true })}
                  />
                </label>
              </div>
              <div className=" py-4">
                <label className="flex items-center justify-between gap-4">
                  Due Amount
                  <input
                    type="number"
                    // value={calculateOrderValues().dueAmount}
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
                    disabled
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
                    {...register("orderDate")}
                  />
                </label>
              </div>
            </div>
          </div>
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
          <button type="submit" className="p-2 bg-blue-200 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default NewOrder;