import { render_api } from "@/script/util";
import { UserStorage } from "./user";

class Comment {
  id?: number;
  examId?: number;
  userId: number;
  userName?: string;
  userAvatar?: string;
  replyTo?: number;
  content: string = "";
  replies?: Comment[];

  constructor() {
    this.userId = UserStorage.getId();
  }
}

function getCommentsByExamId(examId: number) {
  return render_api.get(`/api/comment/${examId}`);
}

async function insertComment(c: Comment): Promise<number> {
  try {
    const response = await render_api.post("/api/comment", c, {
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
    const response = await render_api.delete(`/api/comment/${id}`);
    return response.status;
  }
  catch (err) {
    console.error(err);
    return 400;
  }
}

export { Comment, getCommentsByExamId, insertComment, deleteComment }