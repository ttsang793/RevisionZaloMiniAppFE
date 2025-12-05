import { Box } from "zmp-ui";
import { TracNghiemResult } from "@/components/student/question/multiple-choice";
import { DungSaiResult } from "@/components/student/question/true-false";
import { TraLoiNganMarking } from "@/components/student/question/short-answer";
import { DienVaoChoTrongMarking } from "@/components/student/question/gap-fill";
import { TuLuanMarking } from "@/components/student/question/constructed-response";
import { SapXepResult } from "@/components/student/question/sorting";
import { DungSaiTHPTResult } from "@/components/student/question/true-false-thpt";

function displayQuestion(answer, partIndex, questionIndex, updateQuestion) {
  //console.log(answer.studentAnswer);
  switch (answer.question.type) {
    case "multiple-choice": return <TracNghiemResult i={questionIndex} part={partIndex} answer={answer} key={`question-${partIndex}_${questionIndex}`} />
    case "true-false": return <DungSaiResult i={questionIndex} answer={answer} />
    case "short-answer": return <TraLoiNganMarking i={questionIndex} answer={answer} updateQuestion={updateQuestion} />
    case "gap-fill": return <DienVaoChoTrongMarking i={questionIndex} answer={answer} updateQuestion={updateQuestion} />
    case "constructed-response": return <TuLuanMarking i={questionIndex} answer={answer} updateQuestion={updateQuestion} />
    //case "sorting": return <SapXepResult i={questionIndex} answer={answer} />
    case "true-false-thpt": return <DungSaiTHPTResult i={questionIndex} answer={answer} />
    default: return null;
  }
}

interface MarkingExamPartProps {
  i: number;
  partTitle: string;
  partAnswers: any[];
  partPoint: string;
  partCorrectPoint: string;
  currentQuestion: number;
  setCurrentQuestion: (q: number) => void;
  updateAttempt: (i: number, j: number, prop: string, value: any) => void;
}

const MarkingExamPart = ({i, partTitle, partAnswers, currentQuestion, partPoint, partCorrectPoint, setCurrentQuestion, updateAttempt}: MarkingExamPartProps) => {
  const questionClass = (partAnswer, index: number) => {
    if (currentQuestion === index) {
      if (partAnswer.correct[0] === -1) return "zaui-border-blue-70 zaui-bg-blue-70 zaui-text-blue-10";
      if (partAnswer.point === 0) return "zaui-border-red-70 zaui-bg-red-70 zaui-text-red-10";
      if (partAnswer.point < partAnswer.correctPoint) return "zaui-border-yellow-70 zaui-bg-yellow-70 zaui-text-yellow-10";
      return "zaui-border-green-70 zaui-bg-green-70 zaui-text-green-10";
    }
    else {
      if (partAnswer.correct[0] === -1) return "zaui-border-blue-70 zaui-bg-blue-10 zaui-text-blue-70";
      if (partAnswer.point === 0) return "zaui-border-red-70 zaui-bg-red-10 zaui-text-red-70";
      if (partAnswer.point < partAnswer.correctPoint) return "zaui-border-yellow-70 zaui-bg-yellow-10 zaui-text-yellow-70";
      return "zaui-border-green-70 zaui-bg-green-10 zaui-text-green-70";
    }
  }

  const updateQuestion = (prop: ("correct"|"point"), value: any) => {
    updateAttempt(i, currentQuestion, prop, value);
  }

  return (
    <>
      <Box className="zaui-bg-blue-70 zaui-text-blue-10 px-3 py-2 text-justify mb-2 font-bold">
        Phần {i + 1}. {partTitle} ({partPoint} / {partCorrectPoint} điểm)
      </Box>
      
      <Box className="mb-2 flex justify-center gap-2 flex-wrap overflow-y-auto">
      {
        partAnswers.map((_, j) => 
          <button
            className={`rounded-full size-6 border ${questionClass(partAnswers[j], j)}`}
            onClick={() => setCurrentQuestion(j)} key={`btnQ-${i + 1}_${j + 1}`}
          >
            {j + 1}
          </button>
        )
      }
      </Box>

      <Box>
        {displayQuestion(partAnswers[currentQuestion], i, currentQuestion, updateQuestion)}
      </Box>
    </>
  )
}

export { MarkingExamPart }