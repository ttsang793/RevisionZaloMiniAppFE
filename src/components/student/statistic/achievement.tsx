import { Text } from "zmp-ui"

type Achievement = {
  id: number,
  name: string,
  description: string,
  image: string
}

const AchievementRow = ({ achievement, achieved = false }: { achievement: Achievement, achieved?: boolean }) => {
  return (
    <div className="grid grid-cols-[64px_1fr] border-1 zaui-border-gray-30">
      <div className="p-1">
      <img src={achievement.image} alt="" className={achieved ? "size-14 rounded-full" : "grayscale size-14 rounded-full"} />
      </div>

      <div className="p-1">
        <Text.Title>{achieved ? achievement.name : "???"}</Text.Title>
        <Text size="small" className="italic">{achievement.description}</Text>
      </div>
    </div>
  )
}

export default AchievementRow;