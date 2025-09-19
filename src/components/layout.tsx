import { getSystemInfo } from "zmp-sdk";
import { AnimationRoutes, App, Route, SnackbarProvider, ZMPRouter } from "zmp-ui";
import { AppProps } from "zmp-ui/app";

import ChooseRolePage from "@/pages";

import HomePage from "@/pages/student/index";
import FavoritePage from "@/pages/student/favorite";
import StatisticPage from "@/pages/student/statistic";
import StudentFooter from "./student-footer";
import "@/css/app.scss"
import HistoryPage from "@/pages/student/history";
import SettingPage from "@/pages/student/setting";

import TestPreviewPage from "@/pages/student/test/preview";
import TeacherDetailPage from "@/pages/student/teacher-detail";
import TakeTestPage from "@/pages/student/test/take";

import AdminHomePage from "@/pages/admin";
import SubjectManagement from "@/pages/admin/subject";
import TopicManagement from "@/pages/admin/topic";

const Layout = () => {
  if (location.pathname.startsWith("/admin")) {
    return (
      <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/admin">
                <Route path="" element={<AdminHomePage />} />
                <Route path="subject" element={<SubjectManagement />} />
                <Route path="topic" element={<TopicManagement />} />
              </Route>
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    )
  }

  else if (location.pathname.startsWith("/student")) {
    return (
      <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/student">
                <Route path="" element={<HomePage />} />
                <Route path="favorite" element={<FavoritePage />} />
                <Route path="history" element={<HistoryPage />} />
                <Route path="statistic" element={<StatisticPage />} />
                <Route path="setting" element={<SettingPage />} />

                <Route path="test/preview/:id" element={<TestPreviewPage />} />
                <Route path="teacher/:id" element={<TeacherDetailPage />} />
                <Route path="test/take/:id" element={<TakeTestPage />} />
              </Route>
            </AnimationRoutes>
            <StudentFooter />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    )
  }

  else return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<ChooseRolePage />} />
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  )
};
export default Layout;
