import { Box, Input, Radio, Text, ImageViewer } from "zmp-ui";
import "./question.css"
import { useState, useEffect } from "react";
import { CheckLg, XLg } from "react-bootstrap-icons";
import { floatTwoDigits } from "@/script/util";

const showCorrect = (isCorrect: boolean | undefined) => {
  if (isCorrect === null) return <></>
  if (isCorrect) return <CheckLg size={24} className="inline zaui-text-green-70" />
  return <XLg size={24} className="inline zaui-text-red-70" />
}

const TracNghiem = ({i, part, question, answer, practice, updateAnswer, point, allowShowScore}) => {
  const [checkCorrect, setCheckCorrect] = useState(false);
  const [visible, setVisible] = useState(false);
  const {TextArea} = Input;

  const handleCorrect = (a: string) => {
    if (checkCorrect && answer === a) return showCorrect(a === question.correctAnswer);
    return <></>
  }

  return (
    <>
      <Box className="border border-gray-300 py-1 px-2">
        <Text bold className="text-justify">
          Câu {i + 1}. {question.title} {allowShowScore ? `(${floatTwoDigits(point)} đ)` : ""}
        </Text>

        <Box className="place-items-center">
          <img src={question.imageUrl} className="max-h-44 max-w-72" onClick={() => setVisible(true)} />
        </Box>

        <Box>
          <Radio.Group
            value={answer || ""}
            onChange={checkCorrect ? () => {} : updateAnswer}
          >
          {
            question.answerKeys.map((qak: string, j: number) =>
              <Box className="flex items-center gap-x-1" key={`answer_${part}_${i}_${j}`}>
                <Radio label={qak} value={qak} /> {handleCorrect(qak)} 
              </Box>
            )
          }
          </Radio.Group>
        </Box>

        <ImageViewer images={[{src: question.imageUrl}]} visible={visible} onClose={() => setVisible(false)} />
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
  );
};

const TracNghiemResult = ({i, part, answer}) => {
  const question = answer.question;
  const [visible, setVisible] = useState(false);

  const handleCorrect = (a: string) => {
    if (a === answer.studentAnswer[0] || a === question.correctAnswer) return showCorrect(a === question.correctAnswer);
    return <></>
  }

  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>

      <Box className="place-items-center">
        <img src={question.imageUrl} className="max-h-44 max-w-72" onClick={() => setVisible(true)} />
      </Box>

      <Box>
        <Radio.Group value={answer.studentAnswer}>
        {
          answer.answerOrder.map((ans: string, j: number) =>
            <Box className="flex items-center gap-x-1" key={`answer_${part}_${i}_${j}`}>
              <Radio disabled label={ans} value={ans} /> {handleCorrect(ans)} 
            </Box>
          )
        }
        </Radio.Group>
      </Box>

      <ImageViewer images={[{src: question.imageUrl}]} visible={visible} onClose={() => setVisible(false)} />
    </Box>
  )
}

export { TracNghiem, TracNghiemResult }