import { screen, fireEvent } from "@testing-library/react";
import AddProductModal from "./AddProductModal";
import { customRender } from "@/mocksRest/utils";

describe("AddProductModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render the modal button with correct text", () => {
    customRender(
      <AddProductModal buttonText="Add Product" title="" className="" />,
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Add Product");
  });

  it("should open the modal when button is clicked", () => {
    customRender(
      <AddProductModal buttonText="Add Product" title="" className="" />,
    );
    const buttonElement = screen.getByRole("button", { name: "Add Product" });
    fireEvent.click(buttonElement);
    const idInput = screen.getByRole("textbox", {
      name: /id/i,
    });
    expect(idInput).toBeInTheDocument();
    expect(screen.getByLabelText("Product Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Product Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Product Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Validity in Months")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("should render the modal with correct title", () => {
    customRender(
      <AddProductModal
        title="Add Product"
        buttonText="Add Product"
        className=""
      />,
    );
    const buttonElement = screen.getByRole("button", { name: "Add Product" });
    fireEvent.click(buttonElement);
    const modalTitleElement = screen.getByRole("heading", { level: 3 });
    expect(modalTitleElement).toBeInTheDocument();
    expect(modalTitleElement).toHaveTextContent("Add Product");
  });

  it("should close the modal when close button is clicked", () => {
    customRender(
      <AddProductModal buttonText="Add Product" title="" className="" />,
    );
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    const closeButtonElement = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButtonElement);

    expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
  });
});
