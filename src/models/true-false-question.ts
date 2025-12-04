import axios from "axios";
import { Question, QuestionError, validateInput } from "./question";

class TrueFalseQuestion extends Question {
  answerKey: boolean = true;

  constructor() {
    super("true-false");
  }
}

function validateTrueFalseInput(question: TrueFalseQuestion): QuestionError {
  const error: QuestionError = {}
  validateInput(question, error);
  return error;
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

export { TrueFalseQuestion, validateTrueFalseInput, getTrueFalseQuestionById, insertTrueFalseQuestion, updateTrueFalseQuestion }