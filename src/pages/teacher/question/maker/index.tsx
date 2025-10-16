import AppHeader from "@/components/header";
import { Box, Page, useParams } from "zmp-ui";
import { QuestionMakerMutipleChoice as MultipleChoice } from "@/components/teacher/question/maker/multiple-choice";
import { QuestionMakerTrueFalse as TrueFalse } from "@/components/teacher/question/maker/true-false";
import { QuestionMakerShortAnswer as ShortAnswer } from "@/components/teacher/question/maker/short-answer";
import { QuestionMakerFillInTheBlank as FillInTheBlank } from "@/components/teacher/question/maker/fill-in-the-blank";
import { QuestionMakerConstructedResponse as ConstructedResponse } from "@/components/teacher/question/maker/constructed-response";
import { QuestionMakerSorting as Sorting } from "@/components/teacher/question/maker/sorting";
import { QuestionMakerGroup as Group } from "@/components/teacher/question/maker/group";
import { QuestionMakerTrueFalseTHPT as TrueFalseTHPT } from "@/components/teacher/question/maker/true-false-thpt";
import { questionType } from "@/models/question";

function renderQuestionMaker(type, id) {
  switch (type) {
    case questionType[0].type: return <MultipleChoice id={id} />;
    case questionType[1].type: return <TrueFalse id={id} />;
    case questionType[2].type: return <ShortAnswer id={id} />;
    case questionType[3].type: return <FillInTheBlank id={id} />;
    case questionType[4].type: return <ConstructedResponse id={id} />;
    case questionType[5].type: return <Sorting id={id} />;
    case questionType[6].type: return <Group id={id} />;
    case questionType[7].type: return <TrueFalseTHPT id={id} />;
    default: return <>Hello World</>;
  }
}

export default function QuestionMaker() {
  const { type, id } = useParams();

  const title = (type === "group" ? "Thêm nhóm câu hỏi" : (type === "true-false-thpt" ? "Thêm câu hỏi Đúng – Sai (THPT)" : "Thêm câu hỏi"))

  return (
    <Page className="page page-wo-footer bg-white">
      <AppHeader title={title} showBackIcon />

      <Box className="pt-4">
        { renderQuestionMaker(type, id) }
      </Box>
    </Page>
  )
}