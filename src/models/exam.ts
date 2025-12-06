import axios from "axios";

const teacherId = Number(sessionStorage.getItem("id"));
const subjectId = sessionStorage.getItem("subjectId")!;

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
  subjectId: string = subjectId;
  subjectName?: string;
  updatedAt: Date = new Date();
  publishedAt: Date = new Date();
  status: number = 0;
  latest?: Date;
  historyId?: number;
}

class ExamDetail {
  partCount!: number;
  questionCount!: number;
  topics!: string[];
}

class ExamRecord {
  maxTotalPoint!: number;
  duration!: number;
  count!: number;
}

function getPublishExams() {
  return axios.get("/api/exam/publish");
}

function getExamById(id: number) {
  return axios.get(`/api/exam/${id}`);
}

function getExamDetailById(id: number) {
  return axios.get(`/api/exam/${id}/detail`);
}

function getExamRecordById(id: number) {
  return axios.get(`/api/exam/${id}/record`);
}

function getExamsByTeacher(tId = teacherId) {
  return axios.get(`/api/exam/teacher/${tId}`);
}

function getPublishExamsByTeacher(tId = teacherId) {
  return axios.get(`/api/exam/teacher/${tId}/publish`);
}

async function insertExam(exam: Exam): Promise<any> {
  try {
    const response = await axios.post("/api/exam", exam, {
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

export { Exam, ExamDetail, ExamRecord, getPublishExams, getExamById,
          getExamDetailById, getExamRecordById,
          getPublishExamsByTeacher, getExamsByTeacher,
          insertExam, updateExam, deleteExam, publishExam }