import axios from "axios";
import { ExamCodeQuestionGet } from "./pdf-exam-code";

const studentId = Number(sessionStorage.getItem("id"));

class PdfExamAttempt {
  id?: number;
  examId: number;
  studentId: number = studentId;
  taskPdf: string = "";
  answerPdf: string = "";
  totalPoint: number = 0;
  isPractice: boolean = false;
  comment?: string;
  startedAt: Date = new Date();
  pdfExamCodeId: number = -1;
  studentAnswer: string[] = [];
  pointBoard: number[] = [];
  correctBoard: boolean[][] = [];

  constructor(examId: number, isPractice: boolean) {
    this.examId = examId;
    this.isPractice = isPractice
  }
}

function getPdfExamAttempt(examId: number) {
  return axios.get(`/api/exam/attempt/pdf/${studentId}/${examId}`);
}

function getPdfExamAttemptById(examAttemptId: number) {
  return axios.get(`/api/exam/attempt/pdf/${examAttemptId}`);
}

function handleTrueFalseTHPTQuestion(q: ExamCodeQuestionGet): { point: number, correct: boolean[] } {
  let correctBoard = [false, false, false, false];
  let count = 0;
  for (let i = 0; i < 4; i++)
    if (q.studentAnswers[i] === q.answerKey[i]) {
      count++;
      correctBoard[i] = true;
    }
  
  switch (count) {
    case 1: return { point: 0.1, correct: correctBoard };
    case 2: return { point: 0.25, correct: correctBoard };
    case 3: return { point: 0.5, correct: correctBoard };
    case 4: return { point: 1, correct: correctBoard };
    default: return { point: 0, correct: correctBoard };
  }
}

async function insertPdfExamAttempt(examAnswer: ExamCodeQuestionGet[], pdfExamAttempt: PdfExamAttempt): Promise<any> {
  let totalPoint = 0;
  const pointBoard: number[] = [];
  const correctBoard: boolean[][] = [];
  pdfExamAttempt.studentAnswer = [];
  examAnswer.forEach(ea => {
    let compare: boolean;

    switch (ea.type) {
      case "multiple-choice": case "true-false":
        pdfExamAttempt.studentAnswer.push(ea.studentAnswer || "");
        compare = ea.answerKey === ea.studentAnswer;
        correctBoard.push([compare]);
        if (compare) { pointBoard.push(ea.point); totalPoint += ea.point; }
        else pointBoard.push(0);
        break;
      case "short-answer":
        pdfExamAttempt.studentAnswer.push(ea.studentAnswers.join("") || "");
        compare = ea.answerKey === ea.studentAnswers.join("");
        correctBoard.push([compare]);
        if (ea.answerKey === ea.studentAnswers.join("")) { pointBoard.push(ea.point); totalPoint += ea.point }
        else pointBoard.push(0);
        break;
      case "gap-fill": case "constructed-response":
        correctBoard.push([false]);
        pdfExamAttempt.studentAnswer.push(ea.studentAnswer || "");
        pointBoard.push(0);
        break;
      case "true-false-thpt":
        pdfExamAttempt.studentAnswer.push(ea.studentAnswers.join("") || "");
        const result = handleTrueFalseTHPTQuestion(ea);
        pointBoard.push(result.point);
        correctBoard.push(result.correct);
        totalPoint += result.point;
        break;
    }
  })

  pdfExamAttempt.totalPoint = Math.round(totalPoint * 100) / 100;
  pdfExamAttempt.pointBoard = pointBoard;
  pdfExamAttempt.correctBoard = correctBoard;

  try {
    const response = await axios.post("/api/exam/attempt/pdf", pdfExamAttempt, { headers: { "Content-Type": "application/json" } });
    return response;
  }
  catch (err) {
    console.log(err);
    return err;
  }
}

async function gradingPdfAttempt(pdfExamAttempt: PdfExamAttempt): Promise<any> {
  try {
    const response = await axios.put(`/api/exam/attempt/pdf/grading/${pdfExamAttempt.id}`, pdfExamAttempt, { headers: { "Content-Type": "application/json" } });
    return response;
  }
  catch (err) {
    console.log(err);
    return err;
  }
}

export { PdfExamAttempt, getPdfExamAttempt, getPdfExamAttemptById, insertPdfExamAttempt, gradingPdfAttempt }