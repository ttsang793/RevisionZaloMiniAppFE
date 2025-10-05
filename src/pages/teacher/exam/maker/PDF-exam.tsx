import AppHeader from "@/components/header";
import { PDFExamCode as ExamCode } from "@/components/teacher/exam/maker/PDF-exam-code";
import { ChevronUp, PlusLg } from "react-bootstrap-icons";
import { Box, Page, useNavigate } from "zmp-ui";
import { FormEvent } from "react";
import { backToTop } from "@/script/util";

export default function PDFExamQuestions() {
  const navTo = useNavigate();

  return (
    <Page className="page-x-0 page-wo-footer bg-white">
      <AppHeader title="Danh sách đề thi (PDF)" showBackIcon />

      <form onSubmit={handleSubmit}>
        <Box className="my-3 flex flex-wrap justify-center gap-2">
          <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-6" />
          <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-6" onClick={() => navTo("/teacher/exam")} />
          <input type="button" value="Tải file Excel đáp án mẫu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-6" />
        </Box>

        <ExamCode />
      </form>

      <button className="size-8 zaui-bg-blue-80 text-white rounded-full fixed bottom-4 right-4">
        <PlusLg size={24} className="inline" />
      </button>
    </Page>
  )

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();   
  }
}