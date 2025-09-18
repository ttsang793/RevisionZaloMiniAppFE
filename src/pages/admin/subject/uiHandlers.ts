import axios from "axios";

type Subject = {
  id: string,
  name: string,
  classes: Array<number>,
  questionTN: boolean,
  questionDS: boolean,
  questionTLN: boolean,
  questionDVCT: boolean,
  questionTL: boolean,
  questionSX: boolean,
  isVisible: boolean
}

const getSubjectById = async (id: string) => {
  const response = await axios.get(`/api/subject/get/${id}`);
  return (response.status === 200) ? response.data : null;
}

const insertSubject = (subject: Subject) => {
  if (confirm("Bạn có muốn thêm môn học này?")) {
    axios.post(`/api/subject`, subject)
    .then(response => {
      if (response.status === 201) {
        alert("Thêm thành công!");
        location.reload();
      }
      else {
        alert("Thêm thất bại!")
        console.error(response);
      }
    })
    .catch(exception => {
      alert("Thêm thất bại!");
      console.error(exception);
    })
  }
}

const updateSubject = (subject: Subject) => {
  if (confirm("Bạn có muốn cập nhật môn học này?")) {
    axios.put(`/api/subject/update/${subject.id}`, subject)
    .then(response => {
      if (response.status === 200) {
        alert("Cập nhật thành công!");
        location.reload();
      }
      else {
        alert("Cập nhật thất bại!")
        console.error(response);
      }
    })
    .catch(exception => {
      alert("Cập nhật thất bại!");
      console.error(exception);
    })
  }
}

const deleteSubject = (id: string) => {
  if (confirm("Bạn có muốn thay đổi trạng thái ẩn/hiện của môn học này?")) {
    axios.delete(`/api/subject/visible/${id}`)
    .then(response => {
      if (response.status === 200) {
        alert("Thay đối trạng thái thành công!");
        location.reload();
      }
      else {
        alert("Thay đổi trạng thái thất bại!")
        console.error(response);
      }
    })
    .catch(exception => {
      alert("Thay đổi trạng thái thất bại!");
      console.error(exception);
    })
  }
}

export { Subject, getSubjectById, insertSubject, updateSubject, deleteSubject };