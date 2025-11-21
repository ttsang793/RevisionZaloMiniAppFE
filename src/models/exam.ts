import axios from "axios";

const teacherId = Number(sessionStorage.getItem("id"));
const teacherSubject = sessionStorage.getItem("subject")!;

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
  teacherId: number = teacherId;
  teacherName?: string;
  teacherAvatar?: string;
  subjectId: string = teacherSubject;
  subjectName?: string;
  updatedAt: Date = new Date();
  publishedAt: Date = new Date();
  status: number = 0;
}

function getAllExams() {
  return axios.get("/api/exam");
}

function getPublishExams() {
  return axios.get("/api/exam/publish");
}

function getExamById(id: number) {
  return axios.get(`/api/exam/${id}`);
}

function getExamsByTeacher() {
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

function publishExam(id: number) {
  axios.put(`/api/exam/publish/${id}`)
    .then(response => {
      console.log(response.status);
    }).catch(err => {
      console.error(err);
    })
}

export { Exam, getAllExams, getPublishExams, getExamById, getExamsByTeacher, insertExam, updateExam, deleteExam, publishExam }