import { ExamCodeQuestionGet } from "@/models/pdf-exam-code";
import { Box, Text } from "zmp-ui"
import { PDFAnswer } from "./pdf-question";

interface PDFExamPartProps {
  partIndex: number;
  question: ExamCodeQuestionGet[];
  updateExamAnswer: (pIndex: number, qIndex: number, question: ExamCodeQuestionGet) => void;
}

const PDFExamPart = ({partIndex, question, updateExamAnswer}: PDFExamPartProps) => {
  const updateAnswer = (q: ExamCodeQuestionGet, prop: string, value: string): void => {
    q[`${prop}`] = value;
    updateExamAnswer(partIndex, q.questionIndex, q);
  }

  return (
    <Box className="mb-4">
      <Box className="zaui-bg-blue-70 zaui-text-blue-10 py-2 px-4 rounded-md font-bold mb-1">
        Phần {partIndex}
      </Box>
      
      {
        question.map(q =>
          <PDFAnswer
            partIndex={partIndex}
            question={q}
            updateAnswer={(prop: string, value: any) => updateAnswer(q, prop, value)}
            key={`question_${partIndex}_${q.questionIndex}`}
          />
        )
      }
    </Box>
  )
}

export { PDFExamPart };