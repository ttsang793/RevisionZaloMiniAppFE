import axios from "axios";
import { Question, QuestionError, validateInput } from "./question";

class ConstructedResponseQuestion extends Question {
  answerKeys: string[] = [];
  allowTakePhoto: boolean = false;
  allowEnter: boolean = false;
  markAsWrong: boolean = false;

  constructor() {
    super("constructed-response");
  }
}

class ConstructedResponseError extends QuestionError {
  explanation?: string;
}

function validateConstructedResponseInput(question: ConstructedResponseQuestion): ConstructedResponseError {
  const error: ConstructedResponseError = {}
  validateInput(question, error);
  if (!question.explanation) error.explanation = "Vui lòng nhập lời giải thích!";

  return error;
}

function getConstructedResponseQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

async function insertConstructedResponseQuestion(crq: ConstructedResponseQuestion): Promise<any> {
  try {
    const response = axios.post("/api/question/manual-response", crq, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }    
}

async function updateConstructedResponseQuestion(crq: ConstructedResponseQuestion, id: number): Promise<any> {
  try {
    const response = axios.put(`/api/question/manual-response/${id}`, crq, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }    
}

export { ConstructedResponseQuestion, ConstructedResponseError, validateConstructedResponseInput, getConstructedResponseQuestionById, insertConstructedResponseQuestion, updateConstructedResponseQuestion }