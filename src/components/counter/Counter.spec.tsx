import { screen, waitFor } from "@testing-library/react";
import { fireEvent, render } from "@testing-library/react/pure";

import Counter from "./Counter";

describe("Counter", () => {
  describe('initialized with defaultCount=10 and description="WWW"', () => {
    beforeEach(() => {
      render(<Counter defaultCount={10} description="WWW" />);
    });

    it('renders "Current Count: 10"', () => {
      expect(screen.getByText("Current Count: 10")).toBeInTheDocument();
    });

    it('renders title as "WWW"', () => {
      expect(screen.getByText(/WWW/i)).toBeInTheDocument();
    });

    describe('when the incrementor changes to 5 and "+" button is clicked', () => {
      beforeEach(async () => {
        fireEvent.change(screen.getByLabelText(/Incrementor/), {
          target: { value: "5" },
        });
        fireEvent.click(
          screen.getByRole("button", { name: "increment in counter" })
        );
        await screen.findByText("Current Count: 15");
      });
      it('renders "Current Count: 15"', () => {
        expect(screen.getByText("Current Count: 15")).toBeInTheDocument();
      });

      describe('when the incrementor changes to empty string and "+" button is clicked', () => {
        beforeEach(async () => {
          fireEvent.change(screen.getByLabelText(/Incrementor/), {
            target: { value: "1" },
          });
          fireEvent.click(
            screen.getByRole("button", { name: "increment in counter" })
          );
          await screen.findByText("Current Count: 16");
        });
        it('renders "Current Count: 16"', () => {
          expect(screen.getByText("Current Count: 16")).toBeInTheDocument();
        });
      });
    });

    describe('when the incrementor changes to 25 and "-" button is clicked', () => {
      beforeEach(() => {
        fireEvent.change(screen.getByLabelText(/Incrementor/), {
          target: { value: "25" },
        });
        fireEvent.click(
          screen.getByRole("button", { name: "decrement from counter" })
        );
      });
      it('renders "Current Count: -15"', () => {
        expect(screen.getByText("Current Count: -15")).toBeInTheDocument();
      });
    });
  });
  // previous test
  describe('initialized with defaultCount=0 and description="My Counter"', () => {
    beforeEach(() => {
      render(<Counter defaultCount={0} description="My Counter" />);
    });

    it('renders "Current Count: 0"', () => {
      expect(screen.getByText("Current Count: 0")).toBeInTheDocument();
    });
    it('renders title as "My counter"', () => {
      expect(screen.getByText(/my counter/i)).toBeInTheDocument();
    });

    describe("when - is clicked", () => {
      beforeEach(() => {
        fireEvent.click(
          screen.getByRole("button", { name: "decrement from counter" })
        );
      });
      it("defaultCount=0 and - clicked then counter = -1", () => {
        expect(screen.getByText("Current Count: -1")).toBeInTheDocument();
      });
    });

    describe("when + is clicked", () => {
      beforeEach(async () => {
        fireEvent.click(
          screen.getByRole("button", { name: "increment in counter" })
        );
        await screen.findByText("Current Count: 1");
      });
      it("defaultCount=0, and + clicked then counter = 1", () => {
        expect(screen.getByText("Current Count: 1")).toBeInTheDocument();
      });
    });
  });
});
