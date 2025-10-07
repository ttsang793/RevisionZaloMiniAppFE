import axios from "axios";
import { TrueFalseQuestion } from "./question";

function getTrueFalseQuestionById(id: number) {
  return axios.get(`/api/question/true-false/${id}`);
}

function insertTrueFalseQuestion(tfq: TrueFalseQuestion) {
  axios.post("/api/question/true-false", tfq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function updateTrueFalseQuestion(tfq: TrueFalseQuestion, id: number) {
  axios.put(`/api/question/true-false/${id}`, tfq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { getTrueFalseQuestionById, insertTrueFalseQuestion, updateTrueFalseQuestion }