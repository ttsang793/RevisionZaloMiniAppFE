import { render_api } from "@/script/util";

type Subject = {
  id: string,
  name: string,
  grades: Array<number>,
  questionMC: boolean,
  questionTF: boolean,
  questionSA: boolean,
  questionGF: boolean,
  questionST: boolean,
  isVisible?: boolean
}

const getSubjects = async () => {
  const response = await render_api.get("/api/subject");
  return response.data;
}

const getActiveSubjects = async () => {
  const response = await render_api.get("/api/subject/active");
  return response.data;
}

const getSubjectsByGrade = async (grade: number) => {
  const response = await render_api.get(`/api/subject/grade/${grade}`);
  return response.data;
}

const getSubjectById = async (id: string) => {
  const response = await render_api.get(`/api/subject/${id}`);
  return (response.status === 200) ? response.data : null;
}

const getSubjectGradesById = async (id: string) => {
  return await render_api.get(`/api/subject/${id}/grade`);
}

const insertSubject = async (subject: Subject): Promise<any> => {
  try {
    const response = await render_api.post(`/api/subject`, subject);
    return response;
  }
  catch (err) {
    return err;
  }
}

const updateSubject = async (subject: Subject): Promise<any> => {
  try {
    const response = await render_api.put(`/api/subject/${subject.id}`, subject);
    return response;
  }
  catch (err) {
    return err;
  }
}

const deleteSubject = async (id: string): Promise<any> => {
  try {
    const response = await render_api.delete(`/api/subject/${id}`);
    return response;
  }
  catch (err) {
    return err;
  }
}

export { Subject, getSubjects, getActiveSubjects, getSubjectsByGrade, getSubjectById, getSubjectGradesById, insertSubject, updateSubject, deleteSubject };