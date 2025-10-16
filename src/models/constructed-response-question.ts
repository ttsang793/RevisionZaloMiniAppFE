import axios from "axios";
import { ConstructedResponseQuestion } from "./question";

type ConstructedResponseError = {
  grade?: string,
  difficulty?: string,
  topic?: string,
  explanation?: string
}

function getConstructedResponseQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

function insertConstructedResponseQuestion(crq: ConstructedResponseQuestion) {
  axios.post("/api/question/manual-response", crq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function updateConstructedResponseQuestion(crq: ConstructedResponseQuestion, id: number) {
  axios.put(`/api/question/manual-response/${id}`, crq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { ConstructedResponseError, getConstructedResponseQuestionById, insertConstructedResponseQuestion, updateConstructedResponseQuestion }