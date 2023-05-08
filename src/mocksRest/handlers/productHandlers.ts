import { rest } from "msw";
import { Product } from "@/features/product/types/productTypes";

let products: Product[] = [
  {
    id: 1,
    productName: "Gyanam PCMB",
    productPrice: 40000,
    productDescription: "Test paper generator for PCMB",
    validityInMonths: 12,
  },
  {
    id: 2,
    productName: "Gyanam CRM",
    productPrice: 20000,
    productDescription: "Manage your leads and customers",
    validityInMonths: 12,
  },
];

let lastProductId = products.length + 1;

export const productHandlers = [
  // api for all products
  rest.get("/api/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(200), ctx.json(products));
  }),
  // api for a single product
  rest.get("/api/products/:id", (req, res, ctx) => {
    const id = Number(req.params.id);
    const product = products.find((product) => product.id === id);
    if (!product) {
      return res(
        ctx.status(404),
        ctx.delay(200),
        ctx.json({ message: "Product not found" }),
      );
    }
    return res(ctx.status(200), ctx.delay(200), ctx.json(product));
  }),
  // api to add a new product
  rest.post("/api/products/new", async (req, res, ctx) => {
    const newProduct: Product = await req.json();
    newProduct.id = ++lastProductId;
    products.unshift(newProduct);
    return res(
      ctx.status(201),
      ctx.delay(500),
      ctx.json({ message: "Product added successfully" }),
    );
  }),
  // api to update a product
  rest.patch("/api/products/:id", async (req, res, ctx) => {
    const id = Number(req.params.id);
    const updatedProduct: Product = await req.json();
    products = products.map((product) => {
      if (product.id === id) {
        return updatedProduct;
      }
      return product;
    });
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({ message: "Product updated successfully" }),
    );
  }),
  // api to delete a product
  rest.delete("/api/products/:id", async (req, res, ctx) => {
    const id = Number(req.params.id);
    products = products.filter((product) => product.id !== id);
    return res(ctx.status(204));
  }),
];
