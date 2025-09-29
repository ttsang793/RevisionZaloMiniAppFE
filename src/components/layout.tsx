import { getSystemInfo } from "zmp-sdk";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { App, SnackbarProvider, ZMPRouter } from "zmp-ui";
import { AppProps } from "zmp-ui/app";
import "@/css/app.scss";

// Pages
import ChooseRolePage from "@/pages";

// Student
import HomePage from "@/pages/student/index";
import FavoritePage from "@/pages/student/favorite";
import StatisticPage from "@/pages/student/statistic";
import StudentFooter from "./student-footer";
import HistoryPage from "@/pages/student/history";
import StudentSettingPage from "@/pages/student/setting";
import TestPreviewPage from "@/pages/student/test/preview";
import TeacherDetailPage from "@/pages/student/teacher-detail";
import TakeTestPage from "@/pages/student/test/take";

// Teacher
import TeacherFooter from "./teacher-footer";
import QuestionManagement from "@/pages/teacher/question";
import ExamManagement from "@/pages/teacher/exam";
import GradeManagement from "@/pages/teacher/grade";
import TeacherSettingPage from "@/pages/teacher/setting";
import TeacherRegisterPage from "@/pages/teacher/register";

// Admin
import SubjectManagement from "@/pages/admin/subject";
import TopicManagement from "@/pages/admin/topic";


// Inline layout wrappers
const TeacherLayout = () => (
  <>
    <Outlet />
    <TeacherFooter />
  </>
);

const StudentLayout = () => (
  <>
    <Outlet />
    <StudentFooter />
  </>
);

const AdminLayout = () => (
  <>
    <Outlet />
  </>
);

const TestLayout = () => <Outlet />

const Layout = () => {
  return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <SnackbarProvider>
        <ZMPRouter>
          <Routes>
            {/* Default route */}
            <Route path="/" element={<ChooseRolePage />} />
            <Route path="/register/teacher" element={<TeacherRegisterPage />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/subject" replace />} />
              <Route path="subject" element={<SubjectManagement />} />
              <Route path="topic" element={<TopicManagement />} />
            </Route>

            {/* Teacher routes */}
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route index element={<Navigate to="/teacher/question" replace />} />
              <Route path="question" element={<QuestionManagement />} />
              <Route path="exam" element={<ExamManagement />} />
              <Route path="grade" element={<GradeManagement />} />
              <Route path="setting" element={<TeacherSettingPage />} />
            </Route>

            {/* Student routes */}
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<HomePage />} />
              <Route path="favorite" element={<FavoritePage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="statistic" element={<StatisticPage />} />
              <Route path="setting" element={<StudentSettingPage />} />
              <Route path="teacher/:id" element={<TeacherDetailPage />} />
            </Route>

            {/* Test routes */}
            <Route path="/student/test" element={<TestLayout />}>
              <Route path="preview/:id" element={<TestPreviewPage />} />
              <Route path="take/:id" element={<TakeTestPage />} />
              <Route path="practice/:id" element={<TakeTestPage />} />              
            </Route>
          </Routes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};

export default Layout;