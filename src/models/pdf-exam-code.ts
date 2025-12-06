import axios from "axios";

class ExamCode {
  examId: number = -1;
  code: string = "";
  taskPDFFile?: File;
  answerPDFFile?: File;
  numPart: number = -1;
  questions: ExamCodeQuestion[][] = []

  constructor(examId: number) {
    this.examId = examId;
  }
}

class ExamCodeQuestion {
  type: string;
  answerKey: string = "";
  answerKeys: string[] = [];
  partIndex: number = 0;
  questionIndex: number = 0;
  point: number = 0;

  constructor(type: string) {
    this.type = type;
  }
}

class ExamCodePost {
  examId: number;
  code: string;
  numPart: number;
  questions: ExamCodeQuestion[] = []

  constructor(examCode: ExamCode) {
    this.examId = examCode.examId;
    this.code = examCode.code;
    this.numPart = examCode.questions.length;
    this.questions = examCode.questions.reduce((flattened, currentArr) => flattened.concat(currentArr), []);
  }
}

class ExamCodeGet {
  id: number = -1;
  examId: number = -1;
  code: string = "";
  taskPDF: string = "";
  answerPDF: string = "";
  numPart: number = -1;
  allowShowScore: boolean = true;
  questions: ExamCodeQuestionGet[] = []
}

class ExamCodeQuestionGet {
  type: string = "";
  answerKey: string = "";
  studentAnswer?: string;
  studentAnswers: string[] = [];
  partIndex: number = 0;
  questionIndex: number = 0;
  point: number = 0;
}

function getExamCodeByExamId(examId: number, id?: number) {
  console.log(id);
  if (!id) return axios.get(`/api/pdf-exam-code/${examId}`);
  return axios.get(`/api/pdf-exam-code/${examId}/${id}`);
}

function insertCode(examCodes: ExamCode[]) {
  examCodes.forEach(examCode => {
    for (let i = 0; i < examCode.questions.length; i++)
      for (let j = 0; j < examCode.questions[i].length; j++) {
        examCode.questions[i][j].partIndex = i + 1;
        examCode.questions[i][j].questionIndex = j + 1;
        
        if (examCode.questions[i][j].answerKeys.length > 0)
          examCode.questions[i][j].answerKey = examCode.questions[i][j].answerKeys.join("");
      }
  })
  
  const examCodesPostList: ExamCodePost[] = [];
  examCodes.forEach(ec => examCodesPostList.push(new ExamCodePost(ec)));
  
  try {
    const response = axios.post("/api/pdf-exam-code", examCodesPostList, {
      "headers": { "Content-Type": "application/json" }
    })
    return response;
  }
  catch (err) {
    return err;
  }
}

export { ExamCode, ExamCodeQuestion, ExamCodeGet, ExamCodeQuestionGet, getExamCodeByExamId, insertCode }