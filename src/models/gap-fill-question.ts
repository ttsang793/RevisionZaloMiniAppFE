import axios from "axios";
import { GapFillQuestion } from "./question";

type GapFillError = {
  title?: string,
  answer?: string,
  grade?: string,
  difficulty?: string,
  topic?: string
}

function getGapFillQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

async function insertGapFillQuestion(gfq: GapFillQuestion): Promise<any> {
  try {
    const response = axios.post("/api/question/manual-response", gfq, {
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
    const response = axios.put(`/api/question/manual-response/${id}`, gfq, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }
}

export { GapFillError, getGapFillQuestionById, insertGapFillQuestion, updateGapFillQuestion }