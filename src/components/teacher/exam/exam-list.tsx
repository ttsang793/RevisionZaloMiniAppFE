import { CloudSlash, CloudUpload, Eye, PencilSquare, XLg } from "react-bootstrap-icons";
import { Text } from "zmp-ui";

const ExamList = ({state = 1}) => {
  const showAction = () => {
    if (state === 1) return (            
      <div className="flex gap-1 w-[52px] flex-wrap">
        <button>
          <CloudUpload size={24} />
        </button>
        <button>
          <Eye size={24} />
        </button>
        <button>
          <XLg size={24} />
        </button>
        <button>
          <PencilSquare size={24} />
        </button>
      </div>
    )
    else if (state == 2) return (
      <div className="w-[52px] text-right">
        <button>
          <Eye size={24} />
        </button>
      </div>
    )
    else return (      
      <div className="inline-block">
        <button className="me-1">
          <CloudSlash size={24} />
        </button>
        <button>
          <Eye size={24} />
        </button>
      </div>
    )
  }

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
          {
            state === 3 ? `Số lượt làm bài: 100` : ""
          }
          </Text>
        </div>
        { showAction() }
      </div>
      <hr />
    </>
  )
}

export default ExamList;