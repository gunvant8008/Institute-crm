// type TSubjectPurchased = {
//   maths: boolean;
//   biology: boolean;
//   chemistry: boolean;
//   physics: boolean;
// };
// type TPaymentStatus = {
//   amountPaid: number;
//   discountGiven: number;
//   amountDue: number;
//   datePurchased: Date;
//   validity: Date;
//   dueDate: Date;
// };

export interface Product {
  id: number;
  productName: string;
  productPrice: number;
  productDescription?: string;
  validityInMonths: number;
}

export interface ProductInOrder extends Product {
  discount?: number;
  validityFrom: string;
  validityUntil: string;
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
