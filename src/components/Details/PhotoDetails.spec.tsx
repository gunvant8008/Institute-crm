import { customRender } from "../../mocks/utils";
import PhotoDetails from "./PhotoDetails";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { server } from "../../mocks/server";
import { rest } from "msw";
import { useRouter } from "next/router";
import userEvent from "@testing-library/user-event";

// jest.mock("next/router", () => ({
//   useRouter() {
//     return {
//       route: "/",
//       pathname: "",
//       query: "",
//       asPath: "",
//       push: jest.fn(),
//       events: {
//         on: jest.fn(),
//         off: jest.fn()
//       },
//       beforePopState: jest.fn(() => null),
//       prefetch: jest.fn(() => null)
//     }
//   }
// }))
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockedRouter = jest.mocked(useRouter as jest.Mock);

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

  it("when delete button is clicked, it should redirect to list page", async () => {
    const pushMock = jest.fn();
    mockedRouter.mockReturnValue({
      query: {},
      // return mock for push method
      push: pushMock,
    });

    customRender(<PhotoDetails id="1" />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    const deleteButton = await screen.findByText("Delete");
    // fireEvent.click(deleteButton)
    await userEvent.click(deleteButton);
    expect(mockedRouter).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalled();
  });
});
