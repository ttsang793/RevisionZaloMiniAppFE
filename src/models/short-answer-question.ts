import { render_api } from "@/script/util";
import { Question, QuestionError, validateInput } from "./question";

class ShortAnswerQuestion extends Question {
  answerKey: string = "";

  constructor() {
    super("short-answer");
  }
}

class ShortAnswerError extends QuestionError {
  answer?: string
}

function validateShortAnswerInput(question: ShortAnswerQuestion): ShortAnswerError {
  const error: ShortAnswerError = {}
  validateInput(question, error);
  if (!question.answerKey) error.answer = "Vui lòng nhập đáp án!"

  return error;
}

function getShortAnswerQuestionById(id: number) {
  return render_api.get(`/api/question/${id}`);
}

async function insertShortAnswerQuestion(saq: ShortAnswerQuestion): Promise<any> {
  try {
    saq.answerKey = saq.answerKey.trim();

    const response = render_api.post("/api/question/short-answer", saq, {
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
    saq.answerKey = saq.answerKey.trim();
    
    const response = render_api.put(`/api/question/short-answer/${id}`, saq, {
      headers: { "Content-Type": "application/json" }
    })
    return response;
  }
  catch (err) {
    return err;
  }
}

export { ShortAnswerQuestion, ShortAnswerError, validateShortAnswerInput, getShortAnswerQuestionById, insertShortAnswerQuestion, updateShortAnswerQuestion }