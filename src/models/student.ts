import axios from "axios";

class Student {
  zaloId: string = "";
  name: string = "";
  avatar?: string;
  role = "student";

  constructor(zaloId: string, name: string, avatar?: string) {
    this.zaloId = zaloId;
    this.name = name;
    this.avatar = avatar;
  }
}

async function addStudent(userInfo): Promise<number> {
  const student = new Student(userInfo.id, userInfo.name, userInfo.avatar);

  try {
    const response = await axios.post("/api/student", student, {
      headers: { "Content-Type": "application/json" }
    });
    return response.status;
  }
  catch (err) {
    console.error(err);
    return 500;
  }
}

async function getFavorite() {
  return axios.get(`/api/student/favorite/1`);
}

async function handleFavorite(examId: number) {
  axios.put(`/api/student/favorite?examId=${examId}&studentId=1`)
  .then(response => {
    console.log(response);
  }).catch(err => {
    console.error(err);
  })
}

export { Student, addStudent, getFavorite, handleFavorite }