import { render_api } from "@/script/util";

const UserStorage = {
  getId: () => Number(sessionStorage.getItem("id")) || 0,
  getRole: () => sessionStorage.getItem("role") || "",
  getAvatar: () => sessionStorage.getItem("avatar") || "",
  getSubjectId: () => sessionStorage.getItem("subjectId") || "",
  getSubjectName: () => sessionStorage.getItem("subjectName") || "",
  getQuestionMC: () => sessionStorage.getItem("questionMC") || "",
  getQuestionTF: () => sessionStorage.getItem("questionTF") || "",
  getQuestionSA: () => sessionStorage.getItem("questionSA") || "",
  getQuestionGF: () => sessionStorage.getItem("questionGF") || "",
  getQuestionST: () => sessionStorage.getItem("questionST") || "",
  getGrade: () => Number(sessionStorage.getItem("grade")) || -1,
  
  setUserData: (data: any) => {
    sessionStorage.setItem("id", data.id);
    sessionStorage.setItem("role", data.role);
    sessionStorage.setItem("avatar", data.avatar);
  },

  clearStudentData: () => {
    sessionStorage.removeItem("grade");
  },

  setStudentData: (data: any) => {
    sessionStorage.setItem("grade", data.grade);
  },

  clearTeacherData: () => {
    sessionStorage.removeItem("avatar");
    sessionStorage.removeItem("subjectId");
    sessionStorage.removeItem("subjectName");
    sessionStorage.removeItem("questionMC");
    sessionStorage.removeItem("questionTF");
    sessionStorage.removeItem("questionSA");
    sessionStorage.removeItem("questionGF");
    sessionStorage.removeItem("questionST");
  },

  setTeacherData: (data: any) => {
    sessionStorage.setItem("subjectId", data.id);
    sessionStorage.setItem("subjectName", data.name);
    sessionStorage.setItem("questionMC", data.questionMC);
    sessionStorage.setItem("questionTF", data.questionTF);
    sessionStorage.setItem("questionSA", data.questionSA);
    sessionStorage.setItem("questionGF", data.questionGF);
    sessionStorage.setItem("questionST", data.questionST);
  },
  
  clear: () => sessionStorage.clear()
};

class User {
  id?: number;
  zaloId?: string;
  name: string = "";
  avatar: string = "https://res.cloudinary.com/dqxhmt5sp/image/upload/default_uqpoz0.jpg";
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
  return render_api.get(`/api/user/${zaloId}`);
}

function getStudentById(studentId = UserStorage.getId()) {
  return render_api.get(`/api/student/${studentId}`);
}

async function addStudent(student: Student): Promise<any> {
  try {
    const response = await render_api.post("/api/student", student, {
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
    const response = await render_api.put(`/api/student/${student.id}`, student, {
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
    const studentId = UserStorage.getId();
    const response = await render_api.delete(`/api/student/${studentId}`);
    return response;
  }
  catch (err) {
    console.error(err);
    return 500;
  }
}

function getTeacherById(teacherId = UserStorage.getId()) {
  return render_api.get(`/api/teacher/${teacherId}`);
}

async function getTeacherSubjectById(teacherId = UserStorage.getId()) {
  return await render_api.get(`/api/teacher/${teacherId}/subject`);
}

async function addTeacher(teacher: Teacher): Promise<any> {
  try {
    const response = await render_api.post("/api/teacher", teacher, {
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
    const response = await render_api.put(`/api/teacher/${teacher.id}`, teacher, {
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
    const teacherId = UserStorage.getId();
    const response = await render_api.delete(`/api/teacher/${teacherId}`);
    return response;
  }
  catch (err) {
    return err;
  }
}

async function vertifyAdmin(admin: AdminLogin): Promise<any> {
  try {
    const response = await render_api.post("/api/admin", admin, {
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
    const response = await render_api.post("/api/admin/reset-password", admin, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch (err) {
    return err;
  }
}

export { UserStorage, getUserByZaloId,
          Student, getStudentById, addStudent, updateStudent, deleteStudent,
          Teacher, getTeacherById, getTeacherSubjectById, addTeacher, updateTeacher, deleteTeacher,
          Admin, AdminLogin, AdminResetPassword, vertifyAdmin, resetPassword }