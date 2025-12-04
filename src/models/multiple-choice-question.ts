import axios from "axios";
import { Question, QuestionError, validateInput } from "./question";

class MultipleChoiceQuestion extends Question {
  correctAnswer: string = "";
  wrongAnswer: string[] = [];

  constructor() {
    super("multiple-choice");
  }
}

class MultipleChoiceError extends QuestionError {
  correctAnswer?: string;
  wrongAnswer?: string;
}

function validateMultipleChoiceInput(question: MultipleChoiceQuestion): MultipleChoiceError {
  const error: MultipleChoiceError = { }
  validateInput(question, error);

  if (!question.correctAnswer) error.correctAnswer = "Vui lòng nhập câu trả lời đúng!"
  for (let i = 0; i <= 2; i++)
    if (!question.wrongAnswer[i]) { 
      error.wrongAnswer = "Vui lòng nhập đầy đủ các câu trả lời sai!";
      break;
    }

  return error;
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

export { MultipleChoiceQuestion, MultipleChoiceError, validateMultipleChoiceInput, getMultipleChoiceQuestionById, insertMultipleChoiceQuestion, updateMultipleChoiceQuestion }