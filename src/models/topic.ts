import axios from "axios";
import { Subject } from "./subject";

type Topic = {
  id?: string,
  name: string,
  grades: Array<number>,
  subjectId?: string,
  subject?: Subject
  isVisible?: boolean
};

const getTopics = async () => {
  const list = await axios.get("/api/topic");
  return list.data;
}

const getActiveTopics = async () => {
  const response = await axios.get("/api/topic/active");
  return response.data;
}

const getTopicsBySubject = async (subjectId: number) => {
  const response = await axios.get(`/api/topic/subject/${subjectId}`);
  return response.data;
}

const getTopicById = async (id: string) => {
  const response = await axios.get(`/api/topic/${id}`);
  return (response.status === 200) ? response.data : null;
}

const getTopicByName = async (name: string) => {
  const list = await axios.get(`/api/topic?name=${name}`);
  return list.data;
}

const insertTopic = async (topic: Topic): Promise<any> => {
  try {
    const response = await axios.post("/api/topic/", topic);
    return response;
  }
  catch (err) {
    return err;
  }
}

const updateTopic = async (topic: Topic): Promise<any> => {
  try {
    const response = axios.put(`/api/topic/${topic.id}`, topic)
    return response;
  }
  catch (err) {
    return err;
  }
}

const deleteTopic = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(`/api/topic/${id}`);
    return response;
  }
  catch (err) {
    return err;
  }
}

export { Topic, getTopics, getActiveTopics, getTopicsBySubject, getTopicById, getTopicByName, insertTopic, updateTopic, deleteTopic }