import axios from "axios";

class Question {
  id?: number;
  title: string = "";
  grade: number = -1;
  type: string = "";
  difficulty?: number = -1;
  topicId?: string = "-1";
  subjectId: string = "TOAN";
  explanation?: string;
}

class MultipleChoiceQuestion extends Question {
  correctAnswer: string = "";
  wrongAnswer1: string = "";
  wrongAnswer2: string = "";
  wrongAnswer3: string = "";
}

class TrueFalseQuestion extends Question {
  answerKey: boolean = true;
}

class ShortAnswerQuestion extends Question {
  answerKey: string = "";
}

class FillInTheBlankQuestion extends Question {
  answerKeys: string[] = [""];
  markAsWrong: boolean = false;
}

class ConstructedResponseQuestion extends Question {
  answerKeys: string[] = [];
  allowTakePhoto: boolean = false;
  allowEnter: boolean = false;
  markAsWrong: boolean = false;
}

class SortingQuestion extends Question {
  correctOrder: string[] = ["", "", ""];
}

class TrueFalseTHPTQuestion extends Question {
  passageTitle?: string;
  passageContent?: string;
  passageAuthor?: string;
  statements: string[] = ["", "", "", ""]
  answerKeys: boolean[] = [false, false, false, false];
}

const questionType = [
 { title: "Trắc nghiệm 4 đáp án", type: "multiple-choice" },
 { title: "Trắc nghiệm Đúng – Sai", type: "true-false" },
 { title: "Trắc nghiệm trả lời ngắn", type: "short-answer" },
 { title: "Điền vào chỗ trống", type: "fill-in-the-blank" },
 { title: "Tự luận", type: "constructed-response" },
 { title: "Sắp xếp", type: "sorting" },
 { title: "Trắc nghiệm Đúng – Sai THPT", type: "true-false-thpt" }
];

function getQuestionsByTeacher() {
  return axios.get(`/api/question`);
}

function getQuestionsFilterByTeacher(title?: string, type: string = "default") {
  if (!title) return axios.get(`/api/question/filter?type=${type}`);
  return axios.get(`/api/question/filter?type=${type}&title=${title}`);
}

function deleteQuestion(id: number) {
  axios.delete(`/api/question/${id}`)
    .then(response => {
      console.log(response.status);
    })
    .catch(err => {
      console.error(err);
    })
}

export { questionType, Question, MultipleChoiceQuestion, TrueFalseQuestion, ShortAnswerQuestion, FillInTheBlankQuestion, ConstructedResponseQuestion, SortingQuestion, TrueFalseTHPTQuestion,
  getQuestionsByTeacher, getQuestionsFilterByTeacher, deleteQuestion }