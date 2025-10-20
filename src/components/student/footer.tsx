import { BarChart, BarChartFill, Clock, ClockFill, Gear, GearFill, Heart, HeartFill, HouseDoor, HouseDoorFill } from "react-bootstrap-icons"
import { BottomNavigation } from "zmp-ui";

export default function StudentFooter() {
  return (
    <BottomNavigation fixed>
      <BottomNavigation.Item
        icon={<HouseDoor />}
        activeIcon={<HouseDoorFill />}
        key="home"
        label="Trang chủ"
        linkTo="/student"
      />
      <BottomNavigation.Item
        icon={<Heart />}
        activeIcon={<HeartFill />}
        key="favorite"
        label="Yêu thích"
        linkTo="/student/favorite"
      />
      <BottomNavigation.Item
        icon={<Clock />}
        activeIcon={<ClockFill />}
        key="history"
        label="Lịch sử"
        linkTo="/student/history"
      />
      <BottomNavigation.Item
        icon={<BarChart />}
        activeIcon={<BarChartFill />}
        key="statistic"
        label="Thống kê"
        linkTo="/student/statistic"
      />
      <BottomNavigation.Item
        icon={<Gear />}
        activeIcon={<GearFill />}
        key="setting"
        label="Cài đặt"
        linkTo="/student/setting"
      />
    </BottomNavigation>
  )
}