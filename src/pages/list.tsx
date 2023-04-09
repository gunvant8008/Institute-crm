import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

export interface RootObject {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
const getPhotos = async (): Promise<RootObject[]> => {
  return await axios
    .get("https://jsonplaceholder.typicode.com/photos")
    .then((response) => response.data as RootObject[]);
};

const List = () => {
  // const apiData = getPhotos()
  // console.log(apiData)
  // const { isLoading, isError, data } = useQuery(["photos"], getPhotos)
  const { isLoading, isError, data } = useQuery({
    queryKey: ["photos"],
    queryFn: getPhotos,
  });
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Something went wrong!</h2>;
  }
  //TODO: is this the right solution for unsafe member access error
  if (data) {
    return (
      <div className="grid grid-cols-2 gap-8 max-w-xl p-8">
        {data?.map((item: RootObject, index: number) => {
          if (index < 10) {
            return (
              <Link
                href={`/details/${item.id}`}
                key={item.id}
                className="bg-gray-800 p-4 flex flex-col space-y-2"
              >
                <h2>Album Id- {item.albumId}</h2>
                <h2>Id- {item.id}</h2>
                <h2>Album Title- {item.title}</h2>
              </Link>
            );
          }
        })}
      </div>
    );
  }
};

export default List;
