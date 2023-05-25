import { mswServer } from "@/mocksRest/mswServer";
import EditProductModal from "./EditProductModal";
import { customRender } from "@/mocksRest/utils";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { products } from "@/mocksRest/handlers/productHandlers";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";

describe("EditProductModal", () => {
  it("should render the modal button with correct text, title with correct text and product id with correct number when edit button is clicked", async () => {
    mswServer.use(
      rest.get("http://localhost:3000/api/products/1", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(products[0]));
      }),
    );

    customRender(
      <EditProductModal buttonText="Edit" title="Edit Product" id={12} />,
    );
    const editButton = screen.getByRole("button", { name: "Edit" });
    expect(editButton).toBeInTheDocument();
    await userEvent.click(editButton);
    const title = screen.getByRole("heading", { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Edit Product");
    const idInput = screen.getByRole("textbox", {
      name: /id/i,
    });
    expect(idInput).toBeInTheDocument();
    expect(idInput).toHaveAttribute("placeholder", "12");
  });
  // it("should render modal with correct product name, price, description and validity in months when edit button is clicked", async () => {
  //   mswServer.use(
  //     rest.get("http://localhost:3000/api/products/1", (req, res, ctx) => {
  //       return res(ctx.status(200), ctx.json(products[0]))
  //     })
  //   )

  //   customRender(
  //     <EditProductModal buttonText="Edit" title="Edit Product" id={1} />
  //   )
  //   const editButton = screen.getByRole("button", { name: "Edit" })
  //   expect(editButton).toBeInTheDocument()
  //   await userEvent.click(editButton)
  //   const productName = screen.getByRole("textbox", {
  //     name: /product name/i
  //   })
  //   const productPrice = screen.getByRole("spinbutton", {
  //     name: /product price/i
  //   })
  //   const productDescription = screen.getByRole("textbox", {
  //     name: /product description/i
  //   })
  //   const validityInMonths = screen.getByRole("spinbutton", {
  //     name: /validity in months/i
  //   })
  //   expect(productName).toBeInTheDocument()
  //   expect(productName).toHaveValue("Gyanam PCMB")
  //   expect(productPrice).toBeInTheDocument()
  //   expect(productPrice).toHaveValue(40000)
  //   expect(productDescription).toBeInTheDocument()
  //   expect(productDescription).toHaveValue("Test paper generator for PCMB")
  //   expect(validityInMonths).toBeInTheDocument()
  //   expect(validityInMonths).toHaveValue(12)
  // })
});
