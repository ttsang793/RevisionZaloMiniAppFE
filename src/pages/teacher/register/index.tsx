import { Page, Button, Text, Input, Select } from "zmp-ui";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects, Subject } from "@/models/subject";

export default function TeacherRegisterPage() {
  const navTo = useNavigate();
  const { TextArea } = Input;

  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    getSubjects().then(subject => setSubjectList(subject))
  }, [])

  return (
    <Page className="flex flex-col justify-center text-center zaui-bg-blue-20 p-5">
      <div className="section-container flex flex-col gap-4">
        <Text.Title size="xLarge" className="border-b border-b-black pb-3">Chào mừng thầy/cô đến với hệ thống MáyÔnThi!</Text.Title>
        <Text.Title className="italic font-normal">
          Trước khi đăng nhập, thầy/cô hãy điền các thông tin sau:
        </Text.Title>

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

          <Button fullWidth onClick={() => navTo("/teacher")}>
            <Text size="large">Đăng ký</Text>
          </Button>
        </form>
      </div>
    </Page>
  )
}