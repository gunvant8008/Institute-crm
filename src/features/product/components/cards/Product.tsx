import React from "react";
import { Product } from "../../types/productTypes";
import { FaProductHunt } from "react-icons/fa";
import EditProductModal from "../forms/EditProductModal";
type ProductProps = {
  product: Product;
  mutate: (id: number) => void;
};
const SingleProduct = ({ product, mutate }: ProductProps) => {
  return (
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
  );
};

export default SingleProduct;
