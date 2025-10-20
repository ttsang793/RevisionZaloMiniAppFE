import { Box, Input, Text } from "zmp-ui";
import { useState, useEffect } from "react";
import { CheckLg, XLg } from "react-bootstrap-icons";

const showCorrect = (isCorrect: boolean | undefined) => {
  if (isCorrect === null) return <></>
  if (isCorrect) return <CheckLg size={24} className="inline zaui-text-green-70" />
  return <XLg size={24} className="inline zaui-text-red-70" />
}

const TuLuan = ({i, question, answer, practice, updateAnswer}) => {
  const { TextArea } = Input;
  const [checkCorrect, setCheckCorrect] = useState(false);

  return (
    <>
      <Box className="border border-gray-300 py-1 px-2">
        <Text size="small" bold className="text-justify">
          Câu {i + 1}. {question.title}
        </Text>

        <TextArea
          value={answer} onChange={e => updateAnswer(e.target.value)}
          size="small" autoHeight readOnly={checkCorrect}
        />

        {
          !checkCorrect ? <></> : (
            <TextArea
              className="mt-2"
              label={<Text>Lời giải/Giải thích</Text>}
              value={question.explanation} readOnly
            />
          )
        }
      </Box>

      {
        !practice ? <></> : (
          <>
            <Box className="text-center mt-3" onClick={() => setCheckCorrect(!checkCorrect)}>
            {
              checkCorrect ? (
                <button className="py-2 px-8 zaui-bg-yellow-70 zaui-text-yellow-10 rounded-full">
                  Thử lại
                </button>
              ) : (
                <button className="py-2 px-8 zaui-bg-green-70 zaui-text-green-10 rounded-full">
                  Tham khảo lời giải
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

export { TuLuan }