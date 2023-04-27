const products = [
  {
    id: 1,
    productName: "Gyanam PCMB",
    productPrice: 40000,
    productDescription: "Test paper generator for PCMB",
    validityInMonths: "12 Months",
  },
  {
    id: 2,
    productName: "Gyanam CRM",
    productPrice: 20000,
    productDescription: "Manage your leads and customers",
    validityInMonths: "12 Months",
  },
];

const orders = [
  {
    id: 1,
    user_id: 1,
    products: [
      {
        id: 1,
        productName: "Gyanam PCMB",
        productPrice: 40000,
        productDescription: "Test paper generator for PCMB",
        validityInMonths: "12 Months",
        validityFrom: "2023-01-30",
        validityUntil: "2024-01-30",
      },
      {
        id: 2,
        productName: "Gyanam CRM",
        productPrice: 20000,
        productDescription: "Manage your leads and customers",
        validityInMonths: "12 Months",
        validityFrom: "2023-01-30",
        validityUntil: "2024-01-30",
      },
    ],
    totalAmount: 60000,
    discount: 10000,
    payableAmount: 50000,
    paidAmount: 30000,
    dueAmount: 20000,
    dueDate: "2022-06-30",
    orderDate: "2023-03-01",
    paymentMode: "Online",
    paidBy: "John Doe",
    receivingAccount: "Current Account 1",
  },
  {
    id: 2,
    user_id: 2,
    products: [
      {
        id: 1,
        productName: "Gyanam PCMB",
        productPrice: 40000,
        productDescription: "Test paper generator for PCMB",
        validityInMonths: "12 Months",
        validityFrom: "2023-01-30",
        validityUntil: "2024-01-30",
      },
    ],
    totalAmount: 40000,
    discount: 10000,
    paidAmount: 20000,
    dueAmount: 10000,
    dueDate: "2023-06-30",
    orderDate: "2023-03-01",
    paymentMode: "UPI",
    paidBy: "John Doe",
    receivingAccount: "Current Account 2",
  },
];
const users = [
  {
    id: 1,
    instituteName: "University of California",
    ownerName: "User 1",
    managerName: "Manager 1",
    address: "California",
    phone1: "1234567890",
    phone2: "1234567890",
    email: "johndoe@gmail.com",
    description: "This is an enquiry description",
    addedOn: "2023-03-01",
    leadType: "Hot",
    source: "Google",
    userStatus: "ACTIVE",
  },
  {
    id: 2,
    instituteName: "University of Los Angeles",
    ownerName: "User 2",
    managerName: "Manager 3",
    address: "Los Angeles",
    phone1: "1234567890",
    phone2: "1234567890",
    email: "johndoe@gmail.com",
    description: "This is an enquiry description",
    addedOn: "2023-04-01",
    leadType: "Warm",
    source: "Website",
    userStatus: "ACTIVE",
  },
  {
    id: 2,
    instituteName: "University of Los Angeles",
    ownerName: "User 2",
    managerName: "Manager 3",
    address: "Los Angeles",
    phone1: "1234567890",
    phone2: "1234567890",
    email: "johndoe@gmail.com",
    description: "This is an enquiry description",
    addedOn: "2023-04-01",
    leadType: "Warm",
    source: "Website",
    userStatus: "ACTIVE",
  },
];

const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a description for Product 1",
    price: 10.99,
    quantity: 100,
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is a description for Product 2",
    price: 15.99,
    quantity: 50,
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is a description for Product 3",
    price: 20.99,
    quantity: 75,
  },
];

const mockOrders = [
  {
    id: 1,
    user_id: 1,
    products: [
      {
        id: 1,
        quantity: 2,
      },
      {
        id: 2,
        quantity: 1,
      },
    ],
    total: 37.97,
    created_at: "2023-04-24 10:30:00",
  },
  {
    id: 2,
    user_id: 2,
    products: [
      {
        id: 2,
        quantity: 3,
      },
      {
        id: 3,
        quantity: 2,
      },
    ],
    total: 87.94,
    created_at: "2023-04-23 14:15:00",
  },
  {
    id: 3,
    user_id: 3,
    products: [
      {
        id: 1,
        quantity: 1,
      },
      {
        id: 3,
        quantity: 1,
      },
    ],
    total: 31.98,
    created_at: "2023-04-22 18:45:00",
  },
];

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "password1",
    address: "123 Main St, Anytown USA",
    phone: "555-1234",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    password: "password2",
    address: "456 Oak St, Anytown USA",
    phone: "555-5678",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bobjohnson@gmail.com",
    password: "password3",
    address: "789 Elm St, Anytown USA",
    phone: "555-9012",
  },
];
