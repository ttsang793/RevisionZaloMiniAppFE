import axios from "axios";

const id = Number(sessionStorage.getItem("id"));

class User {
  id?: number;
  zaloId?: string;
  name: string = "";
  avatar: string = "/avatar/default.jpg";
  email: string = "";
}

class Student extends User {
}

class Teacher extends User {
  subjectId: string = "-1";
  grades: number[] = [];
  introduction?: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

class Admin extends User {
  username: string = "";
  password: string = ""
}

class AdminLogin {
  id: string = "";
  password: string = ""  
}

class AdminResetPassword {
  id?: number;
  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword?: string;
}

function getUserByZaloId(zaloId: string) {
  return axios.get(`/api/user/${zaloId}`);
}

function getStudentById() {
  return axios.get(`/api/student/${id}`);
}

async function addStudent(userInfo, email): Promise<number> {
  const student = new Student()
  student.zaloId = userInfo.id;
  student.name = userInfo.name;
  student.avatar = userInfo.avatar;
  student.email = email;

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

function updateStudent(student: Student) {
  axios.put(`/api/student/${student.id}`, student, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

async function deleteStudent() : Promise<number> {
  try {
    const response = await axios.delete(`/api/student/${id}`);
    return response.data;
  }
  catch (err) {
    console.error(err);
    return 500;
  }
}

function getTeacherById() {
  return axios.get(`/api/teacher/${id}`);
}

async function getTeacherSubjectById(id) {
  const response = await axios.get(`/api/teacher/${id}/subject`);
  return response.data;
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
  axios.put(`/api/teacher/${teacher.id}`, teacher, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

async function deleteTeacher(): Promise<number> {
  try {
    const response = await axios.delete(`/api/teacher/${id}`);
    return response.data;
  }
  catch (err) {
    console.error(err);
    return 500;
  }
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

async function resetPassword(admin: AdminResetPassword): Promise<any> {
  try {
    const response = await axios.post("/api/admin/reset-password", admin, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }
}

export { getUserByZaloId,
          Student, getStudentById, addStudent, updateStudent, deleteStudent,
          Teacher, getTeacherById, getTeacherSubjectById, addTeacher, updateTeacher, deleteTeacher,
          Admin, AdminLogin, AdminResetPassword, vertifyAdmin, resetPassword }