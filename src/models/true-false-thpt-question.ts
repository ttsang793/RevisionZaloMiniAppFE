import axios from "axios";
import { Question, QuestionError, validateInput } from "./question";

class TrueFalseTHPTQuestion extends Question {
  passageTitle?: string;
  passageContent?: string;
  passageAuthor?: string;
  statements: string[] = ["", "", "", ""]
  answerKeys: boolean[] = [false, false, false, false];

  constructor() {
    super("true-false-thpt");
  }
}

class TrueFalseTHPTError extends QuestionError {
  statement?: string;
}

function validateTrueFalseTHPTInput(question: TrueFalseTHPTQuestion): TrueFalseTHPTError {
  const error: TrueFalseTHPTError = {}
  validateInput(question, error);

  for (let i: number = 0; i < question.statements.length; i++) {
      if (!question.statements[i]) {
        error.statement = "Vui lòng nhập đầy đủ 4 mệnh đề!";
        break;
      }
    }

  return error;
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

export { TrueFalseTHPTQuestion, TrueFalseTHPTError, validateTrueFalseTHPTInput, getTrueFalseTHPTQuestionById, insertTrueFalseTHPTQuestion, updateTrueFalseTHPTQuestion }