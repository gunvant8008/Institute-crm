import { deletePhoto, getPhotos } from "../../axios/photoApi";
import { Photo } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const PhotoList = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data: photos } = useQuery(["photos"], getPhotos);

  const deletePhotoMutation = useMutation(deletePhoto, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["photos"]);
    },
  });
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (isError) {
    return <h3>Something went wrong!</h3>;
  }
  if (photos.length === 0) {
    return <h3>No data found!</h3>;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center gap-4">
        <h2 className="p-4 text-2xl text-center">List of photos</h2>
        <Link className="p-2 bg-teal-900" href="/new">
          Add Photo
        </Link>
      </div>
      <ul className="grid max-w-xl grid-cols-2 gap-8 p-8">
        {photos.map((item: Photo, index: number) => {
          while (index < 10) {
            // just be careful doing this if you have loads of data.
            // the cache will become gigantic!
            queryClient.setQueryData(["photo", item.id.toString()], item);

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
                <button
                  className="p-1 bg-red-800"
                  onClick={() => deletePhotoMutation.mutate(item.id)}
                >
                  Delete
                </button>
                <Link
                  href={`/edit/${item.id}`}
                  className="p-1.5 ml-2 bg-blue-800"
                >
                  Edit
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default PhotoList;
