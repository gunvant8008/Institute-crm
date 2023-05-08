import { setupServer } from "msw/node";

import { productHandlers } from "./handlers/productHandlers";
import { orderHandlers } from "./handlers/orderHandlers";
import { userHandlers } from "./handlers/userHandlers";
import { dashboardHandlers } from "./handlers/dashboardHandlers";

export const mswServer = setupServer(
  ...productHandlers,
  ...orderHandlers,
  ...userHandlers,
  ...dashboardHandlers,
);
