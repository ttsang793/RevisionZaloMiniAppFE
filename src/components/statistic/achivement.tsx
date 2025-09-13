import { Text } from "zmp-ui"

const Achivement = ({ achived = false }) => {
  return (
    <div className="grid grid-cols-[64px_1fr] border-1 zaui-border-gray-30">
      <div className="p-1">
      <img src="/avatar/mystery.jpg" alt="" className={achived ? "size-14 rounded-full" : "grayscale size-14 rounded-full"} />
      </div>

      <div className="p-1">
        <Text.Title>{achived ? "Máy hoàn thành bài" : "???"}</Text.Title>
        <Text size="small" className="italic">Hoàn thành xong bài kiểm tra đầu tiên</Text>
      </div>
    </div>
  )
}

export default Achivement;