import { render_api } from "@/script/util";
import { Question, QuestionError, validateInput } from "./question";

class GapFillQuestion extends Question {
  answerKeys: string[] = [""];
  markAsWrong: boolean = false;

  constructor() {
    super("gap-fill");
  }
}

class GapFillError extends QuestionError {
  answer?: string;
}

function validateGapFillInput(question: GapFillQuestion): GapFillError {
  const error: GapFillError = {}
  validateInput(question, error);
  for (let i: number = 0; i < question.answerKeys.length; i++) {
      if (!question.answerKeys[i]) {
        error.answer = "Vui lòng nhập đầy đủ (các) đáp án!";
        break;
      }
    }

  return error;
}

function getGapFillQuestionById(id: number) {
  return render_api.get(`/api/question/${id}`);
}

async function insertGapFillQuestion(gfq: GapFillQuestion): Promise<any> {
  try {
    const response = render_api.post("/api/question/manual-response", gfq, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }
}

async function updateGapFillQuestion(gfq: GapFillQuestion, id: number): Promise<any> {
  try {
    const response = render_api.put(`/api/question/manual-response/${id}`, gfq, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }
}

export { GapFillQuestion, GapFillError, validateGapFillInput, getGapFillQuestionById, insertGapFillQuestion, updateGapFillQuestion }