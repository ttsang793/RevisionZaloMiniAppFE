import { useNavigate, Sheet } from "zmp-ui";

const ExamListAction = ({state, displayType, visible, setVisible}) => {
  const navTo = useNavigate();

  return (
    <Sheet
      title="Chọn dạng câu hỏi"
      visible={visible}
      onClose={() => setVisible(false)}
      className="zaui-text-blue-90"
    >
      <ul className="divide-y divide-zinc-300 text-black cursor-pointer">
        { state === 1 ? (
          <>
            <li className="p-4" onClick={() => navTo(`maker/${displayType === "PDF" ? "pdf/question" : "question"}`)}>Chỉnh sửa danh sách câu hỏi</li>
            <li className="p-4" onClick={() => navTo("")}>Làm đề thi thử</li>
            <li className="p-4" onClick={() => {}}>Xuất bản đề thi</li>
            <li className="p-4" onClick={() => navTo(`maker${displayType === "PDF" ? "/pdf" : ""}`)}>Cập nhật đề thi</li>
            <li className="p-4" onClick={() => {}}>Xóa đề thi</li>
          </>
        ) : (
          <>
            <li className="p-4" onClick={() => navTo("")}>Xem lượt làm bài</li>
            <li className="p-4" onClick={() => navTo("")}>Làm đề thi thử</li>
            <li className="p-4" onClick={() => {}}>Gỡ bỏ đề thi</li>
          </>
        )}
      </ul>
    </Sheet>
  )
}

export default ExamListAction;