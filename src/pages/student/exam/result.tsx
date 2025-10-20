import { Box, Page, Text, Modal, useParams, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import { ExamQuestion, getExamQuestionWithQuestions } from "@/models/exam-question";
import { ExamPart } from "@/components/student/exam/exam-part";
import { Exam, getExamById } from "@/models/exam";
import { ExamAttempt, getLatestAttempt } from "@/models/exam-attempt";

export default function ExamResultPage() {
  const { id } = useParams();const [loading, setLoading] = useState(true);
  const [examInfo, setExamInfo] = useState<Exam>(new Exam());

  useEffect(() => {
    getExamById(Number(id)).then(response => setExamInfo(response.data));
    getLatestAttempt(Number(id)).then(response => console.log(response.data));
  }, [])

  return (
    <Page className="page-test">
      {/* Tiêu đề và các phần */}
      <Text.Title className="text-center uppercase">{examInfo.title}</Text.Title>
      <Text.Title className="text-center">
        Môn: {examInfo.subjectName} &minus; Thời gian: {examInfo.timeLimit / 60} phút
      </Text.Title>

      <hr />
    </Page>
  )
}