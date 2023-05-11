import { ProductInOrderSchema } from "@/features/product/zod/productSchemas";
import * as z from "zod";

export const OrderSchema = z.object({
  userId: z.number(),
  products: z
    .array(ProductInOrderSchema)
    .refine((arr) => arr.some((product) => product.isSelected), {
      message: "At least one product must be selected",
    }),
  totalAmount: z.number(),
  totalDiscount: z.number(),
  payableAmount: z.number(),
  paidAmount: z.number(),
  dueAmount: z.number(),
  dueDate: z.string(),
  orderDate: z.string(),
  paymentMode: z.string(),
  paidBy: z.string(),
  receivingAccount: z.string(),
});
