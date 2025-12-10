import axios from "axios";

const id = Number(sessionStorage.getItem("id"));

class User {
  id?: number;
  zaloId?: string;
  name: string = "";
  avatar: string = "/avatar/default.jpg";
  email: string = "";
  notification?: boolean[];
}

class Student extends User {
  grade: number = -1;
}

class Teacher extends User {
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

class AdminResetPassword {
  id?: number;
  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword?: string;
}

function getUserByZaloId(zaloId: string) {
  return axios.get(`/api/user/${zaloId}`);
}

function getStudentById(studentId = id) {
  return axios.get(`/api/student/${studentId}`);
}

async function addStudent(student: Student): Promise<any> {
  try {
    const response = await axios.post("/api/student", student, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }
}

async function updateStudent(student: Student): Promise<any> {
  try {
    const response = await axios.put(`/api/student/${student.id}`, student, {
      headers: { "Content-Type": "application/json" }
    })
    return response;
  }
  catch (err) {
    console.error(err);
    return err;
  }
}

async function deleteStudent(): Promise<any> {
  try {
    const response = await axios.delete(`/api/student/${id}`);
    return response;
  }
  catch (err) {
    console.error(err);
    return 500;
  }
}

function getTeacherById(teacherId = id) {
  return axios.get(`/api/teacher/${teacherId}`);
}

async function getTeacherSubjectById(teacherId = id) {
  return await axios.get(`/api/teacher/${teacherId}/subject`);
}

async function addTeacher(teacher: Teacher): Promise<any> {
  try {
    const response = await axios.post("/api/teacher", teacher, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }
}

async function updateTeacher(teacher: Teacher): Promise<any> {
  try {
    const response = await axios.put(`/api/teacher/${teacher.id}`, teacher, {
      headers: { "Content-Type": "application/json" }
    })
    return response;
  }
  catch (err) {
    return err;
  }
}

async function deleteTeacher(): Promise<any> {
  try {
    const response = await axios.delete(`/api/teacher/${id}`);
    return response;
  }
  catch (err) {
    return err;
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