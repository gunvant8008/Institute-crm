import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { deletePhoto, getPhoto } from "../../axios/photoApi";
import { useRouter } from "next/router";

const PhotoDetails = ({ id }: { id: string }) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery(["photo", id], () =>
    id ? getPhoto(id) : null,
  );
  const deletePhotoMutation = useMutation(deletePhoto, {
    onSuccess: async () => {
      console.log('BRUNOOOO SUCCESS')
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
        <h2>Album Id- {data.albumId}</h2>
        <h2>Title- {data.title}</h2>
        <Image src={data.url} width={400} height={400} alt="photo img" />
        <button
          className="p-1 bg-red-800"
          onClick={() => {
            console.log('MUTATION')
            deletePhotoMutation.mutate(data.id)
          }}
        >
          Delete
        </button>
        <Link className="self-center p-4 bg-teal-800" href="/list">
          Go Back
        </Link>
      </div>
    );
    // REVIEW:
  } else return null;
};

export default PhotoDetails;
