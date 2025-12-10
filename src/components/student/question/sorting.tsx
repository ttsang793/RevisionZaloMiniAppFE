import { Box, ImageViewer, Select, Text, Input } from "zmp-ui";
import { useState, useEffect } from "react";
import { CheckLg, XLg } from "react-bootstrap-icons";

const showCorrect = (isCorrect: boolean | undefined) => {
  if (isCorrect) return <CheckLg size={24} className="inline zaui-text-green-70" />
  return <XLg size={24} className="inline zaui-text-red-70" />
}

const SapXep = ({i, question, answer, practice, updateAnswer}) => {
  const [visible, setVisible] = useState(false);

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

    console.log(newStatements);
    
    updateAnswer(newStatements);
    setStatements(newStatements)
    setDraggedIndex(index);
  }

  const handleDragEnd = () => setDraggedIndex(null);

  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu {i + 1}. {question.title}
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
            draggable={true}
            onDragStart={() => handleDragStart(j)}
            onDragOver={e => handleDragOver(e, j)}
            onDragEnd={handleDragEnd}
          />
        )
      )}
      </Box>
    </Box>
  )
}

const SapXepResult = ({i, answer}) => {
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
            key={`correct-${j}`} value={od} readOnly className="cursor-default"
          />
        )
      )}
    </Box>
  )
}

export { SapXep, SapXepResult }