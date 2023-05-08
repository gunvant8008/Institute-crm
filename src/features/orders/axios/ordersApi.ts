import axios from "axios";
import { Order, OrderList } from "../types/orderTypes";

const ordersApi = axios.create({
  baseURL: "http://localhost:3000/api/",
  // baseURL: "https://institute-crm.vercel.app/api/",
});
// api for all orders
export const getAllOrders = async (): Promise<OrderList[]> => {
  return await ordersApi
    .get("/orders")
    .then((response) => response.data as OrderList[]);
};
// api for a single order
export const getOrder = async (id: number): Promise<Order | undefined> => {
  return await ordersApi
    .get(`/orders/${id}`)
    .then((response) => response.data as Order);
};
// api to add new order
export const addOrder = async (order: Omit<Order, "id">): Promise<Order> => {
  return await ordersApi.post("/orders/new", order);
};
// api to update an order
export const updateOrder = async (order: Order): Promise<Order> => {
  return await ordersApi.patch(`/orders/${order.id}`, order);
};
// api to delete an order
export const deleteOrder = async (id: number) => {
  return await ordersApi.delete(`/orders/${id}`);
};

export default ordersApi;
