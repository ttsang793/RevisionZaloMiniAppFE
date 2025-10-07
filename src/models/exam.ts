import axios from "axios";

class Exam {
  id?: string;
  examType?: number;
  displayType: "NORMAL" | "PDF" = "NORMAL";
  title?: string;
  grade: number = -1;
  timeLimit: number = 0;
  allowTurnInTime: number = 0;
  allowShowScore: boolean = false;
  allowPartSwap: boolean = false;
  allowQuestionSwap: boolean = false;
  allowAnswerSwap: boolean = false;
}

function insertExam(exam: Exam) {
  axios.post("/api/exam", exam, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { Exam, insertExam }