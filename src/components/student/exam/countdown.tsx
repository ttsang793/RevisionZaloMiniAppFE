import { useEffect, useState } from 'react';
import { Text } from 'zmp-ui';

interface CountdownProps {
  timeLimit: number;
  earlyTurnIn?: number;
  setAllowEarlySubmit: (allowEarlySubmit: boolean) => void
}

const Countdown = ({timeLimit, earlyTurnIn, setAllowEarlySubmit}: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        if (timeLimit - (prevTime - 1) === earlyTurnIn)
          setAllowEarlySubmit(true);
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <Text bold className="zaui-text-red-50">
      Còn lại: {format(minutes)}:{format(seconds)}
    </Text>
  );
};

export { Countdown };