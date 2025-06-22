import { useEffect, useState } from "react";

export const getRemainingTime = (targetDate: string): string | undefined => {
  const total = new Date(targetDate).getTime() - Date.now();
  if (total <= 0) return "0h 0m 0s";

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  function padWithZero(num: number) {
    return num.toString().padStart(2, "0");
  }

  const dd = padWithZero(days);
  const hh = padWithZero(hours);
  const mm = padWithZero(minutes);
  const ss = padWithZero(seconds); // Optionally convert to tenths

  return `${days > 0 ? `${dd} : ` : ""}${hh} : ${mm} : ${ss}`;
};

export const useCountdown = (targetDate: string): string | undefined => {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};
