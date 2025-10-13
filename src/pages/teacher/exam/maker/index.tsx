import AppHeader from "@/components/header";
import { Box, Checkbox, Input, Page, Select, Text, useNavigate, useParams } from "zmp-ui";
import { useEffect, useState } from "react";
import { Exam, getExamById, insertExam, updateExam } from "@/models/exam";

export default function ExamMaker() {
  const navTo = useNavigate();
  const { type, id } = useParams();

  const [examInfo, setExamInfo] = useState<Exam>(new Exam());
  const [timeLimit, setTimeLimit] = useState("");
  const [earlyTurnIn, setEarlyTurnIn] = useState("");
  const [loading, setLoading] = useState(true);

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
            onChange={(e: number) => setExamInfo({...examInfo, grade: e})}
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
            onChange={(e: 'default' | 'regular' | 'midterm' | 'final' | 'other') => setExamInfo({...examInfo, examType: e})}
          >
            <Select.Option value="default" title="Loại bài kiểm tra" disabled />
            <Select.Option value="regular" title="Kiểm tra thường xuyên" />
            <Select.Option value="midterm" title="Kiểm tra giữa kì" />
            <Select.Option value="final" title="Kiểm tra học kì" />
            <Select.Option value="other" title="Khác" />
          </Select>

          {
            examInfo.examType === "other" ? (
              <Input
                label={<Text className="mt-2">Tên bài kiểm tra <span className="required">*</span></Text>}
                placeholder="Tên bài kiểm tra" required value={examInfo.title}
                onChange={e => setExamInfo({...examInfo, title: e.target.value})}
              />
            ) : <></>
          }

          <Input
            label={<Text className="mt-2">Thời gian làm bài (phút) <span className="required">*</span></Text>}
            placeholder="Thời gian làm bài" required value={timeLimit} onChange={e => setTimeLimit(e.target.value)}
          />
          <Input
            label={<Text className="mt-2">Thời gian nộp bài tối thiểu (phút)</Text>}
            placeholder="Thời gian nộp bài tối thiểu" value={earlyTurnIn} onChange={e => setEarlyTurnIn(e.target.value)}
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

  function handleSubmit() {
    switch (examInfo.examType) {
      case "regular": examInfo.title = "Kiểm tra thường xuyên"; break;
      case "midterm": examInfo.title = "Kiểm tra giữa kì"; break;
      case "final": examInfo.title = "Kiểm tra học kì"; break;
      default: break;
    }

    examInfo.displayType = type?.toLowerCase() === "pdf" ? "pdf" : "normal";
    examInfo.timeLimit = Number(timeLimit);
    examInfo.earlyTurnIn = Number(earlyTurnIn);

    examInfo.subjectId = "TOAN";

    (id === undefined) ? insertExam(examInfo) : updateExam(examInfo, Number(id));
  }
}