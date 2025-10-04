import axios from "axios";
import { Subject } from "./subject";

type Topic = {
  id?: string,
  name: string,
  classes: Array<number>,
  subjectId?: string,
  subject?: Subject
  isVisible?: boolean
};

const getTopics = async () => {
  const list = await axios.get("/api/topic");
  return list.data;
}

const getTopicById = async (id: string) => {
  const response = await axios.get(`/api/topic/${id}`);
  return (response.status === 200) ? response.data : null;
}

const getTopicByName = async (name: string) => {
  const list = await axios.get(`/api/topic?name=${name}`);
  return list.data;
}

const insertTopic = (topic: Topic) => {
  if (confirm("Bạn có muốn thêm chủ đề cho môn học này?")) {
    axios.post(`/api/topic`, topic)
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

const updateTopic = (topic: Topic) => {
  if (confirm("Bạn có muốn cập nhật chủ đề này?")) {
    axios.put(`/api/topic/${topic.id}`, topic)
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

const deleteTopic = (id: string, isVisible: boolean) => {
  if (confirm(`Bạn có muốn ${isVisible ? "ẩn" : "hiện"} chủ đề này?`)) {
    axios.delete(`/api/topic/visible/${id}`)
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

export { Topic, getTopics, getTopicById, getTopicByName, insertTopic, updateTopic, deleteTopic }