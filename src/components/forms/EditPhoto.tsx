import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { getPhoto, updatePhoto } from "../../axios/photoApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Photo } from "@/types";

const EditPhoto = ({ id }: { id: string }) => {
  const { isLoading, isError, data } = useQuery(["photo", id], () =>
    id ? getPhoto(id) : null,
  );
  const [formData, setFormData] = useState<Omit<Photo, "id">>({
    albumId: 0,
    title: "",
    url: "",
    thumbnailUrl: "",
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    setFormData({
      albumId: data.albumId,
      title: data.title,
      url: data.url,
      thumbnailUrl: data.thumbnailUrl,
    });
  }, [data]);

  const router = useRouter();
  const queryClient = useQueryClient();
  const updatePhotoMutation = useMutation(updatePhoto, {
    // onSuccess: async () => {
    //   await queryClient.invalidateQueries(["photos"]);
    //   await router.push("/list");
    // },
    onMutate: async (photo: Photo) => {
      await router.push("/list");
      // await queryClient.cancelQueries(["photo", photo.id.toString()])
      await queryClient.cancelQueries(["photos"]);
      // const previousPhoto = queryClient.getQueryData([
      //   "photo",
      //   photo.id.toString()
      // ])
      const previousPhotos = queryClient.getQueryData<Photo[]>(["photos"]);
      const newPhoto = queryClient.setQueryData(
        ["photo", photo.id.toString()],
        photo,
      );
      // REVIEW: Typescript error here

      queryClient.setQueryData(["photos"], (old: Photo[] | undefined) => {
        return newPhoto
          ? old?.map((item) => (item.id === photo.id ? newPhoto : item))
          : old;
      });
      return { previousPhotos };
    },
    onError: (context: { previousPhotos: Photo[] }) => {
      queryClient.setQueryData(["photos"], context.previousPhotos);
    },
    onSettled: async () => {
      // await queryClient.invalidateQueries(["photo", id])
      await queryClient.invalidateQueries(["photos"]);
    },
  });

  if (isError) {
    return <h2>Something went wrong!</h2>;
  }
  if (isLoading || !data) {
    return <h2>Loading...</h2>;
  }
  if (data) {
    return (
      <div className="gap-y-10 flex flex-col items-center p-8">
        <h2 className="p-4 text-2xl text-center">Edit Photo</h2>
        <form className="gap-y-4 flex flex-col w-[700px]">
          <label className="grid grid-cols-2">
            Id-
            <input
              className=" text-black"
              type="number"
              readOnly
              value={data.id}
            />
          </label>
          <label className="grid grid-cols-2">
            Album Id-
            <input
              className=" text-black"
              type="number"
              value={formData.albumId || ""}
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
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
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
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              updatePhotoMutation.mutate({ id: data.id, ...formData });
            }}
          >
            Update
          </button>
        </form>
        <Link className="self-center p-4 bg-teal-800" href="/list">
          Go Back
        </Link>
      </div>
    );
    // REVIEW:
  } else {
    return <h2>No Data Found</h2>;
  }
};

export default EditPhoto;
