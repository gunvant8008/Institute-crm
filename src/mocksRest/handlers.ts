import { rest } from "msw";
import { Photo } from "@/types";

let photos: Photo[] = [
  {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
  },
  {
    albumId: 1,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796",
  },
  {
    albumId: 1,
    id: 3,
    title: "officia porro iure quia iusto qui ipsa ut modi",
    url: "https://via.placeholder.com/600/24f355",
    thumbnailUrl: "https://via.placeholder.com/150/24f355",
  },
  {
    albumId: 1,
    id: 4,
    title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    url: "https://via.placeholder.com/600/d32776",
    thumbnailUrl: "https://via.placeholder.com/150/d32776",
  },
  {
    albumId: 1,
    id: 5,
    title: "natus nisi omnis corporis facere molestiae rerum in",
    url: "https://via.placeholder.com/600/f66b97",
    thumbnailUrl: "https://via.placeholder.com/150/f66b97",
  },
];
let lastId = photos.length + 1;

export const handlers = [
  // api for all photos
  rest.get("/api/photos", (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(photos));
  }),
  // api for a single photo
  rest.get("/api/photos/:id", (req, res, ctx) => {
    // REVIEW: req.params.id is a string, so we need to convert it to a number
    const id = parseInt(req.params.id.toString());
    const photo = photos.find((photo) => photo.id === id);
    if (photo) {
      return res(ctx.status(200), ctx.delay(2000), ctx.json(photo));
    } else {
      return res(
        ctx.status(404),
        ctx.delay(2000),
        ctx.json({ message: "Photo not found" }),
      );
    }
  }),
  // api for creating a new photo
  rest.post("/api/photos/new", async (req, res, ctx) => {
    const newPhoto: Photo = await req.json();
    // REVIEW: how calculation of id changes a se interact at front end
    newPhoto.id = ++lastId;
    photos.push(newPhoto);
    return res(ctx.status(201), ctx.delay(500), ctx.json(newPhoto));
    // return res(ctx.status(500));
  }),
  // api for deleting a photo
  rest.delete("/api/photos/:id", (req, res, ctx) => {
    const id = parseInt(req.params.id.toString());
    photos = photos.filter((photo) => photo.id !== id);
    // REVIEW: react-query throws an error if we don't return a response
    return res(ctx.status(204));
  }),

  // api for updating a photo
  rest.patch("/api/photos/:id", async (req, res, ctx) => {
    const id = Number(req.params.id);
    const reqBody: Photo = await req.json();
    const photo = photos.find((photo) => photo.id === id);
    if (photo) {
      photo.albumId = Number(reqBody.albumId);
      photo.title = reqBody.title;
      photo.url = reqBody.url;
      photo.thumbnailUrl = reqBody.thumbnailUrl;
      return res(
        ctx.status(200),
        ctx.delay(100),
        ctx.json({ message: "Photo updated" }),
      );
    } else {
      return res(
        ctx.status(404),
        ctx.delay(500),
        ctx.json({ message: "Photo not found" }),
      );
    }
  }),
];
