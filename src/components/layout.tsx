import { getSystemInfo } from "zmp-sdk";
import { AnimationRoutes, App, Route, SnackbarProvider, ZMPRouter } from "zmp-ui";
import { AppProps } from "zmp-ui/app";

import ChooseRolePage from "@/pages/first-time";

import HomePage from "@/pages/index";
import FavoritePage from "@/pages/favorite";
import StatisticPage from "@/pages/statistic";
import StudentFooter from "./student-footer";
import "@/css/app.scss"
import HistoryPage from "@/pages/history";
import SettingPage from "@/pages/setting";

import TestPreviewPage from "@/pages/test/preview";
import TeacherDetailPage from "@/pages/teacher-detail";
import TakeTestPage from "@/pages/test/take";

const Layout = () => {
  return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/first-time" element={<ChooseRolePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/statistic" element={<StatisticPage />} />
            <Route path="/setting" element={<SettingPage />} />

            <Route path="/test/preview/:id" element={<TestPreviewPage />} />
            <Route path="/teacher/:id" element={<TeacherDetailPage />} />
            <Route path="/test/take/:id" element={<TakeTestPage />} />
          </AnimationRoutes>
          <StudentFooter />
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default Layout;
