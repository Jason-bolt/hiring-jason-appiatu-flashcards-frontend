import React, { useEffect, useState } from "react";

type CountdownProps = {
  endTime: Date;
};

const CountDown = ({ endTime }: CountdownProps) => {
  const calculateTimeLeft = () => {
    const difference = +endTime - +new Date();
    let timeLeft: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  return (
    <div>
      {timeLeft.days > 0 && <span>{`${formatTime(timeLeft.days)}:`}</span>}
      <span>{`${formatTime(timeLeft.hours)}:`}</span>
      <span>{`${formatTime(timeLeft.minutes)}:`}</span>
      <span>{formatTime(timeLeft.seconds)}</span>
    </div>
  );
};

export default CountDown;
