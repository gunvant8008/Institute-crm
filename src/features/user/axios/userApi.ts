import { Order } from "@/features/orders/types/orderTypes";
import { User } from "../types/userTypes";
import axios from "axios";

const userApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DEV_MODE === "enabled"
      ? "http://localhost:3000/api/"
      : "https://institute-crm.vercel.app/api/",
  // baseURL: "https://institute-crm.vercel.app/api/",
});

export const getEnquiries = async () => {
  return await userApi
    .get("/users/enquiries")
    .then((response) => response.data as User[]);
};
export const getAllClients = async () => {
  return await userApi
    .get("/users/clients")
    .then((response) => response.data as User[]);
};
export const getActiveClients = async () => {
  return await userApi
    .get("/users/active-clients")
    .then((response) => response.data as User[]);
};
export const getInactiveClients = async () => {
  return await userApi
    .get("/users/inactive-clients")
    .then((response) => response.data as User[]);
};
export const getTrialClients = async () => {
  return await userApi
    .get("/users/trial-clients")
    .then((response) => response.data as User[]);
};
export const getUser = async (id: number) => {
  return await userApi
    .get(`/users/${id}`)
    .then((response) => response.data as User);
};
export const getUserOrders = async (
  id: number,
): Promise<Order[] | undefined> => {
  return await userApi
    .get(`/users/${id}/orders`)
    .then((response) => response.data as Order[]);
};

export const addEnquiry = async (user: Omit<User, "id">) => {
  return await userApi.post("/users/new", user);
};

export const updateUser = async (user: User) => {
  return await userApi.patch(`/users/${user.id}`, user);
};

export const deleteUser = async (id: number) => {
  return await userApi.delete(`/users/${id}`);
};

export default userApi;
