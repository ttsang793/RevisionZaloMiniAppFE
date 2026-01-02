import { render_api } from "@/script/util";
import { Subject } from "./subject";
import { UserStorage } from "./user";

type Topic = {
  id?: string,
  name: string,
  grades: Array<number>,
  subjectId?: string,
  subject?: Subject
  isVisible?: boolean
};

const getTopics = async () => {
  const list = await render_api.get("/api/topic");
  return list.data;
}

const getActiveTopicByGrades = async (grade: number) => {
  const subjectId = UserStorage.getSubjectId();
  return render_api.get(`/api/topic/${subjectId}/${grade}/active`);
}

const getTopicsBySubject = async (subjectId: number) => {
  const response = await render_api.get(`/api/topic/subject/${subjectId}`);
  return response.data;
}

const getTopicById = async (id: string) => {
  const response = await render_api.get(`/api/topic/${id}`);
  return (response.status === 200) ? response.data : null;
}

const getTopicByName = async (name: string) => {
  const list = await render_api.get(`/api/topic?name=${name}`);
  return list.data;
}

const insertTopic = async (topic: Topic): Promise<any> => {
  try {
    const response = await render_api.post("/api/topic/", topic);
    return response;
  }
  catch (err) {
    return err;
  }
}

const updateTopic = async (topic: Topic): Promise<any> => {
  try {
    const response = render_api.put(`/api/topic/${topic.id}`, topic)
    return response;
  }
  catch (err) {
    return err;
  }
}

const deleteTopic = async (id: string): Promise<any> => {
  try {
    const response = await render_api.delete(`/api/topic/${id}`);
    return response;
  }
  catch (err) {
    return err;
  }
}

export { Topic, getTopics, getActiveTopicByGrades, getTopicsBySubject, getTopicById, getTopicByName, insertTopic, updateTopic, deleteTopic }