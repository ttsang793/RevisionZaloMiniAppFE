import { Box, Input, Text, ImageViewer, Checkbox } from "zmp-ui";
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
  const [visible, setVisible] = useState(false);

  const lockEnter = (e: any) => {
    if (!question.allowEnter && e.keyCode === 13) {
      e.preventDefault();
      return;
    }
  }

  return (
    <>
      <Box className="border border-gray-300 py-1 px-2">
        <Text size="small" bold className="text-justify">
          Câu {i + 1}. {question.title}
        </Text>

        <Box className="place-items-center">
          <img src={question.imageUrl} className="max-h-44 max-w-72" onClick={() => setVisible(true)} />
        </Box>

        <TextArea
          value={answer} onChange={e => updateAnswer(e.target.value)}
          size="small" autoHeight readOnly={checkCorrect} onKeyDown={e => lockEnter(e)}
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

      <ImageViewer images={[{src: question.imageUrl}]} visible={visible} onClose={() => setVisible(false)} />

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

const TuLuanResult = ({i, answer}) => {
  const question = answer.question;
  const [visible, setVisible] = useState(false);
  const { TextArea } = Input;

  return (
    <>
      <Box className="border border-gray-300 py-1 px-2 mb-2">
        <Text size="small" bold className="text-justify">
          Câu {i + 1}. {question.title}
        </Text>

        <Box className="place-items-center">
          <img src={question.imageUrl} className="max-h-44 max-w-72" onClick={() => setVisible(true)} />
        </Box>

        <TextArea value={answer.studentAnswer[0]} readOnly size="small" autoHeight />
      </Box>

      <TextArea className="mt-2" label={<Text>Lời giải/Giải thích</Text>} value={question.explanation} readOnly /> 

      <ImageViewer images={[{src: question.imageUrl}]} visible={visible} onClose={() => setVisible(false)} />
    </>
  )
}

const TuLuanMarking = ({i, answer, updateQuestion}) => {
  const question = answer.question;
  const { TextArea } = Input;
  const [visible, setVisible] = useState(false);
  const [unchecked, setUnchecked] = useState(answer.correct[0] === -1);

  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>

      <Box className="place-items-center">
        <img src={question.imageUrl} className="max-h-44 max-w-72" onClick={() => setVisible(true)} />
      </Box>

      <TextArea value={answer.studentAnswer[0]} size="small" readOnly />

      <TextArea className="mt-2" label={<Text>Lời giải/Giải thích</Text>} value={question.explanation} readOnly />

      <Box>
        <Input
          label={<Text>Điểm số (tối đa {answer.correctPoint} điểm)</Text>}
          type="number" step={0.05} min={0} max={answer.correctPoint} value={answer.point}
          onChange={e => {
            updateQuestion("point", Number(e.target.value))
            if (!unchecked) updateQuestion("correct", Number(e.target.value) === answer.correctPoint ? [1] : [0]);
          }}
        />
      </Box>

      <Checkbox
        className="mt-2" value="" checked={answer.correct[0] !== -1}
        onChange={e => {
          setUnchecked(e.target.checked);
          updateQuestion("correct", e.target.checked ? (answer.point === answer.correctPoint ? [1] : [0]) : [-1]);
        }}
      >
        <Text>Xét tính chính xác của câu trả lời.</Text>
      </Checkbox>   
    
      <ImageViewer images={[{src: question.imageUrl}]} visible={visible} onClose={() => setVisible(false)} />
    </Box>
  )
}

export { TuLuan, TuLuanResult, TuLuanMarking }