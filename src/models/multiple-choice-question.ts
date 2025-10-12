import axios from "axios";
import { MultipleChoiceQuestion } from "./question";

function getMultipleChoiceQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

function insertMultipleChoiceQuestion(mcq: MultipleChoiceQuestion) {
  axios.post("/api/question/multiple-choice", mcq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function updateMultipleChoiceQuestion(mcq: MultipleChoiceQuestion, id: number) {
  axios.put(`/api/question/multiple-choice/${id}`, mcq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { getMultipleChoiceQuestionById, insertMultipleChoiceQuestion, updateMultipleChoiceQuestion }