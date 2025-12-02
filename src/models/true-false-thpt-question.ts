import axios from "axios";
import { TrueFalseTHPTQuestion } from "./question";

type TrueFalseTHPTError = {
  title?: string,
  statement?: string,
  grade?: string,
  difficulty?: string,
  topic?: string
}

function getTrueFalseTHPTQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

async function insertTrueFalseTHPTQuestion(tfq: TrueFalseTHPTQuestion): Promise<any> {
  try {
    const response = axios.post("/api/question/true-false-thpt", tfq, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }
}

async function updateTrueFalseTHPTQuestion(tfq: TrueFalseTHPTQuestion, id: number): Promise<any> {
  try {
    const response = axios.put(`/api/question/true-false-thpt/${id}`, tfq, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }
}

export { TrueFalseTHPTError, getTrueFalseTHPTQuestionById, insertTrueFalseTHPTQuestion, updateTrueFalseTHPTQuestion }