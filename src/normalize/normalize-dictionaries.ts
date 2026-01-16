import { isDictionary } from "../utils";
import type { NormalizedData } from "./types";

export function normalizeDictionaries(data: any): NormalizedData {
  if (Array.isArray(data)) {
    return data;
  } else if (isDictionary(data)) {
    const types = Array.from(
      new Set(
        Object.values(data)
          .filter((value) => value !== null)
          .map((value) => typeof value),
      ),
    );

    if (types.length === 1) {
      return Object.entries(data).map(([key, value]: [string, any]) => ({
        key,
        value,
      }));
    } else {
      const baseRow = Object.fromEntries(
        types.map((type) => [`value_${type}`, null]),
      );
      return Object.entries(data).map(([key, value]) => ({
        key,
        ...baseRow,
        ...(value === null
          ? {}
          : {
              [`value_${typeof value}`]: value,
            }),
      }));
    }
  } else if (Object(data) === data) {
    return [data];
  } else {
    return [];
  }
}
