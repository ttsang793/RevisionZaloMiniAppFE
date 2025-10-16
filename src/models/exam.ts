import axios from "axios";

class Exam {
  id?: number;
  examType?: 'default' | 'regular' | 'midterm' | 'final' | 'other' = 'default';
  displayType: "normal" | "pdf" = "normal";
  title: string = "";
  grade: number = -1;
  timeLimit: number = 0;
  earlyTurnIn: number = 0;
  allowShowScore: boolean = false;
  allowPartSwap: boolean = false;
  allowQuestionSwap: boolean = false;
  allowAnswerSwap: boolean = false;
  teacherId: number = 2;
  teacherName?: string;
  subjectId: string = "ANH";
  subjectName?: string;
  approvedBy?: number;
  state: number = 1;
}

function getAllExams() {
  return axios.get("/api/exam");
}

function getExamById(id: number) {
  return axios.get(`/api/exam/${id}`);
}

function getExamsByTeacher(teacherId = 2) {
  return axios.get(`/api/exam/teacher/${teacherId}`);
}

function insertExam(exam: Exam) {
  axios.post("/api/exam", exam, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function updateExam(exam: Exam, id: number) {
  axios.put(`/api/exam/${id}`, exam, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

function deleteExam(id: number) {
  axios.delete(`/api/exam/${id}`)
    .then(response => {
      console.log(response.status);
    }).catch(err => {
      console.error(err);
    })
}

function unpublishExam(id: number) {
  axios.delete(`/api/exam/unpublish/${id}`)
    .then(response => {
      console.log(response.status);
    }).catch(err => {
      console.error(err);
    })
}

export { Exam, getAllExams, getExamById, getExamsByTeacher, insertExam, updateExam, deleteExam, unpublishExam }