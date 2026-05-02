import { useEffect, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Живой обратный таймер до даты `target`.
 * Возвращает { days, hours, minutes, seconds } в виде двузначных строк.
 */
export function useCountdown(target) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00", done: true };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return {
      days: pad(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
      done: false,
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return time;
}
