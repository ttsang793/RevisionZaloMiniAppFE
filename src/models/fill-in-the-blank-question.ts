import axios from "axios";
import { FillInTheBlankQuestion } from "./question";

function getFillInTheBlankQuestionById(id: number) {
  return axios.get(`/api/question/fill-in-the-blank/${id}`);
}

function insertFillInTheBlankQuestion(fitbq: FillInTheBlankQuestion) {
  axios.post("/api/question/fill-in-the-blank", fitbq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function updateFillInTheBlankQuestion(fitbq: FillInTheBlankQuestion, id: number) {
  axios.put(`/api/question/fill-in-the-blank/${id}`, fitbq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { getFillInTheBlankQuestionById, insertFillInTheBlankQuestion, updateFillInTheBlankQuestion }