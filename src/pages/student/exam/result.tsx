import { Box, Page, Text, Modal, useParams, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import { ResultExamPart } from "@/components/student/exam/result-exam-part";
import { Exam, getExamById } from "@/models/exam";
import { ExamAttemptGet, getLatestAttempt } from "@/models/exam-attempt";

export default function ExamResultPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [examInfo, setExamInfo] = useState<Exam>(new Exam());
  const [examAttempt, setExamAttempt] = useState<ExamAttemptGet>(new ExamAttemptGet());
  const [currentPart, setCurrentPart] = useState(0);

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
    <Page className="page-test">
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
                onClick={() => setCurrentPart(i)} key={`button-part-${i}`}
              >
                {i + 1}
              </button>
            )
          }
        </Box>

        <Text>Điểm: <b><span className="zaui-text-red-50">{examAttempt.score}</span> / 10</b></Text>
      </Box>

      {
        <ResultExamPart
          i={currentPart}
          partTitle={examAttempt.examParts[currentPart].partTitle}
          partAnswers={examAttempt.examParts[currentPart].examAttemptAnswers}
        />
      }
    </Page>
  )
}