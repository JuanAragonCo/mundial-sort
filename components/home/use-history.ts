import { useReducer } from "react";

export const REMOVE_VALUE = 'remove';

export function useHistory() {
  return useReducer((state: string[], value: string | null) => {
    if (value === null) return [];
    if (value === REMOVE_VALUE) return state.slice(0, -1);
  
    return [...state, value];
  }, []);
}
