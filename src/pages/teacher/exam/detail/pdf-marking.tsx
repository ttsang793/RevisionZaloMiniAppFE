import { Box, Page, Text, useParams, useNavigate, useSnackbar, Input } from "zmp-ui";
import { useState, useEffect } from "react";
import { Exam, getExamById } from "@/models/exam";
import { ExamCodeGet, ExamCodeQuestionGet, getExamCodeByExamId } from "@/models/pdf-exam-code";
import { openDocument } from "zmp-sdk";
import { getPdfExamAttemptById, gradingPdfAttempt, PdfExamAttempt } from "@/models/pdf-exam-attempt";
import { PDFMarkingExamPart } from "@/components/teacher/exam/maker/PDF-marking-exam-part";
import AppHeader from "@/components/header";
import { floatTwoDigits } from "@/script/util";
import { checkAchievement } from "@/models/exam-attempt";
import { notifyWhenFinishGrading } from "@/models/email";

class PDFPart {
  question: ExamCodeQuestionGet[];
  answer: string[] = [];
  correct: boolean[][] = [];
  point: number[] = [];

  constructor(question: ExamCodeQuestionGet[]) {
    this.question = question;
  }
};

export default function PDFExamMarking() {
  const { examId, examAttemptId } = useParams();
  const navTo = useNavigate();
  const [loading, setLoading] = useState(true);
  const { TextArea } = Input;
  const { openSnackbar } = useSnackbar();
  const [examInfo, setExamInfo] = useState<Exam>(new Exam());
  const [code, setCode] = useState("");
  const [currentPart, setCurrentPart] = useState(0);
  const [examAttempt, setExamAttempt] = useState<PdfExamAttempt>(new PdfExamAttempt(Number(examId), false));
  const [examParts, setExamParts] = useState<PDFPart[]>([]);

  useEffect(() => {
    const fetchExam = async() => {
      if (loading) {
        const parts: PDFPart[] = [];
        setExamParts([]);

        const examInfoResponse = await getExamById(Number(examId));
        setExamInfo(examInfoResponse.data);

        const examPartResponse = await getPdfExamAttemptById(Number(examAttemptId));
        const attempt: PdfExamAttempt = examPartResponse.data;
        setExamAttempt(attempt);

        const examCodeResponse = await getExamCodeByExamId(Number(examId), attempt.pdfExamCodeId);
        const examCode: ExamCodeGet = examCodeResponse.data;
        setCode(examCode.code);
        for (let i = 0; i < examCode.numPart; i++)
          parts.push(new PDFPart(examCode.questions.filter(q => q.partIndex === i + 1)));
        
        for (let i = 0, j = 0; j < attempt.studentAnswer.length; i++) {
          const k = j + parts[i].question.length;
          parts[i].answer = attempt.studentAnswer.slice(j, k);
          parts[i].correct = attempt.correctBoard.slice(j, k);
          parts[i].point = attempt.pointBoard.slice(j, k);
          j = k;
        }
        console.log(attempt);
        console.log(parts);

        setExamParts(parts);
        setLoading(false);
      }
    }

    fetchExam();
  }, []);

  const updatePart = (i: number, value: number, questionPoint: number) => {
    const newPart = [...examParts];
    newPart[currentPart].point[i] = value;
    newPart[currentPart].correct[i] = [value === questionPoint];
    setExamParts(newPart);
  }

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
          className="zaui-bg-blue-70 zaui-text-blue-10 py-2 px-6 rounded-full me-2"
          onClick={() => openDocument({url: examAttempt.taskPdf})}
        >
          Xem đề thi
        </button>
        <button
          className="zaui-bg-blue-70 zaui-text-blue-10 py-2 px-6 rounded-full"
          onClick={() => openDocument({url: examAttempt.answerPdf})}
        >
          Xem đáp án
        </button>
      </Box>

      <Box className="pb-2 mb-2 flex justify-between align-center border-b zaui-border-gray-40">
        <Box>
          <Text bold className="inline">Phần:</Text>
          {
            examParts.map((_, j: number) =>
              <button
                key={`btn-part-${j + 1}`} onClick={() => setCurrentPart(j)}
                className={`rounded-full size-6 ms-1 border ${j === currentPart ? "zaui-border-blue-70 zaui-bg-blue-70 zaui-text-blue-10" : "zaui-border-blue-70 zaui-bg-blue-10 zaui-text-blue-70"}`}
              >
                {j + 1}
              </button>
            )
          }
        </Box>

        <Text>Điểm: <b><span className="zaui-text-red-50">{floatTwoDigits(examAttempt.totalPoint)}</span> / 10</b></Text>
      </Box>
      
      <PDFMarkingExamPart
        partIndex={currentPart + 1}
        question={examParts[currentPart].question}
        answer={examParts[currentPart].answer}
        point={examParts[currentPart].point}
        correct={examParts[currentPart].correct}
        updateQuestion={updatePart}
      />

      <TextArea
        className="mt-4 mb-2"
        label={<Text>Nhận xét bài làm</Text>}
        value={examAttempt.comment}
        onChange={e => setExamAttempt({...examAttempt, comment: e.target.value})}
      />
      
      <footer className="fixed bottom-0 right-0 left-0 text-center bg-white py-2">
        <button
          className="rounded-full zaui-bg-blue-70 zaui-text-blue-10 py-2 px-8"
          onClick={() => handleMarking()}
        >
          Chấm điểm
        </button>
      </footer>
    </Page>
  )

  async function handleMarking(): Promise<void> {
    console.log(examParts);
    const pointBoard: number[] = [];
    const correctBoard: boolean[][] = [];
    let totalPoint = 0;

    examParts.forEach(examPart => {
      examPart.point.forEach(p => {
        pointBoard.push(p);
        totalPoint += p;
      });
      examPart.correct.forEach(c => correctBoard.push(c));
    })

    examAttempt.id = Number(examAttemptId);
    examAttempt.pointBoard = pointBoard;
    examAttempt.correctBoard = correctBoard;
    examAttempt.totalPoint = totalPoint;

    openSnackbar({
      text: "Đang lưu điểm...",
      type: "loading",
      duration: 5000
    })

    try {
      const response = await gradingPdfAttempt(examAttempt);
      if (response.status === 200) {
        await checkAchievement(examAttempt.studentId);
        await notifyWhenFinishGrading(examAttempt.studentId!, `${examInfo.title} (${examInfo.subjectName} ${examInfo.grade}) của giáo viên ${examInfo.teacherName}`);

        openSnackbar({
          text: "Chấm điểm thành công!",
          type: "success",
          duration: 1500
        })

        setTimeout(() => navTo(`/teacher/exam/detail/${examId}/marking`), 1500);
      }
      else {
        console.error(response);
        openSnackbar({
          text: "Chấm điểm thất bại!",
          type: "error"
        })
      }
    }
    catch (err) {
      console.error(err);
      openSnackbar({
        text: "Chấm điểm thất bại!",
        type: "error"
      })
    }
  }
}