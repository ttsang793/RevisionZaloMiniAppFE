import { useState } from "react";
import { Box, Text } from "zmp-ui";
import { PDFExamPart as ExamPart } from "./PDF-exam-part";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

const PDFExamCode = () => {
  const [showPDF, setShowPDF] = useState(false);

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
          Nhập đáp án
        </button>
      </Box>

      <Box>
        <Box className="border-b zaui-border-gray-40 mb-1">
          <button className="px-4 py-2 w-full flex items-center justify-between">
            Đề thi

            <button onClick={() => setShowPDF(!showPDF)}>
            {
              showPDF ? <ChevronUp size={20} /> : <ChevronDown size={20} />
            }
            </button>
          </button>
          <Box className={showPDF ? "flex flex-col flex-1 p-2 gap-y-4 text-sm" : "hidden"}>
            <Box className="py-10 px-4 border border-zinc-300 rounded-lg zaui-text-gray-40 flex place-items-center text-center">
              <Text>Nhấn vào đây để nhập đề thi (PDF) <span className="zaui-text-red-50">*</span></Text>
            </Box>
            
            <Box className="p-4 border border-zinc-300 rounded-lg zaui-text-gray-40 flex place-items-center text-center">
              <Text>Nhấn vào đây để file đáp án (PDF) <span className="zaui-text-red-50">*</span></Text>
            </Box>
          </Box>
        </Box>

        <Box className="flex-1 py-1 px-2 flex flex-col gap-y-2">
          <button className="zaui-bg-blue-80 text-white rounded-full py-1 px-4 self-end">
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