import { Header } from "zmp-ui";

export default function StudentHeader({ title = "Trang chủ", showBackIcon = false  }) {
  return <Header title={title} showBackIcon={showBackIcon} />
}