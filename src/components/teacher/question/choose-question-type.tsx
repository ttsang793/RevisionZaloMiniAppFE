import { useNavigate } from "react-router-dom";
import { Sheet } from "zmp-ui";

interface ChooseQuestionTypeProps {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

const ChooseQuestionType = ({visible, setVisible}: ChooseQuestionTypeProps) => {
  const navTo = useNavigate();

  return (
    <Sheet
      title="Chọn dạng câu hỏi"
      visible={visible}
      onClose={() => setVisible(false)}
      className="zaui-text-blue-90"
    >
      <div className="grid grid-cols-3 gap-x-2 gap-y-6 place-items-start px-4">
        {
          sessionStorage.getItem("questionMC") === "false" ? <></> : (
            <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/multiple-choice")}>
              <img src="https://res.cloudinary.com/dqxhmt5sp/image/upload/icon_multiple_choice_ni4zi6.png" alt="Trắc nghiệm 1 đáp án" className="size-12 rounded-lg mb-1" />
              Trắc nghiệm 1 đáp án
            </button>
          )
        }
        {
          sessionStorage.getItem("questionTF") === "false" ? <></> : (
            <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/true-false")}>
              <img src="https://res.cloudinary.com/dqxhmt5sp/image/upload/icon_true_false_b7uwrs.png" alt="Trắc nghiệm Đúng Sai" className="size-12 rounded-lg mb-1" />
              Trắc nghiệm Đúng &minus; Sai
            </button>
          )
        }
        {
        sessionStorage.getItem("questionSA") === "false" ? <></> : (
            <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/short-answer")}>
              <img src="https://res.cloudinary.com/dqxhmt5sp/image/upload/icon_short_answer_njfclh.png" alt="Trắc nghiệm Trả lời ngắn" className="size-12 rounded-lg mb-1" />
              Trắc nghiệm Trả lời ngắn
            </button>
          )
        }
        {
        sessionStorage.getItem("questionGF") === "false" ? <></> : (
            <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/gap-fill")}>
              <img src="https://res.cloudinary.com/dqxhmt5sp/image/upload/icon_gap_fill_gylvxr.png" alt="Điền vào chỗ trống" className="size-12 rounded-lg mb-1" />
              Điền vào chỗ trống
            </button>
          )
        }
        <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/constructed-response")}>
          <img src="https://res.cloudinary.com/dqxhmt5sp/image/upload/icon_constructed_response_agz8po.png" alt="Tự luận" className="size-12 rounded-lg mb-1" />
          Tự luận
        </button>
        {
        sessionStorage.getItem("questionST") === "false" ? <></> : (
            <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/sorting")}>
              <img src="https://res.cloudinary.com/dqxhmt5sp/image/upload/icon_sorting_orbchg.png" alt="Sắp xếp" className="size-12 rounded-lg mb-1" />
              Sắp xếp
            </button>
          )
        }
        {
        sessionStorage.getItem("questionTF") === "false" ? <></> : (
            <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/true-false-thpt")}>
              <img src="https://res.cloudinary.com/dqxhmt5sp/image/upload/icon_true_false_thpt_j00hq3.png" alt="Trắc nghiệm Đúng Sai THPT" className="size-12 rounded-lg mb-1" />
              Trắc nghiệm Đúng &minus; Sai (THPT)
            </button>
          )
        }
      </div>
    </Sheet>
  )
}

export default ChooseQuestionType;