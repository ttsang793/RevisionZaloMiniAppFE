import { useState, useEffect } from "react";
import { Box, Input, Select, Text, useNavigate } from "zmp-ui";

import { getQuestionsFilterByTeacher, Question } from "@/models/question";
import { GroupQuestionGet, GroupQuestionPost, getGroupQuestionById, insertGroupQuestion, updateGroupQuestion } from "@/models/group-question";

const QuestionMakerGapFillMultiple = ({id}) => {
  const { TextArea } = Input;

  return (
    <small>Hello World</small>
  )
}

export { QuestionMakerGapFillMultiple }