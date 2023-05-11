import axios from "axios";
import { Order, OrderList } from "../types/orderTypes";

const ordersApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DEV_MODE === "enabled"
      ? "http://localhost:3000/api/"
      : "https://institute-crm.vercel.app/api/",
  // baseURL: "https://institute-crm.vercel.app/api/",
});
// api for all orders
export const getAllOrders = async () => {
  return await ordersApi
    .get("/orders")
    .then((response) => response.data as OrderList[]);
};
// api for a single order
export const getOrder = async (id: number) => {
  return await ordersApi
    .get(`/orders/${id}`)
    .then((response) => response.data as Order);
};
// api to add new order
export const addOrder = async (order: Omit<Order, "id">) => {
  return await ordersApi.post("/orders/new", order);
};
// api to update an order
export const updateOrder = async (order: Order) => {
  return await ordersApi.patch(`/orders/${order.id}`, order);
};
// api to delete an order
export const deleteOrder = async (id: number) => {
  return await ordersApi.delete(`/orders/${id}`);
};

export default ordersApi;
