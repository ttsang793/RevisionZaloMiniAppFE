import { Box, Input, Select, Text } from "zmp-ui";
import { useState, useEffect } from "react";
import { CheckLg, XLg } from "react-bootstrap-icons";

const showCorrect = (isCorrect: boolean | undefined) => {
  if (isCorrect === null) return <></>
  if (isCorrect) return <CheckLg size={24} className="inline zaui-text-green-70" />
  return <XLg size={24} className="inline zaui-text-red-70" />
}

const SapXep = ({i, question, answer, practice, updateAnswer}) => {
  const [cell, setCell] = useState(answer);
  const handleCell = (j, value) => {
    const newCell = [...cell];
    newCell[j] = value;
    updateAnswer(newCell);
    setCell(newCell);
  }

  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>

      {
        question.correctOrder.map((_, i) => (
          <Select closeOnSelect value={cell[i]} key={i} onChange={(e) => handleCell(i, e)}>
            {
              question.correctOrder.map((stm, j) =>
                <Select.Option value={j} title={stm} />
              )
            }
          </Select>
        )
      )}
    </Box>
  )
}

const SapXepResult = ({i, answer}) => {
  const question = answer.question;

  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>

      {
        question.corectOrder.map((od: string, j: number) => (
          <Select closeOnSelect value={od} key={j} disabled></Select>
        )
      )}
    </Box>
  )
}

export { SapXep, SapXepResult }