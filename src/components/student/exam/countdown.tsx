import { useEffect, useState } from 'react';
import { Text, useSnackbar } from 'zmp-ui';

interface CountdownProps {
  timeLimit: number;
  earlyTurnIn?: number;
  setAllowEarlySubmit: (allowEarlySubmit: boolean) => void
  setAutoTurnIn: (autoTurnIn: boolean) => void
}

const Countdown = ({timeLimit, earlyTurnIn, setAllowEarlySubmit, setAutoTurnIn}: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const aThird = Math.round(timeLimit * 2 / 3 / 60 / 5) * 5 * 60;
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setAutoTurnIn(true);
          return 0;
        }
        
        if (prevTime === aThird) {
          openSnackbar({ text: `Còn ${aThird / 60} phút nữa là hết giờ làm bài!`, type: "warning" })
        }

        if (prevTime === 300) {
          openSnackbar({ text: "Còn 5 phút nữa là hết giờ làm bài!", type: "warning" })
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