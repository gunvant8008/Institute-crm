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

describe("EditOrder Component", () => {
  beforeEach(() => {
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
  });

  it("renders correctly, should display update order heading and user id is 1", async () => {
    customRender(
      <RouterContext.Provider value={createMockRouter({ query: { id: "1" } })}>
        <EditOrder id={1} />
      </RouterContext.Provider>,
    );
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(
      await screen.findByRole("heading", { name: /update order/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("spinbutton", { name: /user id/i }),
    ).toHaveValue(1);
  }),
    it("should render no of products purchased as 1 and other details about the purchased product like price, name, validity, discount and start from date", async () => {
      customRender(
        <RouterContext.Provider
          value={createMockRouter({ query: { id: "1" } })}
        >
          <EditOrder id={1} />
        </RouterContext.Provider>,
      );
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
      const productsList = screen.getByRole("list");
      expect(productsList).toBeInTheDocument();
      const allProducts = screen.getAllByRole("listitem");
      expect(allProducts).toHaveLength(2);
      const productPrice = screen.getByAltText(/price-0/i);
      expect(productPrice).toHaveValue(40000);
      const productName = screen.getByAltText(/product name-0/i);
      expect(productName).toHaveValue("Gyanam PCMB");
      const productValidity = screen.getByAltText(/validity-0/i);
      expect(productValidity).toHaveValue(12);
      const productDiscount = screen.getByAltText(/discount-0/i);
      expect(productDiscount).toHaveValue(10000);
      const productStartDate = screen.getByAltText(/start from-0/i);
      expect(productStartDate).toHaveValue("2023-01-30");
    }),
    it("when paid amount is updated, due amount should be updated automatically", async () => {
      customRender(
        <RouterContext.Provider
          value={createMockRouter({ query: { id: "1" } })}
        >
          <EditOrder id={1} />
        </RouterContext.Provider>,
      );
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
      const paidAmountInput = screen.getByRole("spinbutton", {
        name: /paid amount/i,
      });
      expect(paidAmountInput).toHaveValue(30000);
      const dueAmountInput = screen.getByRole("spinbutton", {
        name: /due amount/i,
      });
      expect(dueAmountInput).toHaveValue(20000);
      await userEvent.clear(paidAmountInput);
      await userEvent.type(paidAmountInput, "40000");
      expect(paidAmountInput).toHaveValue(40000);
      expect(dueAmountInput).toHaveValue(10000);
    }),
    it("when submit button is clicked, it should redirect to /user/:userId page", async () => {
      const pushMock = jest.fn();
      mswServer.use(
        rest.patch("http://localhost:3000/api/orders/1", (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(orders[0]));
        }),
      );
      customRender(
        <RouterContext.Provider value={createMockRouter({ push: pushMock })}>
          <EditOrder id={1} />
        </RouterContext.Provider>,
      );
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
      const submitButton = screen.getByRole("button", { name: /submit/i });
      expect(submitButton).toBeInTheDocument();
      await userEvent.click(submitButton);
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/user/1");
    });
});
