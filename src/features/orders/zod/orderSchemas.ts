import { ProductInOrderSchema } from "@/features/product/zod/productSchemas";
import * as z from "zod";

export const OrderSchema = z.object({
  userId: z.number().min(0, { message: "User is required" }),
  products: z
    .array(ProductInOrderSchema)
    .refine((arr) => arr.some((product) => product.isSelected), {
      message: "At least one product must be selected",
    }),
  totalAmount: z
    .number()
    .min(1, { message: "Total amount cannot be negative" }),
  totalDiscount: z
    .number()
    .min(0, { message: "Total discount cannot be negative" }),
  payableAmount: z
    .number()
    .min(1, { message: "Payable amount cannot be negative" }),
  paidAmount: z.number().min(0, { message: "Paid amount cannot be negative" }),
  dueAmount: z.number().min(0, { message: "Due amount cannot be negative" }),
  dueDate: z.string().length(10, { message: "Due date is required" }),
  orderDate: z.string(),
  paymentMode: z.string().min(4, { message: "Payment mode is required" }),
  paidBy: z.string().min(1, { message: "Paid by is required" }),
  receivingAccount: z
    .string()
    .min(1, { message: "Receiving account is required" }),
});
