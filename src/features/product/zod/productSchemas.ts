import * as z from "zod";

export const ProductInOrderSchema = z
  .object({
    id: z.number(),
    productName: z.string(),
    productPrice: z.number(),
    validityInMonths: z.number(),
    productDescription: z.string().optional(),
    isSelected: z.boolean().optional(),
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
  );
export const AddProductSchema = z.object({
  productName: z
    .string()
    .min(5, {
      message: "Product name must be grater than or equal to 5 characters.",
    })
    .max(100),
  productPrice: z.number().min(0),
  productDescription: z
    .string()
    .min(5, {
      message:
        "Product description must be grater than or equal to 5 characters.",
    })
    .max(100),
  validityInMonths: z
    .number()
    .min(1, {
      message: "Product validity must be the multiple of 1 month.",
    })
    .max(100),
});

export const EditProductSchema = z.intersection(
  AddProductSchema,
  z.object({
    id: z.number(),
  }),
);
// export const EditProductSchema = z.object({
//   productName: z
//     .string()
//     .min(5, {
//       message: "Product name must be grater than or equal to 5 characters.",
//     })
//     .max(100),
//   productPrice: z.number().min(0),
//   productDescription: z
//     .string()
//     .min(5, {
//       message:
//         "Product description must be grater than or equal to 5 characters.",
//     })
//     .max(100),
//   validityInMonths: z
//     .number()
//     .min(1, {
//       message: "Product validity must be the multiple of 1 month.",
//     })
//     .max(100),
// });
