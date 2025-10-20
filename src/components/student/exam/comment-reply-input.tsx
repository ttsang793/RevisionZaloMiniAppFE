import { useState, FormEvent } from "react";
import { Text, Avatar, Input } from "zmp-ui";
import { Comment, insertComment } from "@/models/comment";
import { Send, XLg } from "react-bootstrap-icons";

const CommentReplyInput = ({showReply, setShowReply, replyTo, loadData}) => {
  const [commentContent, setCommentContent] = useState("");
  const { TextArea } = Input;

  return (
    <div className={showReply ? "ms-9 py-1 grid grid-cols-[32px_1fr] gap-x-2 text-justify" : "hidden"}>
      <Avatar size={32} src="/avatar/default.jpg" />
      <form onSubmit={handleSubmit}>
        <Text bold>Trần Văn A</Text>        
        <TextArea
          placeholder="Nhập bình luận tại đây"
          suffix={
            <>
              <button className="me-1"><XLg size={24} /></button>
              <button onClick={() => handleReply()}><Send size={24} /></button>
            </>
          }
          className="pe-2" value={commentContent}
          onChange={e => setCommentContent(e.target.value)}
          size="small"
        />
      </form>
    </div>
  )

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowReply(false);
    setCommentContent("");
  }
  
  async function handleReply() {
    const comment: Comment = { examId: 1, userId: 1, content: commentContent, replyTo }
    const replyStatus = await insertComment(comment);    
    if (replyStatus === 201) loadData();
  }
}

export default CommentReplyInput;