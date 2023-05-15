import { rest } from "msw";
import { Order } from "@/features/orders/types/orderTypes";
import { TProductInOrder } from "@/features/product/types/productTypes";
import { users } from "./userHandlers";

export let orders: Order[] = [
  {
    id: 1,
    userId: 1,
    products: [
      {
        id: 1,
        isSelected: true,
        productName: "Gyanam PCMB",
        productPrice: 40000,
        discount: 10000,
        productDescription: "Test paper generator for PCMB",
        validityInMonths: 12,
        validityFrom: "2023-01-30",
        validityUntil: "2024-01-30",
      },
      {
        id: 2,
        isSelected: true,
        productName: "Gyanam CRM",
        productPrice: 20000,
        discount: 0,
        productDescription: "Manage your leads and customers",
        validityInMonths: 12,
        validityFrom: "2023-01-30",
        validityUntil: "2024-01-30",
      },
    ],
    totalAmount: 60000,
    totalDiscount: 10000,
    payableAmount: 50000,
    paidAmount: 30000,
    dueAmount: 20000,
    dueDate: "2022-06-30",
    orderDate: "2023-03-01",
    paymentMode: "Online",
    paidBy: "John Doe",
    receivingAccount: "Account 1",
  },
  {
    id: 2,
    userId: 2,
    products: [
      {
        id: 1,
        isSelected: true,
        discount: 10000,
        productName: "Gyanam PCMB",
        productPrice: 40000,
        productDescription: "Test paper generator for PCMB",
        validityInMonths: 12,
        validityFrom: "2023-01-30",
        validityUntil: "2024-01-30",
      },
    ],
    totalAmount: 40000,
    totalDiscount: 10000,
    payableAmount: 30000,
    paidAmount: 20000,
    dueAmount: 10000,
    dueDate: "2023-06-30",
    orderDate: "2023-03-01",
    paymentMode: "Cash",
    paidBy: "John Doe",
    receivingAccount: "Account 2",
  },
];

let lastOrderId = orders.length + 1;

export const orderHandlers = [
  rest.get("/api/orders", (req, res, ctx) => {
    const ordersWithUserDetails = orders.map((order) => {
      const user = users.find((user) => user.id === order.userId);
      return {
        ...order,
        instituteName: user?.instituteName,
        phone1: user?.phone1,
      };
    });
    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json(ordersWithUserDetails),
    );
  }),
  // api to get a single order
  rest.get("/api/orders/:id", (req, res, ctx) => {
    const id = Number(req.params.id);
    const order = orders.find((order) => order.id === id);
    if (!order) {
      return res(
        ctx.status(404),
        ctx.delay(200),
        ctx.json({ message: "Order not found" }),
      );
    }
    return res(ctx.status(200), ctx.delay(200), ctx.json(order));
  }),
  // api to add a new order
  rest.post("/api/orders/new", async (req, res, ctx) => {
    const newOrder: Order = await req.json();
    const { userId, products } = newOrder;
    const user = users.find((user) => user.id === userId);
    // code to add validityUntil date in products, find the validity of the product, validity from date and add validity months into validityFrom to find validityUntil
    const updatedProducts = products.map((product) => {
      if (!product.isSelected) return;
      if (product === null) return;
      if (product === undefined) return;
      const { validityFrom, validityInMonths } = product;
      const validityUntil = new Date(validityFrom as string);
      validityUntil.setMonth(validityUntil.getMonth() + validityInMonths);
      return {
        ...product,
        validityUntil: validityUntil.toISOString().slice(0, 10),
      };
    });
    const filteredUpdatedProducts = updatedProducts.filter(
      (product) => !!product,
    );
    newOrder.products = filteredUpdatedProducts as TProductInOrder[];
    if (!user) {
      return res(
        ctx.status(404),
        ctx.delay(200),
        ctx.json({ message: "User not found" }),
      );
    }
    user.userStatus = "ACTIVE";
    newOrder.id = ++lastOrderId;
    orders.unshift(newOrder);
    return res(
      ctx.status(201),
      ctx.delay(500),
      ctx.json({ message: "Order added successfully" }),
    );
  }),
  // api to update an order
  rest.patch("/api/orders/:id", async (req, res, ctx) => {
    const id = Number(req.params.id);
    const updatedOrder: Order = await req.json();
    orders = orders.map((order) => {
      if (order.id === id) {
        return updatedOrder;
      }
      return order;
    });
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({ message: "Order updated successfully" }),
    );
  }),
  // api to delete an order
  rest.delete("/api/orders/:id", async (req, res, ctx) => {
    const id = Number(req.params.id);
    orders = orders.filter((order) => order.id !== id);
    return res(ctx.status(204));
  }),
];
