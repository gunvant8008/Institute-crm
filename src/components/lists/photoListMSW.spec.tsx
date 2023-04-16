import PhotoList from "./PhotoList";
import { customRender } from "../../mocks/utils";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { server } from "../../mocks/server";
import { rest } from "msw";

describe("PhotoList component", () => {
  it("should display a list of photos after loading disappear", async () => {
    server.use(
      rest.get("http://localhost:3000/api/photos", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            {
              albumId: 1,
              id: 1,
              title: "accusamus beatae ad facilis cum similique qui sunt",
              url: "https://via.placeholder.com/600/92c952",
              thumbnailUrl: "https://via.placeholder.com/150/92c952",
            },
            {
              albumId: 1,
              id: 2,
              title: "My title",
              url: "https://via.placeholder.com/600/771796",
              thumbnailUrl: "https://via.placeholder.com/150/771796",
            },
          ]),
        );
      }),
    ),
      customRender(<PhotoList />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(await screen.findByText("List of photos")).toBeInTheDocument();

    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();

    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements).toHaveLength(2);

    const secondListItem = listItemElements[0];
    expect(secondListItem).toHaveTextContent("Album Id- 1");
    expect(secondListItem).toHaveTextContent("Id- 1");
    expect(secondListItem).toHaveTextContent(
      "accusamus beatae ad facilis cum similique qui sunt",
    );
  });

  it("should display error message after loading disappears when there is an error", async () => {
    server.use(
      rest.get("http://localhost:3000/api/photos", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    customRender(<PhotoList />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(
      await screen.findByText("Something went wrong!"),
    ).toBeInTheDocument();
  });

  it("when there is no data, should display no data message", async () => {
    server.use(
      rest.get("http://localhost:3000/api/photos", (req, res, ctx) => {
        return res(ctx.json([]));
      }),
    );
    customRender(<PhotoList />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(await screen.findByText("No data found!")).toBeInTheDocument();
  });
});
