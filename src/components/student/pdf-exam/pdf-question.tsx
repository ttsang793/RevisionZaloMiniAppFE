import { Box, Text } from "zmp-ui";
import { useState } from "react";
import { ExamCodeQuestionGet } from "@/models/pdf-exam-code";
import { floatTwoDigits } from "@/script/util";

class PDFQuestionProps {
  question: ExamCodeQuestionGet;
  partIndex: number;
  updateAnswer: (prop: string, value: any) => void;
  allowShowScore?: boolean;

  constructor(question: ExamCodeQuestionGet, partIndex: number, updateAnswer) {
    this.question = question;
    this.partIndex = partIndex;
    this.updateAnswer = updateAnswer
  }
}

const TracNghiem = ({prop}: {prop: PDFQuestionProps}) => {
  const { question, partIndex, updateAnswer } = prop;
  const ansArray = ["A", "B", "C", "D"];

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{question.questionIndex}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        {
          ansArray.map(ans =>
            <button
              key={`${ans}_${partIndex}_${question.questionIndex}`}
              className={`size-7 rounded-full border zaui-border-blue-80 ${question.studentAnswer === ans ? "zaui-bg-blue-80 text-white font-bold" : ""}`}
              onClick={() => updateAnswer("studentAnswer", ans)}
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
  const { question, updateAnswer } = prop;

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{question.questionIndex}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        <input
          className={`size-7 rounded-full border zaui-border-blue-80 cursor-pointer ${question.studentAnswer === "Đ" ? "zaui-bg-blue-80 text-white font-bold" : ""}`}
          type="button" onClick={() => updateAnswer("studentAnswer", "Đ")} value={"Đ"}
        />

        <input
          className={`size-7 rounded-full border zaui-border-blue-80 cursor-pointer ${question.studentAnswer === "S" ? "zaui-bg-blue-80 text-white font-bold" : ""}`}
          type="button" onClick={() => updateAnswer("studentAnswer", "S")} value={"S"}
        />
      </Box>
    </Box>
  );
}

const DungSaiTHPT = ({prop}: {prop: PDFQuestionProps}) => {
  const { question, partIndex, updateAnswer } = prop;
  const [answer, setAnswer] = useState(["", "", "", ""]);
  const ansAnswer = ["a", "b", "c", "d"];

  const handleAnswer = (i: number, value: string) => {
    const newAnswer = [...answer];
    newAnswer[i] = value;
    setAnswer(newAnswer);
    updateAnswer("studentAnswers", newAnswer);
  }

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{question.questionIndex}</Text>

      <Box className="grid grid-cols-2 gap-y-1.5">
      {
        ansAnswer.map((ans, i) =>
        <Box
          className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80"
          key={`cell_${partIndex}_${question.questionIndex}_${i}`}
        >
          <Text bold>{ans}</Text>

          <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
            <input
              className={`size-7 rounded-full border zaui-border-blue-80 cursor-pointer ${question.studentAnswers[i] === "Đ" ? "zaui-bg-blue-80 text-white font-bold" : ""}`}
              type="button" onClick={() => handleAnswer(i, "Đ")} value={"Đ"}
            />

            <input
              className={`size-7 rounded-full border zaui-border-blue-80 cursor-pointer ${question.studentAnswers[i] === "S" ? "zaui-bg-blue-80 text-white font-bold" : ""}`}
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
  const { question, partIndex, updateAnswer } = prop;
  const [answer, setAnswer] = useState(["", "", "", ""]);

  const handleAnswer = (i: number, value: string) => {
    const newAnswer = [...answer];
    newAnswer[i] = value;
    setAnswer(newAnswer);
    updateAnswer("studentAnswers", newAnswer);
  }

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{question.questionIndex}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        {[0, 1, 2, 3].map((i) => (
          <input
            className="size-7 rounded-md text-center border zaui-border-blue-80"
            maxLength={1}
            //value={answer[i]}
            key={`cell_${partIndex}_${question.questionIndex}_${i}`}
            //ref={(el) => (inputRefs.current[i] = el)}
            onChange={e => handleAnswer(i, e.target.value)}
          />
        ))}
      </Box>
    </Box>
  )
}

const DienVaoChoTrong = ({prop}: {prop: PDFQuestionProps}) => {
  const { question, updateAnswer } = prop;

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{question.questionIndex}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        <input
          className="h-7 rounded-md border zaui-border-blue-80 w-full py-4 px-2"
          onChange={e => updateAnswer("studentAnswer", e.target.value)}
        />
      </Box>
    </Box>
  );
}

const TuLuan = ({prop}: {prop: PDFQuestionProps}) => {
  const { question, updateAnswer } = prop;

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{question.questionIndex}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        <textarea
          className="rounded-md border zaui-border-blue-80 w-full p-2 h-20"
          onChange={e => updateAnswer("studentAnswer", e.target.value)}
        />
      </Box>
    </Box>
  );
}

const components: Record<string, (prop: PDFQuestionProps) => JSX.Element> = {
  "multiple-choice": prop => <TracNghiem prop={prop} />,
  "true-false": prop => <DungSai prop={prop} />,
  "short-answer": prop => <TraLoiNgan prop={prop} />,
  "gap-fill": prop => <DienVaoChoTrong prop={prop} />,
  "constructed-response": prop => <TuLuan prop={prop} />,
  "true-false-thpt": prop => <DungSaiTHPT prop={prop} />,
};

const PDFAnswer = ({question, partIndex, updateAnswer, allowShowScore}: PDFQuestionProps) => {
  const renderComponent = components[question.type];

  return (
    <Box className="flex gap-x-2 items-center">
      {renderComponent(new PDFQuestionProps(question, partIndex, updateAnswer))}
      { allowShowScore ? <Text className="zaui-text-blue-70">({floatTwoDigits(question.point)} đ)</Text> : <></> }
    </Box>
  )
}

export { PDFAnswer }