import { Heart } from "react-bootstrap-icons";
import { Box, useNavigate } from "zmp-ui";

const ExamHolder = ({ exam, latest = "28/09/2025" }) => {
  const navTo = useNavigate();
  
  return (
    <Box className="bg-white rounded-md p-4 text-left inline-block w-full">
      <h1 className="font-bold">{exam.title}</h1>
      <Box className="grid grid-cols-[1fr_24px] gap-5 ">
        <Box className="grid grid-cols-[24px_1fr] gap-x-2">
          <img src="/avatar/default.jpg" alt="avatar" className="size-6 rounded-full" />

          <ul className="text-xs">
            <li>Giáo viên: Trần Văn A</li>
            <li>Môn: {exam.subjectId} {exam.grade}</li>
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
                onClick={() => {}}
              >
                Xem kết quả</button>
              <button 
                className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm"
                onClick={() => navTo(`/student/test/preview/${exam.id}`)}
              >
                Làm lại bài</button>
            </>
          ) : (
            <button 
              className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm"
              onClick={() => navTo(`/student/test/preview/${exam.id}`)}
            >
              Làm bài</button>
          )
        }
      </Box>
    </Box>
  )
}

export default ExamHolder;