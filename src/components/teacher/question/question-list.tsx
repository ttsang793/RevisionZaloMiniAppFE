import { Eye, PencilSquare, XLg } from "react-bootstrap-icons";
import { Text } from "zmp-ui";

const QuestionList = ({editable = true}) => {
  return (
    <>
      <div className={`flex place-items-start`}>
        <div className="inline-block flex-1">
          <Text bold>
            Hàm số y=2x+3 giao với trục Ox tại:
          </Text>
          <Text size="small">Trắc nghiệm 1 đáp án <i>(Toán 7)</i></Text>
        </div>
        {
          editable ? (
            <div className="inline-block">
              <button className="me-1">
                <XLg size={24} />
              </button>
              <button>
                <PencilSquare size={24} />
              </button>
            </div>
          ) : (
            <div className="w-[52px] text-right">
              <button>
                <Eye size={24} />
              </button>
            </div>
          )
        }
      </div>

      <hr />
    </>
  )
}

export default QuestionList;