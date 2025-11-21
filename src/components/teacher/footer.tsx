import { CardChecklist, Gear, GearFill, PatchQuestion, PatchQuestionFill, Postcard, PostcardFill } from "react-bootstrap-icons"
import { BottomNavigation, useLocation } from "zmp-ui";

function checkIfNoFooter() {
  const pathname = useLocation().pathname.substring(1);
  const pathnameArray = pathname.split("/");
  
  if (pathnameArray[pathnameArray.length - 1] === "") pathnameArray.splice(pathnameArray.length - 1, 1);
  return pathnameArray.length !== 2;
}

export default function TeacherFooter() {
  return (
    <BottomNavigation fixed className={checkIfNoFooter() ? "hidden" : ""}>
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
        icon={<Gear />}
        activeIcon={<GearFill />}
        key="setting"
        label="Cài đặt"
        linkTo="/teacher/setting"
      />
    </BottomNavigation>
  )
}