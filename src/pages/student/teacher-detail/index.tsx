import AppHeader from "@/components/header";
import ExamHolder from "@/components/student/exam/exam-holder"
import { Text, Page, Box } from "zmp-ui";
import { useState, useEffect } from 'react';
import { Teacher, getTeacherById } from "@/models/user";
import { Exam, getExamsByTeacher } from "@/models/exam";
import { handleFollowing } from "@/models/student";

export default function TeacherDetailPage() {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState<Teacher>(new Teacher());

  useEffect(() => {
    getTeacherById().then(response => setTeacher(response.data));
    getExamsByTeacher().then(response => {
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
        <img src="/avatar/default.jpg" className="size-[64px] rounded-full" />
        <Box className="w-full">
          <Text className="italic text-justify">{teacher.introduction}</Text>
          <hr />
          <Box className="flex items-center gap-x-2">
            <Text>1,000 học sinh theo dõi</Text>
            <button
              className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm"
              onClick={() => handleFollowing(teacher.id!)}
            >
              Theo dõi
            </button>
          </Box>
        </Box>
      </Box>

      
      <Box className="flex gap-5 flex-wrap justify-center">
      {
        loading ? <>Cho 1 chut</> : examList.map((exam: Exam) => <ExamHolder exam={exam} key={`exam-${exam.id}`} />)
      }
      </Box>
    </Page>
  )
}