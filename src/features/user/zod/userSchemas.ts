import * as z from "zod";
export const AddEnquirySchema = z.object({
  instituteName: z
    .string()
    .min(5, { message: "Institute Name must contain at least 5 character(s)" })
    .max(100),
  ownersName: z
    .string()
    .min(4, { message: "Name must be greater than or equal to 4" })
    .max(50)
    .optional(),
  managersName: z
    .string()
    .min(4, { message: "Name must be greater than or equal to 4" })
    .max(50)
    .optional(),
  address: z
    .string()
    .min(5, { message: "Address must contain at least 5 character(s)" })
    .max(100),
  phone1: z.string().min(10).max(10),
  phone2: z.string().min(10).max(10).optional(),

  email: z.string().email(),
  website: z.string().optional(),
  description: z.string().optional(),
  leadType: z.string().optional(),
  leadSource: z.string().optional(),
});

export const EditUserSchema = z.object({
  instituteName: z
    .string()
    .min(5, { message: "Institute Name must contain at least 5 character(s)" })
    .max(100),
  ownersName: z
    .string()
    .min(4, { message: "Name must be greater than or equal to 4" })
    .max(50)
    .optional(),
  managersName: z
    .string()
    .min(4, { message: "Name must be greater than or equal to 4" })
    .max(50)
    .optional(),
  address: z
    .string()
    .min(5, { message: "Address must contain at least 5 character(s)" })
    .max(100),
  phone1: z.string().min(10).max(10),
  phone2: z.string().min(10).max(10).optional(),

  email: z.string().email(),
  website: z.string().optional(),
  description: z.string().optional(),
  leadType: z.string().optional(),
  leadSource: z.string().optional(),
});
