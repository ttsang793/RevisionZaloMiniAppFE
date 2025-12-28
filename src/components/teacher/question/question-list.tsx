import { PencilSquare, XLg } from "react-bootstrap-icons";
import { Box, Text, useNavigate, useSnackbar } from "zmp-ui";
import { deleteQuestion, isUpdatable, Question } from "@/models/question";
import { questionType } from "@/models/question";

const QuestionListItem = ({question}: {question: Question}) => {
  const navTo = useNavigate();
  const { openSnackbar } = useSnackbar();

  return (
    <>
      <Box className={`flex place-items-start`}>
        <Box className="inline-block flex-1">
          <Text bold>{question.title}</Text>
          <Text size="small">{questionType.find(q => q.type === question.type)?.title} <i>({question.subjectName} {question.grade})</i></Text>
        </Box>
        
        <Box className="inline-block">
          <button className="me-1" onClick={handleDelete}>
            <XLg size={24} />
          </button>
          <button onClick={handleUpdate}>
            <PencilSquare size={24} />
          </button>
        </Box>
      </Box>

      <hr />
    </>
  )

  async function handleUpdate(): Promise<void> {
    try {
      const response = await isUpdatable(question.id!);

      if (response.status === 200) navTo(`maker/${question.type}/${question.id}`);
      else openSnackbar({
        text: !response.response.data.error ? "Lỗi hệ thống, vui lòng thử lại sau!" : response.response.data.error,
        type: "error"
      });
    }
    catch (err) {
      if (err.response.status === 400) {
        openSnackbar({
          text: "Câu hỏi đã ở đề thi xuất bản, không thể sửa!",
          type: "error"
        });
      }

      else {
        console.log(err);
        openSnackbar({
          text: "Lỗi hệ thống, vui lòng thử lại sau!",
          type: "error"
        });
      }
    }
  }

  async function handleDelete(): Promise<void> {
    try {
      const response = await deleteQuestion(question.id!);

      if (response.status === 200) {
        openSnackbar({
          text: "Xóa câu hỏi thành công!",
          type: "success",
          duration: 1500
        });
        navTo(0);
      }

      else {
        console.error(response);
        openSnackbar({
          text: "Xóa câu hỏi thất bại!",
          type: "error"
        });
      }
    }
    catch (err) {
      if (err.response.status === 419) {
        openSnackbar({
          text: "Câu hỏi đã ở đề thi xuất bản, không thể xóa!",
          type: "error"
        });
      }

      else {
        console.log(err);
        openSnackbar({
          text: "Xóa câu hỏi thất bại!",
          type: "error"
        });
      }
    }
  }
}

export default QuestionListItem;