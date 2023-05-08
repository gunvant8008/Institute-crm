import * as z from "zod";
import { AddEnquirySchema, EditUserSchema } from "../zod/userSchemas";

export type TAddEnquirySchema = z.infer<typeof AddEnquirySchema>;
export type TEditUserSchema = z.infer<typeof EditUserSchema>;
export interface User {
  id: number;
  instituteName: string;
  ownersName?: string;
  managersName?: string;
  address: string;
  phone1: string;
  phone2?: string;
  email: string;
  website?: string;
  description?: string;
  leadType?: string;
  leadSource?: string;
  // THIS IS NOT COMING FROM USER FORM
  addedOn: string;
  userStatus: string;
}
