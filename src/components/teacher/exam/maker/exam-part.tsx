import { useState } from "react";
import { Box, Input, Sheet, Text } from "zmp-ui";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { ExamGroupQuestion } from "./exam-question";

const ExamPart = () => {
  const [showDetail, setShowDetail] = useState(false);
  
  return (
    <Box className="mb-4 border-b pb-2 zaui-border-blue-80 bg-white">
      <Box
        className="zaui-bg-blue-80 text-white px-4 py-2 w-full flex items-center justify-between font-bold"
      >
        Phần 1

        <button onClick={() => setShowDetail(!showDetail)}>
        {
          showDetail ? <ChevronUp size={20} /> : <ChevronDown size={20} />
        }
        </button>        
      </Box>

      <Box className={showDetail ? "grid grid-cols-[1fr_64px] gap-x-2 flex-1 p-2 gap-y-4 text-sm zaui-bg-steelblue-20" : "hidden"}>
        <Input
          label={<Text>Tiêu đề <span className="required">*</span></Text>}
          placeholder="Tiêu đề"
        />

        <Input
          label={<Text>Điểm <span className="required">*</span></Text>}
          placeholder="Điểm"
        />
      </Box>

      <Box className="mb-2">
        {/*<Text className="mt-2">Chưa có câu hỏi nào!</Text>*/}
        <ExamGroupQuestion />
        <ExamGroupQuestion />
        <ExamGroupQuestion />
      </Box>

      <Box className="text-right">
        <button className="zaui-bg-blue-80 text-white rounded-full py-1 px-4 me-4 text-center">
          Thêm câu hỏi mới
        </button>
      </Box>
    </Box>
  )
}

export { ExamPart }