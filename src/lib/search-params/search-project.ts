import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParamsCacheProject = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  tags: parseAsArrayOf(parseAsString).withDefault([]),
  show: parseAsBoolean.withDefault(false),
  title: parseAsString.withDefault(""),
});

export type TGetProjectSchema = Awaited<
  ReturnType<typeof searchParamsCacheProject.parse>
>;
