import { rest } from "msw";
import {
  Order,
  Product,
  ProductInOrder,
  User,
} from "@/features/user/types/userTypes";

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

let users: User[] = [
  {
    id: 1,
    instituteName: "University of California",
    ownersName: "Owner 1",
    managersName: "Manager 1",
    address: "Los Angeles",
    phone1: "1234567890",
    phone2: "1234567890",
    email: "johndoe@gmail.com",
    website: "www.johndoe.com",
    description: "This is a description",
    leadType: "HOT",
    leadSource: "Google",
    // NOT COMING FROM USER FORM
    addedOn: "2023-03-01",
    userStatus: "ACTIVE",
  },
  {
    id: 2,
    instituteName: "University of California",
    ownersName: "Owner 2",
    managersName: "Manager 2",
    address: "Los Angeles",
    phone1: "1234567890",
    phone2: "1234567890",
    email: "johndoe@gmail.com",
    website: "www.johndoe.com",
    description: "This is a description",
    leadType: "HOT",
    leadSource: "Google",
    // NOT COMING FROM USER FORM
    addedOn: "2023-03-01",
    userStatus: "ACTIVE",
  },
  {
    id: 3,
    instituteName: "University of California",
    ownersName: "Owner 3",
    managersName: "Manager 3",
    address: "Los Angeles",
    phone1: "1234567890",
    phone2: "1234567890",
    email: "johndoe@gmail.com",
    website: "www.johndoe.com",
    description: "This is a description",
    leadType: "HOT",
    leadSource: "Google",
    // NOT COMING FROM USER FORM
    addedOn: "2023-03-01",
    userStatus: "TRIAL",
  },
  {
    id: 4,
    instituteName: "University of California",
    ownersName: "Owner 4",
    managersName: "Manager 4",
    address: "Los Angeles",
    phone1: "1234567890",
    phone2: "1234567890",
    email: "johndoe@gmail.com",
    website: "www.johndoe.com",
    description: "This is a description",
    leadType: "HOT",
    leadSource: "Google",
    // NOT COMING FROM USER FORM
    addedOn: "2023-03-01",
    userStatus: "INACTIVE",
  },
  {
    id: 5,
    instituteName: "University of California",
    ownersName: "Owner 5",
    managersName: "Manager 5",
    address: "Los Angeles",
    phone1: "1234567890",
    phone2: "1234567890",
    email: "johndoe@gmail.com",
    website: "www.johndoe.com",
    description: "This is a description",
    leadType: "HOT",
    leadSource: "Google",
    // NOT COMING FROM USER FORM
    addedOn: "2023-03-01",
    userStatus: "ENQUIRY",
  },
];

let orders: Order[] = [
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
    receivingAccount: "Current Account 1",
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
    paymentMode: "UPI",
    paidBy: "John Doe",
    receivingAccount: "Current Account 2",
  },
];

let lastUserId = users.length + 1;
let lastProductId = products.length + 1;
let lastOrderId = orders.length + 1;

export const handlers = [
  // api for all enquiry users
  rest.get("/api/users/enquiries", (req, res, ctx) => {
    const enquiryUsers = users.filter((user) => user.userStatus === "ENQUIRY");
    return res(ctx.status(200), ctx.delay(200), ctx.json(enquiryUsers));
  }),
  // api for all clients users
  rest.get("/api/users/clients", (req, res, ctx) => {
    const clientUsers = users.filter(
      (user) =>
        user.userStatus === "ACTIVE" ||
        user.userStatus === "INACTIVE" ||
        user.userStatus === "TRIAL",
    );
    return res(ctx.status(200), ctx.delay(200), ctx.json(clientUsers));
  }),
  // api for active users
  rest.get("/api/users/active-clients", (req, res, ctx) => {
    const activeUsers = users.filter((user) => user.userStatus === "ACTIVE");
    return res(ctx.status(200), ctx.delay(200), ctx.json(activeUsers));
  }),
  // api for inactive users
  rest.get("/api/users/inactive-clients", (req, res, ctx) => {
    const inactiveUsers = users.filter(
      (user) => user.userStatus === "INACTIVE",
    );
    return res(ctx.status(200), ctx.delay(200), ctx.json(inactiveUsers));
  }),
  // api for trial users
  rest.get("/api/users/trial-clients", (req, res, ctx) => {
    const trialUsers = users.filter((user) => user.userStatus === "TRIAL");
    return res(ctx.status(200), ctx.delay(200), ctx.json(trialUsers));
  }),
  // api for all users
  rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(200), ctx.json(users));
  }),
  // api for a single user
  rest.get("/api/users/:id", (req, res, ctx) => {
    const id = parseInt(req.params.id.toString());
    const user = users.find((user) => user.id === id);
    if (user) {
      return res(ctx.status(200), ctx.delay(200), ctx.json(user));
    } else {
      return res(
        ctx.status(404),
        ctx.delay(200),
        ctx.json({ message: "User not found" }),
      );
    }
  }),
  // api for a single ueer's orders
  rest.get("/api/users/:id/orders", (req, res, ctx) => {
    const id = parseInt(req.params.id.toString());
    const userOrders = orders.filter((order) => order.userId === id);
    if (userOrders) {
      return res(ctx.status(200), ctx.delay(200), ctx.json(userOrders));
    } else {
      return res(
        ctx.status(404),
        ctx.delay(200),
        ctx.json({ message: "User not found" }),
      );
    }
  }),
  // api for creating a new user
  rest.post("/api/users/new", async (req, res, ctx) => {
    const newUser: User = await req.json();
    newUser.id = ++lastUserId;
    newUser.addedOn = new Date().toISOString().split("T")[0];
    newUser.userStatus = "ENQUIRY";
    users.unshift(newUser);
    return res(ctx.status(201), ctx.delay(200), ctx.json(newUser));
  }),
  // api for deleting a user
  rest.delete("/api/users/:id", (req, res, ctx) => {
    const id = parseInt(req.params.id.toString());
    users = users.filter((user) => user.id !== id);
    return res(ctx.status(204));
  }),
  // api for updating a user
  rest.patch("/api/users/:id", async (req, res, ctx) => {
    const id = parseInt(req.params.id.toString());
    let updatedUser: User = await req.json();
    const oldUser = users.find((user) => user.id === id);
    updatedUser = { ...oldUser, ...updatedUser };
    users = users.map((user) => {
      if (user.id === id) {
        return updatedUser;
      } else {
        return user;
      }
    });
    return res(ctx.status(200), ctx.delay(200), ctx.json(updatedUser));
  }),
  // // api for this month created users
  // // REVIEW: this api returns 404 if we use "users" rather than "users-data"
  // rest.get("/api/users-data/this-month", async (req, res, ctx) => {
  //   const thisMonthUsers = users.filter((user) => {
  //     const date = new Date(user.addedOn);
  //     const month = date.getMonth();
  //     const year = date.getFullYear();
  //     const today = new Date();
  //     return month === today.getMonth() && year === today.getFullYear();
  //   });
  //   return res(ctx.status(200), ctx.delay(200), ctx.json(thisMonthUsers));
  // }),
  // // api for last month created users
  // rest.get("/api/users-data/last-month", (req, res, ctx) => {
  //   const lastMonthUsers = users.filter((user) => {
  //     const date = new Date(user.addedOn);
  //     const month = date.getMonth();
  //     const year = date.getFullYear();
  //     const today = new Date();
  //     return month === today.getMonth() - 1 && year === today.getFullYear();
  //   });
  //   return res(ctx.status(200), ctx.delay(200), ctx.json(lastMonthUsers));
  // }),
  // // api for year to date created users
  // rest.get("/api/users-data/year-to-date", (req, res, ctx) => {
  //   const yearToDateUsers = users.filter((user) => {
  //     const date = new Date(user.addedOn);
  //     const year = date.getFullYear();
  //     const today = new Date();
  //     return year === today.getFullYear();
  //   });
  //   return res(ctx.status(200), ctx.delay(200), ctx.json(yearToDateUsers));
  // }),
  // // api for most recent 15 users
  // rest.get("/api/users-data/recent", (req, res, ctx) => {
  //   const recentUsers = users.slice(0, 15);
  //   return res(ctx.status(200), ctx.delay(200), ctx.json(recentUsers));
  // }),
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
  // api for all orders
  // rest.get("/api/orders", (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.delay(200), ctx.json(orders))
  // }),
  //  api for all orders, each order have institute name and phone1 details
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
    newOrder.products = filteredUpdatedProducts as ProductInOrder[];
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

  // ==================== apis for dashboard data ====================
  // api which returns this months enquires, last month enquiries, this month added active users, last month added active users, this month revenue, last month revenue, this year revenue, last year revenue, last 15 orders & month wise revenue for the current year
  rest.get("/api/dashboard-data", (req, res, ctx) => {
    const thisMonthEnquiries = users.filter((user) => {
      if (user.userStatus === "ENQUIRY") {
        const date = new Date(user.addedOn);
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        return date.getMonth() === month && date.getFullYear() === year;
      }
    });
    const lastMonthEnquiries = users.filter((user) => {
      if (user.userStatus === "ENQUIRY") {
        const date = new Date(user.addedOn);
        const today = new Date();
        const month = today.getMonth() - 1;
        const year = today.getFullYear();
        return date.getMonth() === month && date.getFullYear() === year;
      }
    });
    const thisMonthActiveUsers = users.filter((user) => {
      if (user.userStatus === "ACTIVE") {
        const date = new Date(user.addedOn);
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        return date.getMonth() === month && date.getFullYear() === year;
      }
    });
    const lastMonthActiveUsers = users.filter((user) => {
      if (user.userStatus === "ACTIVE") {
        const date = new Date(user.addedOn);
        const today = new Date();
        const month = today.getMonth() - 1;
        const year = today.getFullYear();
        return date.getMonth() === month && date.getFullYear() === year;
      }
    });
    const thisMonthRevenue = orders.reduce((acc, order) => {
      const date = new Date(order.orderDate);
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
      if (date.getMonth() === month && date.getFullYear() === year) {
        return acc + order.paidAmount;
      }
      return acc;
    }, 0);
    const lastMonthRevenue = orders.reduce((acc, order) => {
      const date = new Date(order.orderDate);
      const today = new Date();
      const month = today.getMonth() - 1;
      const year = today.getFullYear();
      if (date.getMonth() === month && date.getFullYear() === year) {
        return acc + order.paidAmount;
      }
      return acc;
    }, 0);
    const thisYearRevenue = orders.reduce((acc, order) => {
      const date = new Date(order.orderDate);
      const today = new Date();
      const year = today.getFullYear();
      if (date.getFullYear() === year) {
        return acc + order.paidAmount;
      }
      return acc;
    }, 0);
    const lastYearRevenue = orders.reduce((acc, order) => {
      const date = new Date(order.orderDate);
      const today = new Date();
      const year = today.getFullYear() - 1;
      if (date.getFullYear() === year) {
        return acc + order.paidAmount;
      }
      return acc;
    }, 0);
    // last 15 orders should have institute name and phone1 details
    const last15Orders = orders.slice(0, 15).map((order) => {
      const user = users.find((user) => user.id === order.userId);
      return {
        ...order,
        instituteName: user?.instituteName,
        phone1: user?.phone1,
      };
    });

    const monthWiseRevenue = [];
    for (let i = 0; i < 12; i++) {
      const month = i;
      const year = new Date().getFullYear();
      const monthOrders = orders.filter((order) => {
        const date = new Date(order.orderDate);
        return date.getMonth() === month && date.getFullYear() === year;
      });
      const monthRevenue = monthOrders.reduce((acc, order) => {
        return acc + order.paidAmount;
      }, 0);
      monthWiseRevenue.push(monthRevenue);
    }

    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json({
        thisMonthEnquiries: thisMonthEnquiries.length,
        lastMonthEnquiries: lastMonthEnquiries.length,
        thisMonthActiveUsers: thisMonthActiveUsers.length,
        lastMonthActiveUsers: lastMonthActiveUsers.length,
        thisMonthRevenue,
        lastMonthRevenue,
        thisYearRevenue,
        lastYearRevenue,
        last15Orders,
        monthWiseRevenue,
      }),
    );
  }),
];
