import type { ParsedQs } from "qs";

interface PaginationParams {
  page?: number;
}

export default function parsePaginationParams(
  query: ParsedQs
): PaginationParams {
  let page: number | undefined;

  if (
    typeof query.page === "number" ||
    (typeof query.page === "string" && isInt(query.page))
  ) {
    page = Number(query.page);

    if (page < 1) {
      page = 1;
    }
  }

  return {
    page,
  };
}

function isInt(value: string): boolean {
  const number = Number(value);
  return !Number.isNaN(number) && Number.isInteger(number);
}
