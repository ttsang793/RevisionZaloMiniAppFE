"use client"
import CommentFirst from "./comment-first";
import CommentReply from "./comment-reply";
import { Text, Input, List } from "zmp-ui"

const Comment = () => {
  const { TextArea } = Input;

  return (
    <div className="section-container">
      <Text bold size="large">Bình luận</Text>

      <div className="flex gap-x-2">
        <img src="/avatar/default.jpg" className="size-[48px] rounded-full" />
        <TextArea placeholder="Nhập bình luận tại đây" />
      </div>

      <CommentFirst />
      <CommentReply />
      <CommentFirst />
    </div>
  )
}

export default Comment;