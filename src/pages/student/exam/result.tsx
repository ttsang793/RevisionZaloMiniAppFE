import { Box, Page, Text, useParams, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import { ResultExamPart } from "@/components/student/exam/result-exam-part";
import { Exam, getExamById } from "@/models/exam";
import { ExamAttemptGet, getLatestAttempt } from "@/models/exam-attempt";
import AppHeader from "@/components/header";

export default function ExamResultPage() {
  const { id } = useParams();
  const navTo = useNavigate();
  const [loading, setLoading] = useState(true);
  const [examInfo, setExamInfo] = useState<Exam>(new Exam());
  const [examAttempt, setExamAttempt] = useState<ExamAttemptGet>(new ExamAttemptGet());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentPart, setCurrentPart] = useState(0);

  const handleChangePart = (part: number) => {
    setCurrentPart(part);
    setCurrentQuestion(0);
  }

  useEffect(() => {
    if (loading) {
      getExamById(Number(id)).then(response => setExamInfo(response.data));
      getLatestAttempt(Number(id)).then(response => {
        setExamAttempt(response.data);
        setLoading(false);
      });
    }
  }, [])

  return loading ? <></> : (
    <Page className="page bg-white">
      <AppHeader title="Bài làm" />
      {/* Tiêu đề và các phần */}
      <Text.Title className="text-center uppercase">{examInfo.title}</Text.Title>
      <Text.Title className="text-center">
        Môn: {examInfo.subjectName} &minus; Thời gian: {examInfo.timeLimit / 60} phút
      </Text.Title>

      <hr />

      <Box className="mb-2 flex justify-between align-center">
        <Box>
          <Text bold className="inline">Phần:</Text>
          {
            examAttempt.examParts.map((e, i) =>
              <button
                className={`rounded-full size-6 ms-1 border ${currentPart === i ? "zaui-border-blue-70 zaui-bg-blue-70 zaui-text-blue-10" : "zaui-border-blue-70 zaui-bg-blue-10 zaui-text-blue-70"}`}
                onClick={() => handleChangePart(i)} key={`button-part-${i}`}
              >
                {i + 1}
              </button>
            )
          }
        </Box>

        <Text>Điểm: <b><span className="zaui-text-red-50">{examAttempt.totalPoint}</span> / 10</b></Text>
      </Box>

      {
        <ResultExamPart
          i={currentPart}
          partTitle={examAttempt.examParts[currentPart].partTitle}
          partAnswers={examAttempt.examParts[currentPart].examAttemptAnswers}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      }
      
      <footer className="fixed bottom-0 right-0 left-0 text-center bg-white py-2">
        <button
          className="rounded-full zaui-bg-blue-70 zaui-text-blue-10 py-2 px-8 me-2"
          onClick={() => navTo(`/student`)}
        >
          Trang chủ
        </button>

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