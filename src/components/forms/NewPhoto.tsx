import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { addPhoto } from "../../axios/photoApi";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TextFieldWithLabel } from "../basic/TextFieldWithLabel";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Photo } from "@/types";
// import { DevTool } from "@hookform/devtools"

const AddPhotoSchema = z.object({
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
type TAddPhotoForm = z.infer<typeof AddPhotoSchema>;

const NewPhoto = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isError } = useMutation(addPhoto, {
    onMutate: async (photo: TAddPhotoForm) => {
      await queryClient.cancelQueries(["photos"]);
      const previousPhotos = queryClient.getQueryData<Photo[]>(["photos"]);
      const newId = 0;
      const newPhoto = queryClient.setQueryData(["photo", newId.toString()], {
        ...photo,
        id: 0,
      });
      queryClient.setQueryData(["photos"], (old: Photo[] | undefined) => {
        return newPhoto && old ? [...old, newPhoto] : old;
      });
      await router.push("/list");
      return { previousPhotos };
    },
    onError: (context: { previousPhotos: Photo[] }) => {
      queryClient.setQueryData(["photos"], context.previousPhotos);
      // await queryClient.invalidateQueries(["photos"])
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["photos"]);
    },
  });

  const {
    // control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddPhotoForm>({
    resolver: zodResolver(AddPhotoSchema),
    defaultValues: {
      albumId: 1,
      title: "New Photo Title",
      url: "Enter URL",
      thumbnailUrl: "Enter Thumbnail URL",
    },
  });

  const onSubmit = (data: TAddPhotoForm) => {
    mutate(data);
  };

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
      <form
        className="gap-y-4 flex flex-col w-[400px]"
        // REVIEW: Typescript error removed after adding void
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextFieldWithLabel
          labelText="Id"
          inputType="number"
          placeholder="1"
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
        <button className="p-1 bg-red-800">Add Photo</button>
      </form>
      {/* <DevTool control={control} /> */}
      <Link className="self-center p-4 bg-teal-800" href="/list">
        Go Back
      </Link>
    </div>
  );
};

export default NewPhoto;
