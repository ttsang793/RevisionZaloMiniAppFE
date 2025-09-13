import TestHolder from "@/components/test-holder";
import { Page } from "zmp-ui";
import StudentHeader from "@/components/student-header";
import StudentFooter from "@/components/student-footer";

export default function FavoritePage() {
  return (
    <Page className="page">
      <StudentHeader title="Yêu thích" />
      
      <div className="flex gap-5 flex-wrap justify-center">
        <TestHolder latest="" />
        <TestHolder />
        <TestHolder />
        <TestHolder />
        <TestHolder />
        <TestHolder />
      </div>
    </Page>
  )
}