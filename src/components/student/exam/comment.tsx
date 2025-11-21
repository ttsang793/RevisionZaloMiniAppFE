import CommentFirst from "./comment-first";
import CommentReply from "./comment-reply";
import { Text, Input, Box } from "zmp-ui"
import { useState, useEffect, FormEvent, Fragment } from "react";
import { Comment, getCommentsByExamId, insertComment, deleteComment } from "@/models/comment";
import { Send } from "react-bootstrap-icons";

const CommentBlock = ({id}) => {
  const { TextArea } = Input;
  const [commentList, setCommentList] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const userId = Number(sessionStorage.getItem("id"));
  const avatar = sessionStorage.getItem("avatar");

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Box className="section-container">
      <Text bold size="large">Bình luận</Text>

      <form className="flex gap-x-2" onSubmit={handleSubmit}>
        <img src={avatar} className="size-[48px] rounded-full" />
        <TextArea
          placeholder="Nhập bình luận tại đây"
          suffix={<button><Send size={24}/></button>}
          className="pe-2" value={commentContent}
          onChange={e => setCommentContent(e.target.value)}
        />
      </form>

      {
        commentList.map((c: Comment) => 
          <Fragment key={`comment-${c.id}`}>
            <CommentFirst comment={c} examId={id} userId={userId} handleDelete={handleDelete} loadData={loadData} />
            {c.replies!.map((r: Comment) => <CommentReply comment={r} examId={id} userId={userId} handleDelete={handleDelete} key={`comment-${r.id}`} loadData={loadData} />)}
          </Fragment>
        )
      }
    </Box>
  )

  async function loadData() {
    setCommentContent("");
    getCommentsByExamId(id).then(response => setCommentList(response.data));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const comment: Comment = { examId: id, userId, content: commentContent }    
    const insertStatus = await insertComment(comment);    
    if (insertStatus == 201) loadData();
  }

  async function handleDelete(id: number) {
    const deleteStatus = await deleteComment(id);
    if (deleteStatus == 200) loadData();
  }
}

export default CommentBlock;