import axios from "axios";

const studentId = Number(sessionStorage.getItem("id"));

async function getFavorite() {
  return axios.get(`/api/student/favorite/${studentId}`);
}

async function handleFavorite(examId: number) {
  axios.put(`/api/student/favorite/${studentId}/${examId}`)
  .then(response => {
    console.log(response);
  }).catch(err => {
    console.error(err);
  })
}

async function getHistory() {
  return axios.get(`/api/student/history/1`);
}

async function handleHistory(examId: number) {
  axios.put(`/api/student/history/${studentId}/${examId}`)
  .then(response => {
    console.log(response);
  }).catch(err => {
    console.error(err);
  })
}

async function deleteAllHistories() {
  axios.delete(`/api/student/history/${studentId}`)
  .then(response => {
    console.log(response);
  }).catch(err => {
    console.error(err);
  })
}

async function handleFollowing(teacherId: number) {
  axios.put(`/api/student/follow/${studentId}/${teacherId}`)
  .then(response => {
    console.log(response);
  }).catch(err => {
    console.error(err);
  })
}

export { getFavorite, handleFavorite, getHistory, handleHistory, deleteAllHistories, handleFollowing }