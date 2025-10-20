import { Box, Input, Radio, Text } from "zmp-ui";
import "./question.css"
import { useState, useEffect } from "react";
import { CheckLg, XLg } from "react-bootstrap-icons";

const showCorrect = (isCorrect: boolean | undefined) => {
  if (isCorrect === null) return <></>
  if (isCorrect) return <CheckLg size={24} className="inline zaui-text-green-70" />
  return <XLg size={24} className="inline zaui-text-red-70" />
}

const DungSai = ({i, question, answer, practice, updateAnswer}) => {
  const [checkCorrect, setCheckCorrect] = useState(false);
  const { TextArea } = Input;
  
  const handleCorrect = (a: string) => {
    let curAns;
    if (answer === "true" && a === "true") curAns = true;
    else if (answer === "false" && a === "false") curAns = false;
    else return;
    
    if (checkCorrect) return showCorrect(question.answerKey === curAns);
    return <></>
  }

  return (
    <>
      <Box className="border border-gray-300 py-1 px-2">
        <Text size="small" bold className="text-justify">
          Câu {i + 1}. {question.title}
        </Text>
        <Box>
          <Radio.Group value={answer} onChange={checkCorrect ? () => {} : updateAnswer}>
            <Box className="flex items-center gap-x-1">
              <Radio label="Đúng" value="true" /> {handleCorrect("true")}
            </Box>
            <Box className="flex items-center gap-x-1">
              <Radio label="Sai" value="false" /> {handleCorrect("false")}
            </Box>
          </Radio.Group>
        </Box>
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
                    !question.explanation ? <></> : <TextArea label={<Text>Giải thích:</Text>} readOnly value={question.explanation} />
                  }
                </>
              ) : (
                <button className="py-2 px-8 zaui-bg-green-70 zaui-text-green-10 rounded-full">
                  Check đáp án
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

export { DungSai }