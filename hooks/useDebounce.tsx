import { useState, useCallback } from "react";

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => {
        callback(...args);
      }, delay);
      setTimer(newTimer);
    },
    [callback, delay]
  );

  return debouncedCallback;
}
