import { Box, Text } from "zmp-ui";
import { TracNghiem, DungSai, DungSaiTHPT, TraLoiNgan, DienVaoChoTrong, TuLuan } from "./PDF-question";
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

      <TracNghiem />
      <DungSai isDungSaiTHPT={false} cauHoi="2" />
      <DungSaiTHPT />
      <TraLoiNgan />
      <DienVaoChoTrong />
      <TuLuan />
    </Box>
  )
}

export { PDFExamPart }