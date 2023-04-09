import { useRouter } from "next/router";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export interface RootObject {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
const fetchPhoto = async (id: string): Promise<RootObject | undefined> => {
  // added if stat to resolve id type error, Invalid type "string | string[] | undefined" of template literal expression.
  return await axios
    .get(`https://jsonplaceholder.typicode.com/photos/${id}`)
    // solved error- return type any by adding as RootObject in return statement
    .then((response) => response.data as RootObject);
};

const Details = () => {
  const { query } = useRouter();
  const id = query.details as string;

  const { isLoading, isError, data } = useQuery({
    queryKey: ["photo", id],
    queryFn: () => fetchPhoto(id),
  });
  console.log(data);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Something went wrong!</h2>;
  }
  if (data) {
    return (
      <div className="flex flex-col gap-y-10 p-8">
        <h2>Album Id- {data.albumId}</h2>
        <h2>Title- {data.title}</h2>
        <Image src={data.url} width={400} height={400} alt="photo img" />
        <Link className="bg-teal-800 p-4 self-start" href="/list">
          Go Back
        </Link>
      </div>
    );
  }
};

export default Details;
