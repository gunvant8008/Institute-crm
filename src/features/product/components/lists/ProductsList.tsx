import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddProductModal from "../forms/AddProductModal";
import { deleteProduct, getAllProducts } from "../../axios/productApi";
import { Product } from "../../types/productTypes";
import Loading from "@/AppComponents/basic/Loading";
import SingleProduct from "../cards/Product";

const ProductsList = () => {
  const queryClient = useQueryClient();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(["products"], getAllProducts);

  const { mutate } = useMutation(deleteProduct, {
    onMutate: async (productId) => {
      await queryClient.cancelQueries(["products"]);
      const previousProducts = queryClient.getQueryData<Product[]>([
        "products",
      ]);
      queryClient.setQueryData(["products"], (old: Product[] | undefined) => {
        return old?.filter((product) => product.id !== productId);
      });
      return { previousProducts };
    },
    onError: (context: { previousProducts: Product[] }) => {
      queryClient.setQueryData(["products"], context.previousProducts);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["products"]);
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h3>Something went wrong!</h3>;
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className=" flex justify-between w-full">
        <h2 className="p-4 text-2xl">Products List</h2>
        <AddProductModal
          buttonText="Add Product"
          title="Add Product"
          className="p-2 m-2 bg-green-200 rounded-md shadow-md"
        />
      </div>
      <div className="w-full p-4 overflow-y-auto bg-white border rounded-lg">
        <div className="md:grid-cols-4 sm:grid-cols-3 grid items-center justify-between grid-cols-2 p-2 my-3 font-semibold">
          <span>Price</span>
          <span className="sm:text-left text-right">Name</span>
          <span className="md:grid hidden">Description</span>
          <span className="sm:grid hidden">Validity(In Months)</span>
        </div>
        <ul>
          {products.map((product: Product) => (
            <li key={product.id}>
              <SingleProduct product={product} mutate={mutate} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsList;
