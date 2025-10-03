'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer({ initialMinutes }: { initialMinutes: number }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    // Only run on the client
    const storedEndTime = localStorage.getItem('countdownEndTime');
    const now = new Date().getTime();
    let endTime: number;

    if (storedEndTime) {
      endTime = parseInt(storedEndTime, 10);
      // If the stored time has passed, reset it
      if (now > endTime) {
        endTime = now + initialMinutes * 60 * 1000;
        localStorage.setItem('countdownEndTime', endTime.toString());
      }
    } else {
      endTime = now + initialMinutes * 60 * 1000;
      localStorage.setItem('countdownEndTime', endTime.toString());
    }

    setTimeLeft(Math.max(0, Math.round((endTime - now) / 1000)));

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [initialMinutes]);


  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex justify-center gap-2 md:gap-4">
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-4xl font-mono bg-white/70 p-2 rounded-lg shadow-inner w-16 text-center">
          {String(minutes).padStart(2, '0')}
        </span>
        <span className="text-xs font-bold uppercase text-foreground-secondary mt-1">Min</span>
      </div>
      <span className="text-3xl md:text-4xl font-bold text-destructive-dark/50">:</span>
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-4xl font-mono bg-white/70 p-2 rounded-lg shadow-inner w-16 text-center">
          {String(seconds).padStart(2, '0')}
        </span>
        <span className="text-xs font-bold uppercase text-foreground-secondary mt-1">Seg</span>
      </div>
    </div>
  );
}
