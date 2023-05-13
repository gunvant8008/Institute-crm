import { mswServer } from "../../../../mocksRest/mswServer";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import EditOrder from "./EditOrder";
import { customRender } from "@/mocksRest/utils";
import { createMockRouter } from "@/mocksRest/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { users } from "@/mocksRest/handlers/userHandlers";
import { orders } from "@/mocksRest/handlers/orderHandlers";

// Establish API mocking before all tests.
beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => mswServer.close());

it("renders correctly, should display update order heading", async () => {
  // const pushMock = jest.fn();
  mswServer.use(
    rest.get("http://localhost:3000/api/orders/1", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(orders[0]));
    }),
    rest.get("http://localhost:3000/api/products", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(orders[0].products));
    }),
    rest.get("http://localhost:3000/api/users/1", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(users[0]));
    }),
  );
  customRender(
    <RouterContext.Provider value={createMockRouter({ query: { id: "1" } })}>
      <EditOrder id={1} />
    </RouterContext.Provider>,
  );
  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
  expect(
    await screen.findByRole("heading", { name: /update order/i }),
  ).toBeInTheDocument();
});