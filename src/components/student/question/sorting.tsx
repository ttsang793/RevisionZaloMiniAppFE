import { Box, ImageViewer, Select, Text, Input } from "zmp-ui";
import { useState, useEffect } from "react";
import { CheckLg, XLg } from "react-bootstrap-icons";
import { floatTwoDigits } from "@/script/util";

const showCorrect = (isCorrect: boolean | undefined) => {
  if (isCorrect) return <CheckLg size={24} className="inline zaui-text-green-70" />
  return <XLg size={24} className="inline zaui-text-red-70" />
}

const SapXep = ({i, question, answer, practice, updateAnswer, point, allowShowScore}) => {
  const [checkCorrect, setCheckCorrect] = useState(false);
  const [visible, setVisible] = useState(false);
  const { TextArea } = Input;

  const [statements, setStatements] = useState(answer);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => setDraggedIndex(index);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (draggedIndex == null || draggedIndex == index) return;

    const newStatements = [...statements];
    const draggedItem = newStatements[draggedIndex];
    
    newStatements.splice(draggedIndex, 1);
    newStatements.splice(index, 0, draggedItem);
    
    updateAnswer(newStatements);
    setStatements(newStatements)
    setDraggedIndex(index);
  }

  const handleDragEnd = () => setDraggedIndex(null);

  return (
    <>
      <Box className="border border-gray-300 py-1 px-2">
        <Text bold className="text-justify">
          Câu {i + 1}. {question.title} {allowShowScore ? `(${floatTwoDigits(point)} đ)` : ""}
        </Text>

        <Box className="place-items-center">
          <img src={question.imageUrl} className="max-h-44 max-w-72" onClick={() => setVisible(true)} />
        </Box>

        <ImageViewer images={[{src: question.imageUrl}]} visible={visible} onClose={() => setVisible(false)} />
        <Box className="statement-container">
        {
          statements.map((st: string, j: number) => (
            <Input
              key={`statement-${j}`} value={st} readOnly
              className={`pe-2 cursor-move statement ${draggedIndex === j ? 'opacity-50' : ''}`}
              draggable={!practice ? true : !checkCorrect}
              onDragStart={() => handleDragStart(j)}
              onDragOver={e => handleDragOver(e, j)}
              onDragEnd={handleDragEnd}
            />
          )
        )}
        </Box>

        {
          <Box className={checkCorrect ? "" : "hidden"}>
            <Text className="mt-2 italic font-bold">Đáp án:</Text>
            {
              question.correctOrder.map((od: string, j: number) => (
                <Input
                  key={`correct-${j}`} value={`${j + 1}. ${od}`} readOnly className="cursor-default"
                />
              )
            )}
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
                  Xem đáp án
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

const SapXepResult = ({i, answer}) => {
  const question = answer.question;
  const [visible, setVisible] = useState(false);

  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>

      <Box className="place-items-center">
        <img src={question.imageUrl} className="max-h-44 max-w-72" onClick={() => setVisible(true)} />
      </Box>

      <ImageViewer images={[{src: question.imageUrl}]} visible={visible} onClose={() => setVisible(false)} />

      {
        answer.studentAnswer.map((od: string, j: number) => (
          <Input
            key={`answer-${j}`} value={od} readOnly
            className="pe-2 cursor-default"
            suffix={showCorrect(answer.correct[j])}
          />
        )
      )}

      <Text className="font-bold italic mt-2">Đáp án:</Text>
      {
        question.correctOrder.map((od: string, j: number) => (
          <Input
            key={`correct-${j}`} value={`${j + 1}. ${od}`} readOnly className="cursor-default"
          />
        )
      )}
    </Box>
  )
}

export { SapXep, SapXepResult }