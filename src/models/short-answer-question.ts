import axios from "axios";
import { ShortAnswerQuestion } from "./question";

function getShortAnswerQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

function insertShortAnswerQuestion(saq: ShortAnswerQuestion) {
  axios.post("/api/question/short-answer", saq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function updateShortAnswerQuestion(saq: ShortAnswerQuestion, id: number) {
  axios.put(`/api/question/short-answer/${id}`, saq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { getShortAnswerQuestionById, insertShortAnswerQuestion, updateShortAnswerQuestion }