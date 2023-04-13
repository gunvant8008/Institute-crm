import { Photo } from "@/types";
import axios from "axios";

const photoApi = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com",
  baseURL: "http://localhost:3000/api",
});

export const getPhotos = async (): Promise<Photo[]> => {
  return await photoApi
    .get("/photos")
    .then((response) => response.data as Photo[]);
};

export const getPhoto = async (id: string): Promise<Photo | undefined> => {
  return await photoApi
    .get(`/photos/${id}`)
    .then((response) => response.data as Photo);
};

export const addPhoto = async (photo: Photo): Promise<Photo> => {
  return await photoApi.post("/photos/new", photo);
};

export const updatePhoto = async (photo: Photo): Promise<Photo> => {
  return await photoApi.patch(`/photos/${photo.id}`, photo);
};

export const deletePhoto = async (id: number) => {
  return await photoApi.delete(`/photos/${id}`);
};

export default photoApi;
