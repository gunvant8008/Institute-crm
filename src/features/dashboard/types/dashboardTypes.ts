import { OrderList } from "@/features/orders/types/orderTypes";

export interface DashboardData {
  thisMonthEnquiries: number;
  lastMonthEnquiries: number;
  thisMonthActiveUsers: number;
  lastMonthActiveUsers: number;
  thisMonthRevenue: number;
  lastMonthRevenue: number;
  thisYearRevenue: number;
  lastYearRevenue: number;
  monthWiseRevenue: number[];
  last15Orders: OrderList[];
}
