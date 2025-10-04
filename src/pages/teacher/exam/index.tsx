import { Box, Page, Text, useNavigate } from "zmp-ui";
import axios from "axios";
import { useState, useEffect } from "react";
import AppHeader from "@/components/header";
import ExamList from "@/components/teacher/exam/exam-list";

export default function QuestionManagement() {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navTo = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [])

  return (
    <Page className="page-x-0">
      <AppHeader title="Quản lý đề thi" />

      <Box className="section-container zaui-text-blue-90">
        <Text.Title className="mb-2">Thêm đề thi</Text.Title>
        <Box className="grid grid-cols-2 gap-x-1 place-items-start">
          <button className="flex flex-col items-center w-full">
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg" />
            Từ ngân hàng câu hỏi
          </button>
          <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/PDF")}>
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg" />
            Nhập từ file PDF
          </button>
        </Box>
      </Box>
      
      <Box className="section-container">
        <Text.Title className="mb-2 zaui-text-blue-90">Danh sách đề thi</Text.Title>
        {
          loading ? <Text className="text-center">Chờ chút</Text> : (
            <>
              <ExamList />
              <ExamList state={2} />
              <ExamList state={3} />
              <Text size="xxSmall" className="text-center">Không còn đề thi</Text>
            </>
          )
        }
      </Box>
    </Page>
  )
}