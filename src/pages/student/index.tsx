import StudentHeader from "@/components/header";
import { Box, Page, Text, Spinner } from "zmp-ui";
import ExamHolder from "@/components/student/exam/exam-holder";
import { useState, useEffect } from "react";
import { Exam, getPublishExams, HomeFilter as Filter } from "@/models/exam";
import { Clipboard2X, Funnel } from "react-bootstrap-icons";
import HomeFilter from "@/components/student/filter";

function HomePage() {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<Filter>(new Filter())

  const fetchData = async (f: (Filter | null) = null) => {
    try {
      const response = await getPublishExams(f);
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
    fetchData(null);
  }, []);

  return (
    <Page className="page-x-0">
      <StudentHeader />
      {
        loading ? (
          <Box className="text-center bg-white p-4 mx-4 place-items-center">
            <Spinner />
            <Text className="mt-2 italic">Đang tải đề, chờ chút nhé!</Text>
          </Box> 
        ) : (
          <>
            <Box className="flex justify-end gap-x-2 px-4">
              <button className="zaui-bg-blue-80 text-white rounded-full py-2 px-6 mb-4" onClick={() => setVisible(true)}>
                <Funnel className="inline me-2" size={20} /> Lọc
              </button>
            </Box>
            {
              examList.length === 0 ? (
                <Box className="text-center bg-white p-4 mx-4 italic place-items-center">
                  <Clipboard2X size={54} className="text-gray-400" />
                  <Text className="mt-2 italic">Hiện tại chưa có đề, hãy quay lại khi giáo viên xuất bản đề nhé!</Text>
                </Box>
              ) : (
                <Box className="flex gap-5 flex-wrap justify-center px-4">
                {
                  examList.map((exam: Exam) => <ExamHolder exam={exam} key={`exam-${exam.id}`} />)
                }
                </Box>
              )
            }
          </>
        )
      }

      <HomeFilter
        visible={visible} setVisible={setVisible}
        filter={filter} setFilter={setFilter}
        fetchData={fetchData}
      />
    </Page>
  );
}

export default HomePage;
