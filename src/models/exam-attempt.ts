import axios from "axios";

const studentId = Number(sessionStorage.getItem("id"));

class ExamAttemptGet {
  score?: number;
  examParts: any[] = [];
}

class ExamAttempt {
  id?: number;
  examId: number;
  studentId: number;
  score?: number;
  startedAt?: Date;
  partOrder: number[] = [];
  isPractice: boolean = false;
  examAttemptAnswers: ExamAttemptAnswer[] = [];

  constructor(examId: number, isPractice: boolean) {
    this.studentId = Number(sessionStorage.getItem("id"));
    this.examId = examId;
    this.isPractice = isPractice;
  }
}

class ExamAttemptAnswer {
  examQuestionId: number = -1;
  answerOrder?: string[];
  studentAnswer: string = "";
  isCorrect: string = "";
}

const checkMultipleChoice = (question, answer) => {
  return answer === question.question.correctAnswer ? "true" : "false";
}

const checkTrueFalse = (question, answer) => {
  return answer === question.question.answerKey ? "true" : "false";
}

const checkShortAnswer = (question, answer) => {
  return answer.join[""] === question.question.correctAnswer ? "true" : "false";
}

function checkTrueFalseTHPT(question, answer): {numCorrect: number, point: number, correct: string[]} {
  let numCorrect = 0;
  let correct: string[] = [];

  answer.forEach((a, i) => {
    const boolAns = (a === "true") ? true : false;
    if (boolAns == question.question.answerKeys[i]) {
      numCorrect++; correct.push("true");
    }
    else correct.push("false");
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
  let score = 0;

  for (let i = 0; i < answerList.length; i++)
    for (let j = 0; j < answerList[i].length; j++) {
      const currentQuestion = questionList[i][j].question;
      const answer = new ExamAttemptAnswer();
      
      answer.examQuestionId = currentQuestion.id;
      answer.studentAnswer = answerList[i][j];

      switch (currentQuestion.question.type) {
        case "multiple-choice": {
          const result = checkMultipleChoice(currentQuestion, answerList[i][j]);
          if (result) {
            answer.isCorrect = result;
            score += currentQuestion.point;
            answer.answerOrder = currentQuestion.question.answerKeys;
          }
          break;
        }
        case "true-false": {
          const result = checkTrueFalse(currentQuestion, answerList[i][j]);
          if (result) {
            answer.isCorrect = result;
            score += currentQuestion.point;
          }
          break;
        }
        case "short-answer": {
          const result = checkShortAnswer(currentQuestion, answerList[i][j]);
          if (result) {
            answer.studentAnswer = answerList[i][j].join("");
            answer.isCorrect = result;
            score += currentQuestion.point;
          }
          break;
        }
        case "gap-fill": {
          answer.isCorrect = "";
          break;
        }
        case "true-false-thpt": {
          const result = checkTrueFalseTHPT(currentQuestion, answerList[i][j]);
          score += result.point;

          let strAnswer = "[";
          for (let i = 0; i < answer.studentAnswer.length; i++)
            strAnswer += `'${answer.studentAnswer[i]}'${i < answer.studentAnswer.length - 1 ? ',' : ']'}`
          answer.studentAnswer = strAnswer;

          answer.isCorrect = "[";
          for (let i = 0; i < result.correct.length; i++)
            answer.isCorrect += `'${result.correct[i]}'${i < result.correct.length - 1 ? ',' : ']'}`
          break;
        }
      }
      examAttemptAnswers.push(answer);
    }

  examAttempt.score = score;
  examAttempt.examAttemptAnswers = examAttemptAnswers;
  return await postAttempt(examAttempt);
}

async function postAttempt(examAttempt: ExamAttempt): Promise<number> {
  try {
    const response = await axios.post(`/api/exam-attempt`, examAttempt,
                            { headers: { "Content-Type": "application/json" } });
    return response.status;
  }
  catch (err) {
    console.error(err);
    return 500;
  }
}

export { ExamAttempt, ExamAttemptGet, getLatestAttempt, insertAttempt };