import { Heart } from "react-bootstrap-icons";
import { useNavigate } from "zmp-ui";

const TestHolder = ({ latest = "28/09/2025" }) => {
  const navTo = useNavigate();
  
  return (
    <div className="bg-white rounded-md p-2 text-left inline-block w-full">
      <h1 className="font-bold">Ôn tập KTTX lần 1 - Toán 12</h1>
      <div className="grid grid-cols-[1fr_24px] gap-5 ">
        <div className="grid grid-cols-[24px_1fr] gap-x-2">
          <img src="/avatar/default.jpg" alt="avatar" className="size-6 rounded-full" />

          <ul className="text-xs">
            <li>Giáo viên: Trần Văn A</li>
            <li>Môn: Toán 12</li>
            <li>Thời gian: 90 phút</li>
            {
              latest.length > 0 ? <li>Ngày làm bài gần nhất: {latest}</li> : <></>
            }
          </ul>
        </div>

        <Heart size={24} />
      </div>

      <div className="flex gap-x-1 mt-2 justify-center">
        {
          latest.length > 0 ? (
            <>
              <button 
                className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm"
                onClick={() => {}}
              >
                Xem kết quả</button>
              <button 
                className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm"
                onClick={() => navTo("/student/test/preview/1")}
              >
                Làm lại bài</button>
            </>
          ) : (
            <button 
              className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm"
              onClick={() => navTo("/student/test/preview/1")}
            >
              Làm bài</button>
          )
        }
      </div>
    </div>
  )
}

export default TestHolder;