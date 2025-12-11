import { Calendar3, PersonFill, ClockFill, TrophyFill, ChatTextFill } from "react-bootstrap-icons"
import CommentBlock from "@/components/student/exam/comment";
import { Avatar, Box, Text, Page, Modal, useNavigate, useParams, Spinner } from "zmp-ui";
import { useState, useEffect } from "react";
import AppHeader from "@/components/header";
import { Exam, ExamDetail, ExamRecord, getExamById, getExamRecordById, getExamDetailById } from "@/models/exam";
import { handleHistory } from "@/models/student";
import { stringToDate, floatTwoDigits, parseMinutesAndSeconds } from "@/script/util";
import { FavoriteIcon } from "@/components/student/exam/favorite";
import { FollowButton } from "@/components/student/follow/follow-button";

export default function TestPreviewPage() {
  const { id } = useParams();
  const [takeVisible, setTakeVisible] = useState(false);
  const navTo = useNavigate();

  const [examInfo, setExamInfo] = useState<Exam>(new Exam());
  const [record, setRecord] = useState<ExamRecord>(new ExamRecord());
  const [detail, setDetail] = useState<ExamDetail>(new ExamDetail());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return (
    <Page className="page page-wo-footer">
      <AppHeader title="Thông tin bài kiểm tra" showBackIcon />

      <Box className="section-container text-center place-items-center">
        <Spinner />
        <Text className="mt-2 italic">Đang tải thông tin...</Text>
      </Box>
    </Page>
  )

  return (
    <Page className="page page-wo-footer">
      <AppHeader title="Thông tin bài kiểm tra" showBackIcon />

      <Box className="section-container">        
        <Box className="flex gap-x-2">
          <Box className="flex-1">             
            <Text.Title size="large">{examInfo.title} &minus; {examInfo.subjectName} {examInfo.grade}</Text.Title>
            <Box className="mt-1">
              <Box
                onClick={() => navTo(`/student/teacher/${examInfo.teacherId}`)}
                className="me-2 inline-block"
              >
                <Avatar src={examInfo.teacherAvatar} size={24} className="me-1" />
                {examInfo.teacherName}
              </Box>
              <FollowButton teacherId={examInfo.teacherId} />
            </Box>
          </Box>

          <FavoriteIcon examId={examInfo.id!} size={32} />
        </Box>

        <hr />

        <Box className="text-center">
          <button onClick={() => setTakeVisible(true)} className="zaui-bg-orange-60 text-white rounded-full py-1 px-4 text-sm me-1">
            Làm bài
          </button>
          <button onClick={() => navTo(`/student/exam/practice/${id}`)} className="zaui-bg-green-70 text-white rounded-full py-1 px-4 text-sm">
            Luyện tập
          </button>
        </Box>
      </Box>

      <ul className="section-container">
        <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
          <Calendar3 /><span><b>Ngày xuất bản: {stringToDate(examInfo.publishedAt.toString())}</b></span>
        </li>
        <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
          <PersonFill /><span><b>Lượt làm bài:</b> {record.count} lượt</span>
        </li>
        <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
          <ClockFill /><span><b>Thời gian:</b> {examInfo.timeLimit / 60} phút | {detail.partCount} phần | {detail.questionCount} câu hỏi</span>
        </li>
        {
          (!record.maxTotalPoint) ? <></> : (
            <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
              <TrophyFill /><span><b>Điểm cao nhất:</b> {floatTwoDigits(record.maxTotalPoint)} ({parseMinutesAndSeconds(record.duration)})</span>
            </li>
          )
        }
        {
          (!detail.topics) ? <></> : (
            <li className="grid grid-cols-[16px_1fr] gap-x-2 text-justify py-0.5">
              <ChatTextFill /><span><b>Chủ đề:</b> {detail.topics.join("; ")}</span>
            </li>
          )
        }
      </ul>
      
      <CommentBlock id={id} title={examInfo.title} />

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

  async function fetchData() {
    setLoading(true);
    if (id !== undefined) {
      const examId = Number(id);
      handleHistory(examId);
      
      const examResponse = await getExamById(examId);
      setExamInfo(examResponse.data);
      
      const detailResponse = await getExamDetailById(examId);
      setDetail(detailResponse.data);

      const recordResponse = await getExamRecordById(examId);
      setRecord(recordResponse.data);
    }
    setLoading(false);
  }

  function handleTake() {
    setTakeVisible(false);
    if (examInfo.displayType === "pdf") navTo(`/student/exam/pdf/take/${id}`);
    else navTo(`/student/exam/take/${id}`);
  }
}