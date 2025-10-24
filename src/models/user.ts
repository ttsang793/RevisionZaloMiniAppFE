import axios from "axios";

class User {
  id?: number;
  zaloId?: string;
  name: string = "";
  avatar: string = "/avatar/default.jpg";
}

class Student extends User {
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

function getStudentById(id: number = 1) {
  return axios.get(`/api/student/${id}`);
}

async function addStudent(userInfo): Promise<number> {
  const student = new Student()
  student.zaloId = userInfo.id;
  student.name = userInfo.name;
  student.avatar = userInfo.avatar;

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

async function deleteStudent(id: number) : Promise<number> {
  try {
    const response = await axios.delete(`/api/student/${id}`);
    return response.data;
  }
  catch (err) {
    console.error(err);
    return 500;
  }
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
  axios.put(`/api/teacher/${teacher.id}`, teacher, {
    headers: { "Content-Type": "application/json" }
  }).then(response => {
    console.log(response.status);
  }).catch(err => {
    console.error(err);
  })
}

async function deleteTeacher(id: number): Promise<number> {
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

export { Student, getStudentById, addStudent, updateStudent, deleteStudent,
          Teacher, getTeacherById, addTeacher, updateTeacher, deleteTeacher,
          Admin, AdminLogin, vertifyAdmin }