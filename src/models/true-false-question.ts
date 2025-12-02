import axios from "axios";
import { TrueFalseQuestion } from "./question";

type TrueFalseError = {
  title?: string
  grade?: string,
  difficulty?: string,
  topic?: string
}

function getTrueFalseQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

async function insertTrueFalseQuestion(tfq: TrueFalseQuestion): Promise<any> {
  try {
    const response = axios.post("/api/question/true-false", tfq, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }
}

async function updateTrueFalseQuestion(tfq: TrueFalseQuestion, id: number): Promise<any> {
  try {
    const response = axios.put(`/api/question/true-false/${id}`, tfq, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }
}

export { TrueFalseError, getTrueFalseQuestionById, insertTrueFalseQuestion, updateTrueFalseQuestion }