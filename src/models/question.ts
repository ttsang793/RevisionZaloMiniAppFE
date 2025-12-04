import axios from "axios";

const teacherId = Number(sessionStorage.getItem("id"));
const subjectId = sessionStorage.getItem("subjectId");
const subjectName = sessionStorage.getItem("subjectName");

class Question {
  id?: number;
  title: string = "";
  image?: any;
  grade: number = -1;
  type: string = "";
  difficulty?: number = -1;
  topicId: string | null = null;
  subjectId: string = subjectId!;
  subjectName: string = subjectName!;
  teacherId: number = teacherId;
  explanation?: string;

  constructor(type?: string) {
    this.type = type || "";
  }
}

class QuestionError {
  title?: string;
  grade?: string;
  difficulty?: string;
  topic?: string
}

const questionType = [
 { title: "Trắc nghiệm 4 đáp án", type: "multiple-choice" },
 { title: "Trắc nghiệm Đúng – Sai", type: "true-false" },
 { title: "Trắc nghiệm trả lời ngắn", type: "short-answer" },
 { title: "Điền vào chỗ trống", type: "gap-fill" },
 { title: "Tự luận", type: "constructed-response" },
 { title: "Sắp xếp", type: "sorting" },
 { title: "Trắc nghiệm Đúng – Sai THPT", type: "true-false-thpt" },
];

function getQuestionsByTeacher() {
  return axios.get(`/api/question/teacher/${teacherId}`);
}

function getQuestionsFilterByTeacher(title?: string, type?: string) {
  if (!title) return axios.get(`/api/question/teacher/filter/${teacherId}?type=${type}`);
  return axios.get(`/api/question/teacher/filter/${teacherId}?type=${type}&title=${title}`);
}

function validateInput(question: Question, error: QuestionError) {
  if (!question.title) error.title = "Vui lòng nhập tiêu đề!";
  if (question.grade === -1) error.grade = "Vui lòng chọn lớp!";
  if (question.difficulty === -1) error.difficulty = "Vui lòng chọn độ khó!";
  if (!question.topicId || question.topicId === "-1") error.topic = "Vui lòng chọn chủ đề!";
}

async function deleteQuestion(id: number): Promise<any> {
  try {
    const response = axios.delete(`/api/question/${id}`);
    return response;
  }
  catch(err) {
    return err;
  }
}

export { questionType, Question, QuestionError, getQuestionsByTeacher, getQuestionsFilterByTeacher, validateInput, deleteQuestion }