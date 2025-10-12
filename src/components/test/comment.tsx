import CommentFirst from "./comment-first";
import CommentReply from "./comment-reply";
import { Text, Input, List } from "zmp-ui"
import { useState, useEffect, FormEvent } from "react";
import { Comment, getCommentsByExamId, insertComment, deleteComment } from "@/models/comment";
import { Send } from "react-bootstrap-icons";

const CommentBlock = ({id}) => {
  const { TextArea } = Input;
  const [commentList, setCommentList] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div className="section-container">
      <Text bold size="large">Bình luận</Text>

      <form className="flex gap-x-2" onSubmit={handleSubmit}>
        <img src="/avatar/default.jpg" className="size-[48px] rounded-full" />
        <TextArea
          placeholder="Nhập bình luận tại đây"
          suffix={<button><Send size={24}/></button>}
          className="pe-2" value={commentContent}
          onChange={e => setCommentContent(e.target.value)}
        />
      </form>

      {
        commentList.map((c: Comment) => <CommentFirst comment={c} handleDelete={handleDelete} key={`comment-${c.id}`} loadData={loadData} />)
      }
    </div>
  )

  async function loadData() {
    setCommentContent("");
    getCommentsByExamId(id).then(response => setCommentList(response.data));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const comment: Comment = { examId: id, userId: 1, content: commentContent }    
    const insertStatus = await insertComment(comment);    
    if (insertStatus == 201) loadData();
  }

  async function handleDelete(id: number) {
    const deleteStatus = await deleteComment(id);
    if (deleteStatus == 200) loadData();
  }
}

export default CommentBlock;