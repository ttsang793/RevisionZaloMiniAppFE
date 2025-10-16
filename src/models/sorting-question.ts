import axios from "axios";
import { SortingQuestion } from "./question";

type SortingError = {
  answer?: string,
  grade?: string,
  difficulty?: string,
  topic?: string
}

function getSortingQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

function insertSortingQuestion(sq: SortingQuestion) {
  axios.post("/api/question/sorting", sq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function updateSortingQuestion(sq: SortingQuestion, id: number) {
  axios.put(`/api/question/sorting/${id}`, sq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { SortingError, getSortingQuestionById, insertSortingQuestion, updateSortingQuestion }