import AppHeader from "@/components/header";
import { PDFExamCode as ExamCode } from "@/components/teacher/exam/maker/PDF-exam-code";
import { ChevronUp, PlusLg } from "react-bootstrap-icons";
import { Box, Page, useNavigate } from "zmp-ui";
import { backToTop } from "@/script/util";

export default function PDFExam() {
  const navTo = useNavigate();

  return (
    <Page className="page-x-0 page-wo-footer">
      <AppHeader title="Tạo đề thi mới (PDF)" showBackIcon />

      <div>
        <Box className="flex flex-wrap gap-x-2 gap-y-3 justify-center p-4 mb-3 bg-white">
          <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" />
          <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
          <input type="button" value="Tải file đáp án mẫu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={() => {}} />
        </Box>

        <button className="zaui-bg-blue-80 text-white p-2 fixed right-[66px] bottom-4 rounded-full">
          <ChevronUp size={24} />
        </button>

        <button className="zaui-bg-blue-80 text-white p-2 fixed right-5 bottom-4 rounded-full">
          <PlusLg size={24} />
        </button>

        <ExamCode />
      </div>
    </Page>
  )
}