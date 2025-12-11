import CommentFirst from "./comment-first";
import CommentReply from "./comment-reply";
import { Text, Input, Box, useSnackbar } from "zmp-ui"
import { useState, useEffect, FormEvent, Fragment } from "react";
import { Comment, getCommentsByExamId, insertComment, deleteComment } from "@/models/comment";
import { Send } from "react-bootstrap-icons";
import { notifyWhenComment } from "@/models/email";

const CommentBlock = ({id, title}: {id: number, title?: string}) => {
  const { TextArea } = Input;
  const [commentList, setCommentList] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const userId = Number(sessionStorage.getItem("id"));
  const avatar = sessionStorage.getItem("avatar") || "/avatar/default.jpg";
  const { openSnackbar } = useSnackbar();

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
        commentList.length === 0 ? <Text className="text-center text-sm italic mt-2 text-gray-400">Chưa có bình luận!</Text> :
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
    if (insertStatus == 201) {
      loadData();
      if (title) await notifyWhenComment(id, title);
    }
    else {
      openSnackbar({
        text: "Lỗi hệ thống, bình luận thất bại!",
        type: "error"
      })
    }
  }

  async function handleDelete(id: number) {
    const deleteStatus = await deleteComment(id);
    if (deleteStatus == 200) loadData();
    else {
      openSnackbar({
        text: "Lỗi hệ thống, xóa bình luận thất bại!",
        type: "error"
      })
    }
  }
}

export default CommentBlock;