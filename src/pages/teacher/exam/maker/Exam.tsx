import AppHeader from "@/components/header";
import { ExamPart } from "@/components/teacher/exam/maker/exam-part";
import { ChevronUp } from "react-bootstrap-icons";
import { Box, Page, useNavigate } from "zmp-ui";
import { FormEvent } from "react";
import { backToTop } from "@/script/util";

export default function ExamQuestions() {
  const navTo = useNavigate();

  return (
    <Page className="page-x-0 page-wo-footer">
      <AppHeader title="Danh sách câu hỏi" showBackIcon />

      <form onSubmit={handleSubmit}>
        <Box className="mb-3 flex flex-wrap justify-center gap-2 py-2 bg-white">
          <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-6" />
          <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-6" onClick={() => navTo("/teacher/exam")} />
        </Box>
      </form>

      <ExamPart />

      <button
        className="size-9 zaui-bg-blue-70 text-white rounded-full fixed bottom-4 right-40 text-center gap-x-1"
        onClick={() => backToTop()}
      >
        <ChevronUp className="inline" />
      </button>

      <button className="px-4 py-2 zaui-bg-blue-70 text-white rounded-full fixed bottom-4 right-4 flex items-center gap-x-1">
        Thêm phần mới
      </button>
    </Page>
  )

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();   
  }
}