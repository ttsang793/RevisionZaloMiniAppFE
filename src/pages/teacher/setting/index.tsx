import { CameraFill, ChevronRight } from "react-bootstrap-icons";
import { Switch, Input, Text, Page, Select } from "zmp-ui";
import AppHeader from "@/components/header";
import { useState, useEffect } from "react";
import { getSubjects, Subject } from "../../admin/subject/uiHandlers";
import "./setting.css"

export default function TeacherSettingPage() {
  const { TextArea } = Input;

  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    getSubjects().then(subject => setSubjectList(subject))
  }, [])

  return (
    <Page className="page-x-0">
      <AppHeader title="Cài đặt" />
      <div className="section-container">
        <div className="grid grid-cols-[1fr_30px] gap-x-2 mb-3 items-center">
          <Text>Thông báo</Text>
          <Switch />
        </div>
        <hr />
        <div className="grid grid-cols-[1fr_30px] gap-x-2 my-3 items-center">
          <Text>Bình luận của học sinh</Text>
          <Switch />
        </div>
        <hr />
        <div className="grid grid-cols-[1fr_30px] gap-x-2 my-3 items-center">
          <Text>Có bài tự luận cần chấm</Text>
          <Switch />
        </div>
      </div>

      <div className="section-container">
        <div className="grid grid-cols-[80px_1fr] w-full gap-x-4">
          <div className="relative mb-2">
            <img src="/avatar/default.jpg" alt="Avatar" className="h-25 rounded-full border-1 border-zinc-300" />
            <button className="absolute top-14 -right-2 border border-gray-200 rounded-full size-10 bg-zinc-300">
              <CameraFill size={24} className="inline" />
            </button>
          </div>

          <form action="">
            <Input
              placeholder="Họ và tên*"
              label={<Text>Họ và tên <span className="zaui-text-red-50">*</span></Text>}
              required
            />
            <Select
              label={<Text className="mt-1">Khối <span className="zaui-text-red-50">*</span></Text>}
              closeOnSelect
              defaultValue="-1"
            >
              <Select.Option value="-1" title="Chọn khối" disabled />
              <Select.Option value="THCS" title="THCS" />
              <Select.Option value="THPT" title="THPT" />
            </Select>

            <Select
              label={<Text className="mt-1">Môn học <span className="zaui-text-red-50">*</span></Text>}
              closeOnSelect
              defaultValue="-1"
            >
              <Select.Option value="-1" title="Chọn môn học" disabled />
              {
                subjectList.map((subject: Subject) => <Select.Option value={subject.id} title={subject.name} key={subject.id} />)
              }
            </Select>

            <TextArea
              placeholder="Giới thiệu"
              label="Giới thiệu"
            />

            <Text className="zaui-text-red-50 text-left italic mb-2" bold>
              *: Các trường bắt buộc
            </Text>

            <div className="flex gap-x-2 justify-center">
              <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-1 px-4 text-sm" />
              <input type="reset" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-1 px-4 text-sm" />
            </div>
          </form>
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