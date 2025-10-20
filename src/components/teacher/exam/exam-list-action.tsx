import { Exam, deleteExam, unpublishExam } from "@/models/exam";
import { useNavigate, Sheet } from "zmp-ui";

const ExamListAction = ({exam, visible, setVisible}: {exam: Exam, visible: boolean, setVisible: any}) => {
  const navTo = useNavigate();

  return (
    <Sheet
      title="Chọn dạng câu hỏi"
      visible={visible}
      onClose={() => setVisible(false)}
      className="zaui-text-blue-90"
    >
      <ul className="divide-y divide-zinc-300 text-black cursor-pointer">
        { exam.state === 1 ? (
          <>
            <li className="p-4" onClick={() => navTo(`question/${exam.displayType === "PDF" ? "pdf/" : ""}${exam.id}`)}>Chỉnh sửa danh sách câu hỏi</li>
            <li className="p-4" onClick={() => navTo("")}>Làm đề thi thử</li>
            <li className="p-4" onClick={() => {}}>Xuất bản đề thi</li>
            <li className="p-4" onClick={() => navTo(`maker/${exam.displayType === "PDF" ? "pdf/" : ""}${exam.id}`)}>Cập nhật đề thi</li>
            <li className="p-4" onClick={() => deleteExam(exam.id!)}>Xóa đề thi</li>
          </>
        ) : (
          <>
            <li className="p-4" onClick={() => navTo("")}>Xem lượt làm bài</li>
            <li className="p-4" onClick={() => navTo("")}>Làm đề thi thử</li>
            <li className="p-4" onClick={() => unpublishExam(exam.id!)}>Gỡ bỏ đề thi</li>
          </>
        )}
      </ul>
    </Sheet>
  )
}

export default ExamListAction;