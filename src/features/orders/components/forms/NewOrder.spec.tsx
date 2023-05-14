import { mswServer } from "../../../../mocksRest/mswServer";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import NewOrder from "./NewOrder";
import { createMockRouter } from "@/mocksRest/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { customRender } from "@/mocksRest/utils";
import { products } from "@/mocksRest/handlers/productHandlers";
import { users } from "@/mocksRest/handlers/userHandlers";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("NewOrder Component", () => {
  beforeEach(() => {
    mswServer.use(
      rest.get("http://localhost:3000/api/users/1", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(users[0]));
      }),
      rest.get("http://localhost:3000/api/products", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(products));
      }),
    );
  });

  it("renders correctly, should display new order heading and user id is 1", async () => {
    customRender(
      <RouterContext.Provider value={createMockRouter({ query: { id: "1" } })}>
        <NewOrder id={1} />
      </RouterContext.Provider>,
    );
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(
      await screen.findByRole("heading", { name: /new order/i }),
    ).toBeInTheDocument();
    // we can expect the user id to be 1
    expect(
      await screen.findByRole("spinbutton", { name: /user id/i }),
    ).toHaveValue(1);
  }),
    it("should display Total Amount as total of selected products prices", async () => {
      customRender(
        <RouterContext.Provider
          value={createMockRouter({ query: { id: "1" } })}
        >
          <NewOrder id={1} />
        </RouterContext.Provider>,
      );
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
      // checkbox1= product 1
      const checkbox1 = screen.getByAltText("Select-0");
      await userEvent.click(checkbox1);
      let totalAmountInput = screen.getByRole("spinbutton", {
        name: /total amount/i,
      });
      expect(totalAmountInput).toHaveValue(40000);
      // checkbox2= product 2
      const checkbox2 = screen.getByAltText("Select-1");
      await userEvent.click(checkbox2);
      totalAmountInput = screen.getByRole("spinbutton", {
        name: /total amount/i,
      });
      expect(totalAmountInput).toHaveValue(60000);
    }),
    it("should display Total Amount, Total Discount, Payable Amount & Due Amount based on selected product discount and Paid Amount", async () => {
      customRender(
        <RouterContext.Provider
          value={createMockRouter({ query: { id: "1" } })}
        >
          <NewOrder id={1} />
        </RouterContext.Provider>,
      );
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
      // checkbox1= product 1
      // taking all user inputs
      const checkbox1 = screen.getByAltText("Select-0");
      await userEvent.click(checkbox1);
      const productDiscountInput = screen.getByAltText("Discount-0");
      await userEvent.type(productDiscountInput, "5000");
      const paidAmountInput = screen.getByRole("spinbutton", {
        name: /paid amount/i,
      });
      await userEvent.type(paidAmountInput, "30000");
      // checking rendered values
      const totalAmountInput = screen.getByRole("spinbutton", {
        name: /total amount/i,
      });
      expect(totalAmountInput).toHaveValue(40000);
      const totalDiscountInput = screen.getByRole("spinbutton", {
        name: /total discount/i,
      });
      expect(totalDiscountInput).toHaveValue(5000);
      const payableAmountInput = screen.getByRole("spinbutton", {
        name: /payable amount/i,
      });
      expect(payableAmountInput).toHaveValue(35000);
      const dueAmountInput = screen.getByRole("spinbutton", {
        name: /due amount/i,
      });
      expect(dueAmountInput).toHaveValue(5000);
    }),
    it("when Submit button is clicked without selecting a product then user must see an error- At least one product must be selected", async () => {
      const pushMock = jest.fn();
      mswServer.use(
        rest.post("http://localhost:3000/api/orders/new", (req, res, ctx) => {
          return res(ctx.status(200));
        }),
      ),
        customRender(
          <RouterContext.Provider value={createMockRouter({ push: pushMock })}>
            <NewOrder id={1} />
          </RouterContext.Provider>,
        );

      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
      const submitButton = screen.getByRole("button", {
        name: /submit/i,
      });
      await userEvent.click(submitButton);
      expect(
        screen.getByText("At least one product must be selected"),
      ).toBeInTheDocument();
    }),
    it("when Submit button is clicked without putting discount values in a product then user must see an error- Discount is required for selected products", async () => {
      const pushMock = jest.fn();
      mswServer.use(
        rest.post("http://localhost:3000/api/orders/new", (req, res, ctx) => {
          return res(ctx.status(200));
        }),
      ),
        customRender(
          <RouterContext.Provider value={createMockRouter({ push: pushMock })}>
            <NewOrder id={1} />
          </RouterContext.Provider>,
        );

      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
      const checkbox1 = screen.getByAltText("Select-0");
      await userEvent.click(checkbox1);
      const submitButton = screen.getByRole("button", {
        name: /submit/i,
      });
      await userEvent.click(submitButton);
      expect(
        screen.getByText("Discount is required for selected products"),
      ).toBeInTheDocument();
    }),
    it("when Submit button is clicked without putting Start From Date values in a product then user must see an error- Start From is required for selected products", async () => {
      const pushMock = jest.fn();
      mswServer.use(
        rest.post("http://localhost:3000/api/orders/new", (req, res, ctx) => {
          return res(ctx.status(200));
        }),
      ),
        customRender(
          <RouterContext.Provider value={createMockRouter({ push: pushMock })}>
            <NewOrder id={1} />
          </RouterContext.Provider>,
        );

      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
      const checkbox1 = screen.getByAltText("Select-0");
      await userEvent.click(checkbox1);
      const productDiscountInput = screen.getByAltText("Discount-0");
      await userEvent.type(productDiscountInput, "5000");
      const submitButton = screen.getByRole("button", {
        name: /submit/i,
      });
      await userEvent.click(submitButton);
      expect(
        screen.getByText("Start From is required for selected products"),
      ).toBeInTheDocument();
    }),
    it("when Submit button is clicked after putting all required values then user must redirect to /orders", async () => {
      const pushMock = jest.fn();
      mswServer.use(
        rest.post("http://localhost:3000/api/orders/new", (req, res, ctx) => {
          return res(ctx.status(200));
        }),
      ),
        customRender(
          <RouterContext.Provider value={createMockRouter({ push: pushMock })}>
            <NewOrder id={1} />
          </RouterContext.Provider>,
        );

      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
      const checkbox1 = screen.getByAltText("Select-0");
      await userEvent.click(checkbox1);
      const productDiscountInput = screen.getByAltText("Discount-0");
      await userEvent.type(productDiscountInput, "5000");
      const productStartFromInput = screen.getByAltText("Start From-0");
      await userEvent.type(productStartFromInput, "2023-01-01");
      const paidAmountInput = screen.getByRole("spinbutton", {
        name: /paid amount/i,
      });
      await userEvent.type(paidAmountInput, "30000");
      const paymentModeInput = screen.getByRole("radio", {
        name: /online/i,
      });
      await userEvent.click(paymentModeInput);
      const paidByInput = screen.getByRole("textbox", {
        name: /paid by/i,
      });
      await userEvent.type(paidByInput, "Customer");
      const receivingAccountInput = screen.getByRole("radio", {
        name: /account 1/i,
      });
      await userEvent.click(receivingAccountInput);
      const dueDateInput = screen.getByLabelText(/due date/i);
      await userEvent.type(dueDateInput, "2023-01-01");
      const submitButton = screen.getByRole("button", {
        name: /submit/i,
      });
      await userEvent.click(submitButton);
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/orders");
    });
});
