import { Text, Box } from "zmp-ui";
import {questionType } from "@/models/question";

const SelectQuestion = ({question, filter = false, handleQuestion}) => {
  return (
    <Box
      className="py-4 px-2 flex items-center gap-x-1"
      onClick={filter ? () => handleQuestion(question) : handleQuestion}
    >
      <Box className="inline-block flex-1">
        <Text bold>{question.title}</Text>
        <Text size="small">{questionType.find(q => q.type === question.type)?.title} <i>({question.subjectName} {question.grade})</i></Text>
      </Box>
    </Box>
  )
}

export default SelectQuestion;