import { customRender } from "../../mocks/utils";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import EditPhoto from "./EditPhoto";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../Details/createMockRouter";
import { server } from "../../mocks/server";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";

afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

describe("EditPhoto component", () => {
  it("Renders correctly, Should display Edit photo heading after loading disappear", async () => {
    customRender(
      <RouterContext.Provider value={createMockRouter({ query: { id: "1" } })}>
        <EditPhoto id="1" />
      </RouterContext.Provider>,
    );
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(
      await screen.findByRole("heading", { name: "Edit Photo" }),
    ).toBeInTheDocument();
  }),
    it("Should display error message after loading disappears when there is an error", async () => {
      server.use(
        rest.get("http://localhost:3000/api/photos/1", (req, res, ctx) => {
          return res(ctx.status(500));
        }),
      );
      customRender(
        <RouterContext.Provider
          value={createMockRouter({ query: { id: "1" } })}
        >
          <EditPhoto id="1" />
        </RouterContext.Provider>,
      );
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
      expect(
        await screen.findByText("Something went wrong!"),
      ).toBeInTheDocument();
    }),
    it("when update button is clicked, it should redirect to list page on successful update", async () => {
      const pushMock = jest.fn();
      server.use(
        rest.patch("http://localhost:3000/api/photos/1", (req, res, ctx) => {
          return res(ctx.status(200));
        }),
      );
      customRender(
        <RouterContext.Provider
          value={createMockRouter({ query: { id: "1" }, push: pushMock })}
        >
          <EditPhoto id="1" />
        </RouterContext.Provider>,
      );
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
      const updateButton = await screen.findByRole("button", {
        name: "Update",
      });
      await userEvent.click(updateButton);
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/list");
    });
});
