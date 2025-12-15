import { render_api } from "@/script/util";

async function updateStudentStatus(studentId: number, key: string, status: boolean): Promise<any> {
  try {
    const response = await render_api.put(`/api/notification/student/${studentId}?key=${key}&status=${status}`);
    return response;
  }
  catch (err) {
    return err;
  }
}

async function updateTeacherStatus(teacherId: number, key: string, status: boolean): Promise<any> {
  try {
    const response = await render_api.put(`/api/notification/teacher/${teacherId}?key=${key}&status=${status}`);
    return response;
  }
  catch (err) {
    return err;
  }
}

export { updateStudentStatus, updateTeacherStatus }