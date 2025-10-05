import AppHeader from "@/components/header";
import { Box, Checkbox, Input, Page, Select, Text, useNavigate, useParams } from "zmp-ui";
import { FormEvent, useState } from "react";
import { Exam } from "@/models/exam";

export default function ExamMaker() {
  const navTo = useNavigate();
  const { type } = useParams();  

  const defaultExam: Exam = {
    id: "",
    examType: -1,
    displayType: type?.toLowerCase() === "pdf" ? "PDF" : "NORMAL",
    grade: -1,
    timeLimit: "",
    allowTurnInTime: "",
    allowShowScore: false,
    allowPartSwap: false,
    allowQuesionSwap: false,
    allowAnswerSwap: false
  };

  const [examInfo, setExamInfo] = useState<Exam>(defaultExam);

  return (
    <Page className="page-x-0 page-wo-footer bg-white">
      <AppHeader title={`Tạo đề thi mới${type?.toLowerCase() === "pdf" ? " (PDF)" : ""}`} showBackIcon />

      <form onSubmit={handleSubmit}>
        <Box className="bg-white p-4">
          <Select
            label={<Text>Lớp <span className="zaui-text-red-50">*</span></Text>}
            defaultValue={-1} closeOnSelect value={examInfo.grade}
            onChange={(e: number) => setExamInfo({...examInfo, grade: e})}
          >
            <Select.Option value={-1} title="Lớp" disabled className="zaui-text-red-50" />
            <Select.Option value={6} title="Lớp 6" />
            <Select.Option value={7} title="Lớp 7" />
            <Select.Option value={8} title="Lớp 8" />
            <Select.Option value={9} title="Lớp 9" />
            <Select.Option value={10} title="Lớp 10" />
            <Select.Option value={11} title="Lớp 11" />
            <Select.Option value={12} title="Lớp 12" />
          </Select>

          <Select
            label={<Text className="mt-2">Loại bài kiểm tra <span className="zaui-text-red-50">*</span></Text>}
            defaultValue={-1} closeOnSelect
            onChange={(e: number) => setExamInfo({...examInfo, examType: e})}
          >
            <Select.Option value={-1} title="Loại bài kiểm tra" />
            <Select.Option value={1} title="Kiểm tra thường xuyên" />
            <Select.Option value={2} title="Kiểm tra giữa kì" />
            <Select.Option value={3} title="Kiểm tra học kì" />
            <Select.Option value={4} title="Kiểm tra chuyển cấp" />
            <Select.Option value={0} title="Khác" />
          </Select>

          {
            examInfo.examType === 0 ? (
              <Input
                label={<Text className="mt-2">Tên bài kiểm tra <span className="zaui-text-red-50">*</span></Text>}
                placeholder="Tên bài kiểm tra" required onChange={e => setExamInfo({...examInfo, name: e.target.value})}
              />
            ) : <></>
          }

          <Input
            label={<Text className="mt-2">Thời gian làm bài (phút) <span className="zaui-text-red-50">*</span></Text>}
            placeholder="Thời gian làm bài" required onChange={e => setExamInfo({...examInfo, timeLimit: e.target.value})}
          />
          <Input
            label={<Text className="mt-2">Thời gian nộp bài tối thiểu (phút)</Text>}
            placeholder="Thời gian nộp bài tối thiểu" onChange={e => setExamInfo({...examInfo, allowTurnInTime: e.target.value})}
          />
          
          <Checkbox
            className="mt-2 w-full"
            value={examInfo.allowShowScore} onChange={(e: boolean) => setExamInfo({...examInfo, allowShowScore: e})}
          >
            <Text>Hiện điểm cho từng câu hỏi.</Text>
          </Checkbox>

          {
            type?.toLowerCase() === "pdf" ? <></> : (
              <>
                <Checkbox
                  className="mt-2 w-full"
                  value={examInfo.allowPartSwap} onChange={(e: boolean) => setExamInfo({...examInfo, allowPartSwap: e})}
                >
                  <Text>Trộn các phần.</Text>
                </Checkbox>

                <Checkbox
                  className="mt-2 w-full"
                  value={examInfo.allowQuesionSwap} onChange={(e: boolean) => setExamInfo({...examInfo, allowQuesionSwap: e})}
                >
                  <Text>Trộn câu hỏi ở mỗi phần.</Text>
                </Checkbox>

                <Checkbox
                  className="mt-2 w-full"
                  value={examInfo.allowAnswerSwap} onChange={(e: boolean) => setExamInfo({...examInfo, allowAnswerSwap: e})}
                >
                  <Text>Trộn đáp án trong câu hỏi.</Text>
                </Checkbox>
              </>
            )
          }

          <Box className="flex flex-wrap gap-2 mt-2 justify-center">
            <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" />
            <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/exam")} />
          </Box>
        </Box>
      </form>
    </Page>
  )

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();   
  }
}