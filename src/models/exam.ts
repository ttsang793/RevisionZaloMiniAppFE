type Exam = {
  id: string,
  examType: number,
  displayType: "NORMAL" | "PDF",
  name?: string,
  grade: number,
  timeLimit: string,
  allowTurnInTime: string,
  allowShowScore: boolean,
  allowPartSwap: boolean,
  allowQuesionSwap: boolean,
  allowAnswerSwap: boolean
}

export { Exam }