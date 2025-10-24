import axios from "axios";

async function getFavorite() {
  return axios.get(`/api/student/favorite/1`);
}

async function handleFavorite(examId: number) {
  axios.put(`/api/student/favorite?examId=${examId}&studentId=1`)
  .then(response => {
    console.log(response);
  }).catch(err => {
    console.error(err);
  })
}

export { getFavorite, handleFavorite }