import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3000/api/photos", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
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
          title: "My title",
          url: "https://via.placeholder.com/600/771796",
          thumbnailUrl: "https://via.placeholder.com/150/771796",
        },
      ]),
    );
  }),
  rest.get("http://localhost:3000/api/photos/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        albumId: 1,
        id: 1,
        title: "My title for detail page",
        url: "https://via.placeholder.com/600/92c952",
        thumbnailUrl: "https://via.placeholder.com/150/92c952",
      }),
    );
  }),
  rest.delete("http://localhost:3000/api/photos/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.patch("http://localhost:3000/api/photos/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        albumId: 1,
        id: 1,
        title: "My title for detail page",
        url: "https://via.placeholder.com/600/92c952",
        thumbnailUrl: "https://via.placeholder.com/150/92c952",
      }),
    );
  }),
  rest.post("http://localhost:3000/api/photos/new", (req, res, ctx) => {
    return res(ctx.status(500));
  }),
];
