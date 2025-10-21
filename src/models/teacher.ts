import axios from "axios";

class User {
  id?: number;
  zaloId?: string;
  name: string = "";
  avatar?: string = "";
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

class AdminLogin {
  id: string = "";
  password: string = ""  
}

function getTeacherById(id: number = 2) {
  return axios.get(`/api/teacher/${id}`);
}

async function addTeacher(teacher: Teacher): Promise<number> {
  try {
    const response = await axios.post("/api/teacher", teacher, {
      headers: { "Content-Type": "application/json" }
    });
    return response.status;
  }
  catch (err) {
    console.error(err);
    return 500;
  }
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

async function vertifyAdmin(admin: AdminLogin): Promise<any> {
  try {
    const response = await axios.post("/api/admin", admin, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }
}

export { Student, Teacher, Admin, AdminLogin,
          getTeacherById, addTeacher, updateTeacher,
          vertifyAdmin }