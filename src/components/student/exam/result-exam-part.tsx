import { Box } from "zmp-ui";
import { useState, useEffect } from "react";
import { TracNghiemResult } from "../question/multiple-choice";
import { DungSaiResult } from "../question/true-false";
import { TraLoiNganResult } from "../question/short-answer";
import { DienVaoChoTrongResult } from "../question/fill-in-the-blank";
import { TuLuanResult } from "../question/constructed-response";
import { SapXep } from "../question/sorting";
import { DungSaiTHPTResult } from "../question/true-false-thpt";

function displayQuestion(answer, partIndex, questionIndex) {
  //console.log(question);
  switch (answer.question.type) {
    case "multiple-choice": return <TracNghiemResult i={questionIndex} part={partIndex} answer={answer} key={`question-${partIndex}_${questionIndex}`} />
    case "true-false": return <DungSaiResult i={questionIndex} answer={answer} />
    case "short-answer": return <TraLoiNganResult i={questionIndex} answer={answer} />
    case "fill-in-the-blank": return <DienVaoChoTrongResult i={questionIndex} answer={answer} />
    case "constructed-response": return <TuLuanResult i={questionIndex} answer={answer} />
    //case "sorting": return <SapXepResult i={questionIndex} answer={answer} />
    case "true-false-thpt": return <DungSaiTHPTResult i={questionIndex} answer={answer} />
    default: return null;
  }
}

interface ResultExamPartProps {
  i: number;
  partTitle: string,
  partAnswers: any[],
}

const ResultExamPart = ({i, partTitle, partAnswers}: ResultExamPartProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    setCurrentQuestion(0);
  }, [partTitle]);

  return (
    <>
      <Box className="zaui-bg-blue-70 zaui-text-blue-10 px-3 py-2 text-justify mb-2 font-bold">
        Phần {i + 1}. {partTitle}  ({parseFloat(partAnswers.reduce((sum, item) => sum + item.point, 0))} điểm)
      </Box>
      
      <Box className="mb-2 flex justify-center gap-2 flex-wrap overflow-y-auto">
      {
        partAnswers.map((_, j) =>
          <button
            className={`rounded-full size-6 border ${currentQuestion === j ? "zaui-border-blue-70 zaui-bg-blue-70 zaui-text-blue-10" : "zaui-border-blue-70 zaui-bg-blue-10 zaui-text-blue-70"}`}
            onClick={() => setCurrentQuestion(j)} key={`btnQ-${i + 1}_${j + 1}`}
          >
            {j + 1}
          </button>
        )
      }
      </Box>

      <Box>
        {displayQuestion(partAnswers[currentQuestion], i, currentQuestion)}
      </Box>
    </>
  )
}

export { ResultExamPart }