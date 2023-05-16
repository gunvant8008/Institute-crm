import { customRender } from "@/mocksRest/utils";
import AddEnquiry from "./AddEnquiry";
import { screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "@/mocksRest/createMockRouter";
import userEvent from "@testing-library/user-event";

describe("AddEnquiry Component", () => {
  it("renders correctly, should display Add Enquiry heading and Add Enquiry button", async () => {
    customRender(
      <RouterContext.Provider value={createMockRouter({})}>
        <AddEnquiry />
      </RouterContext.Provider>,
    );
    expect(
      await screen.findByRole("heading", { name: /add enquiry/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /add enquiry/i }),
    ).toBeInTheDocument();
  }),
    it("should display error 'Institute Name must contain at least 5 character(s)' when user click add enquiry button without filling institute name & should also get error 'Invalid email' when user enter invalid email", async () => {
      customRender(
        <RouterContext.Provider value={createMockRouter({})}>
          <AddEnquiry />
        </RouterContext.Provider>,
      );
      const buttonElement = screen.getByRole("button", { name: "Add Enquiry" });
      await userEvent.click(buttonElement);
      expect(
        await screen.findByText(
          "Institute Name must contain at least 5 character(s)",
        ),
      ).toBeInTheDocument();
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      await userEvent.type(emailInput, "abc");
      await userEvent.click(buttonElement);
      expect(await screen.findByText("Invalid email")).toBeInTheDocument();
    }),
    it("should redirect to /enquiries when user click on Add Enquiry button with all the data filled if all the data is valid", async () => {
      const pushMock = jest.fn();
      customRender(
        <RouterContext.Provider value={createMockRouter({ push: pushMock })}>
          <AddEnquiry />
        </RouterContext.Provider>,
      );

      const instituteNameInput = screen.getByRole("textbox", {
        name: /institute name/i,
      });
      await userEvent.type(instituteNameInput, "abcde");
      const ownerNameInput = screen.getByRole("textbox", {
        name: /owner's name/i,
      });
      await userEvent.type(ownerNameInput, "abcde");
      const managerNameInput = screen.getByRole("textbox", {
        name: /manager's name/i,
      });
      await userEvent.type(managerNameInput, "abcde");
      const addressInput = screen.getByRole("textbox", {
        name: /address/i,
      });
      await userEvent.type(addressInput, "abcde");
      const phone1Input = screen.getByPlaceholderText(/phone 1/i);
      await userEvent.type(phone1Input, "1234567890");
      const phone2Input = screen.getByPlaceholderText(/phone 2/i);
      await userEvent.type(phone2Input, "1234567890");
      const emailInput = screen.getByRole("textbox", {
        name: /email/i,
      });
      await userEvent.type(emailInput, "abc@abc.com");
      const websiteInput = screen.getByRole("textbox", {
        name: /website/i,
      });
      await userEvent.type(websiteInput, "abc.com");
      const descriptionInput = screen.getByRole("textbox", {
        name: /description/i,
      });
      await userEvent.type(descriptionInput, "abcde");
      const addEnquiryButton = screen.getByRole("button", {
        name: "Add Enquiry",
      });
      await userEvent.click(addEnquiryButton);
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/enquiries");
    });
});

// mocking use form hook
// eslint-disable-next-line jest/no-commented-out-tests
/*
import { useForm } from "react-hook-form";

jest.mock("react-hook-form");

describe("Page...", () => {
  const mockUseForm = useForm as jest.Mock;
  beforeEach(() => {`
    mockUseForm.mockImplementation(() => ({
      handleSubmit: jest.fn(),
      formState: { errors: {}, isDirty: true, isSubmitting: false, isValid: true },
      register: jest.fn(),
      watch: jest.fn(),
      ...rest
    }));
  });
})
*/
