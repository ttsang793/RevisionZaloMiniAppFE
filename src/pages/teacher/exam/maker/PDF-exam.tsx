import AppHeader from "@/components/header";
import { PDFExamCode as ExamCodeBox } from "@/components/teacher/exam/maker/PDF-exam-code";
import { ChevronUp } from "react-bootstrap-icons";
import { Box, Page, useNavigate, useParams, useSnackbar } from "zmp-ui";
import { backToTop } from "@/script/util";
import { ExamCode, insertCode } from "@/models/pdf-exam-code";
import { useState } from "react";
import axios from "axios";

export default function PDFExamQuestions() {
  const navTo = useNavigate();
  const { id } = useParams();
  const [examCode, setExamCode] = useState<ExamCode[]>([new ExamCode(Number(id))]);
  const { openSnackbar } = useSnackbar();

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
        <Box className="mb-3 flex flex-wrap justify-center gap-2">
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
            type="button" value="Thêm đề mới"
            className="zaui-bg-blue-80 text-white rounded-full py-2 px-6"
            onClick={addExamCode}
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
        className="size-9 zaui-bg-blue-70 text-white rounded-full fixed bottom-4 right-4 text-center"
        onClick={backToTop}
      >
        <ChevronUp className="inline" />
      </button>
    </Page>
  )

  async function handleSubmit(): Promise<any> {
    console.log(examCode);
    openSnackbar({
      text: "Đang lưu bộ đề...",
      type: "loading",
      duration: 5000
    })

    for (let i: number = 0; i < examCode.length; i++) {
      let ec = examCode[i];
      if (!ec.taskPDFFile) {
        openSnackbar({
          text: `Vui lòng nhập file đề ở mã ${ec.code}`,
          type: "error"
        })
        return;
      }
      if (!ec.answerPDFFile) {
        openSnackbar({
          text: `Vui lòng nhập file đáp án ở mã ${ec.code}`,
          type: "error"
        })
        return;
      }
    }

    let response: any = await insertCode(examCode);

    if (response.status === 201) {
      const idList = response.data.id;
      let loss = 0;

      for (let index: number = 0; index < idList.length; index++) {
        const formData: FormData = new FormData();
        formData.append("files", examCode[index].taskPDFFile!);
        formData.append("files", examCode[index].answerPDFFile!);

        try {
          response = await axios.post(`/api/upload/pdf/${idList[index]}`,
            formData, { headers: { "Content-Type": "multipart/form-data" } });

          loss += response.status === 200 ? 0 : 1;
        }
        
        catch { loss++ }
      }

      if (loss === 0) {
        openSnackbar({
          text: "Lưu bộ đề thành công!",
          type: "success",
          duration: 1500
        })
      }
      else {
        openSnackbar({
          text: `Lưu bộ đề thành công, nhưng có ${loss} đề tải file thất bại!`,
          type: "warning"
        })
      }
    }
    else {
      console.error(response);
      openSnackbar({
        text: "Lưu bộ đề thất bại!",
        type: "error"
      })
    }
  }
}