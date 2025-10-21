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

export { Student, addStudent }