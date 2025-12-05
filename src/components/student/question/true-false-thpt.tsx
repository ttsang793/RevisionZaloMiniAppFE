import { Box, Input, Radio, Text, ImageViewer } from "zmp-ui";
import "./question.css"
import { useState, useEffect } from "react";
import { CheckLg, XLg } from "react-bootstrap-icons";

const showCorrect = (isCorrect: boolean | undefined) => {
  if (isCorrect === null) return <></>
  if (isCorrect) return <CheckLg size={24} className="inline zaui-text-green-70" />
  return <XLg size={24} className="inline zaui-text-red-70" />
}

const DungSaiTHPT = ({i, question, answer, practice, updateAnswer}) => {
  const [cell, setCell] = useState(answer || ["", "", "", ""]);
  const [checkCorrect, setCheckCorrect] = useState(false);
  const { TextArea } = Input;
  const [visible, setVisible] = useState(false);

  const handleCorrect = (a: string, i: number) => {
    const curAns = (a === "true");    
    if (checkCorrect) return showCorrect(question.answerKeys[i] === curAns);
    return <></>
  }

  const handleCell = (j, value) => {
    const newCell = [...cell];
    newCell[j] = value;
    updateAnswer(newCell);
    setCell(newCell);
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

        {
          question.statements.map((s, j) => (
            <Box className="flex items-center" key={`stm_${i}_${j}`}>
              <Text className="flex-1">{s}</Text>
              <Radio.Group className="flex" value={cell[j]} disabled={checkCorrect}>
                <Radio value={true} checked={cell[j] == true} onChange={e => handleCell(j, e.target.value)} />
                <Radio value={false} checked={cell[j] == false} onChange={e => handleCell(j, e.target.value)} />
              </Radio.Group>
              
              {handleCorrect(cell[j], j)}
            </Box>
          ))
        }
      </Box>

      <ImageViewer images={[{src: question.imageUrl}]} visible={visible} onClose={() => setVisible(false)} />

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

const DungSaiTHPTResult = ({i, answer}) => {
  const question = answer.question;
  const [visible, setVisible] = useState(false);

  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>

      <Box className="place-items-center">
        <img src={question.imageUrl} className="max-h-44 max-w-72" onClick={() => setVisible(true)} />
      </Box>

      {
        question.statements.map((s, j) => (
          <Box className="flex items-center" key={`stm_${i}_${j}`}>
            <Text className="flex-1">{s}</Text>
            <Radio.Group className="flex" value={answer.studentAnswer[j]} disabled>
              <Radio value="true" />
              <Radio value="false" />
            </Radio.Group>
            
            {showCorrect(answer.correct[j])}
          </Box>
        ))
      }

      <ImageViewer images={[{src: question.imageUrl}]} visible={visible} onClose={() => setVisible(false)} />
    </Box>
  )
}

export { DungSaiTHPT, DungSaiTHPTResult }