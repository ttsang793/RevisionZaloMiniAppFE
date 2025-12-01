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
  latest?: Date;
  historyId?: number;
}

class ExamAttemptsRecord {
  maxTotalPoint?: number;
  duration?: number;
  count: number = 0;
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

function getExamAttemptsRecordByExamId(id: number) {
  return axios.get(`/api/exam-attempt/exam/${id}/record`);
}

function getExamTopicsByExamId(id: number) {
  return axios.get(`/api/exam/${id}/topic`);
}

function getPublishExamsByTeacher(tId = teacherId) {
  return axios.get(`/api/exam/publish/teacher/${tId}`);
}

function getExamsByTeacher(tId = teacherId) {
  return axios.get(`/api/exam/teacher/${tId}`);
}

async function insertExam(exam: Exam): Promise<any> {
  try {
    const response = await axios.prototype("/api/exam", exam, {
      headers: { "Content-Type": "application/json" }
    })
    return response;
  }
  catch (err) {
    return err;
  }
}

async function updateExam(exam: Exam, id: number): Promise<any> {  
  try {
    const response = await axios.put(`/api/exam/${id}`, exam, {
      headers: { "Content-Type": "application/json" }
    })
    return response;
  }
  catch (err) {
    return err;
  }
}

async function deleteExam(id: number): Promise<any> {  
  try {
    const response = await axios.delete(`/api/exam/${id}`);
    return response;
  }
  catch (err) {
    return err;
  }
}

async function publishExam(id: number): Promise<any> {  
  try {
    const response = await axios.put(`/api/exam/publish/${id}`)
    return response;
  }
  catch (err) {
    return err;
  }
}

export { Exam, ExamAttemptsRecord, getAllExams, getPublishExams, getExamById,
          getExamAttemptsRecordByExamId, getExamTopicsByExamId,
          getPublishExamsByTeacher, getExamsByTeacher,
          insertExam, updateExam, deleteExam, publishExam }