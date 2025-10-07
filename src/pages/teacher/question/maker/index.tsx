import AppHeader from "@/components/header";
import { Box, Page, useParams } from "zmp-ui";
import { QuestionMakerMutipleChoice as MultipleChoice } from "@/components/teacher/question/maker/multiple-choice";
import { QuestionMakerTrueFalse as TrueFalse } from "@/components/teacher/question/maker/true-false";
import { QuestionMakerShortAnswer as ShortAnswer } from "@/components/teacher/question/maker/short-answer";
import { QuestionMakerFillInTheBlank as FillInTheBlank } from "@/components/teacher/question/maker/fill-in-the-blank";
import { QuestionMakerConstructedResponse as ConstructedResponse } from "@/components/teacher/question/maker/constructed-response";
import { QuestionMakerSorting as Sorting } from "@/components/teacher/question/maker/sorting";

const questionType = ["multiple-choice", "true-false", "short-answer", "fill-in-the-blank", "constructed-response", "sorting"]

function renderQuestionMaker(type, id) {
  switch (type) {
    case questionType[0]: return <MultipleChoice id={id} />;
    case questionType[1]: return <TrueFalse id={id} />;
    case questionType[2]: return <ShortAnswer id={id} />;
    case questionType[3]: return <FillInTheBlank id={id} />;
    case questionType[4]: return <ConstructedResponse id={id} />;
    case questionType[5]: return <Sorting id={id} />;
    default: return <>Hello World</>;
  }
}

export default function QuestionMaker() {
  const { type, id } = useParams();

  return (
    <Page className="page page-wo-footer bg-white">
      <AppHeader title="Thêm câu hỏi" showBackIcon />

      <Box className="pt-4">
        { renderQuestionMaker(type, id) }
      </Box>
    </Page>
  )
}