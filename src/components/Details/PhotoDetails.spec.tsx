import { customRender } from "../../mocks/utils";
import PhotoDetails from "./PhotoDetails";
import { fireEvent, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { server } from "../../mocks/server";
import { rest } from "msw";
import { useRouter } from "next/router";
import userEvent from "@testing-library/user-event";
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from "./createMockRouter";


describe("PhotoDetails component", () => {
  it("should display photo details after loading disappear", async () => {
    customRender(<PhotoDetails id="1" />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(await screen.findByText("Album Id- 1")).toBeInTheDocument();
    expect(
      await screen.findByText("Title- My title for detail page")
    ).toBeInTheDocument();
  });

  it("should display error message after loading disappears when there is an error", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/photos/:id",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    customRender(<PhotoDetails id="1" />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(
      await screen.findByText("Something went wrong!")
    ).toBeInTheDocument();
  });

  it.only("when delete button is clicked, it should redirect to list page", async () => {
    server.use(
      rest.delete('http://localhost:3000/api/photos/1', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({}),
        );
      }),
      rest.get(
        "http://localhost:3000/api/photos/1",
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              albumId: 1,
              id: 1,
              title: "My title for detail page",
              url: "https://via.placeholder.com/600/92c952",
              thumbnailUrl: "https://via.placeholder.com/150/92c952",
            }),
          );
        },
      )
    );
  
    const pushMock = jest.fn();

    customRender(
      <RouterContext.Provider value={createMockRouter({ query: { id: "1" }, push: pushMock })}>
        <PhotoDetails id="1" />
      </RouterContext.Provider>
    );

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    const deleteButton = await screen.findByRole("button", { name: "Delete" });
    await userEvent.click(deleteButton);
        expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/list')
  });
});
