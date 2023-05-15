import axios from "axios";
import { DashboardData } from "../types/dashboardTypes";

const dashbardApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DEV_MODE === "enabled"
      ? "http://localhost:3000/api/"
      : "https://institute-crm.vercel.app/api/",
  // baseURL: "https://institute-crm.vercel.app/api/",
});

export const getDashboardData = async () => {
  return await dashbardApi
    .get("/dashboard-data")
    .then((response) => response.data as DashboardData);
};

export default dashbardApi;
