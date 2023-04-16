import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { addPhoto } from "../../axios/photoApi";
import { useRouter } from "next/router";
import { useState } from "react";
import { Photo } from "@/types";

const NewPhoto = () => {
  const [formData, setFormData] = useState<Omit<Photo, "id">>({
    albumId: 0,
    title: "",
    url: "",
    thumbnailUrl: "",
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isError } = useMutation(addPhoto, {
    // onSuccess: async () => {
    //   await queryClient.invalidateQueries(["photos"]);
    //   await router.push("/list");
    // },
    onMutate: async (photo: Omit<Photo, "id">) => {
      // await queryClient.cancelQueries(["photo", photo.id.toString()])
      await queryClient.cancelQueries(["photos"]);
      // const previousPhoto = queryClient.getQueryData([
      //   "photo",
      //   photo.id.toString()
      // ])
      const previousPhotos = queryClient.getQueryData<Photo[]>(["photos"]);
      await router.push("/list");

      // let lastId = previousPhotos.length + 1
      const newId = 0;
      const newPhoto = queryClient.setQueryData(["photo", newId.toString()], {
        ...photo,
        id: 0,
      });

      queryClient.setQueryData(["photos"], (old: Photo[] | undefined) => {
        return newPhoto && old ? [...old, newPhoto] : old;
      });

      return { previousPhotos };
      // REVIEW: Typescript error here
    },
    onError: (context: { previousPhotos: Photo[] }) => {
      queryClient.setQueryData(["photos"], context.previousPhotos);
    },
    onSettled: async () => {
      // await queryClient.invalidateQueries(["photo", id.toString()])
      await queryClient.invalidateQueries(["photos"]);
    },
  });
  if (isError)
    return (
      <div className="flex items-center justify-center gap-4 mt-10">
        <p>Something went wrong!</p>
        <Link className="self-center p-2 bg-teal-800" href="/list">
          Try again{" "}
        </Link>
      </div>
    );

  return (
    <div className="gap-y-10 flex flex-col items-center p-8">
      <h2 className="p-4 text-2xl text-center">Create Photo</h2>
      <form className="gap-y-4 flex flex-col w-[700px]">
        <label className="grid grid-cols-2">
          Id-
          <input
            className=" text-black"
            type="number"
            placeholder="id"
            readOnly
            value="id"
          />
        </label>
        <label className="grid grid-cols-2">
          Album Id-
          <input
            className=" text-black"
            type="number"
            value={formData.albumId}
            onChange={(e) =>
              setFormData({ ...formData, albumId: parseInt(e.target.value) })
            }
          />
        </label>
        <label className="grid grid-cols-2">
          Title-
          <input
            className=" text-black break-words"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </label>
        <label className="grid grid-cols-2">
          Url-
          <input
            className=" text-black"
            type="text"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
        </label>
        <label className="grid grid-cols-2">
          Thumbnail Url-
          <input
            className=" text-black"
            type="text"
            value={formData.thumbnailUrl}
            onChange={(e) =>
              setFormData({ ...formData, thumbnailUrl: e.target.value })
            }
          />
        </label>

        <button
          className="p-1 bg-red-800"
          onClick={(e) => {
            e.preventDefault();
            // REVIEW: is this the right way to do it?
            mutate({
              ...formData,
            });
          }}
        >
          Add Photo
        </button>
      </form>
      <Link className="self-center p-4 bg-teal-800" href="/list">
        Go Back
      </Link>
    </div>
  );
};

export default NewPhoto;
