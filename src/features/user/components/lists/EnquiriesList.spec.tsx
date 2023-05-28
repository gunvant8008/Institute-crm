import { mswServer } from "../../../../mocksRest/mswServer";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { customRender } from "@/mocksRest/utils";
import { users } from "@/mocksRest/handlers/userHandlers";
import EnquiriesList from "./EnquiriesList";

beforeAll(() => mswServer.listen());
afterAll(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("EnquiriesList Component", () => {
  beforeEach(() => {
    mswServer.use(
      rest.get("http://localhost:3000/api/users/enquiries", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(users.filter((user) => user.userStatus === "ENQUIRY")),
        );
      }),
    );
  });
  it("renders correctly, should display Enquiries List Heading and Add Enquiry Button", async () => {
    customRender(<EnquiriesList />);
    await waitForElementToBeRemoved(() =>
      screen.queryByRole("heading", {
        name: /loading.../i,
      }),
    );
    expect(
      screen.getByRole("heading", { name: /enquiries list/i }),
    ).toBeInTheDocument();
    const addEnquiryButton = screen.getByRole("link", {
      name: /add enquiry/i,
    });
    expect(addEnquiryButton).toBeInTheDocument();
    expect(addEnquiryButton).toHaveAttribute("href", "/enquiries/new");
  }),
    it("View and Add Services buttons links should have hfref attributes '/user/5 & /orders/new/5' respectively", async () => {
      customRender(<EnquiriesList />);
      await waitForElementToBeRemoved(() =>
        screen.queryByRole("heading", {
          name: /loading.../i,
        }),
      );
      const viewUserButtonLink = screen.getByRole("link", {
        name: /view/i,
      });
      expect(viewUserButtonLink).toBeInTheDocument();
      expect(viewUserButtonLink).toHaveAttribute("href", "/user/5");
      const addServicesButtonLink = screen.getByRole("link", {
        name: /add services/i,
      });
      expect(addServicesButtonLink).toBeInTheDocument();
      expect(addServicesButtonLink).toHaveAttribute("href", "/orders/new/5");
    });
});
