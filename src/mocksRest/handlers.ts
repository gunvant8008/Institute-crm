import { rest } from "msw";
import { Order, Product, User } from "@/features/user/types/userTypes";

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

const orders: Order = [
  {
    id: 1,
    userId: 1,
    products: [
      {
        id: 1,
        productName: "Gyanam PCMB",
        productPrice: 40000,
        discount: 10000,
        productDescription: "Test paper generator for PCMB",
        validityInMonths: "12 Months",
        validityFrom: "2023-01-30",
        validityUntil: "2024-01-30",
      },
      {
        id: 2,
        productName: "Gyanam CRM",
        productPrice: 20000,
        discount: 0,
        productDescription: "Manage your leads and customers",
        validityInMonths: "12 Months",
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
        productName: "Gyanam PCMB",
        productPrice: 40000,
        productDescription: "Test paper generator for PCMB",
        validityInMonths: "12 Months",
        validityFrom: "2023-01-30",
        validityUntil: "2024-01-30",
      },
    ],
    totalAmount: 40000,
    totalDiscount: 10000,
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
  // api for this month created users
  // REVIEW: this api returns 404 if we use "users" rather than "users-data"
  rest.get("/api/users-data/this-month", async (req, res, ctx) => {
    const thisMonthUsers = users.filter((user) => {
      const date = new Date(user.addedOn);
      const month = date.getMonth();
      const year = date.getFullYear();
      const today = new Date();
      return month === today.getMonth() && year === today.getFullYear();
    });
    return res(ctx.status(200), ctx.delay(200), ctx.json(thisMonthUsers));
  }),
  // api for last month created users
  rest.get("/api/users-data/last-month", (req, res, ctx) => {
    const lastMonthUsers = users.filter((user) => {
      const date = new Date(user.addedOn);
      const month = date.getMonth();
      const year = date.getFullYear();
      const today = new Date();
      return month === today.getMonth() - 1 && year === today.getFullYear();
    });
    return res(ctx.status(200), ctx.delay(200), ctx.json(lastMonthUsers));
  }),
  // api for year to date created users
  rest.get("/api/users-data/year-to-date", (req, res, ctx) => {
    const yearToDateUsers = users.filter((user) => {
      const date = new Date(user.addedOn);
      const year = date.getFullYear();
      const today = new Date();
      return year === today.getFullYear();
    });
    return res(ctx.status(200), ctx.delay(200), ctx.json(yearToDateUsers));
  }),
  // api for most recent 15 users
  rest.get("/api/users-data/recent", (req, res, ctx) => {
    const recentUsers = users.slice(0, 15);
    return res(ctx.status(200), ctx.delay(200), ctx.json(recentUsers));
  }),
  // api for this month's revenue
  // rest.get("/api/revenue/this-month", (req, res, ctx) => {
  //   const thisMonthUsers = users.filter(user => {
  //     const date = new Date(user.addedOn)
  //     const month = date.getMonth()
  //     const year = date.getFullYear()
  //     const today = new Date()
  //     return month === today.getMonth() && year === today.getFullYear()
  //   })
  //   const revenue = thisMonthUsers.reduce((acc, user) => {
  //     return acc + user.amountPaid
  //   }, 0)
  //   return res(ctx.status(200), ctx.delay(200), ctx.json(revenue))
  // }),
  // api for last month's revenue
  // rest.get("/api/revenue/last-month", (req, res, ctx) => {
  //   const lastMonthUsers = users.filter(user => {
  //     const date = new Date(user.datePurchased)
  //     const month = date.getMonth()
  //     const year = date.getFullYear()
  //     const today = new Date()
  //     return month === today.getMonth() - 1 && year === today.getFullYear()
  //   })
  //   const revenue = lastMonthUsers.reduce((acc, user) => {
  //     return acc + user.amountPaid
  //   }, 0)
  //   return res(ctx.status(200), ctx.delay(200), ctx.json(revenue))
  // }),
  // api for month wise revenue for full year
  // rest.get("/api/revenue/month-wise", (req, res, ctx) => {
  //   const monthWiseRevenue = []
  //   for (let i = 0; i < 12; i++) {
  //     const monthUsers = users.filter(user => {
  //       const date = new Date(user.datePurchased)
  //       const month = date.getMonth()
  //       const year = date.getFullYear()
  //       const today = new Date()
  //       return month === i && year === today.getFullYear()
  //     })
  //     const revenue = monthUsers.reduce((acc, user) => {
  //       return acc + user.amountPaid
  //     }, 0)
  //     monthWiseRevenue.push(revenue)
  //   }
  //   return res(ctx.status(200), ctx.delay(200), ctx.json(monthWiseRevenue))
  // }),
  // api for year to date revenue
  // rest.get("/api/revenue/year-to-date", (req, res, ctx) => {
  //   const yearToDateUsers = users.filter(user => {
  //     const date = new Date(user.datePurchased)
  //     const year = date.getFullYear()
  //     const today = new Date()
  //     return year === today.getFullYear()
  //   })
  //   const revenue = yearToDateUsers.reduce((acc, user) => {
  //     return acc + user.amountPaid
  //   }, 0)
  //   return res(ctx.status(200), ctx.delay(200), ctx.json(revenue))
  // }),
  // // api for last year's revenue
  // rest.get("/api/revenue/last-year", (req, res, ctx) => {
  //   const lastYearUsers = users.filter(user => {
  //     const date = new Date(user.datePurchased)
  //     const year = date.getFullYear()
  //     const today = new Date()
  //     return year === today.getFullYear() - 1
  //   })
  //   const revenue = lastYearUsers.reduce((acc, user) => {
  //     return acc + user.amountPaid
  //   }, 0)
  //   return res(ctx.status(200), ctx.delay(200), ctx.json(revenue))
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
];
