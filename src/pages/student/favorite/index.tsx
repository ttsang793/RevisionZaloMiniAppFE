import StudentHeader from "@/components/header";
import { Box, Page, Text } from "zmp-ui";
import ExamHolder from "@/components/student/exam/exam-holder";
import { useState, useEffect } from "react";
import { Exam } from "@/models/exam";
import { getFavorite } from "@/models/student";

export default function FavoritePage() {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {    
    getFavorite().then(response => {
      setExamList(response.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    })
  }

  useEffect(() => fetchData(), []);

  return loading ? (
    <Page className="flex z-1000 bg-white items-center justify-center">
      <Text size="large">Đang tải đề, chờ chút nhé!</Text>
    </Page>
  ) : (
    <Page className="page-x-0">
      <StudentHeader title="Đề thi yêu thích" />
      <Box className="flex gap-5 flex-wrap justify-center px-4">
      {
        loading ? <>Đang tải đề, chờ chút nhé!</>
                : examList.map((exam: Exam) => <ExamHolder exam={exam} id={exam.id} page="favorite" fetchData={fetchData} key={`exam-${exam.id}`} />)
      }
      </Box>
    </Page>
  );
}