import { Calendar3, PersonFill, ClockFill, TrophyFill, ChatTextFill } from "react-bootstrap-icons"
import CommentBlock from "@/components/student/exam/comment";
import { useParams } from "react-router-dom";
import { Text, Page, Tabs } from "zmp-ui";
import { useState, useEffect } from "react";
import AppHeader from "@/components/header";
import { Exam, getExamById } from "@/models/exam";
import ExamMarking from "./marking";

export default function ExamDetail() {
  const { id, type } = useParams();
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

  return loading ? <></> : (
    <Page className="page page-wo-footer">
      <AppHeader title="Thông tin bài kiểm tra" showBackIcon />
      <Text.Title size="large" className="mb-2">
        {examInfo.title} &minus; {examInfo.subjectName} {examInfo.grade}
      </Text.Title>

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

      <Tabs>
        <Tabs.Tab label="Bình luận" key="comment">
          <CommentBlock id={id} />
        </Tabs.Tab>
        <Tabs.Tab label="Chấm điểm" key="marking">
          <ExamMarking id={id} />
        </Tabs.Tab>
      </Tabs>
    </Page>
  )
}