import TestHolder from "@/components/test-holder";
import { Page } from "zmp-ui";
import AppHeader from "@/components/header";
import StudentFooter from "@/components/student-footer";

export default function FavoritePage() {
  return (
    <Page className="page">
      <AppHeader title="Yêu thích" />
      
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