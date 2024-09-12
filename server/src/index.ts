import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import parsePaginationParams from "./util/parsePaginationParams";

const app = express();

dotenv.config();

export interface SearchResponse {
  title: string;
  url: string;
  description: string;
  userRole: never[];
}

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

  console.log("data", data);

  const totalPages =
    pageSize > 0 ? Math.ceil(data.results.length / pageSize) : 0;

  return res.status(200).json({
    status: "OK",
    data: data ?? [],
    paging: {
      totalPages,
      page,
    },
  });
});

app.listen(4000, () => console.info("server running"));
