import AppHeader from "@/components/header";
import ExamHolder from "@/components/student/exam/exam-holder"
import { Text, Page, Box, Spinner, useParams } from "zmp-ui";
import { useState, useEffect } from 'react';
import { Teacher, getTeacherById } from "@/models/user";
import { Exam, getPublishExamsByTeacher } from "@/models/exam";
import { FollowButton } from "@/components/student/follow/follow-button";
import { Clipboard2X } from "react-bootstrap-icons";

export default function TeacherDetailPage() {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState<Teacher>(new Teacher());
  const { id } = useParams();

  useEffect(() => {
    getTeacherById(Number(id)).then(response => setTeacher(response.data));
    getPublishExamsByTeacher(Number(id)).then(response => {
      setExamList(response.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    })
  }, []);

  if (loading) return (
    <Page className="page page-wo-footer">
      <AppHeader title="Thông tin giáo viên" showBackIcon />

      <Box className="section-container text-center place-items-center">
        <Spinner />
        <Text className="mt-2 italic">Đang tải thông tin...</Text>
      </Box>
    </Page>
  )

  return (
    <Page className="page">
      <AppHeader title={teacher.name} showBackIcon />
      <Box className="flex gap-2 section-container">
        <img src={teacher.avatar} className="size-[64px] rounded-full" />
        <Box className="w-full">
          <Text className="italic text-justify">{teacher.introduction}</Text>
          <hr />
          <Box className="flex items-center gap-x-2">
            <FollowButton teacherId={teacher.id} />
          </Box>
        </Box>
      </Box>
      
      <Box className="flex gap-3 flex-wrap p-4 bg-white">
        <Text.Title className="zaui-text-blue-80 border-b pb-1 w-full zaui-border-blue-80">Danh sách đề thi</Text.Title>
        {
          examList.length === 0 ? (
            <Box className="text-center bg-white p-4 italic place-items-center">
              <Clipboard2X size={48} className="text-gray-400" />
              <Text className="mt-2 italic">Hiện tại chưa có đề, hãy quay lại khi giáo viên xuất bản đề nhé!</Text>
            </Box>
          ) :
          examList.map((exam: Exam) => <ExamHolder exam={exam} key={`exam-${exam.id}`} />)
        }
      </Box>
    </Page>
  )
}