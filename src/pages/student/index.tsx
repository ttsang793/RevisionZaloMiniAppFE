import StudentFooter from "@/components/student-footer";
import StudentHeader from "@/components/header";
import { Box, Button, Icon, Page, Text } from "zmp-ui";
import TestHolder from "@/components/test-holder";

function HomePage() {
  return (
    <Page className="page">
      <StudentHeader />
      <div className="flex gap-5 flex-wrap justify-center">
        <TestHolder />
        <TestHolder latest="" />
        <TestHolder />
        <TestHolder />
        <TestHolder />
        <TestHolder />
      </div>
      <StudentFooter />
    </Page>
  );
}

export default HomePage;
