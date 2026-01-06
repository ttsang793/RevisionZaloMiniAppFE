import { Box, Page, Spinner, Text, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import AppHeader from "@/components/header";
import ExamList from "@/components/teacher/exam/exam-list";
import { Exam, getExamsByTeacher } from "@/models/exam";
import { QuestionCircle } from "react-bootstrap-icons";

export default function ExamManagement() {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navTo = useNavigate();

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Page className="page">
      <AppHeader title="Quản lý đề thi" />

      <Box className="section-container zaui-text-blue-90">
        <Text.Title className="mb-2">Thêm đề thi</Text.Title>
        <Box className="grid grid-cols-2 gap-x-1 place-items-start">
          <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/normal")}>
            <img src="https://res.cloudinary.com/dqxhmt5sp/image/upload/icon_add_y4kc4e.png" alt="" className="size-12 rounded-lg mb-1" />
            Từ ngân hàng câu hỏi
          </button>
          <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/PDF")}>
            <img src="https://res.cloudinary.com/dqxhmt5sp/image/upload/icon_pdf_zjvwzp.png" alt="" className="size-12 rounded-lg mb-1" />
            Nhập từ file PDF
          </button>
        </Box>
      </Box>
      
      <Box className="section-container">
        <Text.Title className="mb-2 zaui-text-blue-90">Danh sách đề thi</Text.Title>
        {
          loading ? (
            <Box className="text-center place-items-center">
              <Spinner />
              <Text className="mt-2 italic">Đang tải danh sách...</Text>
            </Box>
          ) : (
            examList.length == 0 ? (
              <Box className="text-center place-items-center">
                <QuestionCircle size={48} className="text-gray-400" />
                <Text className="mt-1 italic">Không có đề thi!</Text>
              </Box>
            ) :
            <>
              {
                examList.map((exam: Exam) => <ExamList exam={exam} key={`exam-${exam.id}`} fetchData={fetchData} />)
              }
              <Text size="xxSmall" className="text-center">-- Không còn đề thi --</Text>
            </>
          )
        }
      </Box>
    </Page>
  )

  async function fetchData() {
    setLoading(true);
    try {
      const response = await getExamsByTeacher();
      setExamList(response.data);
    }
    finally {
      setLoading(false);
    }
  }
}