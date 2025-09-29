import { redirect } from "@/script/util";
import { BarChart, BarChartFill, Clock, ClockFill, Gear, GearFill, Heart, HeartFill, HouseDoor, HouseDoorFill } from "react-bootstrap-icons"
import { BottomNavigation, useLocation } from "zmp-ui";

const noFooter: string[] = ["/test"];

function checkIfNoFooter() {
  let noFooterFlag = false;
  const pathname = useLocation().pathname;
  
  for (let i = 0; i < noFooter.length; i++)
    if (pathname.startsWith(noFooter[i])) {
      noFooterFlag = true;
      break;
    }

  return noFooterFlag;
}

export default function StudentFooter() {
  return checkIfNoFooter() ? <></> : (
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