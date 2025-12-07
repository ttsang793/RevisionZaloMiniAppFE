import { HeartFill, XLg } from "react-bootstrap-icons";
import { Box, useNavigate, useSnackbar } from "zmp-ui";
import { Exam } from "@/models/exam";
import { FavoriteIcon } from "./favorite";
import { handleFavorite, deleteHistory } from "@/models/student";
import { getLatestExamAttemptDate } from "@/models/exam-attempt";
import { useState, useEffect } from "react";
import { stringToDate } from "@/script/util";

interface ExamHolderProps {
  exam: Exam,
  id?: number
  page?: string,
  fetchData?: () => void
}

const ExamHolder = ({ exam, id, page = "default", fetchData }: ExamHolderProps) => {
  const navTo = useNavigate();
  const { openSnackbar } = useSnackbar();
  const [latest, setLatest] = useState("");

  useEffect(() => {
    getLatestExamAttemptDate(exam.id!).then(response => setLatest(response.data))
  }, [])
  
  return (
    <Box className="bg-white rounded-md p-4 text-left inline-block w-full border border-gray-300">
      <h1 className="font-bold">{exam.title}</h1>
      <Box className="grid grid-cols-[1fr_24px] gap-5 ">
        <Box className="grid grid-cols-[48px_1fr] gap-x-2">
          <img src={exam.teacherAvatar} alt="avatar" className="size-12 rounded-full" />

          <ul className="text-xs">
            <li>Giáo viên: {exam.teacherName}</li>
            <li>Môn: {exam.subjectName} {exam.grade}</li>
            <li>Thời gian: {exam.timeLimit / 60} phút</li>
            { (!latest) ? <></> : <li>Ngày làm bài gần nhất: {stringToDate(latest)}</li> }
          </ul>
        </Box>
        
        {
          (page === "favorite") ? <HeartFill size={32} color="#00378A" onClick={() => actionDelete(page)} /> : (
            (page === "history") ? <XLg size={32} color="#00378A" onClick={() => actionDelete(page)} /> : <FavoriteIcon examId={exam.id!} />
          )
        }
      </Box>

      <Box className="flex gap-x-1 mt-2 justify-center">
        {
          (!latest) ? (
            <button 
              className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm"
              onClick={() => navTo(`/student/exam/preview/${exam.id}`)}
            >
              Làm bài</button>
          ) : (
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
          )
        }
      </Box>
    </Box>
  )

  async function actionDelete(page) {
    const response = page === "favorite" ? await handleFavorite(id!) : await deleteHistory(id!);
    if (response.status === 200) {
      openSnackbar({
        text: `${page === "favorite" ? "Bỏ yêu thích đề thi" : "Xóa đề thi ra khỏi lịch sử"} thành công!`,
        type: "success",
        duration: 1500
      });
      fetchData!();
    }
    else {
      openSnackbar({
        text: `${page === "favorite" ? "Bỏ yêu thích đề thi" : "Xóa đề thi ra khỏi lịch sử"} thất bại!`,
        type: "error"
      });
    }    
  }
}

export default ExamHolder;