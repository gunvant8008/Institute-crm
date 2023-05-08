import * as z from "zod";

export const ProductSchema = z
  .object({
    id: z.number(),
    isSelected: z.boolean().optional(),
    productName: z.string(),
    productPrice: z.number(),
    validityInMonths: z.number(),
    discount: z.number().optional(),
    validityFrom: z.string().optional(),
    validityUntil: z.string().optional(),
  })
  .refine(
    (product) => product.isSelected !== true || product.discount !== undefined,
    {
      message: "Discount is required for selected products",
    },
  )
  .refine(
    (product) =>
      product.isSelected !== true || product.validityFrom !== undefined,
    {
      message: "Start From is required for selected products",
    },
  )
  .refine(
    (product) =>
      product.isSelected !== true || product.validityUntil !== undefined,
    {
      message: "Validity Until is required for selected products",
    },
  );

export const NewOrderSchema = z.object({
  userId: z.number(),
  products: z
    .array(ProductSchema)
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

export const EditOrderSchema = z.object({
  userId: z.number(),
  products: z
    .array(ProductSchema)
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
