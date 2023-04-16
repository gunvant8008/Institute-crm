import { customRender } from "../../mocks/utils";
import { screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../Details/createMockRouter";
import { server } from "../../mocks/server";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import NewPhoto from "./NewPhoto";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

describe("NewPhoto component", () => {
  const pushMock = jest.fn();
  it("Renders correctly, Should display Create Photo heading", async () => {
    customRender(
      <RouterContext.Provider value={createMockRouter({ push: pushMock })}>
        <NewPhoto />
      </RouterContext.Provider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Create Photo" }),
    ).toBeInTheDocument();
  }),
    it("Should display error message if there is an error from server after clicking add photo button", async () => {
      const pushMock = jest.fn();
      server.use(
        rest.post("http://localhost:3000/api/photos/new", (req, res, ctx) => {
          return res(ctx.status(500));
        }),
      );
      customRender(
        <RouterContext.Provider value={createMockRouter({ push: pushMock })}>
          <NewPhoto />
        </RouterContext.Provider>,
      );
      const addButton = await screen.findByRole("button", {
        name: "Add Photo",
      });
      await userEvent.click(addButton);
      expect(
        await screen.findByText("Something went wrong!"),
      ).toBeInTheDocument();
    }),
    it("when Add Photo button is clicked, it should redirect to list page on successful creation", async () => {
      const pushMock = jest.fn();
      server.use(
        rest.post("http://localhost:3000/api/photos/new", (req, res, ctx) => {
          return res(ctx.status(200));
        }),
      );
      customRender(
        <RouterContext.Provider value={createMockRouter({ push: pushMock })}>
          <NewPhoto />
        </RouterContext.Provider>,
      );
      // await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))
      const addButton = await screen.findByRole("button", {
        name: "Add Photo",
      });
      await userEvent.click(addButton);
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/list");
    });
});
