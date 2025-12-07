import { Exam, deleteExam, publishExam } from "@/models/exam";
import { useNavigate, Sheet, useSnackbar } from "zmp-ui";
import { notifyWhenNewExam } from "@/models/email";

const ExamListAction = ({exam, visible, setVisible}: {exam: Exam, visible: boolean, setVisible: any}) => {
  const navTo = useNavigate();
  const { openSnackbar } = useSnackbar();

  const showMenu = (status: number) => {
    switch (status) {
      case 0: return (
        <>
          <li className="p-4" onClick={() => navTo(`question/${exam.displayType === "pdf" ? "pdf/" : ""}${exam.id}`)}>Chỉnh sửa danh sách câu hỏi</li>
          <li className="p-4" onClick={() => navTo(`maker/${exam.displayType === "pdf" ? "pdf/" : ""}${exam.id}`)}>Cập nhật đề thi</li>
          <li className="p-4" onClick={handleDelete}>Xóa đề thi</li>
        </>
      )
      case 1: return (
        <>
          <li className="p-4" onClick={() => navTo(`question/${exam.displayType === "pdf" ? "pdf/" : ""}${exam.id}`)}>Chỉnh sửa danh sách câu hỏi</li>
          <li className="p-4" onClick={handlePublish}>Xuất bản đề thi</li>
          <li className="p-4" onClick={() => navTo(`maker/${exam.displayType === "pdf" ? "pdf/" : ""}${exam.id}`)}>Cập nhật đề thi</li>
          <li className="p-4" onClick={handleDelete}>Xóa đề thi</li>
        </>
      )
      case 3: return (
        <>
          <li className="p-4" onClick={() => navTo(`detail/${exam.id}/comment`)}>Xem bình luận</li>
          <li className="p-4" onClick={() => navTo(`detail/${exam.id}/marking`)}>Chấm điểm</li>
        </>
      )
      default: return null;
    }
  }

  return (
    <Sheet
      title="Chọn dạng câu hỏi"
      visible={visible}
      onClose={() => setVisible(false)}
      className="zaui-text-blue-90"
    >
      <ul className="divide-y divide-zinc-300 text-black cursor-pointer">
        { showMenu(exam.status) }
      </ul>
    </Sheet>
  )

  async function handleDelete(): Promise<void> {
    const response = await deleteExam(exam.id!);
    if (response.status === 200) {
      openSnackbar({
        text: "Xóa đề thi thành công!",
        type: "success",
        duration: 1500,
      })
      setTimeout(() => navTo(0), 1000);
    }
    else {
      openSnackbar({
        text: "Xóa đề thi thất bại!",
        type: "success"
      })
    }
  }

  async function handlePublish(): Promise<void> {
    const response = await publishExam(exam.id!);
    if (response.status === 200) {
      openSnackbar({
        text: "Xuất bản đề thi thành công!",
        type: "success",
        duration: 1500,
      })
      await notifyWhenNewExam(exam.teacherId, exam.teacherName!)
      setTimeout(() => navTo(0), 1000);
    }
    else {
      openSnackbar({
        text: "Xuất bản đề thi thất bại!",
        type: "success"
      })
    }
  }
}

export default ExamListAction;