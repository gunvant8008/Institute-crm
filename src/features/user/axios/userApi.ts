import { Order } from "@/features/orders/types/orderTypes";
import { User } from "../types/userTypes";
import axios from "axios";

const userApi = axios.create({
  // baseURL: "http://localhost:3000/api/",
  baseURL: "https://institute-crm.vercel.app/api/",
});

export const getEnquiries = async (): Promise<User[]> => {
  return await userApi
    .get("/users/enquiries")
    .then((response) => response.data as User[]);
};
export const getAllClients = async (): Promise<User[]> => {
  return await userApi
    .get("/users/clients")
    .then((response) => response.data as User[]);
};
export const getActiveClients = async (): Promise<User[]> => {
  return await userApi
    .get("/users/active-clients")
    .then((response) => response.data as User[]);
};
export const getInactiveClients = async (): Promise<User[]> => {
  return await userApi
    .get("/users/inactive-clients")
    .then((response) => response.data as User[]);
};
export const getTrialClients = async (): Promise<User[]> => {
  return await userApi
    .get("/users/trial-clients")
    .then((response) => response.data as User[]);
};
export const getUser = async (id: number): Promise<User | undefined> => {
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

export const addEnquiry = async (user: Omit<User, "id">): Promise<User> => {
  return await userApi.post("/users/new", user);
};

export const updateUser = async (user: User): Promise<User> => {
  return await userApi.patch(`/users/${user.id}`, user);
};

export const deleteUser = async (id: number) => {
  return await userApi.delete(`/users/${id}`);
};

export default userApi;
