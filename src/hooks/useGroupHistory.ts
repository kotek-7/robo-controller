import { useState } from "react";
import { useInterval } from "./useInterval";

export function useGroupHistory(
  value1: number,
  value2: number,
  value3: number,
  length: number,
): {
  value1GroupHistory: { value: number; time: number }[];
  value2GroupHistory: { value: number; time: number }[];
  value3GroupHistory: { value: number; time: number }[];
} {
  const [value1GroupHistory, setValue1GroupHistory] = useState(
    new Array<{ value: number; time: number }>(length).fill({ value: 0, time: Date.now() }).map((_v, i) => {
      return { value: 0, time: Date.now() - i * 40 };
    }),
  );
  const [value2GroupHistory, setValue2GroupHistory] = useState(
    new Array<{ value: number; time: number }>(length).fill({ value: 0, time: Date.now() }).map((_v, i) => {
      return { value: 0, time: Date.now() - i * 40 };
    }),
  );
  const [value3GroupHistory, setValue3GroupHistory] = useState(
    new Array<{ value: number; time: number }>(length).fill({ value: 0, time: Date.now() }).map((_v, i) => {
      return { value: 0, time: Date.now() - i * 40 };
    }),
  );
  useInterval(() => {
    setValue1GroupHistory((history) => history.slice(1).concat({ value: value1, time: Date.now() }));
    setValue2GroupHistory((history) => history.slice(1).concat({ value: value2, time: Date.now() }));
    setValue3GroupHistory((history) => history.slice(1).concat({ value: value3, time: Date.now() }));
  }, 10);
  return {
    value1GroupHistory,
    value2GroupHistory,
    value3GroupHistory,
  };
}
