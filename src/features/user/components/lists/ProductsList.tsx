import React from "react";
import { FaProductHunt } from "react-icons/fa";
import { deleteProduct, getAllProducts } from "../../axios/userApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../basic/Loading";
import AddProductModal from "../forms/AddProductModal";
import { Product } from "../../types/userTypes";
import EditProductModal from "../forms/EditProductModal";

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
        <AddProductModal buttonText="Add Product" title="Add Product" />
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
              <div className="bg-gray-50 hover:bg-gray-100 md:grid-cols-4 sm:grid-cols-3 grid items-center justify-between grid-cols-2 p-2 my-3 rounded-lg">
                <div className="flex">
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
                <p className="md:flex hidden">{product.productDescription}</p>
                <div className="sm:flex items-center justify-between hidden">
                  {product.validityInMonths}
                  <div className="gap-x-2 flex">
                    <EditProductModal
                      buttonText="Edit"
                      title="Edit Product"
                      id={product.id}
                    />
                    <button
                      className="bg-red-200 p-1.5 rounded-md"
                      onClick={() => mutate(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsList;
