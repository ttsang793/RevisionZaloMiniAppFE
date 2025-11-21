import { Box, Text } from "zmp-ui";
import { useState } from "react";
import { ExamCodeQuestion } from "@/models/pdf-exam-code";
import { XLg } from "react-bootstrap-icons";

class PDFQuestionProps {
  question: ExamCodeQuestion;
  partIndex: number;
  questionIndex: number;
  updateQuestion: (props: string, value: any) => void;

  constructor(question: ExamCodeQuestion, partIndex: number, questionIndex: number, updateQuestion) {
    this.question = question;
    this.partIndex = partIndex;
    this.questionIndex = questionIndex;
    this.updateQuestion = updateQuestion
  }
}

const TracNghiem = ({prop}: {prop: PDFQuestionProps}) => {
  const { question, partIndex, questionIndex, updateQuestion } = prop;
  const ansArray = ["A", "B", "C", "D"];

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{questionIndex}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        {
          ansArray.map(ans =>
            <button
              key={`${ans}_${partIndex}_${questionIndex}`}
              className={`size-7 rounded-full border zaui-border-blue-80 ${question.answerKey === ans ? "zaui-bg-blue-80 text-white font-bold" : ""}`}
              onClick={() => updateQuestion("answerKey", ans)}
            >
              {ans}
            </button>
          )
        }
      </Box>
    </Box>
  );
}

const DungSai = ({prop}: {prop: PDFQuestionProps}) => {
  const { question, questionIndex, updateQuestion } = prop;

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{questionIndex}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        <input
          className={`size-7 rounded-full border zaui-border-blue-80 cursor-pointer ${question.answerKey === "Đ" ? "zaui-bg-blue-80 text-white font-bold" : ""}`}
          type="button" onClick={() => updateQuestion("answerKey", "Đ")} value={"Đ"}
        />

        <input
          className={`size-7 rounded-full border zaui-border-blue-80 cursor-pointer ${question.answerKey === "S" ? "zaui-bg-blue-80 text-white font-bold" : ""}`}
          type="button" onClick={() => updateQuestion("answerKey", "S")} value={"S"}
        />
      </Box>
    </Box>
  );
}

const DungSaiTHPT = ({prop}: {prop: PDFQuestionProps}) => {
  const { question, partIndex, questionIndex, updateQuestion } = prop;
  const [answer, setAnswer] = useState(["", "", "", ""]);
  const ansAnswer = ["a", "b", "c", "d"];

  const handleAnswer = (i: number, value: string) => {
    const newAnswer = [...answer];
    newAnswer[i] = value;
    setAnswer(newAnswer);
    updateQuestion("answerKeys", newAnswer);
  }

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{questionIndex}</Text>

      <Box className="grid grid-cols-2 gap-y-1.5">
      {
        ansAnswer.map((ans, i) =>
        <Box
          className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80"
          key={`cell_${partIndex}_${questionIndex}_${i}`}
        >
          <Text bold>{ans}</Text>

          <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
            <input
              className={`size-7 rounded-full border zaui-border-blue-80 cursor-pointer ${question.answerKeys[i] === "Đ" ? "zaui-bg-blue-80 text-white font-bold" : ""}`}
              type="button" onClick={() => handleAnswer(i, "Đ")} value={"Đ"}
            />

            <input
              className={`size-7 rounded-full border zaui-border-blue-80 cursor-pointer ${question.answerKeys[i] === "S" ? "zaui-bg-blue-80 text-white font-bold" : ""}`}
              type="button" onClick={() => handleAnswer(i, "S")} value={"S"}
            />
          </Box>
        </Box>
      )}
      </Box>
    </Box>
  );
}

const TraLoiNgan = ({prop}: {prop: PDFQuestionProps}) => {  
  // const [answer, setAnswer] = useState<{ [key: number]: string }>({});
  // const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // const checkTLNInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
  //   const value = e.target.value;
  //   const number = Number(value);

  //   const updateAnswerAndMove = (newValue: string) => {
  //     const ans = { ...answer };
  //     ans[index] = newValue;
  //     setAnswer(ans);

  //     if (inputRefs.current[index + 1]) {
  //       inputRefs.current[index + 1]?.focus();
  //     }
  //   };

  //   if ((number >= 1 && number <= 9) || (index >= 2 && number === 0) || value === "") {
  //     updateAnswerAndMove(value);
  //   }
  //   else if (index === 1 && value === "-") {
  //     updateAnswerAndMove("–");
  //   }
  //   else if ((index > 1 && index < 4) && value === "," && Number(answer[index - 1])) {
  //     updateAnswerAndMove(value);
  //   }
  // };
  
  const { partIndex, questionIndex, updateQuestion } = prop;
  const [answer, setAnswer] = useState(["", "", "", ""])

  const handleAnswer = (i: number, value: string) => {
    const newAnswer = [...answer];
    newAnswer[i] = value;
    setAnswer(newAnswer);
    updateQuestion("answerKeys", newAnswer);
  }

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{questionIndex}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        {[0, 1, 2, 3].map((i) => (
          <input
            className="size-7 rounded-md text-center border zaui-border-blue-80"
            maxLength={1}
            //value={answer[i]}
            key={`cell_${partIndex}_${questionIndex}_${i}`}
            //ref={(el) => (inputRefs.current[i] = el)}
            onChange={(e) => handleAnswer(i, e.target.value)}
          />
        ))}
      </Box>
    </Box>
  )
}

const TuLuan = ({prop}: {prop: PDFQuestionProps}) => {
  const { question, questionIndex } = prop;

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{questionIndex}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        <input
          type="text" placeholder={`${question.type === "gap-fill" ? "Điền vào chỗ trống" : "Tự luận"}`}
          readOnly className="h-7 rounded-md border zaui-border-blue-80 w-full px-2 placeholder:text-blue-900/70"
        />
      </Box>
    </Box>
  );
}

const components: Record<string, (prop: PDFQuestionProps) => JSX.Element> = {
  "multiple-choice": prop => <TracNghiem prop={prop} />,
  "true-false": prop => <DungSai prop={prop} />,
  "short-answer": prop => <TraLoiNgan prop={prop} />,
  "gap-fill": prop => <TuLuan prop={prop} />,
  "constructed-response": prop => <TuLuan prop={prop} />,
  "true-false-thpt": prop => <DungSaiTHPT prop={prop} />,
};

interface PDFAnswerProps {
  question: ExamCodeQuestion;
  partIndex: number;
  questionIndex: number;
  updateQuestion: (props: string, value: any) => void;
  deleteQuestion: (partIndex: number, questionIndex: number) => void;
}

const PDFAnswer = ({question, partIndex, questionIndex, updateQuestion, deleteQuestion}: PDFAnswerProps) => {
  const renderComponent = components[question.type];

  return (
    <Box className="flex gap-x-2 items-center">
      {renderComponent(new PDFQuestionProps(question, partIndex, questionIndex + 1, updateQuestion))}
      <input
        className="px-2 w-16 h-[28px] bg-white border zaui-border-blue-80 rounded-md text-right"
        type="number" min={0} max={10} step={0.05} value={question.point}
        readOnly={question.type === "true-false-thpt"}
        onChange={e => updateQuestion("point", parseFloat(e.target.value))}
      />

      <XLg className="inline cursor-pointer" size={20} onClick={() => deleteQuestion(partIndex, questionIndex)} />
    </Box>
  )
}

export { PDFAnswer }