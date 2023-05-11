import * as z from "zod";
import { UserSchema } from "../zod/userSchemas";

export type TAddEnquiry = z.infer<typeof UserSchema>;
export type TEditUser = z.infer<typeof UserSchema>;
export interface User extends TAddEnquiry {
  id: number;
  addedOn: string;
  userStatus: string;
}
