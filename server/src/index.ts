import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import parsePaginationParams from "./util/parsePaginationParams";
import cors from "cors";

const app = express();

dotenv.config();

export interface SearchResponse {
  title: string;
  url: string;
  description: string;
  userRole: never[];
}
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  return res.status(200).json({
    status: "OK",
  });
});

app.get("/search", async (req, res) => {
  const { query } = req.query;
  const { page = 1 } = parsePaginationParams(req.query);

  console.log("q", query);

  const pageSize = 10;

  const data = (await fetch(
    `${process.env.API_BASE_URL}/search?query=${query}`
  ).then((res) => res.json())) as { results: SearchResponse[] };

  const totalPages =
    pageSize > 0
      ? Math.ceil(data && data.results && data.results.length / pageSize)
      : 0;

  console.log("got data", data.results.length);

  const paginatedData = data.results.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  console.info("page", page, "pageSize", pageSize);
  console.info("paginatedData", paginatedData);

  return res.status(200).json({
    status: "OK",
    data: paginatedData ?? [],
    paging: {
      totalPages,
      page,
    },
  });
});

app.listen(4000, () => console.info("server running on port 4000"));
