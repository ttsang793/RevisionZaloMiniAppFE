import { Box, Input, Select, Text } from "zmp-ui";
import { useState, useEffect } from "react";
import { CheckLg, XLg } from "react-bootstrap-icons";

const showCorrect = (isCorrect: boolean | undefined) => {
  if (isCorrect === null) return <></>
  if (isCorrect) return <CheckLg size={24} className="inline zaui-text-green-70" />
  return <XLg size={24} className="inline zaui-text-red-70" />
}

const SapXep = ({i, question, answer, practice, updateAnswer}) => {
  const [cell, setCell] = useState(answer || ["", "", "", ""]);
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
        [0,1,2,3].map(j => (
          <Select closeOnSelect value={cell[j]} key={j} onChange={(e) => handleCell(j, e)}>
            <Select.Option value="1" title="1" />
            <Select.Option value="2" title="2" />
            <Select.Option value="3" title="3" />
            <Select.Option value="4" title="4" />
          </Select>
        )
      )}
    </Box>
  )
}

export { SapXep }