import useGetPhoto from "../../hooks/useGetPhoto";
import Image from "next/image";
import Link from "next/link";

const PhotoDetails = ({ id }: { id: string }) => {
  const { isLoading, isError, data } = useGetPhoto(id);

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
        <Link className="self-center p-4 bg-teal-800" href="/list">
          Go Back
        </Link>
      </div>
    );
    // REVIEW:
  } else return null;
};

export default PhotoDetails;
