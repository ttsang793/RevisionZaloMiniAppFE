import { Page, Text } from "zmp-ui";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/header";
import QuestionList from "@/components/teacher/question/question-list";
import ChooseQuestionType from "@/components/teacher/question/choose-question-type";

export default function QuestionManagement() {
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openChoose, setOpenChoose] = useState(false);
  const navTo = useNavigate();

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <Page className="page-x-0">
      <AppHeader title="Quản lý câu hỏi" />

      <div className="section-container zaui-text-blue-90">
        <Text.Title className="mb-2">Thêm câu hỏi</Text.Title>
        <div className="grid grid-cols-4 gap-x-1 place-items-start">
          <button className="flex flex-col items-center w-full" onClick={() => setOpenChoose(true)}>
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg mb-1" />
            Thủ công
          </button>
          <button className="flex flex-col items-center w-full">
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg mb-1" />
            Thêm nhóm câu hỏi
          </button>
          <button className="flex flex-col items-center w-full">
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg mb-1" />
            TN Đúng &minus; Sai (THPTQG)
          </button>
          <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/word")}>
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg mb-1" />
            Nhập từ file Word
          </button>
        </div>

        <hr />
        
        <Text.Title className="mb-2">File mẫu và câu hỏi mẫu</Text.Title>
        <div className="grid grid-cols-2 gap-x-1 place-items-start">
          <button className="flex flex-col items-center w-full">
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg mb-1" />
            Danh sách câu hỏi mẫu
          </button>
          <button className="flex flex-col items-center w-full">
            <img src="/avatar/default.jpg" alt="" className="size-12 rounded-lg mb-1" />
            File Word mẫu
          </button>
        </div>
      </div>
      
      <div className="section-container">
        <Text.Title className="mb-2 zaui-text-blue-90">Danh sách câu hỏi</Text.Title>
        {
          loading ? <Text className="text-center">Chờ chút</Text> : (
            <>
              <QuestionList editable={false} />
              <QuestionList />
              <QuestionList />
              <QuestionList />
              <Text size="xxSmall" className="text-center">Không còn câu hỏi</Text>
            </>
          )
        }
      </div>

      <ChooseQuestionType visible={openChoose} setVisible={setOpenChoose} />
    </Page>
  )
}