import AppHeader from "@/components/header";
import { Box, Page, useParams, useNavigate } from "zmp-ui";
import { QuestionMakerMutipleChoice as MultipleChoice } from "@/components/teacher/question/maker/multiple-choice";
import { QuestionMakerTrueFalse as TrueFalse } from "@/components/teacher/question/maker/true-false";
import { QuestionMakerShortAnswer as ShortAnswer } from "@/components/teacher/question/maker/short-answer";
import { QuestionMakerGapFill as GapFill } from "@/components/teacher/question/maker/gap-fill";
import { QuestionMakerGapFillMultiple as GapFillMultiple } from "@/components/teacher/question/maker/gap-fill-multiple";
import { QuestionMakerConstructedResponse as ConstructedResponse } from "@/components/teacher/question/maker/constructed-response";
import { QuestionMakerSorting as Sorting } from "@/components/teacher/question/maker/sorting";
import { QuestionMakerTrueFalseTHPT as TrueFalseTHPT } from "@/components/teacher/question/maker/true-false-thpt";
import { questionType } from "@/models/question";
import { useEffect } from "react";

function renderQuestionMaker(type, id) {  
  switch (type) {
    case questionType[0].type: return <MultipleChoice id={id} />;
    case questionType[1].type: return <TrueFalse id={id} />;
    case questionType[2].type: return <ShortAnswer id={id} />;
    case questionType[3].type: return <GapFill id={id} />;
    case questionType[4].type: return <ConstructedResponse id={id} />;
    case questionType[5].type: return <Sorting id={id} />;
    case questionType[6].type: return <TrueFalseTHPT id={id} />;
    case questionType[7].type: return <GapFillMultiple id={id} />;
    default: return;
  }
}

export default function QuestionMaker() {
  const { type, id } = useParams();
  const navTo = useNavigate();

  useEffect(() => {
    if (!type || questionType.filter(q => q.type === type).length === 0) {
      navTo("/404", { replace: true });
      return;
    }
  }, []);

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