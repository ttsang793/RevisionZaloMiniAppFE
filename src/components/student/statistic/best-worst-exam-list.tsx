import { Text, Box } from "zmp-ui";
import BestWorstExamHolder from "./best-worst-exam-holder";

const BestExamsList = ({examList}) => {
  if (!examList || examList.length === 0) return (
    <Text className="text-center">Chưa có bài kiểm tra nào!</Text>
  )

  return (
    <Box className="flex flex-col gap-3">
     { examList.map(exam => <BestWorstExamHolder exam={exam} key={`best-${exam.id}`} />) }
    </Box>
  )
}

const WorstExamsList = ({examList}) => {
  if (!examList || examList.length === 0) return (
    <Text className="text-center">Chưa có bài kiểm tra nào!</Text>
  )

  return (
    <Box className="flex flex-col gap-3">
     { examList.map(exam => <BestWorstExamHolder exam={exam} key={`worst-${exam.id}`} />) }
    </Box>
  )
}

export { BestExamsList, WorstExamsList }