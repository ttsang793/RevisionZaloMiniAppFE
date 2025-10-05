import { useState } from "react";
import { Box, Sheet, Text, useNavigate } from "zmp-ui";
import { ChevronDown, ChevronUp, Eye, PlusLg } from "react-bootstrap-icons";

const ExamGroupQuestion = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [openAction, setOpenAction] = useState(false);

  return (
    <Box className={showDetail ? "border-b zaui-border-blue-80" : ""}>
      <Box
        className="zaui-bg-blue-20 zaui-text-blue-80 border-b zaui-border-blue-80 px-4 py-2 w-full flex items-center gap-x-1"
      >
        <p className="flex-1 text-left font-bold">Câu 1.</p>
        
        <input
          className="px-2 bg-white w-12 me-1"
          placeholder="điểm"
        />

        <button onClick={() => setShowDetail(!showDetail)}>
        {
          showDetail ? <ChevronUp size={20} /> : <ChevronDown size={20} />
        }
        </button>
        
        <button onClick={() => setOpenAction(true)}>
          <PlusLg size={20} />
        </button>
        
      </Box>

      <Box className={showDetail ? "flex-1 p-2 gap-y-4" : "hidden"}>
        <ExamQuestion />
        <ExamQuestion />
        <ExamQuestion />
      </Box>

      <AddQuestionAction visible={openAction} setVisible={setOpenAction} />
    </Box>
  )
}

const ExamQuestion = () => {  
  const navTo = useNavigate();

  return (
    <Box className="border-b zaui-border-gray-60 last:border-0 pb-2 mb-2 last:p-0 last:m-0">
      <Box className="flex place-items-start">
        <Box className="inline-block flex-1">
          <Text bold>
            Hàm số y=2x+3 giao với trục Ox tại:
          </Text>
          <Text size="small">Trắc nghiệm 4 đáp án <i>(Toán 7)</i></Text>
        </Box>
        
        <button>
          <Eye size={20} />
        </button>
      </Box>
    </Box>
  )
}

const AddQuestionAction = ({visible, setVisible}) => {
  return (
    <Sheet
      title="Chọn dạng câu hỏi"
      visible={visible}
      onClose={() => setVisible(false)}
      className="zaui-text-blue-90"
    >
      <ul className="divide-y divide-zinc-300 text-black cursor-pointer">
        <li className="p-4" onClick={() => handleSelect()}>Thêm câu hỏi mới</li>
        <li className="p-4" onClick={() => handleSelect()}>Thêm nhóm câu hỏi</li>
      </ul>            
    </Sheet>
  )

  function handleSelect() {
    setVisible(false);
  }
}

export { ExamGroupQuestion }