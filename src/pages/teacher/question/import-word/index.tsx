import AppHeader from "@/components/header";
import axios from "axios";
import { Page, Input, Text, Box, useNavigate } from "zmp-ui";
import { useState } from "react";
import QuestionList from "@/components/teacher/question/question-list";

export default function QuestionImportWord() {
  const navTo = useNavigate();
  const [questionList, setQuestionList] = useState([]);

  return (
    <Page className="page-x-0 bg-white">
      <AppHeader title="Nhập từ file Word" showBackIcon />

      <Box className="p-4 pb-0">
        <Input
          label={<Text>File Word <span className="zaui-text-red-50">*</span></Text>}
          placeholder="Nhấn vào đây để nhập file Word"
          readOnly
        />
      </Box>
      
      <form className="pt-2 px-4" noValidate>
        <div className="flex items-center">
          <Text bold className="flex-1">Danh sách câu hỏi <span className="zaui-text-red-50">*</span></Text>
          <button className="zaui-bg-blue-80 text-white rounded-full py-1 px-4">
            Thêm câu hỏi mới
          </button>
        </div>
        <hr />
        <QuestionList />
        <QuestionList />
        <QuestionList />
        <QuestionList />

        <div className="flex gap-x-2 justify-center mt-2">
          <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" />
          <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
        </div>
      </form>
    </Page>
  )
}