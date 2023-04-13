import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { getPhoto, updatePhoto } from "../../axios/photoApi";
import { useRouter } from "next/router";
import { useState } from "react";

const EditPhoto = ({ id }: { id: string }) => {
  const { isLoading, isError, data } = useQuery(["photo", id], () =>
    getPhoto(id),
  );
  const [formData, setFormData] = useState({
    // albumId: `${data?.albumId}`,
    // title: `${data?.title}`,
    // url: `${data?.url}`,
    // thumbnailUrl: `${data?.thumbnailUrl}`

    albumId: "",
    title: "",
    url: "",
    thumbnailUrl: "",
  });
  console.log(formData);

  const router = useRouter();

  const queryClient = useQueryClient();

  const updatePhotoMutation = useMutation(updatePhoto, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["photos"]);
      await router.push("/list");
    },
  });

  if (isError) {
    return <h2>Something went wrong!</h2>;
  }
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (data) {
    return (
      <div className="gap-y-10 flex flex-col items-center p-8">
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
              value={formData.albumId}
              onChange={(e) =>
                setFormData({ ...formData, albumId: e.target.value })
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
            onClick={(e) => {
              e.preventDefault();
              // REVIEW: is this the right way to do it?
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
  } else return null;
};

export default EditPhoto;
