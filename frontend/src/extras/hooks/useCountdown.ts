import { useEffect, useState } from "react";
import { getRemainingTime } from "../utils/time";

export const useCountdown = (targetDate: string) => {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime(targetDate));
    }, 1000); // every second

    return () => clearInterval(interval); // clean up
  }, [targetDate]);

  return timeLeft;
};