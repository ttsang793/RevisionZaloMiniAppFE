import axios from "axios";
import { ExamCodeQuestionGet } from "./pdf-exam-code";

class PdfExamAttempt {
  examId: number;
  studentId: number = 1;
  score: number = 0;
  startedAt: Date = new Date();
  codeId: number = -1;
  studentAnswer: string[] = [];
  scoreBoard: number[] = [];

  constructor(examId: number) {
    this.examId = examId;
  }
}

function getPdfExamAttempt(examId: number) {
  return axios.get(`/api/exam-attempt/pdf?studentId=1&examId=${examId}`);
}

function handleTrueFalseTHPTQuestion(q: ExamCodeQuestionGet): number {
  let defaultCorrect = 0b0000;
  let count = 0;
  for (let i = 0; i < 4; i++)
    if (q.studentAnswers[i] === q.answerKey[i]) {
      count++;
      defaultCorrect = defaultCorrect | 1 << i;
    }
  
  switch (count) {
    case 1: return 0.1;
    case 2: return 0.25;
    case 3: return 0.5;
    case 4: return 1;
    default: return 0;
  }
}

async function insertPdfExamAttempt(examAnswer: ExamCodeQuestionGet[], pdfExamAttempt: PdfExamAttempt): Promise<number> {
  let score = 0;
  const scoreBoard: number[] = [];
  pdfExamAttempt.studentAnswer = [];
  examAnswer.forEach(ea => {
    switch (ea.type) {
      case "multiple-choice": case "true-false":
        pdfExamAttempt.studentAnswer.push(ea.studentAnswer || "");
        if (ea.answerKey === ea.studentAnswer!) { scoreBoard.push(ea.point); score += ea.point; }
        else scoreBoard.push(0);
        break;
      case "short-answer":
        pdfExamAttempt.studentAnswer.push(ea.studentAnswers.join("") || "");
        if (ea.answerKey === ea.studentAnswers.join("")) { scoreBoard.push(ea.point); score += ea.point }
        else scoreBoard.push(0);
        break;
      case "fill-in-the-blank": case "constructed-response":
        pdfExamAttempt.studentAnswer.push(ea.studentAnswer || "");
        scoreBoard.push(-1);
        break;
      case "true-false-thpt":
        pdfExamAttempt.studentAnswer.push(ea.studentAnswers.join("") || "");
        const point = handleTrueFalseTHPTQuestion(ea);
        scoreBoard.push(point);
        score += point;
        break;
    }
  })

  pdfExamAttempt.score = Math.round(score * 100) / 100;
  pdfExamAttempt.scoreBoard = scoreBoard;

  try {
    const response = await axios.post("/api/exam-attempt/pdf", pdfExamAttempt, { headers: { "Content-Type": "application/json" } });
    return response.status;
  }
  catch (err) {
    console.error(err);
    return 500;
  }
}

export { PdfExamAttempt, getPdfExamAttempt, insertPdfExamAttempt }