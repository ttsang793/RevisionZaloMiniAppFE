import { Box, useNavigate } from "zmp-ui"
import { parseMinutesAndSeconds, floatTwoDigits, stringToDate } from "@/script/util";
import { ExamAttemptGet } from "@/models/exam-attempt";

const ExamDetailHolder = ({examId, examType, examAttempt}: {examId: string, examType: string, examAttempt: ExamAttemptGet}) => {
  const navTo = useNavigate();

  console.log(examAttempt);

  return (
    <Box className="rounded-md p-3 w-full border border-gray-300 mb-4">
      <h1 className="font-bold mb-2">Lượt làm bài #{examAttempt.id}</h1>

      <ul className="text-xs mb-3">
        <li>Bài kiểm tra: {examAttempt.examTitle}</li>
        <li>Thời gian làm bài: {parseMinutesAndSeconds(examAttempt.duration!)}</li>
        <li>Thời gian nộp bài: {stringToDate(examAttempt.submittedAt.toString()) }</li>
        <li>Điểm số: {floatTwoDigits(examAttempt.totalPoint)} / 10</li>
        <li>Thời gian chấm: {!examAttempt.markedAt ? "Mới chấm tự động" : stringToDate(examAttempt.markedAt.toString())}</li>
      </ul>

      <Box className="text-center">
        <button className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm" onClick={routing}>
          Chấm điểm
        </button>
      </Box>
    </Box>
  )

  function routing() {
    if (examType === "pdf") navTo(`/teacher/exam/marking/pdf/${examId}/${examAttempt.id}`);
    else navTo(`/teacher/exam/marking/${examId}/${examAttempt.id}`);
  }
}

export { ExamDetailHolder }