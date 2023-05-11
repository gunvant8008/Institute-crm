import * as z from "zod";
import {
  AddProductSchema,
  EditProductSchema,
  ProductInOrderSchema,
} from "../zod/productSchemas";

export interface Product {
  id: number;
  productName: string;
  productPrice: number;
  productDescription?: string;
  validityInMonths: number;
}
export type TAddProduct = z.infer<typeof AddProductSchema>;
export type TEditProduct = z.infer<typeof EditProductSchema>;
export type TProductInOrder = z.infer<typeof ProductInOrderSchema>;
