import { Box } from "zmp-ui";
import { useState, useEffect } from "react";
import { TracNghiem, DungSai, TraLoiNgan, DienVaoChoTrong, TuLuan, SapXep, DungSaiTHPT } from "@/components/question/question";

function displayQuestion(question, partIndex, questionIndex, answer, updateAnswer) {
  switch (question.type) {
    case "multiple-choice": return <TracNghiem i={questionIndex} question={question} answer={answer} updateAnswer={updated => updateAnswer(questionIndex, updated)} key={`question-${partIndex}_${questionIndex}`} />
    case "true-false": return <DungSai i={questionIndex} question={question} answer={answer} updateAnswer={updated => updateAnswer(questionIndex, updated)} key={`question-${partIndex}_${questionIndex}`} />
    case "short-answer": return <TraLoiNgan i={questionIndex} question={question} answer={answer} updateAnswer={updated => updateAnswer(questionIndex, updated)} key={`question-${partIndex}_${questionIndex}`} />
    case "fill-in-the-blank": return <DienVaoChoTrong i={questionIndex} question={question} answer={answer} updateAnswer={updated => updateAnswer(questionIndex, updated)} key={`question-${partIndex}_${questionIndex}`} />
    case "constructed-response": return <TuLuan i={questionIndex} question={question} answer={answer} updateAnswer={updated => updateAnswer(questionIndex, updated)} key={`question-${partIndex}_${questionIndex}`} />
    case "sorting": return <SapXep i={questionIndex} question={question} answer={answer} updateAnswer={updated => updateAnswer(questionIndex, updated)} key={`question-${partIndex}_${questionIndex}`} />
    case "true-false-thpt": return <DungSaiTHPT i={questionIndex} question={question} answer={answer} updateAnswer={updated => updateAnswer(questionIndex, updated)} key={`question-${partIndex}_${questionIndex}`} />
    default: return null;
  }
}

interface ExamPartProps {
  i: number;
  partTitle: string,
  partQuestions: any[],
  answerList: any[],
  updateAnswerList: (list: any[]) => void;
}

const ExamPart = ({i, partTitle, partQuestions, answerList, updateAnswerList}: ExamPartProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const updateAnswer = (j: number, updated: any) => {
    const newList = [...answerList];
    newList[j] = updated;
    updateAnswerList(newList);
  }

  useEffect(() => {
    setCurrentQuestion(0);
  }, [partTitle]);

  return (
    <>
      <Box className="zaui-bg-blue-70 zaui-text-blue-10 px-3 py-2 text-justify mb-2 font-bold">
        Phần {i + 1}. {partTitle} ({parseFloat(partQuestions.reduce((sum, item) => sum + item.question.point, 0))} điểm)
      </Box>
      
      <Box className="mb-2 flex justify-center gap-2 flex-wrap overflow-y-auto">
      {
        partQuestions.map((_, j) =>
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
        {displayQuestion(partQuestions[currentQuestion].question.question, i, currentQuestion, answerList[currentQuestion], updateAnswer)}
      </Box>
    </>
  )
}

export { ExamPart }