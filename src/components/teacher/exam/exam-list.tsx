import { Eye, ThreeDotsVertical } from "react-bootstrap-icons";
import { useState } from "react";
import { Text } from "zmp-ui";
import ExamListAction from "./exam-list-action";
import { Exam } from "@/models/exam";

const ExamList = ({exam}: {exam: Exam}) => {
  const showAction = () => {
    return (
      <button onClick={() => setOpenAction(true)}><ThreeDotsVertical size={24} /></button>
    )
  }

  const [openAction, setOpenAction] = useState(false);

  return (
    <>
      <div className="flex place-items-start">
        <div className="inline-block flex-1">
          <Text bold>
            {exam.title} &minus; {exam.subjectName} {exam.grade} { exam.state == 1 ? <span className="zaui-text-red-50 italic">(Chưa xuất bản)</span> : "" }
          </Text>
          <Text size="small">
            {
              exam.state < 3 ? `Cập nhật lần cuối: 10:00 ngày 01/09/2025` : `Ngày xuất bản: 01/10/2025`
            }
          </Text>
          <Text size="small">
            Thời gian làm bài: {exam.timeLimit / 60} phút | 3 phần | 22 câu hỏi
          </Text>
          <Text size="small">
            Loại bài kiểm tra: {exam.displayType === "pdf" ? "PDF" : "Thủ công"}
          </Text>
          <Text size="small">
          {
            exam.state === 3 ? `Số lượt làm bài: 100` : ""
          }
          </Text>
        </div>
        { showAction() }
      </div>
      <hr />

      <ExamListAction exam={exam} visible={openAction} setVisible={setOpenAction}  />
    </>
  )
}

export default ExamList;