import useGetPhotosList from "../../hooks/useGetPhotosList";
import { Photo } from "@/types";
import Link from "next/link";
import React from "react";

const PhotoList = () => {
  const { isLoading, isError, data } = useGetPhotosList();

  if (data) {
    if (data.length === 0) {
      return <h3>No data found!</h3>;
    }
    return (
      <div className="flex flex-col items-center">
        <h2 className="p-4 text-2xl text-center">List of photos</h2>
        <ul className="grid max-w-xl grid-cols-2 gap-8 p-8">
          {data.map((item: Photo, index: number) => {
            while (index < 10) {
              return (
                <li key={item.id}>
                  <Link
                    href={`/details/${item.id}`}
                    className="flex flex-col p-4 space-y-2 bg-gray-800"
                  >
                    <h2>Album Id- {item.albumId}</h2>
                    <h2>Id- {item.id}</h2>
                    <h2>Album Title- {item.title}</h2>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
    // REVIEW:  had to add this else block in order to import this as a component in test file
  } else if (isLoading) {
    return <h3>Loading...</h3>;
  } else if (isError) {
    return <h3>Something went wrong!</h3>;
  } else {
    return null;
  }
};

export default PhotoList;
