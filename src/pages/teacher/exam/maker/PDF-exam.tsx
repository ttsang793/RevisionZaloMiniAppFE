import AppHeader from "@/components/header";
import { PDFExamCode as ExamCodeBox } from "@/components/teacher/exam/maker/PDF-exam-code";
import { ChevronUp } from "react-bootstrap-icons";
import { Box, Page, Spinner, Text, useNavigate, useParams, useSnackbar } from "zmp-ui";
import { backToTop } from "@/script/util";
import { ExamCode, ExamCodeQuestion, getAllExamCodesByExamId, insertCode } from "@/models/pdf-exam-code";
import { useState, useEffect } from "react";
import { render_api } from "@/script/util";

export default function PDFExamQuestions() {
  const navTo = useNavigate();
  const { id } = useParams();
  const [examCode, setExamCode] = useState<ExamCode[]>([new ExamCode(Number(id))]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchData();
  })

  async function fetchData() {
    try {
      if (loading) {
        const response = await getAllExamCodesByExamId(Number(id));
        if (response.data.length === 0) return;
        
        const tempCode = response.data;
        for (let i = 0; i < tempCode.length; i++) {
          const questions: ExamCodeQuestion[][] = [];

          for (let j = 0; j < tempCode[i].questions.length; j++) {
            let q = tempCode[i].questions[j];

            if (q.type === "true-false-thpt" || q.type === "short-answer") {
              q.answerKeys = q.answerKey.split("");
            }

            if (j == 0 || tempCode[i].questions[j - 1].partIndex !== q.partIndex) questions.push([]);
            questions[questions.length - 1].push(q);
          }

          tempCode[i].questions = questions;
        }

        setExamCode(tempCode);
      }
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <Page className="page-x-0 flex justify-center items-center">
      <Box className="place-items-center text-center">
        <Spinner />
        <Text className="mt-2 italic">Đang tải đề thi...</Text>
      </Box>
    </Page>
  )

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
    openSnackbar({
      text: "Đang lưu bộ đề...",
      type: "loading",
      duration: 5000
    })

    for (let i: number = 0; i < examCode.length; i++) {
      let ec = examCode[i];
      if (!ec.taskPdf && !ec.taskPDFFile) {
        openSnackbar({
          text: `Vui lòng nhập file đề ở mã ${ec.code}`,
          type: "error"
        })
        return;
      }
      if (!ec.answerPdf && !ec.answerPDFFile) {
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
        formData.append("files", examCode[index].taskPDFFile || new File([""], "empty.pdf"));
        formData.append("files", examCode[index].answerPDFFile || new File([""], "empty.pdf"));

        try {
          response = await render_api.post(`/api/upload/pdf/${idList[index]}`,
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

        navTo("/teacher/exam");
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