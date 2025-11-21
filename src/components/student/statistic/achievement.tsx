import { Text } from "zmp-ui"

type Achievement = {
  id: number,
  name: string,
  description: string,
  image: string,
  status: boolean
}

const AchievementRow = ({ achievement }: { achievement: Achievement }) => {
  return (
    <div className="grid grid-cols-[64px_1fr] border-1 zaui-border-gray-30">
      <div className="p-1">
      <img src={achievement.image} alt="" className={achievement.status ? "size-14 rounded-full" : "grayscale size-14 rounded-full"} />
      </div>

      <div className="p-1">
        <Text.Title>{achievement.status ? achievement.name : "???"}</Text.Title>
        <Text size="small" className="italic">{achievement.description}</Text>
      </div>
    </div>
  )
}

export default AchievementRow;