import { PencilSquare, XLg } from "react-bootstrap-icons";
import { Box, Text, useNavigate } from "zmp-ui";
import { deleteQuestion, Question } from "@/models/question";

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

const QuestionList = ({question}: {question: Question}) => {
  const navTo = useNavigate();

  console.log();

  return (
    <>
      <Box className={`flex place-items-start`}>
        <Box className="inline-block flex-1">
          <Text bold>{question.title}</Text>
          <Text size="small">{questionType.find(q => q.type === question.type)?.title} <i>({question.subjectId} {question.grade})</i></Text>
        </Box>
        
        <Box className="inline-block">
          <button className="me-1" onClick={() => deleteQuestion(question.id!)}>
            <XLg size={24} />
          </button>
          <button onClick={() => navTo(`maker/${question.type}/${question.id}`)}>
            <PencilSquare size={24} />
          </button>
        </Box>
      </Box>

      <hr />
    </>
  )
}

export default QuestionList;