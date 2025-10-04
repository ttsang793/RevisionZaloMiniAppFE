import { Box, Text } from "zmp-ui";
import { PDFExamPart as ExamPart } from "./PDF-exam-part";

const PDFExamCode = () => {
  return (
    <Box className="border-y zaui-border-blue-80">
      <Box className="flex items-center justify-between zaui-bg-blue-20 p-2">
        <Box>
          <label>Mã đề: </label>
          <input
            type="text"
            className="py-1 px-2 bg-white w-20"
            placeholder="Mã đề"
          />
        </Box>

        <button className="zaui-bg-blue-80 text-white rounded-full py-1 px-4">
          Nhập file đáp án
        </button>
      </Box>

      <Box className="divide-x divide-zinc-300 flex bg-white">
        <Box className="flex flex-col flex-1 p-2 gap-y-4 text-sm">
          <Box className="py-28 px-4 border border-zinc-300 rounded-lg zaui-text-gray-40 flex place-items-center text-center">
            <Text>Nhấn vào đây để nhập đề thi (PDF) <span className="zaui-text-red-50">*</span></Text>
          </Box>
          
          <Box className="p-4 border border-zinc-300 rounded-lg zaui-text-gray-40 flex place-items-center text-center">
            <Text>Nhấn vào đây để nhập đề thi (PDF) <span className="zaui-text-red-50">*</span></Text>
          </Box>
        </Box>

        <Box className="flex-1 py-1 px-2 flex flex-col gap-y-2">
          <button className="zaui-bg-blue-80 text-white rounded-full py-1 px-4">
            Thêm phần mới
          </button>
          <ExamPart />
          <ExamPart />
        </Box>
      </Box>
    </Box>
  )
}

export { PDFExamCode };