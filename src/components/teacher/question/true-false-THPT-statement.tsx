import { PencilSquare, XLg } from "react-bootstrap-icons";
import { Box, Text } from "zmp-ui";

const TrueFalseTHPTStatement = ({statement}: {statement: number}) => {
  return (
    <>
      <Box className="flex items-center">
        <Box className="inline-block flex-1">
          <Text bold className="inline">{statement}.</Text>
          <Text className="inline"> Tập hợp N là tập số tự nhiên.</Text>
        </Box>

        <Box className="inline-block">
          <button className="me-1">
            <XLg size={24} />
          </button>
          <button>
            <PencilSquare size={24} />
          </button>
        </Box>
      </Box>

      { statement < 4 ? <hr /> : <></> }
    </>
  )
}

export { TrueFalseTHPTStatement };