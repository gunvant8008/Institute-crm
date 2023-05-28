import { mswServer } from "../../../../mocksRest/mswServer";
import { rest } from "msw";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { createMockRouter } from "@/mocksRest/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { customRender } from "@/mocksRest/utils";
import { users } from "@/mocksRest/handlers/userHandlers";
import { orders } from "@/mocksRest/handlers/orderHandlers";
import { OrderDetails } from "./OrderDetails";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("OrderDetails Component", () => {
  mswServer.use(
    rest.get("http://localhost:3000/api/orders/1", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(orders[0]));
    }),
    rest.get("http://localhost:3000/api/users/1", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(users[0]));
    }),
  );
  it("should render order and user details", async () => {
    customRender(
      <RouterContext.Provider value={createMockRouter({ query: { id: "1" } })}>
        <OrderDetails id={1} />
      </RouterContext.Provider>,
    );
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(
      await screen.findByRole("heading", { name: /order #1/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /user id #1/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(
      await screen.findByRole("heading", { name: /Summary/i }),
    ).toBeInTheDocument();
  });
});
