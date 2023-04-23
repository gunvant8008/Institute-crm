import { TUser } from "../types/userTypes";
import axios from "axios";

const userApi = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com",
  // baseURL: "http://localhost:3000/api/",
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

export default userApi;
