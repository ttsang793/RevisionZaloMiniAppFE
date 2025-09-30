import { Eye, PencilSquare, XLg } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Text } from "zmp-ui";

const QuestionList = ({editable = true}) => {
  const navTo = useNavigate();

  return (
    <>
      <div className={`flex place-items-start`}>
        <div className="inline-block flex-1">
          <Text bold>
            Hàm số y=2x+3 giao với trục Ox tại:
          </Text>
          <Text size="small">Trắc nghiệm 4 đáp án <i>(Toán 7)</i></Text>
        </div>
        {
          editable ? (
            <div className="inline-block">
              <button className="me-1">
                <XLg size={24} />
              </button>
              <button onClick={() => navTo("edit/1")}>
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