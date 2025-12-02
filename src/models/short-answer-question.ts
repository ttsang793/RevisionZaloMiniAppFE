import axios from "axios";
import { ShortAnswerQuestion } from "./question";

type ShortAnswerError = {
  title?: string,
  answer?: string,
  grade?: string,
  difficulty?: string,
  topic?: string
}

function getShortAnswerQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

async function insertShortAnswerQuestion(saq: ShortAnswerQuestion): Promise<any> {
  try {
    const response = axios.post("/api/question/short-answer", saq, {
      headers: { "Content-Type": "application/json" }
    })
    return response;
  }
  catch (err) {
    return err;
  }
}

async function updateShortAnswerQuestion(saq: ShortAnswerQuestion, id: number): Promise<any> {
  try {
    const response = axios.put(`/api/question/short-answer/${id}`, saq, {
      headers: { "Content-Type": "application/json" }
    })
    return response;
  }
  catch (err) {
    return err;
  }
}

export { ShortAnswerError, getShortAnswerQuestionById, insertShortAnswerQuestion, updateShortAnswerQuestion }