import { Calendar3, PersonFill, ClockFill, TrophyFill, ChatTextFill } from "react-bootstrap-icons"
import CommentBlock from "@/components/student/exam/comment";
import { useParams } from "react-router-dom";
import { Text, Page, Tabs } from "zmp-ui";
import { useState, useEffect } from "react";
import AppHeader from "@/components/header";
import { Exam, ExamAttemptsRecord, getExamById, getExamAttemptsRecordByExamId, getExamTopicsByExamId } from "@/models/exam";
import { stringToDate, floatTwoDigits, parseMinutesAndSeconds } from "@/script/util";
import ExamMarking from "./marking-list";

export default function ExamDetail() {
  const { id, type } = useParams();
  const [examInfo, setExamInfo] = useState<Exam>(new Exam());
  const [loading, setLoading] = useState(true);
  const [examAttemptsRecord, setExamAttemptsRecord] = useState<ExamAttemptsRecord>(new ExamAttemptsRecord());
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? <></> : (
    <Page className="page page-wo-footer">
      <AppHeader title="Thông tin bài kiểm tra" showBackIcon />
      <Text.Title size="large" className="mb-2">
        {examInfo.title} &minus; {examInfo.subjectName} {examInfo.grade}
      </Text.Title>

      <ul className="section-container">
        <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
          <Calendar3 /><span><b>Ngày xuất bản: {stringToDate(examInfo.publishedAt.toString())}</b></span>
        </li>
        <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
          <PersonFill /><span><b>Lượt làm bài:</b> {examAttemptsRecord.count} lượt</span>
        </li>
        <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
          <ClockFill /><span><b>Thời gian:</b> {examInfo.timeLimit / 60} phút | 3 phần | 22 câu hỏi</span>
        </li>
        {
          (!examAttemptsRecord.maxTotalPoint) ? <></> : (
            <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
              <TrophyFill /><span><b>Điểm cao nhất:</b> {floatTwoDigits(examAttemptsRecord.maxTotalPoint)} ({parseMinutesAndSeconds(examAttemptsRecord.duration!)})</span>
            </li>
          )
        }
        {
          (topic.length === 0) ? <></> : (
            <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
              <ChatTextFill /><span><b>Chủ đề:</b> {topic.join(";")}</span>
            </li>
          )
        }
      </ul>

      <Tabs defaultActiveKey={type}>
        <Tabs.Tab label="Bình luận" key="comment">
          <CommentBlock id={id} />
        </Tabs.Tab>
        <Tabs.Tab label="Chấm điểm" key="marking">
          <ExamMarking id={id} />
        </Tabs.Tab>
      </Tabs>
    </Page>
  )

  async function fetchData() {
    setLoading(true);
    if (id !== undefined) {
      const examId = Number(id);      
      const examResponse = await getExamById(examId);
      setExamInfo(examResponse.data);
      
      const topicResponse = await getExamTopicsByExamId(examId);
      setTopic(topicResponse.data);

      const earResponse = await getExamAttemptsRecordByExamId(examId);
      setExamAttemptsRecord(earResponse.data);
    }
    setLoading(false);
  }
}