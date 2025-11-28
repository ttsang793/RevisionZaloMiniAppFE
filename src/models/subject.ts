import axios from "axios";

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
  const response = await axios.get("/api/subject");
  return response.data;
}

const getActiveSubjects = async () => {
  const response = await axios.get("/api/subject/active");
  return response.data;
}

const getSubjectsByGrade = async (grade: number) => {
  const response = await axios.get(`/api/subject/grade/${grade}`);
  return response.data;
}

const getSubjectById = async (id: string) => {
  const response = await axios.get(`/api/subject/${id}`);
  return (response.status === 200) ? response.data : null;
}

const insertSubject = async (subject: Subject): Promise<any> => {
  try {
    const response = await axios.post(`/api/subject`, subject);
    return response;
  }
  catch (err) {
    return err;
  }
}

const updateSubject = async (subject: Subject): Promise<any> => {
  try {
    const response = await axios.put(`/api/subject/${subject.id}`, subject);
    return response;
  }
  catch (err) {
    return err;
  }
}

const deleteSubject = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(`/api/subject/${id}`);
    return response;
  }
  catch (err) {
    return err;
  }
}

export { Subject, getSubjects, getActiveSubjects, getSubjectsByGrade, getSubjectById, insertSubject, updateSubject, deleteSubject };