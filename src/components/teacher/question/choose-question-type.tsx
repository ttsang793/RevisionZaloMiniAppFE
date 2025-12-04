import { useNavigate } from "react-router-dom";
import { Sheet } from "zmp-ui";

const ChooseQuestionType = ({visible, setVisible}) => {
  const navTo = useNavigate();

  return (
    <Sheet
      title="Chọn dạng câu hỏi"
      visible={visible}
      onClose={() => setVisible(false)}
      className="zaui-text-blue-90"
    >
      <div className="grid grid-cols-3 gap-x-2 gap-y-6 place-items-start px-4">
        <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/multiple-choice")}>
          <img src="/icon/icon_multiple_choice.png" alt="Trắc nghiệm 1 đáp án" className="size-12 rounded-lg mb-1" />
          Trắc nghiệm 1 đáp án
        </button>
        <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/true-false")}>
          <img src="/icon/icon_true_false.png" alt="Trắc nghiệm Đúng Sai" className="size-12 rounded-lg mb-1" />
          Trắc nghiệm Đúng &minus; Sai
        </button>
        <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/short-answer")}>
          <img src="/icon/icon_short_answer.png" alt="Trắc nghiệm Trả lời ngắn" className="size-12 rounded-lg mb-1" />
          Trắc nghiệm Trả lời ngắn
        </button>
        <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/gap-fill")}>
          <img src="/icon/icon_gap_fill.png" alt="Điền vào chỗ trống" className="size-12 rounded-lg mb-1" />
          Điền vào chỗ trống
        </button>
        <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/constructed-response")}>
          <img src="/icon/icon_constructed_response.png" alt="Tự luận" className="size-12 rounded-lg mb-1" />
          Tự luận
        </button>
        <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/sorting")}>
          <img src="/icon/icon_sorting.png" alt="Sắp xếp" className="size-12 rounded-lg mb-1" />
          Sắp xếp
        </button>
        <button className="flex flex-col items-center w-full" onClick={() => navTo("maker/true-false-thpt")}>
          <img src="/icon/icon_true_false_thpt.png" alt="Trắc nghiệm Đúng Sai THPT" className="size-12 rounded-lg mb-1" />
          Trắc nghiệm Đúng &minus; Sai (THPT)
        </button>
      </div>
    </Sheet>
  )
}

export default ChooseQuestionType;