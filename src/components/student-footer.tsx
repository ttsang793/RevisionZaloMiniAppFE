import { BarChart, BarChartFill, Clock, ClockFill, Gear, GearFill, Heart, HeartFill, HouseDoor, HouseDoorFill } from "react-bootstrap-icons"
import { BottomNavigation, useLocation, useNavigate } from "zmp-ui";

const noFooter: string[] = ["/first-time", "/test"];

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
  const navTo = useNavigate();  

  return checkIfNoFooter() ? <></> : (
    <BottomNavigation fixed>
      <BottomNavigation.Item
        icon={<HouseDoor />}
        activeIcon={<HouseDoorFill />}
        key="home"
        label="Trang chủ"
        linkTo="/"
        onClick={() => navTo("/", { animate: false })}
      />
      <BottomNavigation.Item
        icon={<Heart />}
        activeIcon={<HeartFill />}
        key="favorite"
        label="Yêu thích"
        onClick={() => navTo("/favorite", { animate: false })}
      />
      <BottomNavigation.Item
        icon={<Clock />}
        activeIcon={<ClockFill />}
        key="history"
        label="Lịch sử"
        onClick={() => navTo("/history", { animate: false })}
      />
      <BottomNavigation.Item
        icon={<BarChart />}
        activeIcon={<BarChartFill />}
        key="statistic"
        label="Thống kê"
        //linkTo="/statistic"
        onClick={() => navTo("/statistic", { animate: false })}
      />
      <BottomNavigation.Item
        icon={<Gear />}
        activeIcon={<GearFill />}
        key="setting"
        label="Cài đặt"
        onClick={() => navTo("/setting", { animate: false })}
      />
    </BottomNavigation>
  )
}