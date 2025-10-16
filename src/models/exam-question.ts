import axios from "axios";
import { Question } from "./question";

class ExamQuestionGet {
  examId?: number;
  partTitles: string[] = [];
  questionTypes: string[][] = [];
  questions: Question[] = [];
}

class ExamQuestion {
  examId: number = -1;
  partTitles: string[] = [""];
  questionTypes: string[][] = [];
  examQuestions: ExamQuestionItem[] = [];

  constructor(id?: number) {
    if (id) this.examId = id;
  }
}

class ExamQuestionItem {
  partTitle: string = "";
  orderIndex: number = -1;
  questionId: number = -1;
  point: number = -1;
}

function GetExamQuestion(id: number) {
  return axios.get(`/api/exam/question/${id}`);
}

function UpdateExam(exam: ExamQuestion, list: any[][]) {
  console.log(list);
  /*exam.examQuestions = [];
  exam.questionTypes = [];

  for (let i = 0; i < list.length; i++) {
    exam.questionTypes.push([]);
    for (let j = 0; j < list[i].length; j++) {
      exam.questionTypes[i].push(list[i][j].type);
      for (let k = 0; k < list[i][j].id.length; k++)
        exam.examQuestions.push({partTitle: exam.partTitles[i], orderIndex: j + 1, questionId: list[i][j].id[k], point: list[i][j].point});
    }
  }

  axios.post(`/api/exam/question/${exam.examId}`, exam, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
      console.log(response.status);
    })
    .catch(err => {
      console.error(err);
    })*/
}

export { ExamQuestion, GetExamQuestion, UpdateExam }