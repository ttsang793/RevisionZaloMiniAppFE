import { Box, Page, Text, useParams, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import { Exam, getExamById } from "@/models/exam";
import { ExamCodeGet, ExamCodeQuestionGet, getExamCodeByExamId } from "@/models/pdf-exam-code";
import { openDocument } from "zmp-sdk";
import { getPdfExamAttempt, PdfExamAttempt } from "@/models/pdf-exam-attempt";
import { PDFResultExamPart } from "@/components/student/pdf-exam/pdf-result-exam-part";
import AppHeader from "@/components/header";

class PDFPart {
  question: ExamCodeQuestionGet[];
  answer: string[] = [];
  score: number[] = [];

  constructor(question: ExamCodeQuestionGet[]) {
    this.question = question;
  }
};

export default function PDFExamResultPage() {
  const { id } = useParams();
  const navTo = useNavigate();
  const [loading, setLoading] = useState(true);

  const [examInfo, setExamInfo] = useState<Exam>(new Exam());
  const [code, setCode] = useState("");
  const [examAttempt, setExamAttempt] = useState<PdfExamAttempt>(new PdfExamAttempt(Number(id)));
  const [examParts, setExamParts] = useState<PDFPart[]>([]);

  useEffect(() => {
    const fetchExam = async() => {
      if (loading) {
        const parts: PDFPart[] = [];
        setExamParts([]);

        const examInfoResponse = await getExamById(Number(id));
        setExamInfo(examInfoResponse.data);

        const examPartResponse = await getPdfExamAttempt(Number(id));
        const attempt: PdfExamAttempt = examPartResponse.data;
        setExamAttempt(attempt);

        const examCodeResponse = await getExamCodeByExamId(Number(id), attempt.codeId);
        const examCode: ExamCodeGet = examCodeResponse.data;
        setCode(examCode.code);
        for (let i = 0; i < examCode.numPart; i++)
          parts.push(new PDFPart(examCode.questions.filter(q => q.partIndex === i + 1)));
        
        for (let i = 0, j = 0; j < attempt.studentAnswer.length; i++) {
          const k = j + parts[i].question.length;
          parts[i].answer = attempt.studentAnswer.slice(j, k);
          parts[i].score = attempt.scoreBoard.slice(j, k);
          j = k;
        }
        setExamParts(parts);
        setLoading(false);
      }
    }

    fetchExam();
  }, []);

  return loading ? <></> : (
    <Page className="page bg-white">
      <AppHeader title="Bài làm" showBackIcon />
      {/* Tiêu đề và các phần */}
      <Text.Title className="text-center uppercase mb-1">{examInfo.title}</Text.Title>
      <Text.Title className="text-center mb-1">
        Môn: {examInfo.subjectName} <i>(Mã đề: {code})</i> &minus; Thời gian: {examInfo.timeLimit / 60} phút
      </Text.Title>

      <Box className="my-2 text-center">
        <button
          className="zaui-bg-blue-70 zaui-text-blue-10 py-2 px-6 rounded-full"
          onClick={() => openDocument({url: "https://pdfobject.com/pdf/sample.pdf"})}
        >
          Xem đề thi
        </button>
      </Box>

      <Box className="pb-2 mb-2 flex justify-between align-center border-b zaui-border-gray-40">
        <Box>
          <Text bold className="inline">Phần:</Text>
          {
            examParts.map((_, j: number) =>
              <button
                key={`btn-part-${j + 1}`}
                className="rounded-full size-6 ms-1 border zaui-border-blue-70 zaui-bg-blue-10 zaui-text-blue-70"
              >
                {j + 1}
              </button>
            )
          }
        </Box>

        <Text>Điểm: <b><span className="zaui-text-red-50">{examAttempt.score}</span> / 10</b></Text>
      </Box>

      {
        examParts.map((ep, j) =>
          <PDFResultExamPart
            partIndex={j + 1}
            key={`part-${j + 1}`}
            question={ep.question}
            answer={ep.answer}
            score={ep.score}
          />
        )
      }
      
      <footer className="fixed bottom-0 right-0 left-0 text-center bg-white py-2">
        <button
          className="rounded-full zaui-bg-blue-70 zaui-text-blue-10 py-2 px-8"
          onClick={() => navTo(`/student/exam/preview/${id}`)}
        >
          Làm lại bài
        </button>
      </footer>
    </Page>
  )
}