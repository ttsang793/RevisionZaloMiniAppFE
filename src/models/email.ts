import axios from "axios";

class EmailDTO {
  toId: number;
  textValue: string;

  constructor(toId: number, textValue: string) {
    this.toId = toId;
    this.textValue = textValue;
  }
}

async function notifyWhenComment(toId: number, examTitle: string): Promise<any> {
  try {
    const email: EmailDTO = new EmailDTO(toId, examTitle);
    await axios.post("/api/email/comment", email, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  catch (err) {
    console.error(err);
  }
}

async function notifyWhenNewTurnIn(toId: number, examTitle: string): Promise<any> {
  try {
    const email: EmailDTO = new EmailDTO(toId, examTitle);
    await axios.post("/api/email/turn-in", email, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  catch (err) {
    console.error(err);
  }
}

async function notifyWhenNewExam(teacherId: number, teacherName: string): Promise<any> {
  try {
    const email: EmailDTO = new EmailDTO(teacherId, teacherName);
    await axios.post("/api/email/exam", email, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  catch (err) {
    console.error(err);
  }
}


async function notifyWhenFinishGrading(toId: number, teacherName: string): Promise<any> {
  try {
    const email: EmailDTO = new EmailDTO(toId, teacherName);
    await axios.post("/api/email/grading", email, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  catch (err) {
    console.error(err);
  }
}

export { notifyWhenComment, notifyWhenNewTurnIn, notifyWhenFinishGrading, notifyWhenNewExam }