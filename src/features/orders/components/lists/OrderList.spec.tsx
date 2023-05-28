import { mswServer } from "../../../../mocksRest/mswServer";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { customRender } from "@/mocksRest/utils";
import OrdersList from "./OrdersList";
import { orders } from "@/mocksRest/handlers/orderHandlers";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "@/mocksRest/createMockRouter";

beforeAll(() => mswServer.listen());
afterAll(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("OrdersList Component", () => {
  beforeEach(() => {
    mswServer.use(
      rest.get("http://localhost:3000/api/orders", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(orders));
      }),
    );
  });
  it("renders correctly, should display Orders List Heading", async () => {
    customRender(<OrdersList />);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("heading", {
        name: /loading.../i,
      }),
    );
    expect(
      screen.getByRole("heading", { name: /orders list/i }),
    ).toBeInTheDocument();
  }),
    it("should render list of two orders", async () => {
      customRender(<OrdersList />);
      await waitForElementToBeRemoved(() =>
        screen.queryByRole("heading", {
          name: /loading.../i,
        }),
      );
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    }),
    it("should redirect to edit order page when user click on Pay Balance button", async () => {
      customRender(
        <RouterContext.Provider value={createMockRouter({})}>
          <OrdersList />
        </RouterContext.Provider>,
      );
      await waitForElementToBeRemoved(() =>
        screen.queryByRole("heading", {
          name: /loading.../i,
        }),
      );
      const payBalanceButton = screen.getAllByRole("link", {
        name: /pay balance/i,
      });
      await userEvent.click(payBalanceButton[0]);
      expect(payBalanceButton[0]).toHaveAttribute("href", "/orders/edit/1");
    }),
    it("should redirect to  order details page and user details page when user click on Order Id and Name", async () => {
      customRender(
        <RouterContext.Provider value={createMockRouter({})}>
          <OrdersList />
        </RouterContext.Provider>,
      );
      await waitForElementToBeRemoved(() =>
        screen.queryByRole("heading", {
          name: /loading.../i,
        }),
      );
      const orderIdLink = screen.getAllByRole("link", {
        name: /order id: 1/i,
      });

      await userEvent.click(orderIdLink[0]);
      expect(orderIdLink[0]).toHaveAttribute("href", "/orders/1");
    });
});
