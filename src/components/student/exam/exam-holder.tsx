import { Heart } from "react-bootstrap-icons";
import { Box, useNavigate } from "zmp-ui";
import { Exam } from "@/models/exam";

const ExamHolder = ({ exam, latest = "" }: { exam: Exam, latest: string }) => {
  const navTo = useNavigate();
  
  return (
    <Box className="bg-white rounded-md p-4 text-left inline-block w-full">
      <h1 className="font-bold">{exam.title}</h1>
      <Box className="grid grid-cols-[1fr_24px] gap-5 ">
        <Box className="grid grid-cols-[24px_1fr] gap-x-2">
          <img src="/avatar/default.jpg" alt="avatar" className="size-6 rounded-full" />

          <ul className="text-xs">
            <li>Giáo viên: {exam.teacherName}</li>
            <li>Môn: {exam.subjectName} {exam.grade}</li>
            <li>Thời gian: {exam.timeLimit / 60} phút</li>
            {
              latest.length > 0 ? <li>Ngày làm bài gần nhất: {latest}</li> : <></>
            }
          </ul>
        </Box>

        <Heart size={24} />
      </Box>

      <Box className="flex gap-x-1 mt-2 justify-center">
        {
          latest.length > 0 ? (
            <>
              <button 
                className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm"
                onClick={() => navTo(`/student/exam${exam.displayType === "pdf" ? "/pdf" : "" }/result/${exam.id}`)}
              >
                Xem kết quả</button>
              <button 
                className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm"
                onClick={() => navTo(`/student/exam/preview/${exam.id}`)}
              >
                Làm lại bài</button>
            </>
          ) : (
            <button 
              className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm"
              onClick={() => navTo(`/student/exam/preview/${exam.id}`)}
            >
              Làm bài</button>
          )
        }
      </Box>
    </Box>
  )
}

export default ExamHolder;