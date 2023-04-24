import { rest } from "msw";
import { TUser } from "@/features/user/types/userTypes";

let users: TUser[] = [
  {
    id: 1,
    fullName: "User 1",
    instituteName: "University of California",
    city: "Los Angeles",
    phone: "1234567890",
    email: "johndoe@gmail.com",
    mathsPurchased: true,
    biologyPurchased: false,
    chemistryPurchased: false,
    physicsPurchased: false,
    amountPaid: 8000,
    discountGiven: 2000,
    amountDue: 0,
    datePurchased: "2023-03-01",
    validity: "2023-01-30",
    dueDate: "2022-06-30",
  },
  {
    id: 2,
    fullName: "User 2",
    instituteName: "University of California",
    city: "Los Angeles",
    phone: "1234567890",
    email: "johndoe@gmail.com",
    mathsPurchased: false,
    biologyPurchased: true,
    chemistryPurchased: true,
    physicsPurchased: true,
    amountPaid: 20000,
    discountGiven: 10000,
    amountDue: 0,
    datePurchased: "2023-03-10",
    validity: "2023-01-30",
    dueDate: "2022-06-030",
  },
  {
    id: 3,
    fullName: "User 3",
    instituteName: "University of California",
    city: "Los Angeles",
    phone: "1234567890",
    email: "johndoe@gmail.com",
    mathsPurchased: true,
    biologyPurchased: false,
    chemistryPurchased: false,
    physicsPurchased: false,
    amountPaid: 5000,
    discountGiven: 2000,
    amountDue: 3000,
    datePurchased: "2023-03-10",
    validity: "2023-01-30",
    dueDate: "2022-06-030",
  },
  {
    id: 4,
    fullName: "User 4",
    instituteName: "University of California",
    city: "Los Angeles",
    phone: "1234567890",
    email: "johndoe@gmail.com",
    mathsPurchased: true,
    biologyPurchased: true,
    chemistryPurchased: true,
    physicsPurchased: true,
    amountPaid: 20000,
    discountGiven: 5000,
    amountDue: 5000,
    datePurchased: "2023-04-10",
    validity: "2023-01-30",
    dueDate: "2022-06-030",
  },
  {
    id: 5,
    fullName: "User 5",
    instituteName: "University of California",
    city: "Los Angeles",
    phone: "1234567890",
    email: "johndoe@gmail.com",
    mathsPurchased: false,
    biologyPurchased: false,
    chemistryPurchased: false,
    physicsPurchased: false,
    amountPaid: 0,
    discountGiven: 0,
    amountDue: 0,
    datePurchased: "2023-04-10",
    validity: "2023-01-30",
    dueDate: "2022-06-030",
  },
];

let lastUserId = users.length + 1;

export const handlers = [
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
    const newUser: TUser = await req.json();
    newUser.id = ++lastUserId;
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
    const reqBody: TUser = await req.json();
    const user = users.find((user) => user.id === id);
    if (user) {
      // REVIEW: is there a better way to do this?
      user.fullName = reqBody.fullName;
      user.instituteName = reqBody.instituteName;
      user.city = reqBody.city;
      user.phone = reqBody.phone;
      user.email = reqBody.email;
      user.mathsPurchased = reqBody.mathsPurchased;
      user.biologyPurchased = reqBody.biologyPurchased;
      user.physicsPurchased = reqBody.physicsPurchased;
      user.chemistryPurchased = reqBody.chemistryPurchased;
      user.amountPaid = reqBody.amountPaid;
      user.discountGiven = reqBody.discountGiven;
      user.amountDue = reqBody.amountDue;
      user.datePurchased = reqBody.datePurchased;
      user.validity = reqBody.validity;
      user.dueDate = reqBody.dueDate;
      return res(
        ctx.status(200),
        ctx.delay(100),
        ctx.json({ message: "User updated" }),
      );
    } else {
      return res(
        ctx.status(404),
        ctx.delay(500),
        ctx.json({ message: "User not found" }),
      );
    }
  }),
  // api for this month created users
  // REVIEW: this api returns 404 if we use "users" rather than "users-data"
  rest.get("/api/users-data/this-month", async (req, res, ctx) => {
    const thisMonthUsers = users.filter((user) => {
      const date = new Date(user.datePurchased);
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
      const date = new Date(user.datePurchased);
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
      const date = new Date(user.datePurchased);
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
  rest.get("/api/revenue/this-month", (req, res, ctx) => {
    const thisMonthUsers = users.filter((user) => {
      const date = new Date(user.datePurchased);
      const month = date.getMonth();
      const year = date.getFullYear();
      const today = new Date();
      return month === today.getMonth() && year === today.getFullYear();
    });
    const revenue = thisMonthUsers.reduce((acc, user) => {
      return acc + user.amountPaid;
    }, 0);
    return res(ctx.status(200), ctx.delay(200), ctx.json(revenue));
  }),
  // api for last month's revenue
  rest.get("/api/revenue/last-month", (req, res, ctx) => {
    const lastMonthUsers = users.filter((user) => {
      const date = new Date(user.datePurchased);
      const month = date.getMonth();
      const year = date.getFullYear();
      const today = new Date();
      return month === today.getMonth() - 1 && year === today.getFullYear();
    });
    const revenue = lastMonthUsers.reduce((acc, user) => {
      return acc + user.amountPaid;
    }, 0);
    return res(ctx.status(200), ctx.delay(200), ctx.json(revenue));
  }),
  // api for month wise revenue for full year
  rest.get("/api/revenue/month-wise", (req, res, ctx) => {
    const monthWiseRevenue = [];
    for (let i = 0; i < 12; i++) {
      const monthUsers = users.filter((user) => {
        const date = new Date(user.datePurchased);
        const month = date.getMonth();
        const year = date.getFullYear();
        const today = new Date();
        return month === i && year === today.getFullYear();
      });
      const revenue = monthUsers.reduce((acc, user) => {
        return acc + user.amountPaid;
      }, 0);
      monthWiseRevenue.push(revenue);
    }
    return res(ctx.status(200), ctx.delay(200), ctx.json(monthWiseRevenue));
  }),
  // api for year to date revenue
  rest.get("/api/revenue/year-to-date", (req, res, ctx) => {
    const yearToDateUsers = users.filter((user) => {
      const date = new Date(user.datePurchased);
      const year = date.getFullYear();
      const today = new Date();
      return year === today.getFullYear();
    });
    const revenue = yearToDateUsers.reduce((acc, user) => {
      return acc + user.amountPaid;
    }, 0);
    return res(ctx.status(200), ctx.delay(200), ctx.json(revenue));
  }),
  // api for last year's revenue
  rest.get("/api/revenue/last-year", (req, res, ctx) => {
    const lastYearUsers = users.filter((user) => {
      const date = new Date(user.datePurchased);
      const year = date.getFullYear();
      const today = new Date();
      return year === today.getFullYear() - 1;
    });
    const revenue = lastYearUsers.reduce((acc, user) => {
      return acc + user.amountPaid;
    }, 0);
    return res(ctx.status(200), ctx.delay(200), ctx.json(revenue));
  }),
];
