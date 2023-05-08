import axios from "axios";
import { Product } from "../types/productTypes";

const productApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DEV_MODE === "enabled"
      ? "http://localhost:3000/api/"
      : "https://institute-crm.vercel.app/api/",
  // baseURL: "https://institute-crm.vercel.app/api/",
});

export const getAllProducts = async (): Promise<Product[]> => {
  return await productApi
    .get("/products")
    .then((response) => response.data as Product[]);
};
export const addProduct = async (
  product: Omit<Product, "id">,
): Promise<Product> => {
  return await productApi.post("/products/new", product);
};
export const getProduct = async (id: number): Promise<Product | undefined> => {
  return await productApi
    .get(`/products/${id}`)
    .then((response) => response.data as Product);
};
export const updateProduct = async (product: Product): Promise<Product> => {
  return await productApi.patch(`/products/${product.id}`, product);
};
export const deleteProduct = async (id: number) => {
  return await productApi.delete(`/products/${id}`);
};

export default productApi;
