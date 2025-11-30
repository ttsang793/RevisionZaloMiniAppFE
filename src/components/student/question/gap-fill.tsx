import { Box, Input, Text } from "zmp-ui";
import { useState, useEffect } from "react";
import { CheckLg, XLg } from "react-bootstrap-icons";

const showCorrect = (isCorrect: boolean | undefined) => {
  if (isCorrect === null) return <></>
  if (isCorrect) return <CheckLg size={24} className="inline zaui-text-green-70" />
  return <XLg size={24} className="inline zaui-text-red-70" />
}

const DienVaoChoTrong = ({i, question, answer, practice, updateAnswer}) => {
  const [checkCorrect, setCheckCorrect] = useState(false);
  const { TextArea } = Input;
  
  return (
    <>
      <Box className="border border-gray-300 py-1 px-2">
        <Text size="small" bold className="text-justify">
          Câu {i + 1}. {question.title}
        </Text>

        <input
          className={`h-8 w-full border border-gray-400 rounded-lg mt-1 px-2 ${((checkCorrect && question.markAsWrong) ? `font-bold zaui-text-${question.answerKeys.includes(answer) ? "green" : "red"}-70` : "")}`}
          value={answer} onChange={e => updateAnswer(e.target.value)}
          readOnly={checkCorrect}
        />

        {
          <Box className={checkCorrect ? "" : "hidden"}>
            <Text className="mt-2 italic font-bold">Đáp án{question.markAsWrong ? ":" : " tham khảo:"}</Text>
            <input
              className="h-8 w-full border border-gray-400 rounded-lg mt-1 px-2 font-bold zaui-text-green-70"
              value={question.answerKeys.join("; ")} readOnly
            />
          </Box>
        }
      </Box>

      {
        !practice ? <></> : (
          <>
            <Box className="text-center mt-3" onClick={() => setCheckCorrect(!checkCorrect)}>
            {
              checkCorrect ? (
                <>
                  <button className="py-2 px-8 zaui-bg-yellow-70 zaui-text-yellow-10 rounded-full">
                    Thử lại
                  </button>

                  {
                    !question.explanation ? <></> : <TextArea label={<Text>Giải thích:</Text>} readOnly value={question.explanation} className="mt-3" />
                  }
                </>
              ) : (
                <button className="py-2 px-8 zaui-bg-green-70 zaui-text-green-10 rounded-full">
                  {(question.markAsWrong) ? "Xem đáp án" : "Tham khảo lời giải"}
                </button>
              )
            }
            </Box>
          </>
        )
      }
    </>
  )
}

const DienVaoChoTrongResult = ({i, answer}) => {
  const question = answer.question;
  const { TextArea } = Input;

  return (
    <>
      <Box className="border border-gray-300 py-1 px-2 mb-2">
        <Text size="small" bold className="text-justify">
          Câu {i + 1}. {question.title}
        </Text>

        <input
          className={`h-8 w-full border border-gray-400 rounded-lg mt-1 px-2 ${(question.markAsWrong ? `font-bold zaui-text-${answer.correct[0] ? "green" : "red"}-70` : "")}`}
          value={answer.studentAnswer}
          readOnly
        />

        {
          <Box>
            <Text className="mt-2 italic font-bold">Đáp án{question.markAsWrong ? ":" : " tham khảo:"}</Text>
            <input
              className="h-8 w-full border border-gray-400 rounded-lg mt-1 px-2 font-bold zaui-text-green-70"
              value={question.answerKeys.join("; ")} readOnly
            />
          </Box>
        }
      </Box>      

      {
        !question.explanation ? <></> : <TextArea label={<Text>Giải thích:</Text>} readOnly value={question.explanation} />
      }
    </>
  )
}

export { DienVaoChoTrong, DienVaoChoTrongResult }