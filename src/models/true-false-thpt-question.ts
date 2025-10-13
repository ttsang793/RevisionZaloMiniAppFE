import axios from "axios";
import { TrueFalseTHPTQuestion } from "./question";

function getTrueFalseTHPTQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

function insertTrueFalseTHPTQuestion(tfq: TrueFalseTHPTQuestion) {
  axios.post("/api/question/true-false-thpt", tfq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function updateTrueFalseTHPTQuestion(tfq: TrueFalseTHPTQuestion, id: number) {
  axios.put(`/api/question/true-false-thpt/${id}`, tfq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { getTrueFalseTHPTQuestionById, insertTrueFalseTHPTQuestion, updateTrueFalseTHPTQuestion }