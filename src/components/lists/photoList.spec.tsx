import { render, screen } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { Photo } from "@/types";
import PhotoList from "./PhotoList";

jest.mock("@tanstack/react-query");
const mockedUseQuery = jest.mocked(useQuery as jest.Mock);

const photos: Photo[] = [
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
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796",
  },
];

describe("List component", () => {
  it("should display a list of photos", () => {
    mockedUseQuery.mockReturnValue({
      isLoading: false,
      data: photos,
    });

    render(<PhotoList />);

    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();

    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements).toHaveLength(2);

    const firstListItem = listItemElements[0];
    expect(firstListItem).toHaveTextContent("Album Id- 1");
    expect(firstListItem).toHaveTextContent("Id- 1");
    expect(firstListItem).toHaveTextContent(
      "Album Title- accusamus beatae ad facilis cum similique qui sunt",
    );

    const secondListItem = listItemElements[1];
    expect(secondListItem).toHaveTextContent("Album Id- 1");
    expect(secondListItem).toHaveTextContent("Id- 2");
    expect(secondListItem).toHaveTextContent(
      "Album Title- reprehenderit est deserunt velit ipsam",
    );
  });

  it("should display loading spinner when data is loading", () => {
    mockedUseQuery.mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    render(<PhotoList />);

    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  it("should display error message when there is an error", () => {
    mockedUseQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });

    render(<PhotoList />);

    const errorElement = screen.getByText("Something went wrong!");
    expect(errorElement).toBeInTheDocument();
  });
});
