import { mswServer } from "../../../../mocksRest/mswServer";
import { rest } from "msw";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { createMockRouter } from "@/mocksRest/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { customRender } from "@/mocksRest/utils";
import { users } from "@/mocksRest/handlers/userHandlers";
import UserDetails from "./UserDetails";
import { orders } from "@/mocksRest/handlers/orderHandlers";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("UserDetails Component", () => {
  mswServer.use(
    rest.get("http://localhost:3000/api/users/1", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(users[0]));
    }),
    rest.get("http://localhost:3000/api/users/1/orders", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([orders[0]]));
    }),
  );
  it("should render user id, edit and delete button", async () => {
    customRender(
      <RouterContext.Provider value={createMockRouter({ query: { id: "1" } })}>
        <UserDetails id={1} />
      </RouterContext.Provider>,
    );
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(
      await screen.findByRole("heading", { name: /user id- 1/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: /edit/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /delete/i }),
    ).toBeInTheDocument();
  });
});
