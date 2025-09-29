import { Header } from "zmp-ui";

export default function AppHeader({ title = "Trang chủ", showBackIcon = false  }) {
  return <Header title={title} showBackIcon={showBackIcon} className="zaui-bg-blue-80 text-white" />
}