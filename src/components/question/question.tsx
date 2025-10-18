import { Box, Input, Radio, Select, Text } from "zmp-ui";
import "./question.css"
import { useState, useEffect } from "react";

const TracNghiem = ({i, question, answer, updateAnswer}) => {
  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>

      <Box>
        <Radio.Group
          value={answer || ""}
          onChange={updateAnswer}
        >
          <Radio label={question.correctAnswer} value={question.correctAnswer} />
          <Radio label={question.wrongAnswer1} value={question.wrongAnswer1} />
          <Radio label={question.wrongAnswer2} value={question.wrongAnswer2} />
          <Radio label={question.wrongAnswer3} value={question.wrongAnswer3} />
        </Radio.Group>
      </Box>
    </Box>
  );
};

const DungSai = ({i, question, answer, updateAnswer}) => {
  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>
      <Box>
        <Radio.Group value={answer}>
          <Radio label="Đúng" value={true} onChange={e => updateAnswer(e.target.value)} />
          <Radio label="Sai" value={false} onChange={e => updateAnswer(e.target.value)} />
        </Radio.Group>
      </Box>
    </Box>
  )
}

const TraLoiNgan = ({i, question, answer, updateAnswer}) => {
  /*
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
  };*/

  const [cell, setCell] = useState(answer || ["", "", "", ""]);
  const handleCell = (j, value) => {
    const newCell = [...cell];
    newCell[j] = value;
    updateAnswer(newCell);
    setCell(newCell);
  }

  return (    
    <Box className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>
      <Box className="mt-1">
        {[0, 1, 2, 3].map((j) => (
          <input
            className="size-8 text-center border border-gray-400 rounded-lg me-2"
            maxLength={1}
            //onInput={e => checkTLNInput(e, 1)}
            value={cell[j]}
            key={j}
            //ref={(el) => (inputRefs.current[i] = el)}
            onChange={e => handleCell(j, e.target.value)}
          />
        ))}
      </Box>
    </Box>
  )
}

const DienVaoChoTrong = ({i, question, answer, updateAnswer}) => {
  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>

      <input
        className="h-8 w-full text-center border border-gray-400 rounded-lg mt-1"
        value={answer} onChange={e => updateAnswer(e.target.value)}
      />
    </Box>
  )
}

const TuLuan = ({i, question, answer, updateAnswer}) => {
  const { TextArea } = Input;

  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>

      <TextArea
        value={answer} onChange={e => updateAnswer(e.target.value)}
        size="small" autoHeight
      />
    </Box>
  )
}

const SapXep = ({i, question, answer, updateAnswer}) => {
  const [cell, setCell] = useState(answer || ["", "", "", ""]);
  const handleCell = (j, value) => {
    const newCell = [...cell];
    newCell[j] = value;
    updateAnswer(newCell);
    setCell(newCell);
  }

  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>

      {
        [0,1,2,3].map(j => (
          <Select closeOnSelect value={cell[j]} key={j} onChange={(e) => handleCell(j, e)}>
            <Select.Option value="1" title="1" />
            <Select.Option value="2" title="2" />
            <Select.Option value="3" title="3" />
            <Select.Option value="4" title="4" />
          </Select>
        )
      )}
    </Box>
  )
}

const DungSaiTHPT = ({i, question, answer, updateAnswer}) => {
  const [cell, setCell] = useState(answer || ["", "", "", ""]);
  const handleCell = (j, value) => {
    const newCell = [...cell];
    newCell[j] = value;
    updateAnswer(newCell);
    setCell(newCell);
  }

  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>

      {
        question.statements.map((s, j) => (
          <Box className="flex items-center" key={`stm_${i}_${j}`}>
            <Text className="flex-1">{s}</Text>
            <Radio.Group className="flex" value={cell[j]}>
              <Radio value={true} checked={cell[j] == true} onChange={e => handleCell(j, e.target.value)} />
              <Radio value={false} checked={cell[j] == false} onChange={e => handleCell(j, e.target.value)} />
            </Radio.Group>
          </Box>
        ))
      }
    </Box>
  )
}

export { TracNghiem, DungSai, TraLoiNgan, DienVaoChoTrong, TuLuan, SapXep, DungSaiTHPT }