import StudentHeader from "@/components/header";
import { Box, Page, Text } from "zmp-ui";
import ExamHolder from "@/components/student/exam/exam-holder";
import { useState, useEffect } from "react";
import { Exam, getAllExams } from "@/models/exam";


function HomePage() {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllExams().then(response => {
      setExamList(response.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    })
  }, []);

  return loading ? (
    <Page className="flex z-1000 bg-white items-center justify-center">
      <Text size="large">Đang tải đề, chờ chút nhé!</Text>
    </Page>
  ) : (
    <Page className="page-x-0">
      <StudentHeader />
      <Box className="flex gap-5 flex-wrap justify-center">
      {
        loading ? <>Cho 1 chut</> : examList.map((exam: Exam) => <ExamHolder exam={exam} key={`exam-${exam.id}`} />)
      }
      </Box>
    </Page>
  );
}

export default HomePage;
