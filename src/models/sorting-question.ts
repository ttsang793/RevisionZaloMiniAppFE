import axios from "axios";
import { Question, QuestionError, validateInput } from "./question";

class SortingQuestion extends Question {
  correctOrder: string[] = ["", "", ""];

  constructor() {
    super("sorting");
  }
}

class SortingError extends QuestionError {
  answer?: string
}

function validateSortingInput(question: SortingQuestion): SortingError {
  const error: SortingError = {}
  validateInput(question, error);
  
  for (let i: number = 0; i < question.correctOrder.length; i++) {
    if (!question.correctOrder[i]) {
      error.answer = "Vui lòng nhập đầy đủ các mệnh đề!";
      break;
    }
  }

  return error;
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

export { SortingQuestion, SortingError, validateSortingInput, getSortingQuestionById, insertSortingQuestion, updateSortingQuestion }