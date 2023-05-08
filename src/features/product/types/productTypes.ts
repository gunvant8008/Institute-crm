import * as z from "zod";
import { AddProductSchema, EditProductSchema } from "../zod/productSchemas";

export type TAddProductSchema = z.infer<typeof AddProductSchema>;
export type TEditProductSchema = z.infer<typeof EditProductSchema>;

export interface Product {
  id: number;
  productName: string;
  productPrice: number;
  productDescription?: string;
  validityInMonths: number;
}

export interface ProductInOrder extends Product {
  isSelected?: boolean;
  discount?: number;
  validityFrom?: string;
  validityUntil?: string;
}
