import axios from "axios";
import { Box, Page, Text } from "zmp-ui";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/header";
import QuestionList from "@/components/teacher/question/question-list";
import ChooseQuestionType from "@/components/teacher/question/choose-question-type";

import { Question, getQuestionsByTeacher } from "@/models/question";

export default function QuestionManagement() {
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openChoose, setOpenChoose] = useState(false);
  const navTo = useNavigate();

  useEffect(() => {
    setLoading(true);

    getQuestionsByTeacher()
      .then(response => setQuestionList(response.data))
      .finally(() => setLoading(false));
  }, [])

  return (
    <Page className="page">
      <AppHeader title="Quản lý câu hỏi" />

      <Box className="section-container mt-4 zaui-text-blue-90">
        <Text.Title className="mb-2">Thêm câu hỏi</Text.Title>
        <Box className="grid grid-cols-4 gap-x-1 place-items-start">
          <button className="flex flex-col items-center w-full" onClick={() => setOpenChoose(true)}>
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg mb-1" />
            Thủ công
          </button>
          <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/group")}>
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg mb-1" />
            Thêm nhóm câu hỏi
          </button>
          <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/true-false-THPT")}>
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg mb-1" />
            TN Đúng &minus; Sai (THPTQG)
          </button>
          <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/word")}>
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg mb-1" />
            Nhập từ file Word
          </button>
        </Box>

        <hr />
        
        <Text.Title className="mb-2">File mẫu và câu hỏi mẫu</Text.Title>
        <Box className="grid grid-cols-2 gap-x-1 place-items-start">
          <button className="flex flex-col items-center w-full">
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg mb-1" />
            Danh sách câu hỏi mẫu
          </button>
          <button className="flex flex-col items-center w-full">
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg mb-1" />
            File Word mẫu
          </button>
        </Box>
      </Box>
      
      <Box className="section-container">
        <Text.Title className="mb-2 zaui-text-blue-90">Danh sách câu hỏi</Text.Title>
        {
          loading ? <Text className="text-center">Chờ chút</Text> : (
            <>
              {
                questionList.map((q: Question) => <QuestionList question={q} key={`question-${q.id}`} />)
              }
              <Text size="xxSmall" className="text-center">Không còn câu hỏi</Text>
            </>
          )
        }
      </Box>

      <ChooseQuestionType visible={openChoose} setVisible={setOpenChoose} />
    </Page>
  )
}