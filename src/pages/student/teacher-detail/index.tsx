import AppHeader from "@/components/header";
import ExamHolder from "@/components/student/exam/exam-holder"
import { Text, Page, Box, useParams } from "zmp-ui";
import { useState, useEffect } from 'react';
import { Teacher, getTeacherById } from "@/models/user";
import { Exam, getPublishExamsByTeacher } from "@/models/exam";
import { FollowButton } from "@/components/student/follow/follow-button";

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

  return (
    <Page className="page-x-0">
      <AppHeader title={teacher.name} showBackIcon />
      <Box className="flex gap-2 section-container">
        <img src={teacher.avatar} className="size-[64px] rounded-full" />
        <Box className="w-full">
          <Text className="italic text-justify">{teacher.introduction}</Text>
          <hr />
          <Box className="flex items-center gap-x-2">
            <Text>1,000 học sinh theo dõi</Text>
            <FollowButton teacherId={teacher.id} />
          </Box>
        </Box>
      </Box>

      
      <Box className="flex gap-5 flex-wrap p-4 bg-white">
        <Text.Title className="zaui-text-blue-80 border-b w-full zaui-border-blue-80">Danh sách đề thi</Text.Title>
        {
          loading ? <>Cho 1 chut</> : examList.map((exam: Exam) => <ExamHolder exam={exam} key={`exam-${exam.id}`} />)
        }
      </Box>
    </Page>
  )
}