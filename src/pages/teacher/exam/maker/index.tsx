import AppHeader from "@/components/header";
import { Box, Checkbox, Input, Page, Select, Text, useNavigate, useParams, useSnackbar } from "zmp-ui";
import { useEffect, useState } from "react";
import { Exam, getExamById, insertExam, updateExam } from "@/models/exam";

type ExamMakerError = {
  grade: string,
  examType: string,
  title: string,
  timeLimit: string,
  earlyTurnIn: string
}

export default function ExamMaker() {
  const navTo = useNavigate();
  const { type, id } = useParams();
  const { openSnackbar } = useSnackbar();

  const [examInfo, setExamInfo] = useState<Exam>(new Exam());
  const [timeLimit, setTimeLimit] = useState("");
  const [earlyTurnIn, setEarlyTurnIn] = useState("");
  const [loading, setLoading] = useState(true);
  const [examError, setExamError] = useState<ExamMakerError>({ grade: "", examType: "", title: "", timeLimit: "", earlyTurnIn: "" });

  useEffect(() => {
    setLoading(true);
    if (id !== undefined) {
      getExamById(Number(id)).then(response => {
        setExamInfo(response.data);
        setTimeLimit(`${response.data.timeLimit/60}`);
        setEarlyTurnIn(`${response.data.earlyTurnIn/60}`);
        setLoading(false);
      })
    }
    else setLoading(false);
  }, []);

  return loading ? <></> : (
    <Page className="page-x-0 page-wo-footer bg-white">
      <AppHeader title={`Tạo đề thi mới${type?.toLowerCase() === "pdf" ? " (PDF)" : ""}`} showBackIcon />

      <form onSubmit={e => e.preventDefault()} noValidate>
        <Box className="bg-white p-4">
          <Select
            label={<Text>Lớp <span className="required">*</span></Text>}
            defaultValue={-1} closeOnSelect value={examInfo.grade}
            errorText={examError.grade} status={examError.grade.length === 0 ? "" : "error"}
            onChange={(e: number) => {
              setExamError({...examError, grade: ""});
              setExamInfo({...examInfo, grade: e})
            }}
          >
            <Select.Option value={-1} title="Lớp" disabled />
            <Select.Option value={6} title="Lớp 6" />
            <Select.Option value={7} title="Lớp 7" />
            <Select.Option value={8} title="Lớp 8" />
            <Select.Option value={9} title="Lớp 9" />
            <Select.Option value={10} title="Lớp 10" />
            <Select.Option value={11} title="Lớp 11" />
            <Select.Option value={12} title="Lớp 12" />
          </Select>

          <Select
            label={<Text className="mt-2">Loại bài kiểm tra <span className="required">*</span></Text>}
            closeOnSelect defaultValue={examInfo.examType}
            errorText={examError.examType} status={examError.examType.length === 0 ? "" : "error"}
            onChange={(e: 'default' | 'regular' | 'midterm' | 'final' | 'other') => {
              setExamError({...examError, examType: ""})
              setExamInfo({...examInfo, examType: e});
            }}
          >
            <Select.Option value="default" title="Loại bài kiểm tra" disabled />
            <Select.Option value="regular" title="Kiểm tra thường xuyên" />
            <Select.Option value="midterm" title="Kiểm tra giữa kì" />
            <Select.Option value="final" title="Kiểm tra học kì" />
            <Select.Option value="other" title="Khác" />
          </Select>
          
          <Input
            label={<Text className="mt-2">Tên bài kiểm tra</Text>}
            placeholder="Tên bài kiểm tra" value={examInfo.title}
            errorText={examError.title} status={examError.title.length === 0 ? "" : "error"}
            onChange={e => {
              setExamError({...examError, title: ""})
              setExamInfo({...examInfo, title: e.target.value})
            }}
          />

          <Input
            type="number" min={0}
            label={<Text className="mt-2">Thời gian làm bài (phút) <span className="required">*</span></Text>}
            errorText={examError.timeLimit} status={examError.timeLimit.length === 0 ? "" : "error"}
            placeholder="Thời gian làm bài" required value={timeLimit}
            onChange={e => {
              setExamError({...examError, timeLimit: ""})
              setTimeLimit(e.target.value)
            }}
          />
          <Input
            type="number" min={0}
            label={<Text className="mt-2">Thời gian nộp bài tối thiểu (phút)</Text>}
            errorText={examError.earlyTurnIn} status={examError.earlyTurnIn.length === 0 ? "" : "error"}
            placeholder="Thời gian nộp bài tối thiểu" value={earlyTurnIn}
            onChange={e => {
              setExamError({...examError, earlyTurnIn: ""})
              setEarlyTurnIn(e.target.value)
            }}
          />
          
          <Checkbox
            className="mt-2 w-full" value="" checked={examInfo.allowShowScore}
            onChange={e => setExamInfo({...examInfo, allowShowScore: e.target.checked})}
          >
            <Text>Hiện điểm cho từng câu hỏi.</Text>
          </Checkbox>

          {
            type?.toLowerCase() === "pdf" ? <></> : (
              <>
                <Checkbox
                  className="mt-2 w-full" value="" checked={examInfo.allowPartSwap}
                  onChange={e => setExamInfo({...examInfo, allowPartSwap: e.target.checked})}
                >
                  <Text>Trộn các phần.</Text>
                </Checkbox>

                <Checkbox
                  className="mt-2 w-full" value="" checked={examInfo.allowQuestionSwap}
                  onChange={e => setExamInfo({...examInfo, allowQuestionSwap: e.target.checked})}
                >
                  <Text>Trộn câu hỏi ở mỗi phần.</Text>
                </Checkbox>

                <Checkbox
                  className="mt-2 w-full" value="" checked={examInfo.allowAnswerSwap}
                  onChange={e => setExamInfo({...examInfo, allowAnswerSwap: e.target.checked})}
                >
                  <Text>Trộn đáp án trong câu hỏi.</Text>
                </Checkbox>
              </>
            )
          }

          <Box className="flex flex-wrap gap-2 mt-2 justify-center">
            <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={() => handleSubmit()} />
            <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/exam")} />
          </Box>
        </Box>
      </form>
    </Page>
  )

  async function handleSubmit(): Promise<any> {
    let errorFlag = false;
    const newError = { grade: "", examType: "", title: "", timeLimit: "", earlyTurnIn: "" };
    if (examInfo.grade === -1) { errorFlag = true; newError.grade = "Vui lòng nhập lớp!" }
    if (examInfo.examType === 'default') { errorFlag = true; newError.examType = "Vui lòng chọn loại bài kiểm tra!" }
    if (examInfo.examType === 'other' && !examInfo.title) { errorFlag = true; newError.title = "Vui lòng nhập tiêu đề!" }
    if (!timeLimit) { errorFlag = true; newError.timeLimit = "Vui lòng nhập thời gian làm bài!" }
    else if (Number(timeLimit) < 5) { errorFlag = true; newError.timeLimit = "Thời gian làm bài phải tối thiểu 5 phút!" }
    if (!earlyTurnIn) { errorFlag = true; newError.earlyTurnIn = "Vui lòng nhập thời gian nộp bài tối thiểu!" }
    else if (Number(earlyTurnIn) > Number(timeLimit)) { errorFlag = true; newError.earlyTurnIn = "Thời gian nộp bài tối thiểu không được lớn hơn thời gian làm bài!" }

    setExamError(newError);

    if (errorFlag) return;    

    if (examInfo.title === "")
      switch (examInfo.examType) {
        case "regular": examInfo.title = "Kiểm tra thường xuyên"; break;
        case "midterm": examInfo.title = "Kiểm tra giữa kì"; break;
        case "final": examInfo.title = "Kiểm tra học kì"; break;
        default: break;
      }

    examInfo.displayType = type?.toLowerCase() === "pdf" ? "pdf" : "normal";
    examInfo.timeLimit = Number(timeLimit);
    examInfo.earlyTurnIn = Number(earlyTurnIn);

    const response = (!id) ? await insertExam(examInfo) : await updateExam(examInfo, Number(id));
    if (response.status === 200 || response.status === 201) {
      openSnackbar({
        text: `${!id ? "Thêm" : "Cập nhật"} thông tin bài kiểm tra thành công!`,
        type: "success",
        duration: 1500
      })
      setTimeout(() => navTo("/teacher/exam"), 1500);
    }
    else {
      console.log(response);
      openSnackbar({
        text: `${!id ? "Thêm" : "Cập nhật"} thông tin bài kiểm tra thất bại!`,
        type: "error"
      })
    }
  }
}