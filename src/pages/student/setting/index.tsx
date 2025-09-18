import { CameraFill, ChevronRight } from "react-bootstrap-icons";
import { Switch, Input, Text, Page } from "zmp-ui";
import StudentHeader from "@/components/student-header";
import SettingAlarm from "@/components/settng/alarm";
import "./setting.css"

export default function SettingPage() {
  return (
    <Page className="page-x-0">
      <StudentHeader title="Cài đặt" />
      <div className="section-container">
        <div className="grid grid-cols-[1fr_30px] gap-x-2 mb-3 items-center">
          <Text>Thông báo</Text>
          <Switch />
        </div>
        <hr />
        <div className="grid grid-cols-[1fr_30px] gap-x-2 my-3 items-center">
          <Text>Đề thi mới của giáo viên đang theo dõi</Text>
          <Switch />
        </div>
        <hr />
        <div className="grid grid-cols-[1fr_30px] gap-x-2 my-3 items-center">
          <Text>Bài tự luận đã có điểm</Text>
          <Switch />
        </div>
        <hr />
        <div className="grid grid-cols-[1fr_30px] gap-x-2 mt-3 items-center">
          <Text>Phản hồi của bình luận</Text>
          <Switch />
        </div>
      </div>

      <div className="section-container">
        <div className="grid grid-cols-[1fr_32px] mb-2 items-center">
          <Text.Title className="zaui-text-blue-80">Nhắc nhở ôn tập</Text.Title>
          <button
            className="zaui-bg-blue-80 text-white rounded-lg text-center size-8 text-xl"
          >
            +
          </button>
        </div>

        <SettingAlarm />
        <SettingAlarm />
      </div>

      <div className="section-container">
        <div className="grid grid-cols-[80px_1fr] w-full gap-x-4">
          <div className="relative mb-2">
            <img src="/avatar/default.jpg" alt="Avatar" className="h-25 rounded-full border-1 border-zinc-300" />
            <button className="absolute -bottom-2 -right-2 border border-gray-200 rounded-full size-10 bg-zinc-300">
              <CameraFill size={24} className="inline" />
            </button>
          </div>

          <Input
            placeholder="Nhập bí danh"
            label="Họ tên/Bí danh"
          />
        </div>

        <hr className="my-3" />
        <div className="grid grid-cols-[1fr_16px]">
          <Text>Xóa tài khoản của tôi</Text>
          <ChevronRight />
        </div>
      </div>
    </Page>
  )
}
