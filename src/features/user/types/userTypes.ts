export interface Product {
  id: number;
  productName: string;
  productPrice: number;
  productDescription?: string;
  validityInMonths: number;
}

export interface ProductInOrder extends Product {
  isSelected?: boolean;
  discount?: number;
  validityFrom?: string;
  validityUntil?: string;
}
export interface Order {
  id: number;
  userId: number;
  products: ProductInOrder[];
  totalAmount: number;
  totalDiscount: number;
  payableAmount: number;
  paidAmount: number;
  dueAmount: number;
  dueDate?: string;
  orderDate: string;
  paymentMode: string;
  paidBy?: string;
  receivingAccount?: string;
}
export interface OrderList extends Order {
  instituteName: string;
  phone1: string;
}

export interface User {
  id: number;
  instituteName: string;
  ownersName?: string;
  managersName?: string;
  address: string;
  phone1: string;
  phone2?: string;
  email: string;
  website?: string;
  description?: string;
  leadType?: string;
  leadSource?: string;
  // THIS IS NOT COMING FROM USER FORM
  addedOn: string;
  userStatus: string;
}

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
