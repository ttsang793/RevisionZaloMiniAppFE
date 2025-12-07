import { Box, Page, Text, useSnackbar } from "zmp-ui";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/header";
import QuestionList from "@/components/teacher/question/question-list";
import ChooseQuestionType from "@/components/teacher/question/choose-question-type";

import { Question, getQuestionsByTeacher } from "@/models/question";
import { getSubjectById, Subject } from "@/models/subject";

export default function QuestionManagement() {
  const [questionList, setQuestionList] = useState([]);
  const [subject, setSubject] = useState<Subject>();
  const [loading, setLoading] = useState(true);
  const [openChoose, setOpenChoose] = useState(false);
  const navTo = useNavigate();

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Page className="page">
      <AppHeader title="Quản lý câu hỏi" />

      <Box className="section-container mt-4 zaui-text-blue-90">
        <Text.Title className="mb-2">Thêm câu hỏi</Text.Title>
        <Box className="grid grid-cols-3 gap-x-1 place-items-start">
          <button className="flex flex-col items-center w-full" onClick={() => setOpenChoose(true)}>
            <img src="/icon/icon_add.png" alt="" className="size-12 rounded-lg mb-1" />
            Chọn loại câu
          </button>
          <button className="flex flex-col items-center w-full">
            <img src="/icon/icon_download.png" alt="" className="size-12 rounded-lg mb-1" />
            Tải file Word mẫu
          </button>
          <button className="flex flex-col items-center w-full" onClick={() => navTo("word")}>
            <img src="/icon/icon_word.png" alt="" className="size-12 rounded-lg mb-1" />
            Nhập từ file Word
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

      <ChooseQuestionType visible={openChoose} setVisible={setOpenChoose} subject={subject} />
    </Page>
  )

  async function fetchData() {
    setLoading(true);

    try {
      const questionResponse = await getQuestionsByTeacher();
      setQuestionList(questionResponse.data)

      const subjectResponse = await getSubjectById(sessionStorage.getItem("subjectId")!);
      setSubject(subjectResponse);
    }
    finally {
      setLoading(false)
    }
  }
}