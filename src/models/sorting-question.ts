import axios from "axios";
import { SortingQuestion } from "./question";

type SortingError = {
  title?: string,
  answer?: string,
  grade?: string,
  difficulty?: string,
  topic?: string
}

function getSortingQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

async function insertSortingQuestion(sq: SortingQuestion): Promise<any> {
  try {
    const response = axios.post("/api/question/sorting", sq, {
      headers: { "Content-Type": "application/json" }
    })
    return response;
  }
  catch (err) {
    return err;
  }
}

async function updateSortingQuestion(sq: SortingQuestion, id: number): Promise<any> {
  try {
    const response = axios.put(`/api/question/sorting/${id}`, sq, {
      headers: { "Content-Type": "application/json" }
    })
    return response;
  }
  catch (err) {
    return err;
  }
}

export { SortingError, getSortingQuestionById, insertSortingQuestion, updateSortingQuestion }