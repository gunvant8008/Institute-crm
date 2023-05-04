import {
  DashboardData,
  Order,
  OrderList,
  Product,
  User,
} from "../types/userTypes";
import axios from "axios";

const userApi = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com",
  baseURL: "http://localhost:3000/api/",
  // baseURL: "http://127.0.0.1:3000/api/"
  // baseURL: "https://institute-crm.vercel.app/api/",
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

// api for dashboard analytics

export const getThisMonthUsers = async (): Promise<User[]> => {
  return await userApi
    .get("/users-data/this-month")
    .then((response) => response.data as User[]);
};

export const getLastMonthUsers = async (): Promise<User[]> => {
  return await userApi
    .get("/users-data/last-month")
    .then((response) => response.data as User[]);
};

export const getYearToDateUsers = async (): Promise<User[]> => {
  return await userApi
    .get("/users-data/year-to-date")
    .then((response) => response.data as User[]);
};

export const getRecentUsers = async (): Promise<User[]> => {
  return await userApi
    .get("/users-data/recent")
    .then((response) => response.data as User[]);
};

// export const getThisMonthRevenue = async (): Promise<number> => {
//   return await userApi
//     .get("/revenue/this-month")
//     .then((response) => response.data as number);
// };
// export const getLastMonthRevenue = async (): Promise<number> => {
//   return await userApi
//     .get("/revenue/last-month")
//     .then((response) => response.data as number);
// };
// export const getMonthWiseRevenue = async (): Promise<number[]> => {
//   return await userApi
//     .get("/revenue/month-wise")
//     .then((response) => response.data as number[]);
// };
// export const getYearToDateRevenue = async (): Promise<number> => {
//   return await userApi
//     .get("/revenue/year-to-date")
//     .then((response) => response.data as number);
// };
// export const getLastYearRevenue = async (): Promise<number> => {
//   return await userApi
//     .get("/revenue/last-year")
//     .then((response) => response.data as number);
// };
export const getAllProducts = async (): Promise<Product[]> => {
  return await userApi
    .get("/products")
    .then((response) => response.data as Product[]);
};
export const addProduct = async (
  product: Omit<Product, "id">,
): Promise<Product> => {
  return await userApi.post("/products/new", product);
};
export const getProduct = async (id: number): Promise<Product | undefined> => {
  return await userApi
    .get(`/products/${id}`)
    .then((response) => response.data as Product);
};
export const updateProduct = async (product: Product): Promise<Product> => {
  return await userApi.patch(`/products/${product.id}`, product);
};
export const deleteProduct = async (id: number) => {
  return await userApi.delete(`/products/${id}`);
};

// ==================== API FOR ORDERS ====================

// api for all orders
export const getAllOrders = async (): Promise<OrderList[]> => {
  return await userApi
    .get("/orders")
    .then((response) => response.data as OrderList[]);
};
// api for a single order
export const getOrder = async (id: number): Promise<Order | undefined> => {
  return await userApi
    .get(`/orders/${id}`)
    .then((response) => response.data as Order);
};
// api to add new order
export const addOrder = async (order: Omit<Order, "id">): Promise<Order> => {
  return await userApi.post("/orders/new", order);
};
// api to update an order
export const updateOrder = async (order: Order): Promise<Order> => {
  return await userApi.patch(`/orders/${order.id}`, order);
};
// api to delete an order
export const deleteOrder = async (id: number) => {
  return await userApi.delete(`/orders/${id}`);
};

// ==================== API FOR DASHBOARD DATA ====================
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const getDashboardData = async (): Promise<DashboardData> => {
  return await userApi
    .get("/dashboard-data")
    .then((response) => response.data as DashboardData);
};

export default userApi;
