import {
  useQueryStates,
  parseAsInteger,
  parseAsArrayOf,
  parseAsString,
  parseAsBoolean,
} from "nuqs";

export const useProjectSearchParams = () =>
  useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(10),
      show: parseAsBoolean.withDefault(false),
      title: parseAsString.withDefault(""),
      tags: parseAsArrayOf(parseAsString).withDefault([]),
      search: parseAsString.withDefault(""),
    },
    {
      shallow: false,
      clearOnDefault: true,
    },
  );
