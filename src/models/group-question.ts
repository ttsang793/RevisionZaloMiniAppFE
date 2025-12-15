import { Question } from './question';
import { render_api } from "@/script/util";

class GroupQuestionGet {
  id: number = -1;
  title: string = "";
  grade: number = -1;
  type: string = "group";
  subjectId: string = "TOAN";
  passageTitle: string = "";
  passageContent: string = "";
  passageAuthor: string = "";
  questions: Question[] = [];
}

class GroupQuestionPost {
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
  return render_api.get(`/api/question/${id}`);
}

function insertGroupQuestion(gq: GroupQuestionPost) {
  render_api.post("/api/question/group", gq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function updateGroupQuestion(gq: GroupQuestionPost, id: number) {
  render_api.put(`/api/question/group/${id}`, gq, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { GroupQuestionGet, GroupQuestionPost, getGroupQuestionById, insertGroupQuestion, updateGroupQuestion }