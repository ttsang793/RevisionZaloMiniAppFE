import { Box, Text } from "zmp-ui";
import "./PDF-question.css"
import { useRef, useState } from "react";

const TracNghiem = () => {
  const [answer, setAnswer] = useState("A");
  const ansArray = ["A", "B", "C", "D"];

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2">
      <Text bold>1</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        {
          ansArray.map(ans =>
            <button
              className={`size-7 rounded-full border zaui-border-blue-80 ${answer === ans ? "zaui-bg-blue-80 text-white" : ""}`}
              onClick={() => setAnswer(ans)}
            >
              {ans}
            </button>
          )
        }
      </Box>
    </Box>
  );
}

const DungSai = ({isDungSaiTHPT = false, cauHoi = "1"}: { isDungSaiTHPT: boolean, cauHoi: string }) => {
  const [answer, setAnswer] = useState("Đ");

  return (
    <Box className={`grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 ${isDungSaiTHPT ? "" : "my-2"}`}>
      <Text bold>{cauHoi}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        <button
          className={`size-7 rounded-full border zaui-border-blue-80 ${answer === "Đ" ? "zaui-bg-blue-80 text-white" : ""}`}
          onClick={() => setAnswer("Đ")}
        >
          Đ
        </button>

        <button
          className={`size-7 rounded-full border zaui-border-blue-80 ${answer === "S" ? "zaui-bg-blue-80 text-white" : ""}`}
          onClick={() => setAnswer("S")}
        >
          S
        </button>
      </Box>
    </Box>
  );
}

const DungSaiTHPT = () => {
  const [answer, setAnswer] = useState("Đ");

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2">
      <Text bold>3</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        <DungSai isDungSaiTHPT cauHoi="a" />
        <DungSai isDungSaiTHPT cauHoi="b" />
        <DungSai isDungSaiTHPT cauHoi="c" />
        <DungSai isDungSaiTHPT cauHoi="d" />
      </Box>
    </Box>
  );
}

const TraLoiNgan = () => {
  
  const [answer, setAnswer] = useState<{ [key: number]: string }>({});
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const checkTLNInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const number = Number(value);

    const updateAnswerAndMove = (newValue: string) => {
      const ans = { ...answer };
      ans[index] = newValue;
      setAnswer(ans);

      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    if ((number >= 1 && number <= 9) || (index >= 2 && number === 0) || value === "") {
      updateAnswerAndMove(value);
    }
    else if (index === 1 && value === "-") {
      updateAnswerAndMove("–");
    }
    else if ((index > 1 && index < 4) && value === "," && Number(answer[index - 1])) {
      updateAnswerAndMove(value);
    }
  };

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2">
      <Text bold>4</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        {[0, 1, 2, 3].map((i) => (
          <input
            className={`size-7 rounded-md text-center border zaui-border-blue-80 ${answer === "Đ" ? "zaui-bg-blue-80 text-white" : ""}`}
            maxLength={1}
            value={answer[i]}
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            onChange={(e) => checkTLNInput(e, i)}
          />
        ))}
      </Box>
    </Box>
  )
}

const DienVaoChoTrong = () => {
  const [answer, setAnswer] = useState("");

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2">
      <Text bold>5</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        <input
          type="text" value={answer}
          className="h-7 rounded-md border zaui-border-blue-80 w-full px-2"
          onChange={e => setAnswer(e.target.value)}
        />
      </Box>
    </Box>
  );
}

const TuLuan = () => {
  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2">
      <Text bold>6</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        <input
          type="text" placeholder="Tự luận" readOnly
          className="h-7 rounded-md border zaui-border-blue-80 w-full px-2"
        />
      </Box>
    </Box>
  );
}

export { TracNghiem, DungSai, DungSaiTHPT, TraLoiNgan, DienVaoChoTrong, TuLuan }