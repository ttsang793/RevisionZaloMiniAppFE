import { Box, Page, Text, Modal, useParams, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import { Exam, getExamById } from "@/models/exam";
import { ExamCodeGet, ExamCodeQuestionGet, getExamCodeByExamId } from "@/models/pdf-exam-code";
import { openDocument } from "zmp-sdk";
import { Countdown } from "@/components/student/exam/countdown";
import { PDFExamPart } from "@/components/student/pdf-exam/pdf-exam-part";
import { insertPdfExamAttempt, PdfExamAttempt } from "@/models/pdf-exam-attempt";

export default function TakePDFExamPage({practice}: {practice: boolean}) {
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
        try {
          setExamParts([]);
          const examInfoResponse = await getExamById(Number(id));
          setExamInfo(examInfoResponse.data);
          getExamCodeByExamId(Number(id)).then(response => {
            const newExamAnswer: ExamCodeGet = response.data;
            newExamAnswer.questions.forEach(q => {
              if (q.type === "true-false-thpt" || q.type === "short-answer") q.studentAnswers = ["", "", "", ""];
              else q.studentAnswer = "";
            })

            setExamAnswer(newExamAnswer);
            for (let i = 1; i <= response.data.numPart; i++) setExamParts(prev =>  [...prev, i]);
            
            setPdfExamAttempt({...pdfExamAttempt, startedAt: new Date(), codeId: newExamAnswer.id})
          });
        }
        finally {
          setLoading(false);
        }
      }
    }

    fetchExam();
  }, []);

  const updateExamAnswer = (pIndex: number, qIndex: number, question: ExamCodeQuestionGet): void => {
    const newQuestions = [...examAnswer.questions];
    const index = newQuestions.findIndex((q: ExamCodeQuestionGet) => q.partIndex === pIndex && q.questionIndex === qIndex);
    newQuestions[index] = question;
    setExamAnswer({...examAnswer, questions: newQuestions});
  }

  return loading ? <></> : (
    <Page className="page-test">
      {/* Tiêu đề và các phần */}
      <Text.Title className="text-center uppercase mb-1">{examInfo.title}</Text.Title>
      <Text.Title className="text-center mb-1">
        Môn: {examInfo.subjectName} &minus; Thời gian: {examInfo.timeLimit / 60} phút
      </Text.Title>
      <Text.Title className="text-center italic">Mã đề: {examAnswer?.code}</Text.Title>

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
            examParts.map((e: number) =>
              <button
                key={`part-${e}`}
                className="rounded-full size-6 ms-1 border zaui-border-blue-70 zaui-bg-blue-10 zaui-text-blue-70"
              >
                {e}
              </button>
            )
          }
        </Box>

        <Countdown timeLimit={examInfo.timeLimit} />
      </Box>

      {
        examParts.map((e: number) =>
          <PDFExamPart
            partIndex={e} key={`Part_${e}`}
            question={examAnswer!.questions.filter(q => q.partIndex === e)}
            updateExamAnswer={updateExamAnswer}
          />
        )
      }

      <footer className="fixed bottom-0 right-0 left-0 text-center bg-white py-2">
        <button
          className="rounded-full zaui-bg-blue-70 zaui-text-blue-10 py-2 px-8"
          onClick={() => setEarlySubmitVisible(true)}
        >
          Nộp bài
        </button>
      </footer>

      <Modal
        actions = {[
          {
            text: "Chờ chút",
            close: true,
            onClick: () => setEarlySubmitVisible(false)
          },
          {
            text: "Nộp bài",
            close: true,
            highLight: true,
            onClick: () => turnIn()
          }
        ]}
        style={{textAlign: "left"}}
        description="Một khi đã nộp bài, bạn không thể thay đổi đáp án của mình!"
        title="Bạn có muốn nộp bài?"
        visible={earlySubmitVisible}
      />
    </Page>
  )

  async function turnIn() {
    setEarlySubmitVisible(false);
    const submitStatus = await insertPdfExamAttempt(examAnswer.questions, pdfExamAttempt);
    if (submitStatus === 201) navTo(`/student/exam/pdf/result/${id}`);
  }
}