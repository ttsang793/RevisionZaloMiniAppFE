import axios from "axios";
import { GapFillQuestion } from "./question";

type GapFillError = {
  answer?: string,
  grade?: string,
  difficulty?: string,
  topic?: string
}

function getGapFillQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

function insertGapFillQuestion(fitbq: GapFillQuestion) {
  axios.post("/api/question/manual-response", fitbq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function updateGapFillQuestion(fitbq: GapFillQuestion, id: number) {
  axios.put(`/api/question/manual-response/${id}`, fitbq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { GapFillError, getGapFillQuestionById, insertGapFillQuestion, updateGapFillQuestion }