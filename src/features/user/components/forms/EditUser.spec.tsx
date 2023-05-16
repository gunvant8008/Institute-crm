import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "@/mocksRest/createMockRouter";
import EditUser from "./EditUser";
import { customRender } from "@/mocksRest/utils";
import { mswServer } from "@/mocksRest/mswServer";
import { rest } from "msw";
import { users } from "@/mocksRest/handlers/userHandlers";
import userEvent from "@testing-library/user-event";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("EditUser Component", () => {
  it("renders correctly, should display Update User heading, Update User button and user id number in user id input", async () => {
    mswServer.use(
      rest.get("http://localhost:3000/api/users/1", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(users[0]));
      }),
    );
    customRender(
      <RouterContext.Provider value={createMockRouter({})}>
        <EditUser id={1} />
      </RouterContext.Provider>,
    );
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(
      screen.getByRole("heading", { name: /update user/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /update user/i }),
    ).toBeInTheDocument();

    const idInput = await screen.findByRole("spinbutton", {
      name: /id/i,
    });
    expect(idInput).toBeInTheDocument();
    expect(idInput).toHaveValue(1);
  }),
    it("should redirect to /enquiries when user click on Update User button with all the data filled if all the data is valid", async () => {
      const pushMock = jest.fn();
      mswServer.use(
        rest.get("http://localhost:3000/api/users/1", (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(users[0]));
        }),
      );
      customRender(
        <RouterContext.Provider value={createMockRouter({ push: pushMock })}>
          <EditUser id={1} />
        </RouterContext.Provider>,
      );
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
      const updateUserButton = screen.getByRole("button", {
        name: /update user/i,
      });
      await userEvent.click(updateUserButton);
      expect(pushMock).toHaveBeenCalledWith("/enquiries");
    });
});
