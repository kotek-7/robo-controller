import { useState } from "react";
import { useInterval } from "./useInterval";

export function useHistory(value: number, length: number): { value: number; time: number }[] {
  const [history, setHistory] = useState(
    new Array<{ value: number; time: number }>(length).fill({ value: 0, time: Date.now() }).map((_v, i) => {
      return { value: 0, time: Date.now() - i * 40 };
    }),
  );
  useInterval(() => {
    setHistory((history) => history.slice(1).concat({ value, time: Date.now() }));
  }, 10);
  return history;
}
