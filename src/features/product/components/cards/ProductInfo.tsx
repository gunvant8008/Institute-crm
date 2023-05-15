import React from "react";
import { TProductInOrder } from "../../types/productTypes";
import { FaProductHunt } from "react-icons/fa";

type ProductInfoProps = {
  product: TProductInOrder;
};
const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="gap-x-8 grid grid-cols-6 p-4">
      <div className="flex">
        <div className="p-3 bg-orange-200 rounded-lg">
          <FaProductHunt className="text-orange-800" />
        </div>
        <div className="flex flex-col pl-4">
          <p>￡{product.productPrice}</p>
          <p className="text-xs text-gray-500">Id:{product.id}</p>
        </div>
      </div>
      <p>{product.productName}</p>

      <p>{product.validityInMonths}</p>
      <p>{product.discount}</p>
      <p>{product.validityFrom}</p>
      <p>{product.validityUntil}</p>
    </div>
  );
};

export default ProductInfo;
