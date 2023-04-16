import { customRender } from "../../mocks/utils";
import PhotoDetails from "./PhotoDetails";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { server } from "../../mocks/server";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "./createMockRouter";

describe("PhotoDetails component", () => {
  it("should display photo details after loading disappear", async () => {
    customRender(
      <RouterContext.Provider value={createMockRouter({ query: { id: "1" } })}>
        <PhotoDetails id="1" />
      </RouterContext.Provider>,
    );
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(await screen.findByText("Album Id- 1")).toBeInTheDocument();
    expect(
      await screen.findByText("Title- My title for detail page"),
    ).toBeInTheDocument();
  });

  it("should display error message after loading disappears when there is an error", async () => {
    server.use(
      rest.get("http://localhost:3000/api/photos/1", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    customRender(
      <RouterContext.Provider value={createMockRouter({ query: { id: "1" } })}>
        <PhotoDetails id="1" />
      </RouterContext.Provider>,
    );
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(
      await screen.findByText("Something went wrong!"),
    ).toBeInTheDocument();
  });

  it("when delete button is clicked, it should redirect to list page", async () => {
    const pushMock = jest.fn();
    customRender(
      <RouterContext.Provider
        value={createMockRouter({ query: { id: "1" }, push: pushMock })}
      >
        <PhotoDetails id="1" />
      </RouterContext.Provider>,
    );

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    const deleteButton = await screen.findByRole("button", { name: "Delete" });
    await userEvent.click(deleteButton);
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/list");
  });
});
