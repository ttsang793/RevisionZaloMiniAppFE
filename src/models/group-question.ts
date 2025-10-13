import axios from "axios";
import { GroupQuestion } from "./question";

function getGroupQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

function insertGroupQuestion(tfq: GroupQuestion) {
  axios.post("/api/question/group", tfq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function updateGroupQuestion(tfq: GroupQuestion, id: number) {
  axios.put(`/api/question/group/${id}`, tfq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { getGroupQuestionById, insertGroupQuestion, updateGroupQuestion }