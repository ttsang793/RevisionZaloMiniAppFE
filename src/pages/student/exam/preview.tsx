import { Calendar3, PersonFill, ClockFill, TrophyFill, ChatTextFill, Heart } from "react-bootstrap-icons"
import CommentBlock from "@/components/student/exam/comment";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Text, Page, Modal } from "zmp-ui";
import { useState, useEffect } from "react";
import AppHeader from "@/components/header";
import { Exam, getExamById } from "@/models/exam";

export default function TestPreviewPage() {
  const { id } = useParams();
  const [takeVisible, setTakeVisible] = useState(false);
  const navTo = useNavigate();

  const [examInfo, setExamInfo] = useState<Exam>(new Exam());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (id !== undefined) {
      getExamById(Number(id)).then(response => {
        setExamInfo(response.data);
        setLoading(false);
      })
    }
    else setLoading(false);
  }, []);

  return (
    <Page className="page page-wo-footer">
      <AppHeader title="Thông tin bài kiểm tra" showBackIcon />
      <div className="section-container">        
        <div className="flex gap-x-2">
          <div className="flex-1">             
            <Text.Title size="large">{examInfo.title} &minus; {examInfo.subjectName} {examInfo.grade}</Text.Title>
            <div>
              <div onClick={() => navTo("/student/teacher/1")} className="me-2 inline-block">
                <Avatar src="/avatar/default.jpg" size={24} className="me-1" />
                {examInfo.teacherName}
              </div>
              <button className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm">
                Theo dõi
              </button>
            </div>
          </div>

          <Heart className="zaui-text-blue-80" size={32} />
        </div>

        <hr />

        <div className="text-center">
          <button onClick={() => setTakeVisible(true)} className="zaui-bg-orange-60 text-white rounded-full py-1 px-4 text-sm me-1">
            Làm bài
          </button>
          <button onClick={() => navTo(`/student/exam/practice/${id}`)} className="zaui-bg-green-70 text-white rounded-full py-1 px-4 text-sm">
            Luyện tập
          </button>
        </div>
      </div>

      <ul className="section-container">
        <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
          <Calendar3 /><span><b>Ngày xuất bản: 01/08/2025</b></span>
        </li>
        <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
          <PersonFill /><span><b>Lượt làm bài:</b> 100 thí sinh</span>
        </li>
        <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
          <ClockFill /><span><b>Thời gian:</b> {examInfo.timeLimit / 60} phút | 3 phần | 22 câu hỏi</span>
        </li>
        <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
          <TrophyFill /><span><b>Điểm cao nhất:</b> 9,8 (70 phút 39 giây)</span>
        </li>
        <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
          <ChatTextFill /><span><b>Chủ đề:</b> Tính đơn điệu và cực trị của hàm số; Giá trị lớn nhất, giá trị nhỏ nhất của hàm số; Khảo sát và vẽ đồ thị của hàm số</span>
        </li>
      </ul>
      
      <CommentBlock id={id} />

      <Modal
        actions = {[
          {
            text: "Chờ chút",
            close: true,
            onClick: () => setTakeVisible(false)
          },
          {
            text: "Làm bài",
            close: true,
            highLight: true,
            onClick: () => handleTake()
          }
        ]}

        description={`Bạn sẽ cần dành ra ${examInfo.timeLimit / 60} phút cho bài thi này.`}
        title="Bạn đã sẵn sàng làm bài?"
        visible={takeVisible}
      />
    </Page>
  )

  function handleTake() {
    setTakeVisible(false);
    navTo(`/student/exam/take/${id}`);
  }
}