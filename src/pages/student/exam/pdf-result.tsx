import { Box, Page, Text, Modal, useParams, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import { Exam, getExamById } from "@/models/exam";
import { ExamCodeGet, ExamCodeQuestionGet, getExamCodeByExamId } from "@/models/pdf-exam-code";
import { openDocument } from "zmp-sdk";
import { PDFExamPart } from "@/components/student/pdf-exam/pdf-exam-part";
import { getPdfExamAttempt, PdfExamAttempt } from "@/models/pdf-exam-attempt";

export default function PDFExamResultPage() {
  const { id } = useParams();
  const navTo = useNavigate();
  const [allowEarlySubmit, setAllowEarlySubmit] = useState(false);
  const [earlySubmitVisible, setEarlySubmitVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [examParts, setExamParts] = useState<number[]>([]);
  const [examInfo, setExamInfo] = useState<Exam>(new Exam());
  const [examAnswer, setExamAnswer] = useState<ExamCodeGet>(new ExamCodeGet());
  const [pdfExamAttempt, setPdfExamAttempt] = useState<PdfExamAttempt>(new PdfExamAttempt(Number(id)));

  useEffect(() => {
    const fetchExam = async() => {
      if (loading) {
        setExamParts([]);

        getExamById(Number(id)).then(response => setExamInfo(response.data));
        getPdfExamAttempt(Number(id)).then(response => console.log(response.data));
        setLoading(false);
      }
    }

    fetchExam();
  }, []);

  return loading ? <></> : (
    <Page className="page-test">
      {/* Tiêu đề và các phần */}
      <Text.Title className="text-center uppercase mb-1">{examInfo.title}</Text.Title>
      <Text.Title className="text-center mb-1">
        Môn: {examInfo.subjectName} &minus; Thời gian: {examInfo.timeLimit / 60} phút
      </Text.Title>

      Hello World;
      
      <footer className="fixed bottom-0 right-0 left-0 text-center bg-white py-2">
        <button
          className="rounded-full zaui-bg-blue-70 zaui-text-blue-10 py-2 px-8"
          onClick={() => navTo(`/exam/preview/${id}`)}
        >
          Làm lại bài
        </button>
      </footer>
    </Page>
  )
}