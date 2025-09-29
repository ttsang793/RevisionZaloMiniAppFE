import { Text, Switch } from "zmp-ui";
import { X } from "react-bootstrap-icons";

const SettingAlarm = () => {
  return (
    <div className="pb-2 mb-2 border-b border-gray-200 grid grid-cols-[1fr_64px] items-center">
      <div>
        <Text.Title size="xLarge">20:00</Text.Title>
        <ul>
          <li className="inline text-xs">T2 </li>
          <li className="inline text-xs">T3 </li>
          <li className="inline text-xs">T4 </li>
          <li className="inline text-xs">T5 </li>
          <li className="inline text-xs">T6 </li>
          <li className="inline text-xs">T7 </li>
          <li className="inline text-xs">CN</li>
        </ul>
      </div>

      
      <div className="flex">
        <Switch />
        <X size={24} />
      </div>
    </div>
  )
}

export default SettingAlarm;