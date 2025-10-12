import axios from "axios"

class Comment {
  id?: number;
  examId?: number;
  userId: number = 1;
  userName?: string;
  userAvatar?: string;
  replyTo?: number;
  content: string = "";
  replyToNavigation?: Comment;
}

function getCommentsByExamId(examId: number) {
  return axios.get(`/api/comment/${examId}`);
}

async function insertComment(c: Comment): Promise<number> {
  try {
    const response = await axios.post("/api/comment", c, {
      headers: { "Content-Type": "application/json" },
    });
    return response.status;
  }
  catch (err) {
    console.error(err);
    return 400;
  }
}

async function deleteComment(id: number): Promise<number> {
  try {
    const response = await axios.delete(`/api/comment/${id}`);
    return response.status;
  }
  catch (err) {
    console.error(err);
    return 400;
  }
}

export { Comment, getCommentsByExamId, insertComment, deleteComment }