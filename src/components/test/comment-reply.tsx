import { Text, Avatar } from "zmp-ui"

const CommentReply = () => {
  return (
    <div className="ms-9 py-1 grid grid-cols-[32px_1fr] gap-x-2 text-justify">
      <Avatar size={32} src="/avatar/default.jpg" />
      <div>
        <Text bold>Trần Văn A</Text>
        <Text size="xxSmall">Giá trị cực tiểu nghĩa là y của điểm cực tiểu của đồ thị nhé, không phải x.</Text>
      </div>
    </div>
  )
}

export default CommentReply;