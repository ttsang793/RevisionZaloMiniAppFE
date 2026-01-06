import { render_api } from "@/script/util";
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
  return render_api.get(`/api/question/${id}`);
}

async function insertTrueFalseTHPTQuestion(tfq: TrueFalseTHPTQuestion): Promise<any> {
  try {
    const response = await render_api.post("/api/question/true-false-thpt", tfq, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err: any) {
    console.log("Loi roi!")
    console.log(err);

    if (err.response) {
      console.error("Backend returned error:", err.response.status, err.response.data);
      return err.response;
    } else {
      console.error("Network error:", err.message);
      err.response.status = 500;
      return err.response;
    }
    return err.response;
  }
}

async function updateTrueFalseTHPTQuestion(tfq: TrueFalseTHPTQuestion, id: number): Promise<any> {
  try {
    const response = await render_api.put(`/api/question/true-false-thpt/${id}`, tfq, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err: any) {    
    if (err.response) {
      console.error("Backend returned error:", err.response.status, err.response.data);
    } else {
      console.error("Network error:", err.message);
    }
    return err.response;
  }
}

export { TrueFalseTHPTQuestion, TrueFalseTHPTError, validateTrueFalseTHPTInput, getTrueFalseTHPTQuestionById, insertTrueFalseTHPTQuestion, updateTrueFalseTHPTQuestion }