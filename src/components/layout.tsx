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
import StudentFooter from "./student/footer";
import HistoryPage from "@/pages/student/history";
import StudentSettingPage from "@/pages/student/setting";
import ExamPreviewPage from "@/pages/student/exam/preview";
import TeacherDetailPage from "@/pages/student/teacher-detail";
import TakeExamPage from "@/pages/student/exam/take";
import ExamResultPage from "@/pages/student/exam/result";
import TakePDFExamPage from "@/pages/student/exam/pdf-take";
import PDFExamResultPage from "@/pages/student/exam/pdf-result";

// Teacher
import TeacherFooter from "./teacher/footer";
import QuestionManagement from "@/pages/teacher/question";
import QuestionMaker from "@/pages/teacher/question/maker";
import QuestionImportWord from "@/pages/teacher/question/import-word";
import ExamMaker from "@/pages/teacher/exam/maker";
import ExamQuestions from "@/pages/teacher/exam/maker/Exam";
import PDFExamQuestions from "@/pages/teacher/exam/maker/PDF-exam";
import ExamManagement from "@/pages/teacher/exam";
import GradeManagement from "@/pages/teacher/grade";
import TeacherSettingPage from "@/pages/teacher/setting";
import TeacherRegisterPage from "@/pages/teacher/register";

// Admin
import AdminLoginPage from "@/pages/admin/login";
import SubjectManagement from "@/pages/admin/subject";
import TopicManagement from "@/pages/admin/topic";
import { AdminFooter, AdminHeader } from "./admin/head-foot";

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
    <AdminHeader />
    <Outlet />
    <AdminFooter />
  </>
);

const NoFooter = () => <Outlet />

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
              <Route path="login" element={<AdminLoginPage />} />
            </Route>

            {/* Teacher routes */}
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route index element={<Navigate to="/teacher/question" replace />} />
              <Route path="question">
                <Route index element={<QuestionManagement />} />
                <Route path="maker/:type/" element={<QuestionMaker />} />
                <Route path="maker/:type/:id" element={<QuestionMaker />} />
                <Route path="word" element={<QuestionImportWord />} />
                <Route path="edit/:id" element={<QuestionMaker />} />
              </Route>
              <Route path="exam">
                <Route index element={<ExamManagement />} />
                <Route path="maker" element={<ExamMaker />} />
                <Route path="maker/:type" element={<ExamMaker />} />
                <Route path="maker/:type/:id" element={<ExamMaker />} />
                <Route path="question/:id" element={<ExamQuestions />} />
                <Route path="question/pdf/:id" element={<PDFExamQuestions />} />
              </Route>
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
            <Route path="/student/exam" element={<NoFooter />}>
              <Route path="preview/:id" element={<ExamPreviewPage />} />
              <Route path="take/:id" element={<TakeExamPage practice={false} />} />
              <Route path="practice/:id" element={<TakeExamPage practice />} />
              <Route path="result/:id" element={<ExamResultPage />} />
              <Route path="pdf/take/:id" element={<TakePDFExamPage practice={false} />} />
              <Route path="pdf/practice/:id" element={<TakePDFExamPage practice />} />
              <Route path="pdf/result/:id" element={<PDFExamResultPage />} />
            </Route>
          </Routes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};

export default Layout;