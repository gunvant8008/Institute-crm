import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { getPhoto, updatePhoto } from "../../axios/photoApi";
import { useRouter } from "next/router";
import { Photo } from "@/types";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextFieldWithLabel } from "../basic/TextFieldWithLabel";
import { useEffect } from "react";

const EditPhotoSchema = z.object({
  albumId: z
    .number()
    .int()
    .min(1, { message: "Album Id must be greater than or equal to 1" }),
  title: z
    .string()
    .min(1, { message: "Title must contain at least 1 character(s)" })
    .max(100),
  url: z.string().url().min(1).max(100),
  thumbnailUrl: z.string().url().min(1).max(100),
});
type TEditPhotoForm = z.infer<typeof EditPhotoSchema>;

const EditPhoto = ({ id }: { id: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery(["photo", id], () =>
    id ? getPhoto(id) : null,
  );

  const { mutate } = useMutation(updatePhoto, {
    onMutate: async (photo: Photo) => {
      await queryClient.cancelQueries(["photos"]);
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
      await router.push("/list");
      return { previousPhotos };
    },
    onError: (context: { previousPhotos: Photo[] }) => {
      queryClient.setQueryData(["photos"], context.previousPhotos);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["photos"]);
    },
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditPhotoForm>({
    resolver: zodResolver(EditPhotoSchema),
    defaultValues: {
      albumId: data?.albumId,
      title: data?.title,
      url: data?.url,
      thumbnailUrl: data?.thumbnailUrl,
    },
  });

  // REVIEW: IS THIS THE BEST WAY TO DO THIS? resetting the data on hard refresh
  useEffect(() => {
    if (!data) {
      return;
    }
    reset(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (data: TEditPhotoForm) => {
    mutate({
      id: Number(id),
      ...data,
    });
  };

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
        <form
          className="gap-y-4 flex flex-col w-[700px]"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextFieldWithLabel
            labelText="Id"
            inputType="number"
            placeholder={data.id.toString()}
            readOnly
            className="text-gray-400"
          />
          <TextFieldWithLabel
            labelText="Album Id"
            inputType="number"
            error={errors.albumId?.message as string}
            inputProps={register("albumId", { valueAsNumber: true })}
          />
          <TextFieldWithLabel
            labelText="Title"
            inputType="text"
            error={errors.title?.message as string}
            inputProps={register("title")}
          />
          <TextFieldWithLabel
            labelText="Url"
            inputType="text"
            error={errors.url?.message as string}
            inputProps={register("url")}
          />
          <TextFieldWithLabel
            labelText="Thumbnail Url"
            inputType="text"
            error={errors.url?.message as string}
            inputProps={register("thumbnailUrl")}
          />

          <button className="p-1 bg-red-800">Update</button>
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
