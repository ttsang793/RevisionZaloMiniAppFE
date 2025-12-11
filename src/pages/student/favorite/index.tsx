import StudentHeader from "@/components/header";
import { Box, Page, Spinner, Text } from "zmp-ui";
import ExamHolder from "@/components/student/exam/exam-holder";
import { useState, useEffect } from "react";
import { Exam } from "@/models/exam";
import { getFavorite } from "@/models/student";
import { Heartbreak } from "react-bootstrap-icons";

export default function FavoritePage() {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getFavorite();
      setExamList(response.data);
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <Page className="page-x-0">
      <StudentHeader title="Đề thi yêu thích" />
      {
        loading ? (
          <Box className="text-center bg-white p-4 mx-4 place-items-center">
            <Spinner />
            <Text className="mt-2 italic">Đang tải đề, chờ chút nhé!</Text>
          </Box> 
        ) : (
          examList.length === 0 ? (
            <Box className="text-center bg-white p-4 mx-4 italic place-items-center">
              <Heartbreak size={54} className="text-gray-400" />
              <Text className="mt-2 italic">Chưa có đề yêu thích, hãy yêu thích ít nhất 1 đề nhé!</Text>
            </Box>
          ) :  (
            <Box className="flex gap-5 flex-wrap justify-center px-4">
            {
              examList.map((exam: Exam) => <ExamHolder exam={exam} id={exam.id} page="favorite" fetchData={fetchData} key={`exam-${exam.id}`} />)
            }
            </Box>
          )
        )
      }
    </Page>
  );
}