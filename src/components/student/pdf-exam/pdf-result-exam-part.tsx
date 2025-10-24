import { ExamCodeQuestionGet } from "@/models/pdf-exam-code";
import { Box } from "zmp-ui"
import { PDFResultAnswer } from "./pdf-result-answer";
import { sumThenParseFloat } from "@/script/util";

interface PDFResultExamPartProps {
  partIndex: number;
  question: ExamCodeQuestionGet[];
  answer: string[];
  score: number[];
}

const PDFResultExamPart = ({partIndex, question, answer, score}: PDFResultExamPartProps) => {
  return (
    <Box className="mb-4">
      <Box className="zaui-bg-blue-70 zaui-text-blue-10 py-2 px-4 rounded-md font-bold mb-1">
        Phần {partIndex}. ({sumThenParseFloat(question)} điểm)
      </Box>
      
      {
        question.map((q, i) =>
          <PDFResultAnswer
            partIndex={partIndex}
            question={q}
            answer={answer[i]}
            score={score[i]}
            key={`question_${partIndex}_${q.questionIndex}`}
          />
        )
      }
    </Box>
  )
}

export { PDFResultExamPart };