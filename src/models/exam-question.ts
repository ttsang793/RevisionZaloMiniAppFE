import axios from "axios";

class ExamQuestion {
  examId: number = -1;
  examStatus: number = 0;
  partIds?: number[];
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

function getExamQuestion(id: number) {
  return axios.get(`/api/exam/question/${id}`);
}

function getExamQuestionWithQuestions(id: number) {
  return axios.get(`/api/exam/${id}/detail`);
}

function updateExam(exam: ExamQuestion, list: any[][]) {
  exam.examQuestions = [];
  exam.questionTypes = [];

  let total = 0;

  for (let i = 0; i < list.length; i++) {
    exam.questionTypes.push([]);
    for (let j = 0; j < list[i].length; j++) {
      total += list[i][j].point;
      exam.questionTypes[i].push(list[i][j].type);
      for (let k = 0; k < list[i][j].id.length; k++)
        exam.examQuestions.push({partTitle: exam.partTitles[i], orderIndex: j + 1, questionId: list[i][j].id[k], point: list[i][j].point});
    }
  }

  if (total > 10) {
    console.warn("Tổng điểm không được vượt quá 10!")
    return;
  }
  else if (total === 10) exam.examStatus = 1;

  axios.post(`/api/exam/question/${exam.examId}`, exam, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
      console.log(response.status);
    })
    .catch(err => {
      console.error(err);
    })
}

export { ExamQuestion, getExamQuestion, getExamQuestionWithQuestions, updateExam }