import { Box, Text } from "zmp-ui";
import { PDFAnswer } from "./PDF-question";
import { PlusLg } from "react-bootstrap-icons";


const PDFExamPart = () => {
  return (
    <Box>
      <Box className="flex justify-between items-center border-b border-b-black pb-1">
        <Text.Title size="normal">Phần 1</Text.Title>

        <button className="zaui-bg-blue-80 text-white rounded-full size-7 text-center">
          <PlusLg className="inline" />
        </button>
      </Box>

      <PDFAnswer type="multiple-choice" />
      <PDFAnswer type="true-false" />
      <PDFAnswer type="true-false-THPT" />
      <PDFAnswer type="short-answer" />
      <PDFAnswer type="fill-in-the-blank" />
      <PDFAnswer type="constructed-response" />
    </Box>
  )
}

export { PDFExamPart }