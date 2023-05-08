import axios from "axios";
import { DashboardData } from "../types/dashboardTypes";

const dashbardApi = axios.create({
  // baseURL: "http://localhost:3000/api/",
  baseURL: "https://institute-crm.vercel.app/api/",
});

export const getDashboardData = async (): Promise<DashboardData> => {
  return await dashbardApi
    .get("/dashboard-data")
    .then((response) => response.data as DashboardData);
};

export default dashbardApi;
