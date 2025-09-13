import { Text, Avatar } from "zmp-ui"

const CommentFirst = () => {
  return (
    <div className="py-1 grid grid-cols-[32px_1fr] gap-x-2 text-justify">
      <Avatar size={32} src="/avatar/default.jpg" />
      <div>
        <Text bold>Quynh Tran</Text>
        <Text size="xxSmall">Thầy ơi, vì sao câu 3 trắc nghiệm thì giá trị cực tiểu của hàm số bằng 10 ạ?</Text>
      </div>
    </div>
  )
}

export default CommentFirst;