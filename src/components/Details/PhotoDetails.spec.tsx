import { customRender } from "../../mocks/utils";
import PhotoDetails from "./PhotoDetails";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { server } from "../../mocks/server";
import { rest } from "msw";

describe("PhotoDetails component", () => {
  it("should display photo details after loading disappear", async () => {
    customRender(<PhotoDetails id="1" />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(await screen.findByText("Album Id- 1")).toBeInTheDocument();
    expect(
      await screen.findByText("Title- My title for detail page"),
    ).toBeInTheDocument();
  });

  it("should display error message after loading disappears when there is an error", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/photos/:id",
        (req, res, ctx) => {
          return res(ctx.status(500));
        },
      ),
    );
    customRender(<PhotoDetails id="1" />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(
      await screen.findByText("Something went wrong!"),
    ).toBeInTheDocument();
  });
});
