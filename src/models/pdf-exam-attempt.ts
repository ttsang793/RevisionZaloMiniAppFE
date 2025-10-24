import axios from "axios";
import { ExamCodeQuestionGet } from "./pdf-exam-code";

class PdfExamAttempt {
  examId: number;
  studentId: number = 1;
  score: number = 0;
  startedAt: Date = new Date();
  codeId: number = -1;
  studentAnswer: string[] = [];
  correctBoard: number[] = [];

  constructor(examId: number) {
    this.examId = examId;
  }
}

function getPdfExamAttempt(examId: number) {
  return axios.get(`/api/exam-attempt/pdf?studentId=1&examId=${examId}`);
}

function handleTrueFalseTHPTQuestion(q: ExamCodeQuestionGet): { correct: number, point: number } {
  let defaultCorrect = 0b0000;
  let count = 0;
  for (let i = 0; i < 4; i++)
    if (q.studentAnswers[i] === q.answerKey[i]) {
      count++;
      defaultCorrect = defaultCorrect | 1 << i;
    }
  
  switch (count) {
    case 0: return { correct: 0, point: 0 }
    case 1: return { correct: defaultCorrect, point: 0.1 }
    case 2: return { correct: defaultCorrect, point: 0.25 }
    case 3: return { correct: defaultCorrect, point: 0.5 }
    case 4: return { correct: defaultCorrect, point: 1 }
  }
}

async function insertPdfExamAttempt(examAnswer: ExamCodeQuestionGet[], pdfExamAttempt: PdfExamAttempt): Promise<number> {
  let score = 0;
  const correct: number[] = [];
  pdfExamAttempt.studentAnswer = [];
  examAnswer.forEach(ea => {
    switch (ea.type) {
      case "multiple-choice": case "true-false":
        pdfExamAttempt.studentAnswer.push(ea.studentAnswer || "");
        if (ea.answerKey === ea.studentAnswer!) { correct.push(1); score += ea.point; }
        else correct.push(0);
        break;
      case "short-answer":
        pdfExamAttempt.studentAnswer.push(ea.studentAnswers.join("") || "");
        if (ea.answerKey === ea.studentAnswers.join("")) { correct.push(1); score += ea.point }
        else correct.push(0);
        break;
      case "fill-in-the-blank": case "constructed-response":
        pdfExamAttempt.studentAnswer.push(ea.studentAnswer || "");
        correct.push(2);
        break;
      case "true-false-thpt":
        pdfExamAttempt.studentAnswer.push(ea.studentAnswers.join("") || "");
        const result = handleTrueFalseTHPTQuestion(ea);
        correct.push(result.correct);
        score += result.point;
        break;
    }
  })

  pdfExamAttempt.score = Math.round(score * 100) / 100;
  pdfExamAttempt.correctBoard = correct;

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