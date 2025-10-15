import axios from "axios";

class User {
  id?: number;
  name: string = ""
}

class Student extends User {
  realName?: string = ""
}

class Teacher extends User {
  role: string = "teacher";
  subjectId: string = "-1";
  grades: number[] = [];
  introduction?: string;
}

class Admin extends User {
  username: string = "";
  password: string = ""
}

function getTeacherById(id: number = 2) {
  return axios.get(`/api/teacher/${id}`);
}

function updateTeacher(teacher: Teacher) {
  axios.put("/api/teacher", teacher, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

export { Student, Teacher, Admin, getTeacherById, updateTeacher }