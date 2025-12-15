import { render_api } from "@/script/util";
import { UserStorage } from "./user";

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
  teacherId: number;
  teacherName?: string;
  teacherAvatar?: string;
  subjectId: string;
  subjectName?: string;
  updatedAt: Date = new Date();
  publishedAt: Date = new Date();
  status: number = 0;
  latest?: Date;
  historyId?: number;

  constructor() {
    this.teacherId = UserStorage.getId();
    this.subjectId = UserStorage.getSubjectId();
  }
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

class HomeFilter {
  search: string = "";
  subject: string = "";
  grade: number = -1;
  type: string = "";
}

function getPublishExams(filter: HomeFilter | null) {
  let url = "/api/exam/publish"
  if (filter) {
    let questionMark = false;

    if (filter.search) {
      questionMark = true;
      url += `?search=${filter.search}`;
    }

    if (filter.subject) {
      if (!questionMark) {
        questionMark = true;
        url += `?subject=${filter.subject}`;
      }
      else url += `&subject=${filter.subject}`;
    }

    if (!questionMark) {
      questionMark = true;
      url += `?grade=${filter.grade}`;
    }
    else url += `&grade=${filter.grade}`;

    if (filter.type) url += `&type=${filter.type}`;
  }

  return render_api.get(url);
}

function getExamById(id: number) {
  return render_api.get(`/api/exam/${id}`);
}

function getExamDetailById(id: number) {
  return render_api.get(`/api/exam/${id}/detail`);
}

function getExamRecordById(id: number) {
  return render_api.get(`/api/exam/${id}/record`);
}

function getExamsByTeacher(tId = UserStorage.getId()) {
  return render_api.get(`/api/exam/teacher/${tId}`);
}

function getPublishExamsByTeacher(tId = UserStorage.getId()) {
  return render_api.get(`/api/exam/teacher/${tId}/publish`);
}

async function insertExam(exam: Exam): Promise<any> {
  try {
    const response = await render_api.post("/api/exam", exam, {
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
    const response = await render_api.put(`/api/exam/${id}`, exam, {
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
    const response = await render_api.delete(`/api/exam/${id}`);
    return response;
  }
  catch (err) {
    return err;
  }
}

async function publishExam(id: number): Promise<any> {  
  try {
    const response = await render_api.put(`/api/exam/publish/${id}`)
    return response;
  }
  catch (err) {
    return err;
  }
}

export { Exam, ExamDetail, ExamRecord, HomeFilter, getPublishExams, getExamById,
          getExamDetailById, getExamRecordById,
          getPublishExamsByTeacher, getExamsByTeacher,
          insertExam, updateExam, deleteExam, publishExam }