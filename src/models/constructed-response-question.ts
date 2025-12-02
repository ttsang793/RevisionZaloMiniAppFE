import axios from "axios";
import { ConstructedResponseQuestion } from "./question";

type ConstructedResponseError = {
  title?: string,
  grade?: string,
  difficulty?: string,
  topic?: string,
  explanation?: string
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

export { ConstructedResponseError, getConstructedResponseQuestionById, insertConstructedResponseQuestion, updateConstructedResponseQuestion }