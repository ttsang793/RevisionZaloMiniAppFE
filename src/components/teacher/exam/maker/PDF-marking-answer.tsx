import { Box, Text } from "zmp-ui";
import { ExamCodeQuestionGet } from "@/models/pdf-exam-code";
import { CheckLg, XLg, DashLg } from 'react-bootstrap-icons';
import { floatTwoDigits } from "@/script/util";

class PDFQuestionProps {
  partIndex: number;
  question: ExamCodeQuestionGet;
  answer: string;
  point: number;
  correct: boolean[];
  updateQuestion: (index: number, value: number, questionPoint: number) => void;

  constructor(partIndex: number, question: ExamCodeQuestionGet, answer: string, point: number, correct: boolean[]) {
    this.partIndex = partIndex;
    this.question = question;
    this.answer = answer;
    this.point = point;
    this.correct = correct;
  }
}

const TracNghiem = ({prop}: {prop: PDFQuestionProps}) => {
  const { partIndex, question, answer, point } = prop;
  const ansArray = ["A", "B", "C", "D"];

  const checkCorrect = (ans: string): string => {
    if (ans === answer) {
      if (point > 0) return "zaui-border-green-80 text-white font-bold zaui-bg-green-70"
      else return "zaui-border-red-80 text-white font-bold zaui-bg-red-70"
    }
    if (ans === question.answerKey) return "zaui-border-green-80 font-bold zaui-bg-green-20 zaui-text-green-70"
    return "zaui-border-blue-80";
  }

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{question.questionIndex}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap items-center">
        {
          ansArray.map(ans =>
            <button
              key={`${ans}_${partIndex}_${question.questionIndex}`}
              className={`size-7 rounded-full border ${checkCorrect(ans)}`}
            >
              {ans}
            </button>
          )
        }

        {
          point > 0 ? <CheckLg size={24} className="zaui-text-green-70" /> : <XLg size={24} className="zaui-text-red-70" />
        }
      </Box>
    </Box>
  );
}

const DungSai = ({prop}: {prop: PDFQuestionProps}) => {
  const { question, answer, point } = prop;

  const checkCorrect = (ans: string): string => {
    if (ans === answer) {
      if (point > 0) return "zaui-border-green-80 text-white font-bold zaui-bg-green-70"
      else return "zaui-border-red-80 text-white font-bold zaui-bg-red-70"
    }
    if (ans === question.answerKey) return "zaui-border-green-80 font-bold zaui-bg-green-20 zaui-text-green-70"
    return "zaui-border-blue-80";
  }

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{question.questionIndex}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap items-center">
        <input
          type="button" value={"Đ"}
          className={`size-7 rounded-full border ${checkCorrect("Đ")}`}
        />

        <input
          type="button" value={"S"}
          className={`size-7 rounded-full border ${checkCorrect("S")}`}
        />

        {
          point > 0 ? <CheckLg size={24} className="zaui-text-green-70" /> : <XLg size={24} className="zaui-text-red-70" />
        }
      </Box>
    </Box>
  );
}

const DungSaiTHPT = ({prop}: {prop: PDFQuestionProps}) => {
  const { partIndex, question, answer, point } = prop;
  const ansAnswer = ["a", "b", "c", "d"];

  const checkCorrect = (ans: string, index: number): string => {
    if (answer[index] === question.answerKey[index]) { // Tra loi dung
      if (ans === answer[index]) // Gia tri dau vao trung voi cau tra loi da chon
        return "zaui-border-green-80 text-white font-bold zaui-bg-green-70"
      else return "zaui-border-blue-80";
    }
    else { // Tra loi sai
      if (ans === answer[index]) // Gia tri dau vao trung voi cau tra loi da chon
        return "zaui-border-red-80 text-white font-bold zaui-bg-red-70";
      else return "zaui-border-green-80 font-bold zaui-bg-green-20 zaui-text-green-70";
    }
    
  }

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{question.questionIndex}</Text>

      <Box className="grid sm:grid-cols-2 md:grid-cols-4 gap-y-1.5">
      {
        ansAnswer.map((ans, i) =>
        <Box
          className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80"
          key={`cell_${partIndex}_${question.questionIndex}_${i}`}
        >
          <Text bold>{ans}</Text>

          <Box className="flex gap-x-1 gap-y-1.5 flex-wrap items-center">
            <input
              type="button" value={"Đ"}
              className={`size-7 rounded-full border ${checkCorrect("Đ", i)}`}
            />

            <input
              type="button" value={"S"}
              className={`size-7 rounded-full border ${checkCorrect("S", i)}`}
            />

            {
              (answer[i] === question.answerKey[i]) ? <CheckLg size={24} className="zaui-text-green-70" />
                : <XLg size={24} className="zaui-text-red-70" />
            }
          </Box>
        </Box>
      )}
      </Box>
    </Box>
  );
}

const TraLoiNgan = ({prop}: {prop: PDFQuestionProps}) => {  
  const { partIndex, question, answer, point } = prop;

  const handleCorrect = (): string => {
    if (point > 0) return "zaui-border-green-80 zaui-text-green-70";
    else return "zaui-border-red-80 zaui-text-red-70";
  }

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{question.questionIndex}</Text>

      <Box className="flex gap-y-2 flex-col">
        <Box className="flex gap-x-1 flex-wrap items-center">
          {
            answer.split("").map((a,i) => (
            <input
              className={`size-7 rounded-md text-center border font-bold ${handleCorrect()}`}
              value={a} key={`answer_${partIndex}_${question.questionIndex}_${i}`} readOnly
            />
          ))}
          {            
            point === 0 ? <XLg size={24} className="zaui-text-red-70" /> :
            (point < question.point ? <DashLg size={24} className="zaui-text-orange-70" /> : <CheckLg size={24} className="zaui-text-green-70" />)
          }
        </Box>

        <Box className="flex gap-x-1 flex-wrap items-center">
        {point == 0 && question.answerKey.split("").map((a,i) => (
          <input
            className="size-7 rounded-md text-center border zaui-border-green-80 font-bold zaui-text-green-80"
            value={a} key={`correct_${partIndex}_${question.questionIndex}_${i}`} readOnly
          />
        ))}
        </Box>
      </Box>
    </Box>
  )
}

const DienVaoChoTrong = ({prop}: {prop: PDFQuestionProps}) => {
  const { question, answer, point } = prop;

  const handleCorrect = (): string => {
    if (point === -1) return "zaui-border-blue-80";
    if (point < question.point) return "zaui-border-red-80 zaui-text-red-70";
    return "zaui-border-green-80 zaui-text-green-70";
  }

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{question.questionIndex}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        <input className={`h-7 rounded-md border flex-1 py-4 px-2 ${handleCorrect()}`} value={answer} readOnly />
        {          
          point === 0 ? <XLg size={24} className="zaui-text-red-70" /> :
          (point < question.point ? <DashLg size={24} className="zaui-text-orange-70" /> : <CheckLg size={24} className="zaui-text-green-70" />)
        }
      </Box>
    </Box>
  );
}

const TuLuan = ({prop}: {prop: PDFQuestionProps}) => {
  const { question, answer, point } = prop;

  const handleCorrect = (): string => {
    if (point === -1) return "zaui-border-blue-80";
    if (point < question.point) return "zaui-border-red-80 zaui-text-red-70";
    return "zaui-border-green-80 zaui-text-green-70";
  }

  return (
    <Box className="grid grid-cols-[24px_1fr] items-center zaui-text-blue-80 my-2 flex-1">
      <Text bold>{question.questionIndex}</Text>

      <Box className="flex gap-x-1 gap-y-1.5 flex-wrap">
        <textarea
          className={`rounded-md border flex-1 p-2 h-20 no-resize-textarea ${handleCorrect()}`}
          value={answer} readOnly
        />
        {
          point === 0 ? <XLg size={24} className="zaui-text-red-70" /> :
          (point < question.point ? <DashLg size={24} className="zaui-text-orange-70" /> : <CheckLg size={24} className="zaui-text-green-70" />)
        }
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

const PDFMarkingAnswer = ({partIndex, question, answer, point, correct, updateQuestion}: PDFQuestionProps) => {
  const renderComponent = components[question.type];

  return (
    <Box className="flex gap-x-2 items-center">
      {renderComponent(new PDFQuestionProps(partIndex, question, answer, point, correct))}
      <Text className="zaui-text-blue-70 text-right">
      {
        ["short-answer", "gap-fill", "constructed-response"].includes(question.type) ? (
          <>
            (
            <input
              type="number" min={0} max={question.point}
              step={question.type === "short-answer" ? question.point : 0.05}
              className="rounded-md border p-2 h-7 w-16"
              value={point} onChange={e => updateQuestion(question.questionIndex - 1, Number(e.target.value), question.point)}
            />
            / {floatTwoDigits(question.point)} đ)
          </>
        ) : (
          point === question.point ? `(${floatTwoDigits(point)} đ)`
          : `(${floatTwoDigits(point)} / ${floatTwoDigits(question.point)} đ)`
        )
      }
      </Text>
    </Box>
  )
}

export { PDFMarkingAnswer }