import { ExamCodeQuestionGet } from "@/models/pdf-exam-code";
import { Box } from "zmp-ui"
import { PDFMarkingAnswer } from "./PDF-marking-answer";
import { sumThenParseFloat } from "@/script/util";

interface PDFMarkingExamPartProps {
  partIndex: number;
  question: ExamCodeQuestionGet[];
  answer: string[];
  point: number[];
  correct: boolean[][];
  updateQuestion: (index: number, value: number, questionPoint: number) => void;
}

const PDFMarkingExamPart = ({partIndex, question, answer, point, correct, updateQuestion}: PDFMarkingExamPartProps) => {
  return (
    <Box className="mb-4">
      <Box className="zaui-bg-blue-70 zaui-text-blue-10 py-2 px-4 rounded-md font-bold mb-1">
        Phần {partIndex}. ({sumThenParseFloat(question)} điểm)
      </Box>
      
      {
        question.map((q, i) =>
          <PDFMarkingAnswer
            partIndex={partIndex}
            question={q}
            answer={answer[i]}
            point={point[i]}
            correct={correct[i]}
            key={`question_${partIndex}_${q.questionIndex}`}
            updateQuestion={updateQuestion}
          />
        )
      }
    </Box>
  )
}

export { PDFMarkingExamPart };