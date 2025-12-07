import { Box, Page, Text, useParams, useNavigate, useSnackbar, Input } from "zmp-ui";
import { useState, useEffect } from "react";
import { Exam, getExamById } from "@/models/exam";
import { checkAchievement, ExamAttempt, ExamAttemptGet, getExamAttemptById, gradingAttempt } from "@/models/exam-attempt";
import AppHeader from "@/components/header";
import { floatTwoDigits } from "@/script/util";
import { MarkingExamPart } from "@/components/teacher/exam/marking-exam-part";
import { notifyWhenFinishGrading } from "@/models/email";

export default function ExamMarking() {
  const { examId, examAttemptId } = useParams();
  const navTo = useNavigate();
  const [loading, setLoading] = useState(true);
  const [examInfo, setExamInfo] = useState<Exam>(new Exam());
  const [examAttempt, setExamAttempt] = useState<ExamAttemptGet>(new ExamAttemptGet());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentPart, setCurrentPart] = useState(0);
  const { openSnackbar } = useSnackbar();
  const { TextArea } = Input;

  const handleChangePart = (part: number) => {
    setCurrentPart(part);
    setCurrentQuestion(0);
  }

  function updateAttempt(i: number, j: number, prop: ("correct"|"point"), value: any) {
    const newExamParts = [...examAttempt.examParts];
    newExamParts[i].examAttemptAnswers[j][prop] = value;
    setExamAttempt({...examAttempt, examParts: newExamParts})
  }

  const partCorrectPoint = (partAnswer: any): string => {
    return floatTwoDigits(parseFloat(partAnswer.reduce((sum, item) => sum + item.correctPoint, 0)));
  }

  const partPoint = (partAnswer: any): string => {
    return floatTwoDigits(parseFloat(partAnswer.reduce((sum, item) => sum + item.point, 0)));
  }

  useEffect(() => {
    if (loading) {
      getExamById(Number(examId)).then(response => setExamInfo(response.data));
      getExamAttemptById(Number(examAttemptId)).then(response => {
        setExamAttempt(response.data);
        setLoading(false);
      });
    }
  }, [])

  return loading ? <></> : (
    <Page className="page bg-white">
      <AppHeader title="Chấm điểm" showBackIcon />
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

        <Text>Điểm: <b><span className="zaui-text-red-50">{floatTwoDigits(examAttempt.totalPoint)}</span> / 10</b></Text>
      </Box>

      {
        <MarkingExamPart
          i={currentPart}
          partTitle={examAttempt.examParts[currentPart].partTitle}
          partAnswers={examAttempt.examParts[currentPart].examAttemptAnswers}
          partPoint={partPoint(examAttempt.examParts[currentPart].examAttemptAnswers)}
          partCorrectPoint={partCorrectPoint(examAttempt.examParts[currentPart].examAttemptAnswers)}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          updateAttempt={updateAttempt}
        />
      }

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
    const sendExamAttempt: ExamAttempt = new ExamAttempt(Number(examId), false);

    let totalPoint = 0;
    examAttempt.examParts.forEach(ea => {
      ea.examAttemptAnswers.forEach(eaa => {
        sendExamAttempt.examAttemptAnswers.push(eaa);
        totalPoint += eaa.point
      })
    })

    sendExamAttempt.id = Number(examAttemptId);
    sendExamAttempt.studentId = examAttempt.studentId!;
    sendExamAttempt.comment = examAttempt.comment;
    sendExamAttempt.totalPoint = totalPoint;

    openSnackbar({
      text: "Đang lưu điểm...",
      type: "loading",
      duration: 5000
    })

    try {
      const response = await gradingAttempt(sendExamAttempt);
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