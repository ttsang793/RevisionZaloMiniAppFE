"use client"
import AppHeader from "@/components/header";
import TestHolder from "@/components/exam-holder"
import { Text, Page } from "zmp-ui";

export default function TeacherDetailPage() {
  return (
    <Page className="page-x-0">
      <AppHeader title="Trần Văn A" showBackIcon />
      <div className="flex gap-2 section-container">
        <img src="/avatar/default.jpg" className="size-[64px] rounded-full" />
        <div className="w-full">
          <Text className="italic text-justify">Chào các em, thầy là Trần Văn A, giáo viên Toán với hơn 10 năm kinh nghiệm. Thầy mong muốn giúp các em yêu thích và hiểu sâu môn Toán hơn.</Text>
          <hr />
          <div className="flex items-center gap-x-2">
            <Text>1,000 học sinh theo dõi</Text>
            <button className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm">
              Theo dõi
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-5 flex-wrap justify-center">
        <TestHolder />
        <TestHolder />
        <TestHolder />
        <TestHolder />
        <TestHolder />
        <TestHolder />
        <TestHolder />
        <TestHolder />
      </div>
    </Page>
  )
}