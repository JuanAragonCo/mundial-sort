import { useReducer } from "react";
import { selections, selectionsABC } from "./const";
import { Code } from "./types";

export const REMOVE_PREFIX = 'remove-';


export function useItemReducer(isAlphabetical: boolean) {
  return useReducer((codes: Code[], item: string | null) => {
    if (item === null) return [];

    const plusCount = item.startsWith(REMOVE_PREFIX) ? -1 : 1;
    const foundIndex = codes.findIndex(code => code.country === item.replace(REMOVE_PREFIX, ''));

    const sortingList = isAlphabetical ? selectionsABC : selections;

    if (foundIndex !== -1) {
      const copy = [...codes];
      const newCount = copy[foundIndex].count + plusCount;
      if (newCount === 0) {
        copy.splice(foundIndex, 1);
      } else {
        copy[foundIndex] = {
          ...copy[foundIndex],
          count: newCount
        }
      }
      return copy;
    } else {
      if (plusCount < 0) return [];

      const newCodes = [
        ...codes,
        {
          country: item,
          count: 1,
          position: sortingList.indexOf(item)
        }
      ].sort((p, n) => n.position - p.position)
      return newCodes
    }
  }, [])
}
