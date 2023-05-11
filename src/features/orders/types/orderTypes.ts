import * as z from "zod";
import { OrderSchema } from "../zod/orderSchemas";

export type TNewOrder = z.infer<typeof OrderSchema>;
export type TEditOrder = z.infer<typeof OrderSchema>;

export interface Order extends TNewOrder {
  id: number;
}
export interface OrderList extends Order {
  instituteName: string;
  phone1: string;
}
