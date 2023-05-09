import { mswServer } from "../../../../mocksRest/mswServer";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import NewOrder from "./NewOrder";
import { createMockRouter } from "@/mocksRest/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { customRender } from "@/mocksRest/utils";
// Establish API mocking before all tests.
beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => mswServer.close());

describe("NewOrder Component", () => {
  it("renders correctly, should display new order heading", async () => {
    const pushMock = jest.fn();
    customRender(
      <RouterContext.Provider value={createMockRouter({ push: pushMock })}>
        <NewOrder id={1} />
      </RouterContext.Provider>,
    );
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(
      await screen.findByRole("heading", { name: /new order/i }),
    ).toBeInTheDocument();
  });
});
