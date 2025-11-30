import StudentHeader from "@/components/header";
import { Box, Page, Text, useSnackbar } from "zmp-ui";
import ExamHolder from "@/components/student/exam/exam-holder";
import { useState, useEffect } from "react";
import { Exam } from "@/models/exam";
import { getHistory, updateAllowingSaveHistory, deleteAllHistories } from "@/models/student";
import { getStudentById } from "@/models/user";

export default function HistoryPage() {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allowSave, setAllowSave] = useState(true);
  const { openSnackbar } = useSnackbar();
  const fetchData = () => {
    getHistory().then(response => {
      setExamList(response.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    })
  }

  useEffect(() => {
    getStudentById().then(response => setAllowSave(response.data.allowSaveHistory));
    fetchData();
  }, []);

  return (
    <Page className="page-x-0">
      <StudentHeader title="Lịch sử truy cập" />

      <Box className="flex justify-end gap-x-2 px-2 mb-2">
        <button className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={() => handleUploadAllowingSave()}>
          {allowSave ? "Tắt" : "Bật"} lưu lịch sử
        </button>

        <button className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={() => handleDeleteAll()}>
          Xóa lịch sử
        </button>
      </Box>


      <Box className="flex gap-5 flex-wrap justify-center">
      {
        loading ? <>Đang tải đề, chờ chút nhé!</>
                : examList.map((exam: Exam) => <ExamHolder exam={exam} latest="21/10/2025" id={exam.historyId} page="history" fetchData={fetchData} key={`exam-${exam.historyId}`} />)
      }
      </Box>
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