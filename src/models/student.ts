import axios from "axios";

const studentId = Number(sessionStorage.getItem("id"));

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

export { getFavorite, isFavorite, handleFavorite,
          getHistory, handleHistory, updateAllowingSaveHistory, deleteHistory, deleteAllHistories,
          getFollowing, following }