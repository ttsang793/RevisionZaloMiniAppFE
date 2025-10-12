import axios from "axios";
import { FillInTheBlankQuestion } from "./question";

function getFillInTheBlankQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

function insertFillInTheBlankQuestion(fitbq: FillInTheBlankQuestion) {
  axios.post("/api/question/manual-response", fitbq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function updateFillInTheBlankQuestion(fitbq: FillInTheBlankQuestion, id: number) {
  axios.put(`/api/question/manual-response/${id}`, fitbq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { getFillInTheBlankQuestionById, insertFillInTheBlankQuestion, updateFillInTheBlankQuestion }