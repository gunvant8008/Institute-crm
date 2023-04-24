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

export type TUser = {
  id: number;
  fullName: string;
  instituteName: string;
  city: string;
  phone: string;
  email: string;
  mathsPurchased: boolean;
  biologyPurchased: boolean;
  chemistryPurchased: boolean;
  physicsPurchased: boolean;
  amountPaid: number;
  discountGiven: number;
  amountDue: number;
  datePurchased: Date | string | undefined;
  validity: Date | string | undefined;
  dueDate: Date | string | undefined;
};
