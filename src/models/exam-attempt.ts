import axios from "axios";

const studentId = Number(sessionStorage.getItem("id"));

class ExamAttemptGet {
  totalPoint?: number;
  examParts: any[] = [];
}

class ExamAttempt {
  id?: number;
  examId: number;
  studentId: number;
  totalPoint?: number;
  startedAt?: Date;
  partOrder: number[] = [];
  isPractice: boolean = false;
  examAttemptAnswers: ExamAttemptAnswer[] = [];

  constructor(examId: number, isPractice: boolean) {
    this.studentId = 2;
    this.examId = examId;
    this.isPractice = isPractice;
  }
}

class ExamAttemptAnswer {
  examQuestionId: number = -1;
  answerOrder?: string[];
  studentAnswer: string[] = [];
  correct: number[] = [];
  point: number = 0;
}

const checkMultipleChoice = (question, answer) => {
  return answer === question.question.correctAnswer;
}

const checkTrueFalse = (question, answer) => {
  const boolAnswer = answer === "true";
  return boolAnswer === question.question.answerKey;
}

const checkShortAnswer = (question, answer) => {
  return answer.join[""] === question.question.correctAnswer;
}

const checkManualResponse = (question, answer) => {
  return question.question.answerKeys.includes(answer);
}

const checkSorting = (question, answer): {point: number, correct: number[]} => {
  const correctOrder = question.question.correctOrder;
  let correct: number[] = [];
  let numCorrect: number = 0;
  for (let i: number = 0; i < correctOrder.length; i++) {
    if(answer[i] !== correctOrder[i]) {
      correct.push(1);
      numCorrect++;
    }
    else correct.push(0);
  }
  return { point: question.point * numCorrect / correctOrder.length, correct };
}

function checkTrueFalseTHPT(question, answer): {numCorrect: number, point: number, correct: number[]} {
  let numCorrect = 0;
  let correct: number[] = [];

  answer.forEach((a: string, i: number) => {
    const boolAns = (a === "true") ? true : false;
    if (boolAns == question.question.answerKeys[i]) {
      numCorrect++;
      correct.push(1);
    }
    else correct.push(0);
  });

  switch (numCorrect) {
    case 1: return { numCorrect: 1, point: 0.1, correct };
    case 2: return { numCorrect: 2, point: 0.25, correct };
    case 3: return { numCorrect: 3, point: 0.5, correct };
    case 4: return { numCorrect: 4, point: 1, correct };
    default: return { numCorrect: 0, point: 0, correct };
  }
}

function getLatestAttempt(examId: number) {
  return axios.get(`/api/exam-attempt/${studentId}/${examId}`);
}

async function insertAttempt(examAttempt: ExamAttempt, questionList: any[][], answerList: any[][]): Promise<number> {
  const examAttemptAnswers: ExamAttemptAnswer[] = [];
  let totalPoint = 0;

  for (let i = 0; i < answerList.length; i++)
    for (let j = 0; j < answerList[i].length; j++) {
      const currentQuestion = questionList[i][j].question;
      const answer = new ExamAttemptAnswer();
      answer.examQuestionId = currentQuestion.id;      

      switch (currentQuestion.question.type) {
        case "multiple-choice": {
          const result = checkMultipleChoice(currentQuestion, answerList[i][j]);
          answer.studentAnswer[0] = answerList[i][j];
          answer.correct[0] = result ? 1 : 0;
          if (result) {
            answer.answerOrder = currentQuestion.question.answerKeys;
            answer.point = currentQuestion.point;
            totalPoint += currentQuestion.point;
          }
          break;
        }
        case "true-false": {
          const result = checkTrueFalse(currentQuestion, answerList[i][j]);
          answer.studentAnswer[0] = answerList[i][j];
          answer.correct[0] = result ? 1 : 0;
          if (result) {
            answer.point = currentQuestion.point;
            totalPoint += currentQuestion.point;
          }
          break;
        }
        case "short-answer": {
          const result = checkShortAnswer(currentQuestion, answerList[i][j]);
          answer.studentAnswer = answerList[i][j];
          answer.correct[0] = result ? 1 : 0;
          if (result) {
            answer.point = currentQuestion.point;
            totalPoint += currentQuestion.point;
          }
          break;
        }
        case "gap-fill": {
          answer.studentAnswer[0] = answerList[i][j];
          if (currentQuestion.question.markAsWrong) {
            const result = checkManualResponse(currentQuestion, answerList[i][j]);
            answer.correct[0] = result ? 1 : 0;
            answer.point = currentQuestion.point;
            totalPoint += currentQuestion.point;
          }
          else answer.correct[0] = -1;
          break;
        }
        case "constructed-response": {
          answer.studentAnswer[0] = answerList[i][j];
          if (currentQuestion.question.markAsWrong) {
            const result = checkManualResponse(currentQuestion, answerList[i][j]);
            answer.correct[0] = result ? 1 : 0;
            answer.point = currentQuestion.point;
            totalPoint += currentQuestion.point;
          }
          else answer.correct[0] = -1;
          break;
        }
        case "sorting": {
          //answer.studentAnswer = answerList[i][j];
          //temp
          answerList[i][j].forEach(o => answer.studentAnswer.push(o + ""));          
          const result = checkSorting(currentQuestion, answerList[i][j]);
          answer.correct = result.correct;
          answer.point = result.point;
          totalPoint += result.point;
          break;
        }
        case "true-false-thpt": {
          answer.studentAnswer = answerList[i][j];
          const result = checkTrueFalseTHPT(currentQuestion, answerList[i][j]);
          answer.correct = result.correct;
          answer.point = result.point;
          totalPoint += result.point;
          break;
        }
      }
      examAttemptAnswers.push(answer);
    }

  examAttempt.totalPoint = totalPoint;
  examAttempt.examAttemptAnswers = examAttemptAnswers;

  return await postAttempt(examAttempt);
}

async function postAttempt(examAttempt: ExamAttempt): Promise<number> {
  console.log(JSON.stringify(examAttempt));

  try {
    const response = await axios.post("/api/exam-attempt", examAttempt,
                            { headers: { "Content-Type": "application/json" } });
    return response.status;
  }
  catch (err: any) {
    if (err.response) {
      console.error("Backend returned error:", err.response.status, err.response.data);
    } else {
      console.error("Network error:", err.message);
    }
    return err.response?.status ?? 500;
  }
}

async function checkAchievement() {
  await axios.post(`/api/exam-attempt/achievement/${studentId}`);
}

export { ExamAttempt, ExamAttemptGet, getLatestAttempt, insertAttempt, checkAchievement };