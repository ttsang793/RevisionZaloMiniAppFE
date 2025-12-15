import { Box, Page, Spinner, Text, useSnackbar, useNavigate } from "zmp-ui";
import { downloadFile } from "zmp-sdk/apis";
import { useState, useEffect } from "react";
import AppHeader from "@/components/header";
import QuestionList from "@/components/teacher/question/question-list";
import ChooseQuestionType from "@/components/teacher/question/choose-question-type";

import { Question, getQuestionsByTeacher } from "@/models/question";
import { QuestionCircle } from "react-bootstrap-icons";

export default function QuestionManagement() {
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openChoose, setOpenChoose] = useState(false);
  const navTo = useNavigate();
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Page className="page">
      <AppHeader title="Quản lý câu hỏi" />

      <Box className="section-container zaui-text-blue-90">
        <Text.Title className="mb-2">Thêm câu hỏi</Text.Title>
        <Box className="grid grid-cols-3 gap-x-1 place-items-start">
          <button className="flex flex-col items-center w-full" onClick={() => setOpenChoose(true)}>
            <img src="https://res.cloudinary.com/dqxhmt5sp/image/upload/icon_add_y4kc4e.png" alt="" className="size-12 rounded-lg mb-1" />
            Chọn loại câu
          </button>
          <button className="flex flex-col items-center w-full" onClick={downloadSampleDoc}>
            <img src="https://res.cloudinary.com/dqxhmt5sp/image/upload/icon_download_f8fhfi.png" alt="" className="size-12 rounded-lg mb-1" />
            Tải file Word mẫu
          </button>
          <button className="flex flex-col items-center w-full" onClick={() => navTo("word")}>
            <img src="https://res.cloudinary.com/dqxhmt5sp/image/upload/icon_word_c9jnlf.png" alt="" className="size-12 rounded-lg mb-1" />
            Nhập từ file Word
          </button>
        </Box>
      </Box>
      
      <Box className="section-container">
        <Text.Title className="mb-2 zaui-text-blue-90">Danh sách câu hỏi</Text.Title>
        {
          loading ? (
            <Box className="text-center place-items-center">
              <Spinner />
              <Text className="mt-2 italic">Đang tải danh sách...</Text>
            </Box>
          ) : (
            questionList.length == 0 ? (
              <Box className="text-center place-items-center">
                <QuestionCircle size={48} className="text-gray-400" />
                <Text className="mt-1 italic">Không có câu hỏi!</Text>
              </Box>
            ) :
            <>
              {
                questionList.map((q: Question) => <QuestionList question={q} key={`question-${q.id}`} />)
              }
              <Text size="xxSmall" className="text-center">-- Không còn câu hỏi --</Text>
            </>
          )
        }
      </Box>

      <ChooseQuestionType visible={openChoose} setVisible={setOpenChoose} />
    </Page>
  )

  async function fetchData() {
    setLoading(true);

    try {
      const questionResponse = await getQuestionsByTeacher();
      setQuestionList(questionResponse.data)
    }
    finally {
      setLoading(false)
    }
  }

  async function downloadSampleDoc() {
    try {
      await downloadFile({
        url: "https://res.cloudinary.com/dqxhmt5sp/raw/upload/v1765771074/cau-hoi-mau_tuzfei.docx",
      }).then(() => openSnackbar({ text: "Tải xuống thành công!", type: "success" }));
    }
    catch (err) {
      console.log(err);
      openSnackbar({ text: "Tải xuống thất bại!", type: "error" });
    }
  }
}