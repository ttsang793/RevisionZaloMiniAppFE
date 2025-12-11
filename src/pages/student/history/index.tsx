import StudentHeader from "@/components/header";
import { Box, Page, Text, Spinner, useSnackbar } from "zmp-ui";
import ExamHolder from "@/components/student/exam/exam-holder";
import { useState, useEffect, Fragment } from "react";
import { Exam } from "@/models/exam";
import { getHistory, updateAllowingSaveHistory, deleteAllHistories } from "@/models/student";
import { getStudentById } from "@/models/user";
import { ClockHistory } from "react-bootstrap-icons";
import { stringToDate } from "@/script/util";

export default function HistoryPage() {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allowSave, setAllowSave] = useState(true);
  const { openSnackbar } = useSnackbar();
  
  const fetchData = async () => {
    try {
      const response = await getHistory();
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
    getStudentById().then(response => setAllowSave(response.data.allowSaveHistory));
    fetchData();
  }, []);

  return (
    <Page className="page-x-0">
      <StudentHeader title="Lịch sử truy cập" />      
      {
        loading ? (
          <Box className="text-center bg-white p-4 mx-4 place-items-center">
            <Spinner />
            <Text className="mt-2 italic">Đang tải đề, chờ chút nhé!</Text>
          </Box> 
        ) : (
          <>
            <Box className="flex justify-end gap-x-2 mb-4 pe-4">
              <button className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={() => handleUploadAllowingSave()}>
                {allowSave ? "Tắt" : "Bật"} lưu lịch sử
              </button>

              <button className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={() => handleDeleteAll()}>
                Xóa lịch sử
              </button>
            </Box>
            {
              examList.length === 0 ? (
                <Box className="text-center bg-white p-4 m-4 italic place-items-center">
                  <ClockHistory size={54} className="text-gray-400" />
                  <Text className="mt-2 italic">Chưa có đề trong lịch sử, hãy truy cập vào 1 đề nhé!</Text>
                </Box>
              ) :  (
                <Box className="flex flex-col gap-4 px-4 pb-4">
                {
                  examList.map(ex => (
                    <Fragment key={`history-${ex.date}`}>
                      <Text className="zaui-text-blue-80 border-b pb-1 w-full zaui-border-blue-80" bold>Ngày {stringToDate(ex.date)}</Text>

                      {
                        ex.exams.map((exam: Exam) => <ExamHolder exam={exam} id={exam.historyId} page="history" fetchData={fetchData} key={`exam-${exam.historyId}`} />)
                      }
                    </Fragment>
                  ))
                }
                </Box>
              )
            }
          </>
        )
      }
    </Page>
  );

  function handleUploadAllowingSave() {
    openSnackbar({
      text: `Bạn có muốn ${allowSave ? "tắt" : "bật"} lưu lịch sử?`,
      type: "warning",
      action: {
        text: "Có",
        close: true,
        onClick: async () => {
          const response = await updateAllowingSaveHistory();

          if (response.status === 200) {
            openSnackbar({
              text: "Cập nhật thành công!",
              type: "success",
              duration: 1500
            });
            setAllowSave(!allowSave);
            fetchData();
          }
          else {
            openSnackbar({
              text: "Cập nhật thất bại!",
              type: "danger"
            });            
          }
        }
      },
      verticalAction: true,
      duration: 5000,
    })
  }

  function handleDeleteAll() {
    openSnackbar({
      text: "Bạn có muốn xóa toàn bộ lịch sử?",
      type: "warning",
      action: {
        text: "Có",
        close: true,
        onClick: async () => {
          const response = await deleteAllHistories();

          if (response.status === 200) {
            openSnackbar({
              text: "Xóa thành công!",
              type: "success",
              duration: 1500
            });
            fetchData();
          }
          else {
            openSnackbar({
              text: "Xóa thất bại!",
              type: "danger"
            });            
          }
        }
      },
      verticalAction: true,
      duration: 5000,
    })
  }
}