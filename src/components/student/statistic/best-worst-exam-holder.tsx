import { Box, useNavigate } from "zmp-ui";
import { floatTwoDigits, stringToDate } from "@/script/util";

const BestWorstExamHolder = ({ exam }) => {
  const navTo = useNavigate();
  
  return (
    <Box className="bg-white rounded-md p-4 text-left inline-block w-full border border-gray-300">
      <h1 className="font-bold">{exam.title}</h1>
      <Box className="grid grid-cols-[48px_1fr] gap-x-2">
        <img src={exam.teacherAvatar} alt="avatar" className="size-12 rounded-full" />

        <ul className="text-xs">
          <li>Giáo viên: {exam.teacherName}</li>
          <li>Môn: {exam.subjectName} {exam.grade}</li>
          <li>Thời gian: {exam.timeLimit / 60} phút</li>
          <li>Ngày làm bài: {stringToDate(exam.submittedAt)}</li>
          <li>Kết quả: {floatTwoDigits(exam.totalPoint)}</li>
        </ul>
      </Box>

      <Box className="flex gap-x-1 mt-2 justify-center">
        <button
          className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm"
          onClick={() => navTo(`/student/exam${exam.displayType === "pdf" ? "/pdf" : "" }/result/${exam.id}/${exam.attemptId}`)}
        >
          Xem kết quả
        </button>
        <button 
          className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm"
          onClick={() => navTo(`/student/exam/preview/${exam.id}`)}
        >
          Làm lại bài
        </button>
      </Box>
    </Box>
  )
}

export default BestWorstExamHolder;