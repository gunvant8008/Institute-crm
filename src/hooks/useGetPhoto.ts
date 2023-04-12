import { Photo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getPhoto = async (id: string): Promise<Photo | undefined> => {
  return await axios
    .get(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then((response) => response.data as Photo);
};

export default function useGetPhoto(id: string) {
  return useQuery({
    queryKey: ["photo", id],
    queryFn: () => getPhoto(id),
  });
}
