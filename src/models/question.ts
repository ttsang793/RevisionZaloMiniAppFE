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
  answerKey?: number;
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

function getQuestionsByTeacher() {
  return axios.get(`/api/question`);
}

function getQuestionsFilterByTeacher() {
  return axios.get(`/api/question/filter`);
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

export { Question, MultipleChoiceQuestion, TrueFalseQuestion, ShortAnswerQuestion, FillInTheBlankQuestion, ConstructedResponseQuestion, SortingQuestion, TrueFalseTHPTQuestion,
  getQuestionsByTeacher, getQuestionsFilterByTeacher, deleteQuestion }