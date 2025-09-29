import { CardChecklist, Gear, GearFill, PatchQuestion, PatchQuestionFill, Postcard, PostcardFill } from "react-bootstrap-icons"
import { BottomNavigation } from "zmp-ui";

export default function TeacherFooter() {
  return (
    <BottomNavigation fixed>
      <BottomNavigation.Item
        icon={<PatchQuestion />}
        activeIcon={<PatchQuestionFill />}
        key="question"
        label="Câu hỏi"
        linkTo="/teacher/question"
      />
      <BottomNavigation.Item
        icon={<Postcard />}
        activeIcon={<PostcardFill />}
        key="exam"
        label="Đề thi"
        linkTo="/teacher/exam"
      />
      <BottomNavigation.Item
        icon={<CardChecklist />}
        key="grade"
        label="Nhận xét"
        linkTo="/teacher/grade"
      />
      <BottomNavigation.Item
        icon={<Gear />}
        activeIcon={<GearFill />}
        key="setting"
        label="Cài đặt"
        linkTo="/teacher/setting"
      />
    </BottomNavigation>
  )
}