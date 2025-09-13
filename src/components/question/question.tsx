import { Text, Radio } from "zmp-ui";
import "./question.css"
import { useRef, useState } from "react";

const TracNghiem = () => {
  return (
    <div className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu 1. Có bao nhiêu số nguyên tố từ 1 đến 10?
      </Text>

      <div>
        <Radio.Group
          options={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
          ]}
        />
      </div>
    </div>
  );
}

const DungSai = () => {
  return (
    <div className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu 2. Có 50 số chia hết cho 2 từ 1 đến 100.
      </Text>
      <div>
        <Radio.Group
          options={[
            { label: "Đúng", value: "true" },
            { label: "Sai", value: "false" },
          ]}
        />
      </div>
    </div>
  )
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
    <div className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu 2. Có 50 số chia hết cho 2 từ 1 đến 100.
      </Text>
      <div className="mt-1">
        {[0, 1, 2, 3].map((i) => (
          <input
            className="size-8 text-center border border-gray-400 rounded-lg me-2"
            maxLength={1}
            onInput={e => checkTLNInput(e, 1)}
            value={answer[i]}
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            onChange={(e) => checkTLNInput(e, i)}
          />
        ))}
      </div>
    </div>
  )
}

const DienVaoChoTrong = () => {
  return (
    <div className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu 4. Số ______ là số chỉ chia hết cho 1 và chính nó.
      </Text>

      <input className="h-8 w-full text-center border border-gray-400 rounded-lg mt-1" />
    </div>
  )
}

export { TracNghiem, DungSai, TraLoiNgan, DienVaoChoTrong }