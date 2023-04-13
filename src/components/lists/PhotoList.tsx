import { deletePhoto, getPhotos } from "@/axios/photoApi";
import { Photo } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const PhotoList = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data: photos } = useQuery(["photos"], getPhotos);

  // const addPhotoMutation = useMutation(addPhoto, {
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries(["photos"])
  //   }
  // })

  // const updatePhotoMutation = useMutation(updatePhoto, {
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries(["photos"])
  //   }
  // })

  const deletePhotoMutation = useMutation(deletePhoto, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["photos"]);
    },
  });

  if (photos) {
    if (photos.length === 0) {
      return <h3>No data found!</h3>;
    }
    return (
      <div className="flex flex-col items-center">
        <h2 className="p-4 text-2xl text-center">List of photos</h2>
        <ul className="grid max-w-xl grid-cols-2 gap-8 p-8">
          {photos.map((item: Photo, index: number) => {
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
                  <button
                    className="p-1 bg-red-800"
                    onClick={() => deletePhotoMutation.mutate(item.id)}
                  >
                    Delete
                  </button>
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
