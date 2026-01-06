import { render_api } from "@/script/util";

class ExamCode {
  examId: number = -1;
  code: string = "";
  taskPDFFile?: File;
  answerPDFFile?: File;
  taskPdf?: string;
  answerPdf?: string;
  numPart: number = -1;
  questions: ExamCodeQuestion[][] = [];
  status: number = 0;

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
  questions: ExamCodeQuestion[] = [];
  taskPdf?: string = "";
  answerPdf?: string = "";
  status: number = 0;

  constructor(examCode: ExamCode) {
    this.examId = examCode.examId;
    this.code = examCode.code;
    this.numPart = examCode.questions.length;
    this.questions = examCode.questions.reduce((flattened, currentArr) => flattened.concat(currentArr), []);
    this.taskPdf = examCode.taskPdf;
    this.answerPdf = examCode.answerPdf;
    this.status = examCode.status;
  }
}

class ExamCodeGet {
  id: number = -1;
  examId: number = -1;
  code: string = "";
  taskPdf: string = "";
  answerPdf: string = "";
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

function getAllExamCodesByExamId(examId: number) {
  return render_api.get(`/api/pdf-exam-code/${examId}/all`);
}

function getExamCodeByExamId(examId: number, id?: number) {
  if (!id) return render_api.get(`/api/pdf-exam-code/${examId}`);
  return render_api.get(`/api/pdf-exam-code/${examId}/${id}`);
}

function insertCode(examCodes: ExamCode[]) {
  let total = 0;

  try {
    examCodes.forEach(examCode => {
      for (let i = 0; i < examCode.questions.length; i++)
        for (let j = 0; j < examCode.questions[i].length; j++) {
          examCode.questions[i][j].partIndex = i + 1;
          examCode.questions[i][j].questionIndex = j + 1;
          total += examCode.questions[i][j].point
          
          if (examCode.questions[i][j].answerKeys.length > 0)
            examCode.questions[i][j].answerKey = examCode.questions[i][j].answerKeys.join("");
        }

        if (total > 10) throw new Error(`Tổng điểm của đề ${examCode.code} không được vượt quá 10!`);
        else if (total === 10) examCode.status = 1;
        else examCode.status = 0;
      })  
    const examCodesPostList: ExamCodePost[] = [];
    examCodes.forEach(ec => examCodesPostList.push(new ExamCodePost(ec)));
  
    const response = render_api.post("/api/pdf-exam-code", examCodesPostList, {
      "headers": { "Content-Type": "application/json" }
    })
    return response;
  
  }
  catch (err) {
    return err;
  }
}

export { ExamCode, ExamCodeQuestion, ExamCodeGet, ExamCodeQuestionGet, getAllExamCodesByExamId, getExamCodeByExamId, insertCode }