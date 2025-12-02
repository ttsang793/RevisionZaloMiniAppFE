import axios from "axios";
import { MultipleChoiceQuestion } from "./question";

class MultipleChoiceError {
  title?: string;
  correctAnswer?: string;
  wrongAnswer: string[] = [];
  grade?: string;
  difficulty?: string;
  topic?: string
}

function getMultipleChoiceQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

async function insertMultipleChoiceQuestion(mcq: MultipleChoiceQuestion): Promise<any> {
  try {
    const response = axios.post("/api/question/multiple-choice", mcq, {
      headers: { "Content-Type": "application/json" }
    })
    return response;
  }
  catch (err) {
    return err;
  }
}

async function updateMultipleChoiceQuestion(mcq: MultipleChoiceQuestion, id: number): Promise<any> {
  try {
    const response = axios.put(`/api/question/multiple-choice/${id}`, mcq, {
      headers: { "Content-Type": "application/json" }
    })
    return response;
  }
  catch (err) {
    return err;
  }
}

export { MultipleChoiceError, getMultipleChoiceQuestionById, insertMultipleChoiceQuestion, updateMultipleChoiceQuestion }