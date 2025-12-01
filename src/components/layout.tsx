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
import ExamMarking from "@/pages/teacher/exam/detail/marking";
import TeacherSettingPage from "@/pages/teacher/setting";
import TeacherRegisterPage from "@/pages/teacher/register";

// Admin
import AdminLoginPage from "@/pages/admin/login";
import SubjectManagement from "@/pages/admin/subject";
import TopicManagement from "@/pages/admin/topic";
import AdminResetPasswordPage from "@/pages/admin/reset-password";
import { AdminFooter, AdminHeader } from "./admin/head-foot";

// Error
import Error403 from "@/pages/errors/403";
import Error404 from "@/pages/errors/404";
import Error500 from "@/pages/errors/500";
import StudentRegisterPage from "@/pages/student/register";
import ExamDetail from "@/pages/teacher/exam/detail";

const role = sessionStorage.getItem("role") || null;

// Inline layout wrappers
const TeacherLayout = () => {
  if (role === "AD") return <Navigate to="/admin" replace />
  return (
    <>
      <Outlet />
      <TeacherFooter />
    </>
  );
}

const StudentLayout = () => {
  if (role === "AD") return <Navigate to="/admin" replace />
  return (
    <>
      <Outlet />
      <StudentFooter />
    </>
  );
}

const AdminLayout = () => (
  <>
    <AdminHeader />
    <Outlet />
    <AdminFooter />
  </>
)

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
            <Route path="/register/student" element={<StudentRegisterPage />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminLoginPage />} />
              <Route path="subject" element={<SubjectManagement />} />
              <Route path="topic" element={<TopicManagement />} />
              <Route path="reset-password" element={<AdminResetPasswordPage />} />
              <Route path="*" element={<Navigate to="/admin" />} />
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
                <Route path="detail/:id/:type" element={<ExamDetail />} />
                <Route path="marking/:examId/:examAttemptId" element={<ExamMarking />} />
              </Route>
              <Route path="setting" element={<TeacherSettingPage />} />
              <Route path="*" element={<Navigate to="/teacher" />} />
            </Route>

            {/* Student routes */}
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<HomePage />} />
              <Route path="favorite" element={<FavoritePage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="statistic" element={<StatisticPage />} />
              <Route path="setting" element={<StudentSettingPage />} />
              <Route path="teacher/:id" element={<TeacherDetailPage />} />
              <Route path="*" element={<Navigate to="/student" />} />
            </Route>

            {/* Exam routes */}
            <Route path="/student/exam" element={<NoFooter />}>
              <Route path="preview/:id" element={<ExamPreviewPage />} />
              <Route path="take/:id" element={<TakeExamPage practice={false} />} />
              <Route path="practice/:id" element={<TakeExamPage practice />} />
              <Route path="result/:id" element={<ExamResultPage />} />
              <Route path="pdf/take/:id" element={<TakePDFExamPage practice={false} />} />
              <Route path="pdf/practice/:id" element={<TakePDFExamPage practice />} />
              <Route path="pdf/result/:id" element={<PDFExamResultPage />} />
              <Route path="*" element={<Navigate to="/student" />} />
            </Route>

            {/* Error routes */}
            <Route path="/403" element={<Error403 />} />
            <Route path="/404" element={<Error404 />} />
            <Route path="/500" element={<Error500 />} />
          </Routes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};

export default Layout;