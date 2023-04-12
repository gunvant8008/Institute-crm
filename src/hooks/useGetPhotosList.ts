import { Photo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getPhotos = async (): Promise<Photo[]> => {
  return await axios
    .get("https://jsonplaceholder.typicode.com/photos")
    .then((response) => response.data as Photo[]);
};

export default function useGetPhotosList() {
  return useQuery({
    queryKey: ["photos"],
    queryFn: getPhotos,
  });
}
