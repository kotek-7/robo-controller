import { useEffect, useState } from "react";

export function useHistory(value: number, length: number): { value: number; time: number }[] {
  const [history, setHistory] = useState(
    new Array<{ value: number; time: number }>(length).fill({ value: 0, time: Date.now() }).map((_v, i) => {
      return { value: 0, time: Date.now() - i * 1000 };
    }),
  );
  useEffect(() => {
    setHistory((history) => history.slice(1).concat({ value, time: Date.now() }));
  }, [value]);
  return history;
}
