import { TUser } from "../types/userTypes";
import axios from "axios";

const userApi = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com",
  // baseURL: "http://localhost:3000/api/"
  // baseURL: "http://127.0.0.1:3000/api/"
  baseURL: "https://institute-crm.vercel.app//api/",
});

export const getUsers = async (): Promise<TUser[]> => {
  return await userApi
    .get("/users")
    .then((response) => response.data as TUser[]);
};

export const getUser = async (id: number): Promise<TUser | undefined> => {
  return await userApi
    .get(`/users/${id}`)
    .then((response) => response.data as TUser);
};

export const addUser = async (user: Omit<TUser, "id">): Promise<TUser> => {
  return await userApi.post("/users/new", user);
};

export const updateUser = async (user: TUser): Promise<TUser> => {
  return await userApi.patch(`/users/${user.id}`, user);
};

export const deleteUser = async (id: number) => {
  return await userApi.delete(`/users/${id}`);
};

// api for dashboard analytics

export const getThisMonthUsers = async (): Promise<TUser[]> => {
  return await userApi
    .get("/users-data/this-month")
    .then((response) => response.data as TUser[]);
};

export const getYearToDateUsers = async (): Promise<TUser[]> => {
  return await userApi
    .get("/users-data/year-to-date")
    .then((response) => response.data as TUser[]);
};

export const getRecentUsers = async (): Promise<TUser[]> => {
  return await userApi
    .get("/users-data/recent")
    .then((response) => response.data as TUser[]);
};

export const getThisMonthRevenue = async (): Promise<number> => {
  return await userApi
    .get("/revenue/this-month")
    .then((response) => response.data as number);
};
export const getMonthWiseRevenue = async (): Promise<number[]> => {
  return await userApi
    .get("/revenue/month-wise")
    .then((response) => response.data as number[]);
};
export const getYearToDateRevenue = async (): Promise<number> => {
  return await userApi
    .get("/revenue/year-to-date")
    .then((response) => response.data as number);
};
export default userApi;
