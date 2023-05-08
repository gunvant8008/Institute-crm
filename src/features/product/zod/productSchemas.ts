import * as z from "zod";

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

export const EditProductSchema = z.object({
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
