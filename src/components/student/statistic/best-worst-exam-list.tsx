import { Text, Box } from "zmp-ui";
import { Exam } from "@/models/exam";
import ExamHolder from "@/components/student/exam/exam-holder";

const BestExamsList = ({examList}) => {
  if (!examList) return (
    <Text className="text-center">Chưa có bài kiểm tra nào!</Text>
  )

  return (
    <Box className="flex flex-col gap-3">
     { examList.map((exam: Exam) => <ExamHolder exam={exam} key={`best-${exam.id}`} />) }
    </Box>
  )
}

const WorstExamsList = ({examList}) => {
  if (!examList) return (
    <Text className="text-center">Chưa có bài kiểm tra nào!</Text>
  )

  return (
    <Box className="flex flex-col gap-3">
     { examList.map((exam: Exam) => <ExamHolder exam={exam} key={`worst-${exam.id}`} />) }
    </Box>
  )
}

export { BestExamsList, WorstExamsList }