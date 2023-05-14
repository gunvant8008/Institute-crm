import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Product, TEditProduct } from "@/features/product/types/productTypes";
import { EditProductSchema } from "@/features/product/zod/productSchemas";
import { getProduct, updateProduct } from "../../axios/productApi";
import { InputWithLabel } from "@/AppComponents/basic/InputWithLabel";

type TModalProps = {
  buttonText: string;
  title: string;
  id: number;
};

const EditProductModal = ({ id, buttonText, title }: TModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useQuery(["product", id.toString()], () =>
    id ? getProduct(id) : null,
  );

  const { mutate } = useMutation(updateProduct, {
    onMutate: async (product: Product) => {
      await queryClient.cancelQueries(["products"]);
      const previousProducts = queryClient.getQueryData<Product[]>([
        "products",
      ]);

      const newProduct = queryClient.setQueryData(
        ["product", product.id.toString()],
        product,
      );

      queryClient.setQueryData(["products"], (old: Product[] | undefined) => {
        return newProduct
          ? old?.map((item) => (item.id === product.id ? newProduct : item))
          : old;
      });
      setShowModal(false);

      return { previousProducts };
    },
    onError: (context: { previousProducts: Product[] }) => {
      queryClient.setQueryData(["products"], context.previousProducts);
      setShowModal(false);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["products"]);
    },
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditProduct>({
    resolver: zodResolver(EditProductSchema),
    defaultValues: data ? data : undefined,
  });

  useEffect(() => {
    if (!data) return;
    reset(data);
  }, [reset, showModal, data]);

  const onSubmit = (data: Omit<TEditProduct, "id">) => {
    mutate({
      id,
      ...data,
    });
  };

  return (
    <>
      <button
        className="active:bg-blue-400 focus:outline-none px-6 text-black bg-blue-200 rounded shadow outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {buttonText}
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-40 bg-black opacity-25" />
          <div className="focus:outline-none fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
            <div className="relative w-[70vw] mx-auto my-6">
              <div className="focus:outline-none relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none">
                <div className=" flex items-start justify-between p-5 border-b border-gray-300 border-solid">
                  <h3 className="text-3xl font=semibold">{title}</h3>
                  <button
                    className=" float-right text-black bg-transparent border-0"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="opacity-7 flex items-center justify-center w-6 h-6 py-0 text-xl text-black bg-gray-300 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto p-6">
                  <form
                    className="flex flex-col w-full px-8 pt-6 pb-8 space-y-4 bg-gray-200 rounded shadow-md"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <InputWithLabel
                      labelText="Id"
                      placeholder={id.toString()}
                      disabled={true}
                      flexDirection="column"
                    />
                    <InputWithLabel
                      labelText="Product Name"
                      inputProps={register("productName")}
                      error={errors.productName?.message}
                      flexDirection="column"
                    />
                    <InputWithLabel
                      labelText="Product Price"
                      inputType="number"
                      inputProps={register("productPrice", {
                        valueAsNumber: true,
                      })}
                      error={errors.productPrice?.message}
                      flexDirection="column"
                    />
                    <InputWithLabel
                      labelText="Product Description"
                      inputProps={register("productDescription")}
                      error={errors.productDescription?.message}
                      flexDirection="column"
                    />
                    <InputWithLabel
                      labelText="Validity in Months"
                      inputType="number"
                      inputProps={register("validityInMonths", {
                        valueAsNumber: true,
                      })}
                      error={errors.validityInMonths?.message}
                      flexDirection="column"
                    />
                    <div className="border-blueGray-200 flex items-center justify-between pt-8">
                      <button
                        className="background-transparent focus:outline-none px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase outline-none"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button className="active:bg-blue-700 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-blue-500 rounded shadow outline-none">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default EditProductModal;
