import { setupWorker } from "msw";

import { productHandlers } from "./handlers/productHandlers";
import { orderHandlers } from "./handlers/orderHandlers";
import { userHandlers } from "./handlers/userHandlers";
import { dashboardHandlers } from "./handlers/dashboardHandlers";

export const mswWorker = setupWorker(
  ...productHandlers,
  ...orderHandlers,
  ...userHandlers,
  ...dashboardHandlers,
);
