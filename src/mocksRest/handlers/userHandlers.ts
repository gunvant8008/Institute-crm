import { rest } from "msw";
import { User } from "@/features/user/types/userTypes";
import { orders } from "./orderHandlers";

export let users: User[] = [
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

let lastUserId = users.length + 1;
// let lastProductId = products.length + 1;

export const userHandlers = [
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
];
