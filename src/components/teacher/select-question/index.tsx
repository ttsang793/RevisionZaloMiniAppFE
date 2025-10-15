import { Eye } from "react-bootstrap-icons";
import { Checkbox, Text, Box } from "zmp-ui";

const questionType = [
 { title: "Trắc nghiệm 4 đáp án", type: "multiple-choice" },
 { title: "Trắc nghiệm Đúng – Sai", type: "true-false" },
 { title: "Trắc nghiệm trả lời ngắn", type: "short-answer" },
 { title: "Điền vào chỗ trống", type: "fill-in-the-blank" },
 { title: "Tự luận", type: "constructed-response" },
 { title: "Sắp xếp", type: "sorting" },
 { title: "Nhóm câu hỏi", type: "group" },
 { title: "Trắc nghiệm Đúng – Sai THPT", type: "true-false-thpt" }
];

const SelectQuestion = ({question, filter = false, handleQuestion}) => {
  return (
    <Box className="py-4 px-2 flex items-center gap-x-1">
      {
        filter ?
        <Checkbox
          value=""
          onChange={e => handleQuestion(e.target.checked, question)}
        /> : <></>
      }

      <Box className="inline-block flex-1">
        <Text bold>{question.title}</Text>
        <Text size="small">{questionType.find(q => q.type === question.type)?.title} <i>({question.subjectId} {question.grade})</i></Text>
      </Box>

      <button>
        <Eye size={24} />
      </button>
    </Box>
)
}

export default SelectQuestion;