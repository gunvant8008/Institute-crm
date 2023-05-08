import { rest } from "msw";
import { orders } from "./orderHandlers";
import { users } from "./userHandlers";

export const dashboardHandlers = [
  // ==================== apis for dashboard data ====================
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
