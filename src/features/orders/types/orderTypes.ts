import * as z from "zod";
import { EditOrderSchema, NewOrderSchema } from "../zod/orderSchemas";
import { ProductInOrder } from "@/features/product/types/productTypes";

export type TNewOrderSchema = z.infer<typeof NewOrderSchema>;
export type TEditOrderSchema = z.infer<typeof EditOrderSchema>;

export interface Order {
  id: number;
  userId: number;
  products: ProductInOrder[];
  totalAmount: number;
  totalDiscount: number;
  payableAmount: number;
  paidAmount: number;
  dueAmount: number;
  dueDate?: string;
  orderDate: string;
  paymentMode: string;
  paidBy?: string;
  receivingAccount?: string;
}
export interface OrderList extends Order {
  instituteName: string;
  phone1: string;
}
