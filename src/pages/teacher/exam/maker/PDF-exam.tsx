import AppHeader from "@/components/header";
import { PDFExamCode as ExamCodeBox } from "@/components/teacher/exam/maker/PDF-exam-code";
import { ChevronUp, PlusLg } from "react-bootstrap-icons";
import { Box, Page, useNavigate, useParams } from "zmp-ui";
import { backToTop } from "@/script/util";
import { ExamCode, ExamCodeQuestion, insertCode } from "@/models/pdf-exam-code";
import { useState } from "react";

export default function PDFExamQuestions() {
  const navTo = useNavigate();
  const { id } = useParams();
  const [examCode, setExamCode] = useState<ExamCode[]>([new ExamCode(Number(id))]);

  function addExamCode() {
    if (examCode.length === 24) return;
    const newCode = [...examCode, new ExamCode(Number(id))];
    setExamCode(newCode);
  }

  function updateExamCode(i: number, value: ExamCode) {
    const existingCode = [...examCode];
    existingCode[i] = value;
    setExamCode([...existingCode])
  }

  function deleteExamCode(i: number) {
    if (examCode.length === 1) return;
    const newCode = examCode.filter((_, index) => index !== i);
    setExamCode(newCode);
  }

  return (
    <Page className="page-x-0 page-wo-footer bg-white">
      <AppHeader title="Danh sách đề thi (PDF)" showBackIcon />

      <form onSubmit={e => e.preventDefault()}>
        <Box className="my-3 flex flex-wrap justify-center gap-2">
          <input
            type="submit" value="Lưu"
            className="zaui-bg-blue-80 text-white rounded-full py-2 px-6"
            onClick={handleSubmit}
          />
          <input
            type="button" value="Hủy"
            className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-6"
            onClick={() => navTo("/teacher/exam")}
          />
          <input
            type="button" value="Tải file Excel đáp án mẫu"
            className="zaui-bg-blue-80 text-white rounded-full py-2 px-6"
          />
        </Box>

        {
          examCode.map((ec, i) =>
            <ExamCodeBox
              key={`code-${i}`} i={i}
              examCode={ec}
              updateExamCode={updateExamCode}
              deleteExamCode={deleteExamCode}
            />
          )
        }
      </form>

      <button
        className="size-8 zaui-bg-blue-80 text-white rounded-full fixed bottom-4 right-4"
        onClick={addExamCode}
      >
        <PlusLg size={24} className="inline" />
      </button>
    </Page>
  )

  function handleSubmit() {
    insertCode(examCode);
  }
}