import axios from "axios";

class GroupQuestion {  
  id?: number;
  title: string = "";
  grade: number = -1;
  type: string = "group";
  subjectId: string = "TOAN";
  passageTitle: string = "";
  passageContent: string = "";
  passageAuthor: string = "";
  questions: number[] = [];
}

function getGroupQuestionById(id: number) {
  return axios.get(`/api/question/${id}`);
}

function insertGroupQuestion(gq: GroupQuestion) {
  console.log(gq);

  axios.post("/api/question/group", gq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function updateGroupQuestion(gq: GroupQuestion, id: number) {
  axios.put(`/api/question/group/${id}`, gq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { GroupQuestion, getGroupQuestionById, insertGroupQuestion, updateGroupQuestion }