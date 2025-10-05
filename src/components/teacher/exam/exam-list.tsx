import { Eye, ThreeDotsVertical } from "react-bootstrap-icons";
import { useState } from "react";
import { Text } from "zmp-ui";
import ExamListAction from "./exam-list-action";

const ExamList = ({state = 1}) => {
  const showAction = () => {
    return (
      (state === 2) ? <button><Eye size={24} /></button>
        : <button onClick={() => setOpenAction(true)}><ThreeDotsVertical size={24} /></button>
    )
  }

  const [openAction, setOpenAction] = useState(false);

  return (
    <>
      <div className="flex place-items-start">
        <div className="inline-block flex-1">
          <Text bold>
            Ôn tập KTTX lần 1 – Toán 12 { (state < 3) ? (state == 1 ? <span className="zaui-text-red-50 italic">(Chưa xuất bản)</span> : <span className="zaui-text-blue-50 italic">(Đang chờ duyệt)</span>) : ""}
          </Text>
          <Text size="small">
            {
              state < 3 ? `Cập nhật lần cuối: 10:00 ngày 01/09/2025` : `Ngày xuất bản: 01/10/2025`
            }
          </Text>
          <Text size="small">
            Thời gian làm bài: 90 phút | 3 phần | 22 câu hỏi
          </Text>
          <Text size="small">
            Loại bài kiểm tra: PDF
          </Text>
          <Text size="small">
          {
            state === 3 ? `Số lượt làm bài: 100` : ""
          }
          </Text>
        </div>
        { showAction() }
      </div>
      <hr />

      <ExamListAction state={state} displayType="NORMAL" visible={openAction} setVisible={setOpenAction}  />
    </>
  )
}

export default ExamList;