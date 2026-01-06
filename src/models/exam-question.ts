import { render_api } from "@/script/util";

class ExamQuestion {
  examId: number = -1;
  examStatus: number = 0;
  partIds?: number[];
  partTitles: string[] = [""];
  questionTypes: string[][] = [];
  examQuestions: ExamQuestionItem[] = [];

  constructor(id?: number) {
    if (id) this.examId = id;
  }
}

class ExamQuestionItem {
  partTitle: string = "";
  orderIndex: number = -1;
  questionId: number = -1;
  point: number = -1;
}

function getExamQuestion(id: number) {
  return render_api.get(`/api/exam/${id}/question`);
}

function getExamQuestionWithQuestions(id: number) {
  return render_api.get(`/api/exam/${id}/question/attempt`);
}

async function updateExam(exam: ExamQuestion, list: any[][]): Promise<any> {
  exam.examQuestions = [];
  exam.questionTypes = [];
  let total = 0;

  try {
    for (let i = 0; i < list.length; i++) {
      exam.questionTypes.push([]);
      for (let j = 0; j < list[i].length; j++) {
        total += list[i][j].point;
        exam.questionTypes[i].push(list[i][j].type);
        for (let k = 0; k < list[i][j].id.length; k++)
          exam.examQuestions.push({partTitle: exam.partTitles[i], orderIndex: j + 1, questionId: list[i][j].id[k], point: list[i][j].point});
      }
    }

    if (total > 10) throw new Error("Tổng điểm không được vượt quá 10!");
    else if (total === 10) exam.examStatus = 1;
    else exam.examStatus = 0;

    const response = render_api.post(`/api/exam/question/${exam.examId}`, exam);
    return response;
  }
  catch (err) {
    return err;
  }
}

export { ExamQuestion, getExamQuestion, getExamQuestionWithQuestions, updateExam }