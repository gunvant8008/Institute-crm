import { mswServer } from "../../../../mocksRest/mswServer";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { customRender } from "@/mocksRest/utils";
import ProductsList from "./ProductsList";
import { products } from "@/mocksRest/handlers/productHandlers";

beforeAll(() => mswServer.listen());
afterAll(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("ProductsList Component", () => {
  beforeEach(() => {
    mswServer.use(
      rest.get("http://localhost:3000/api/products", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(products));
      }),
    );
  });
  it("renders correctly, should display Products List Heading and Add Product Button", async () => {
    customRender(<ProductsList />);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("heading", {
        name: /loading.../i,
      }),
    );
    expect(
      screen.getByRole("heading", { name: /products list/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add product/i }),
    ).toBeInTheDocument();
  }),
    it("should display add product modal & submit button when Add Product button is clicked", async () => {
      customRender(<ProductsList />);
      await waitForElementToBeRemoved(() =>
        screen.queryByRole("heading", {
          name: /loading.../i,
        }),
      );
      const addProductButton = screen.getByRole("button", {
        name: /add product/i,
      });
      await userEvent.click(addProductButton);
      expect(
        await screen.findByRole("heading", { name: /add product/i }),
      ).toBeInTheDocument();
      expect(
        await screen.findByRole("button", { name: /submit/i }),
      ).toBeInTheDocument();
    }),
    it("should display error message- 'Product name must be grater than or equal to 5 characters.' when user click submit button without entering product name", async () => {
      customRender(<ProductsList />);
      await waitForElementToBeRemoved(() =>
        screen.queryByRole("heading", {
          name: /loading.../i,
        }),
      );
      const addProductButton = screen.getByRole("button", {
        name: /add product/i,
      });
      await userEvent.click(addProductButton);
      const submitButton = screen.getByRole("button", { name: /submit/i });
      await userEvent.click(submitButton);
      expect(
        await screen.findByText(
          /product name must be grater than or equal to 5 characters./i,
        ),
      ).toBeInTheDocument();
    }),
    it("should add a new product in product list when user click on submit button after entering all the required fields", async () => {
      // REVIEW: how to use msw here
      customRender(<ProductsList />);
      await waitForElementToBeRemoved(() =>
        screen.queryByRole("heading", {
          name: /loading.../i,
        }),
      );
      const addProductButton = screen.getByRole("button", {
        name: /add product/i,
      });
      await userEvent.click(addProductButton);
      const productNameInput = screen.getByRole("textbox", {
        name: /product name/i,
      });
      await userEvent.type(productNameInput, "Product 3");
      const productPriceInput = screen.getByRole("spinbutton", {
        name: /product price/i,
      });
      await userEvent.type(productPriceInput, "30000");
      const productDescriptionInput = screen.getByRole("textbox", {
        name: /product description/i,
      });
      await userEvent.type(productDescriptionInput, "Product 3 Description");
      const productValidityInput = screen.getByRole("spinbutton", {
        name: /validity in months/i,
      });
      await userEvent.type(productValidityInput, "3");
      const submitButton = screen.getByRole("button", { name: /submit/i });
      await userEvent.click(submitButton);
      expect(
        await screen.findByRole("heading", { name: /product 3/i }),
      ).toBeInTheDocument();
    }),
    it("should display edit product modal and submit button when Edit button is clicked for first product", async () => {
      customRender(<ProductsList />);
      await waitForElementToBeRemoved(() =>
        screen.queryByRole("heading", {
          name: /loading.../i,
        }),
      );
      const editButton = screen.getAllByRole("button", { name: /edit/i });
      // selecting edit button of first product
      await userEvent.click(editButton[0]);
      expect(
        await screen.findByRole("heading", { name: /edit product/i }),
      ).toBeInTheDocument();
      expect(
        await screen.findByRole("button", { name: /submit/i }),
      ).toBeInTheDocument();
    }),
    it("should remove product from product list when user click on delete button", async () => {
      customRender(<ProductsList />);
      await waitForElementToBeRemoved(() =>
        screen.queryByRole("heading", {
          name: /loading.../i,
        }),
      );
      const product1Name = screen.getByRole("heading", {
        name: /gyanam pcmb/i,
      });
      expect(product1Name).toBeInTheDocument();
      const deleteButton = screen.getAllByRole("button", {
        name: /delete/i,
      });
      // selecting delete button of first product
      await userEvent.click(deleteButton[0]);
      expect(product1Name).not.toBeInTheDocument();
    });
});
