import axios from "axios";

const studentId = Number(sessionStorage.getItem("id"));

class StudentReminder {
  id!: number;
  date: boolean[] = [false, false, false, false, false, false, false];
  hour: string = "00:00";
  isActive: boolean = true;
}

async function getFavorite() {
  return axios.get(`/api/student/favorite/${studentId}`);
}

async function isFavorite(examId: number) {
  return axios.get(`/api/student/favorite/${studentId}/${examId}`);
}

async function handleFavorite(examId: number): Promise<any> {
  try {
    const response = await axios.put(`/api/student/favorite/${studentId}/${examId}`);
    return response;
  }
  catch(err) {
    return err;
  }
}

async function getHistory() {
  return axios.get(`/api/student/history/${studentId}`);
}

async function handleHistory(examId: number): Promise<any> {
  try {
    const response = await axios.put(`/api/student/history/${studentId}/${examId}`);
    return response;
  }
  catch(err) {
    return err;
  }
}

async function updateAllowingSaveHistory(): Promise<any> {
  try {
    const response = await axios.put(`/api/student/history/${studentId}/allow-save`);
    return response;
  }
  catch(err) {
    return err;
  }
}

async function deleteHistory(historyId: number): Promise<any> {
  try {
    const response = await axios.delete(`/api/student/history/${historyId}`);
    return response;
  }
  catch(err) {
    return err;
  }
}

async function deleteAllHistories(): Promise<any> {
  try {
    const response = await axios.delete(`/api/student/history/${studentId}/all`);
    return response;
  }
  catch(err) {
    return err;
  }
}

async function getFollowing(teacherId: number) {
  return axios.get(`/api/student/follow/${studentId}/${teacherId}`);
}

async function following(teacherId: number): Promise<any> {
  try {
    const response = await axios.put(`/api/student/follow/${studentId}/${teacherId}`)
    return response;
  }
  catch(err) {
    return err;
  }
}

async function getReminder() {
  return axios.get(`/api/student/reminder/${studentId}`);
}

async function addReminder(): Promise<any> {
  try {
    const response = axios.post(`/api/student/reminder/${studentId}`);
    return response;
  }
  catch(err) {
    return err;
  }
}

async function updateReminder(id: Number, reminder: StudentReminder): Promise<any> {
  try {
    const response = axios.put(`/api/student/reminder/${id}`, reminder, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  }
  catch(err) {
    return err;
  }
}

async function deleteReminder(id: Number): Promise<any> {
  try {
    const response = axios.delete(`/api/student/reminder/${id}`);
    return response;
  }
  catch(err) {
    return err;
  }
}

export { getFavorite, isFavorite, handleFavorite,
          getHistory, handleHistory, updateAllowingSaveHistory, deleteHistory, deleteAllHistories,
          getFollowing, following,
          StudentReminder, getReminder, addReminder, updateReminder, deleteReminder }