import { useEffect, useRef } from "react";

// see: https://zenn.dev/kakaka/articles/41f22d2dcc9720#3.useref%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6callback%E3%82%92%E4%BF%9D%E6%8C%81%E3%81%97useeffect%E3%81%A7%E6%9B%B4%E6%96%B0%E3%81%99%E3%82%8B(%E5%AE%8C%E6%88%90%EF%BC%81
export function useInterval(callback: () => void, millis: number) {
  const callbackRef = useRef<() => void>(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  useEffect(() => {
    const tick = () => { callbackRef.current() } 
    const id = setInterval(tick, millis);
    return () => {
      clearInterval(id);
    };
  }, []);
};