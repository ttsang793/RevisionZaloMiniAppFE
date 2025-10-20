import { Text, Avatar } from "zmp-ui"
import { ReplyFill, XLg } from "react-bootstrap-icons";
import { useState } from "react";
import CommentReplyInput from "./comment-reply-input";

const CommentReply = ({comment, handleDelete, loadData}) => {
  const [showReply, setShowReply] = useState(false);

  return (
    <>
      <div className="ms-9 py-1 grid grid-cols-[32px_1fr] gap-x-2 text-justify">
        <Avatar size={32} src="/avatar/default.jpg" />
        <div className="flex">
          <div className="flex-1 me-1">
            <Text bold>{comment.userName}</Text>
            <Text size="xxSmall">{comment.content}</Text>       
          </div>

          <button onClick={() => setShowReply(true)}>
            <ReplyFill size={24} />
          </button>

          <button onClick={() => handleDelete(comment.id)}>
            <XLg size={24} />
          </button>
        </div>
      </div>

      <CommentReplyInput showReply={showReply} setShowReply={setShowReply} replyTo={comment.replyTo} loadData={loadData} />
    </>
  )
}

export default CommentReply;