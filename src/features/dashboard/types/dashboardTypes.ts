import { OrderList } from "@/features/orders/types/orderTypes";

export interface TopCardsData {
  thisMonthEnquiries?: number;
  lastMonthEnquiries?: number;
  thisMonthActiveUsers?: number;
  lastMonthActiveUsers?: number;
  thisMonthRevenue?: number;
  lastMonthRevenue?: number;
  thisYearRevenue?: number;
  lastYearRevenue?: number;
}

export interface DashboardData extends TopCardsData {
  monthWiseRevenue: number[];
  last15Orders: OrderList[];
}
