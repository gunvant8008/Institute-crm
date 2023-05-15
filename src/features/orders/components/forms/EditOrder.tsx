import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getUser } from "../../../user/axios/userApi";
import Link from "next/link";
import { FaProductHunt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray } from "react-hook-form";
import { Order, TEditOrder } from "@/features/orders/types/orderTypes";
import { getOrder, updateOrder } from "@/features/orders/axios/ordersApi";
import { OrderSchema } from "@/features/orders/zod/orderSchemas";
import { TProductInOrder } from "@/features/product/types/productTypes";
import { getAllProducts } from "@/features/product/axios/productApi";
import UserInfo from "@/features/user/components/cards/UserInfo";
import { InputWithLabel } from "@/AppComponents/basic/InputWithLabel";
import Button from "@/AppComponents/basic/Button";

const EditOrder = ({ id }: { id: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: orderData,
  } = useQuery(["order", id.toString()], () => (id ? getOrder(id) : null));

  const { data: userData } = useQuery(["user", id.toString()], () =>
    id ? getUser(id) : null,
  );
  const { data: products } = useQuery(["products"], () => getAllProducts());

  const { mutate } = useMutation(updateOrder, {
    onSuccess: async () => {
      await router.push(`/`);
    },
    onError: async () => {
      await router.push(`/`);
    },
  });

  const {
    register,
    watch,
    reset,
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditOrder>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      userId: id,
      products: orderData?.products,
      totalAmount: orderData?.totalAmount || 0,
      totalDiscount: orderData?.totalDiscount || 0,
      payableAmount: orderData?.payableAmount || 0,
      paidAmount: orderData?.paidAmount || 0,
      dueAmount: orderData?.dueAmount || 0,
      dueDate: orderData?.dueDate || "",
      orderDate: orderData?.orderDate || "",
      paymentMode: orderData?.paymentMode || "",
      paidBy: orderData?.paidBy || "",
      receivingAccount: orderData?.receivingAccount || "",
    },
  });

  useEffect(() => {
    if (!orderData) return;
    reset(orderData);
  }, [orderData, reset]);
  function getNumber(value: string | number) {
    if (typeof value === "number") {
      return value;
    }
    return parseInt(value);
  }
  // REVIEW: I had to write this watch fn in order to enable product by checkbox click
  watch("products");
  function recalculate(
    products: TProductInOrder[],
    setValue: (
      fieldName: "totalAmount" | "totalDiscount" | "payableAmount",
      value: number,
    ) => void,
  ) {
    const totalAmount = products.reduce((acc, curr) => {
      const value = curr.isSelected ? getNumber(curr.productPrice) : 0;
      return acc + value;
    }, 0);
    const totalDiscount = products.reduce((acc, curr) => {
      // REVIEW: as for TS error
      const value = curr.isSelected ? getNumber(curr?.discount as number) : 0;
      return acc + value;
    }, 0);
    const payableAmount = totalAmount - totalDiscount;
    setValue("totalAmount", totalAmount);
    setValue("totalDiscount", totalDiscount);
    setValue("payableAmount", payableAmount);
  }

  const { fields, replace } = useFieldArray({
    control,
    name: "products",
  });

  // useEffect to update Due Amount
  watch("paidAmount");
  const paidAmount = getNumber(getValues("paidAmount"));
  useEffect(() => {
    const dueAmount = getNumber(getValues("payableAmount")) - paidAmount;
    setValue("dueAmount", dueAmount);
  }, [paidAmount, setValue, getValues]);

  // useEffect to update Payable Amount
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name?.startsWith("products.")) {
        recalculate(getValues("products"), setValue);
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, getValues, setValue]);

  useEffect(() => {
    // REVIEW: as to solve TS error
    replace(products as TProductInOrder[]);
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
  const onSubmit = (data: TEditOrder) => {
    // REVIEW: as to solve TS error
    mutate({
      id,
      ...data,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-y-10 flex flex-col items-center p-8 bg-gray-100">
          <h2 className="p-4 text-2xl text-center">Update Order</h2>
          <div className=" bg-gray-200 p-8 rounded-xl shadow-lg flex flex-col gap-4 w-[70vw]">
            {/* User detail section */}
            <UserInfo
              userData={userData}
              error={errors.userId?.message as string}
              inputProps={register("userId", {
                valueAsNumber: true,
                required: true,
              })}
            />
          </div>
          {/* Add products section */}
          <div className="flex flex-col w-full gap-4 p-8">
            <h2 className="text-2xl text-gray-600">
              Purchased Products/Services
            </h2>
            <div className=" ml-14 grid grid-cols-6 font-semibold">
              <span>Add/Remove</span>
              <span>Price</span>
              <span>Name</span>
              <span>Validity</span>
              <span>Discount</span>
              <span>Start From</span>
            </div>
            {/* Products Section- coming from api */}
            <ul>
              {fields?.map((product: TProductInOrder, index) => (
                <li key={product.id}>
                  <div className="bg-gray-50 place-items-center grid grid-cols-6 p-2 my-3 rounded-lg">
                    <InputWithLabel
                      labelText=""
                      alt={`Select-${index}`}
                      inputType="checkbox"
                      disabled={true}
                      inputProps={register(`products.${index}.isSelected`)}
                      className="scale-[200%] mr-24 w-8 h-8 outline-none active:outline-none "
                    />
                    <div className="flex items-center">
                      <div className="flex items-center w-10 h-10 p-3 bg-orange-200 rounded-lg">
                        <FaProductHunt className=" text-xl text-orange-800" />
                      </div>
                      <div className="pl-4">
                        <InputWithLabel
                          labelText="￡"
                          flexDirection="row"
                          inputType="number"
                          disabled={true}
                          defaultValue={product.productPrice}
                          inputProps={register(
                            `products.${index}.productPrice`,
                            {
                              valueAsNumber: true,
                            },
                          )}
                          alt={`Price-${index}`}
                          className="w-13 font-bold text-gray-800"
                        />

                        <InputWithLabel
                          labelText="Id:"
                          inputType="number"
                          disabled={true}
                          defaultValue={product.id}
                          inputProps={register(`products.${index}.id`, {
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                    </div>

                    <InputWithLabel
                      labelText=""
                      alt={`Product Name-${index}`}
                      inputType="text"
                      disabled={true}
                      defaultValue={product.productName}
                      inputProps={register(`products.${index}.productName`)}
                    />
                    <InputWithLabel
                      labelText=""
                      inputType="number"
                      disabled={true}
                      inputProps={register(
                        `products.${index}.validityInMonths`,
                        {
                          valueAsNumber: true,
                        },
                      )}
                      alt={`Validity-${index}`}
                    />

                    <InputWithLabel
                      labelText=""
                      inputType="number"
                      placeholder="0"
                      disabled={true}
                      inputProps={register(`products.${index}.discount`, {
                        valueAsNumber: true,
                        required: true,
                      })}
                      alt={`Discount-${index}`}
                    />
                    <InputWithLabel
                      labelText=""
                      inputType="date"
                      disabled={true}
                      inputProps={register(`products.${index}.validityFrom`)}
                      alt={`Start From-${index}`}
                    />
                    <InputWithLabel
                      labelText=""
                      inputType="date"
                      className="hidden"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      disabled={!getValues(`products.${index}.isSelected`)}
                      inputProps={register(`products.${index}.validityUntil`)}
                    />
                  </div>
                  {errors?.products && errors?.products[index]?.message && (
                    <span className="block text-sm text-red-400">
                      {errors?.products[index]?.message}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {errors.products && (
              <span className="block text-sm text-red-400">
                {errors.products.message}
              </span>
            )}
          </div>
          {/* order details section */}
          <div className="flex flex-wrap justify-between w-full px-20">
            {/* Left section */}
            <div className="flex flex-col space-y-8 text-gray-600 divide-y-2">
              <div className="gap-y-4 flex flex-col">
                <p className="font-semibold">Payment Mode*</p>
                <div className="flex gap-4">
                  <InputWithLabel
                    labelText="Online"
                    inputType="radio"
                    // disabled={true}
                    value="Online"
                    inputProps={register("paymentMode")}
                  />
                  <InputWithLabel
                    labelText="Wallet"
                    inputType="radio"
                    // disabled={true}
                    value="Wallet"
                    inputProps={register("paymentMode")}
                  />
                  <InputWithLabel
                    labelText="Cash"
                    inputType="radio"
                    // disabled={true}
                    value="Cash"
                    inputProps={register("paymentMode")}
                  />
                  <InputWithLabel
                    labelText="Cheque"
                    inputType="radio"
                    // disabled={true}
                    value="Cheque"
                    inputProps={register("paymentMode")}
                  />
                </div>
                {errors.paymentMode && (
                  <span className="block text-sm text-red-400">
                    {errors.paymentMode.message}
                  </span>
                )}
              </div>
              <div className="pt-8">
                <InputWithLabel
                  labelText="Paid By"
                  inputType="text"
                  disabled={true}
                  inputProps={register("paidBy", { required: true })}
                  error={errors.paidBy?.message as string}
                />
              </div>

              <div className="gap-y-3 flex flex-col py-4">
                <p className="font-semibold">Receiving Account</p>
                <div className="flex gap-4">
                  <InputWithLabel
                    labelText="Account 1"
                    inputType="radio"
                    value="Account 1"
                    // disabled={true}
                    inputProps={register("receivingAccount", {
                      required: true,
                    })}
                  />
                  <InputWithLabel
                    labelText="Account 2"
                    inputType="radio"
                    value="Account 2"
                    // disabled={true}
                    inputProps={register("receivingAccount", {
                      required: true,
                    })}
                  />
                  <InputWithLabel
                    labelText="Account 3"
                    inputType="radio"
                    value="Account 3"
                    // disabled={true}
                    inputProps={register("receivingAccount", {
                      required: true,
                    })}
                  />
                  <InputWithLabel
                    labelText="Account 4"
                    inputType="radio"
                    value="Account 4"
                    // disabled={true}
                    inputProps={register("receivingAccount", {
                      required: true,
                    })}
                  />
                </div>
                {errors.receivingAccount && (
                  <span className="block text-sm text-red-400">
                    {errors.receivingAccount.message}
                  </span>
                )}
              </div>
            </div>
            {/* Right section */}
            <div className="flex flex-col gap-y-4 text-gray-600 divide-y-2 min-w-[25rem] ">
              <InputWithLabel
                labelText="Total Amount"
                inputType="number"
                placeholder="0"
                disabled={true}
                inputProps={register("totalAmount", { valueAsNumber: true })}
                error={errors.totalAmount?.message as string}
                flexDirection="column"
              />

              <InputWithLabel
                labelText="Total Discount"
                inputType="number"
                placeholder="0"
                disabled={true}
                inputProps={register("totalDiscount", {
                  valueAsNumber: true,
                })}
                error={errors.totalDiscount?.message as string}
                flexDirection="column"
              />
              <InputWithLabel
                labelText="Payable Amount"
                inputType="number"
                placeholder="0"
                disabled={true}
                inputProps={register("payableAmount", {
                  valueAsNumber: true,
                })}
                error={errors.payableAmount?.message as string}
                flexDirection="column"
              />
              <InputWithLabel
                labelText="Paid Amount"
                inputType="number"
                placeholder="0"
                inputProps={register("paidAmount", {
                  valueAsNumber: true,
                  required: true,
                })}
                error={errors.paidAmount?.message as string}
                flexDirection="column"
              />
              <InputWithLabel
                labelText="Due Amount"
                inputType="number"
                placeholder="0"
                disabled={true}
                inputProps={register("dueAmount", { valueAsNumber: true })}
                error={errors.dueAmount?.message as string}
                flexDirection="column"
              />
              <InputWithLabel
                labelText="Due Date"
                inputType="date"
                inputProps={register("dueDate", { required: true })}
                error={errors.dueDate?.message as string}
                flexDirection="column"
              />
              <InputWithLabel
                labelText="Order Date"
                inputType="date"
                disabled={true}
                inputProps={register("orderDate")}
                error={errors.orderDate?.message as string}
                flexDirection="column"
              />
            </div>
          </div>
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </>
  );
};
export default EditOrder;
