import { Page, Button, Text, Input, Select } from "zmp-ui";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects, Subject } from "@/models/subject";
import { getUserInfo } from "zmp-sdk";

import { Teacher, addTeacher } from "@/models/teacher";

export default function TeacherRegisterPage() {
  const { TextArea } = Input;
  const [teacher, setTeacher] = useState<Teacher>(new Teacher());
  const [level, setLevel] = useState("-1");
  const navTo = useNavigate();

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
            placeholder="Tên hiển thị"
            label={<Text>Tên hiển thị</Text>}
            onChange={e => setTeacher({...teacher, name: e.target.value})}
            helperText={<Text className="text-left">Nếu để trống, tên hiển thị là tên Zalo của thầy/cô.</Text>}
          />

          <Select
            label={<Text className="mt-3">Khối <span className="required">*</span></Text>}
            closeOnSelect value={level} onChange={(e: string) => setLevel(e)}
          >
            <Select.Option value="-1" title="Chọn khối" disabled />
            <Select.Option value="THCS" title="THCS" />
            <Select.Option value="THPT" title="THPT" />
          </Select>

          <Select
            label={<Text className="mt-2">Môn học <span className="required">*</span></Text>}
            closeOnSelect value={teacher.subjectId} onChange={(e: string) => setTeacher({...teacher, subjectId: e})}
          >
            <Select.Option value="-1" title="Chọn môn học" disabled />
            {
              subjectList.map((subject: Subject) => <Select.Option value={subject.id} title={subject.name} key={subject.id} />)
            }
          </Select>

          <TextArea
            size="large"
            placeholder="Giới thiệu" value={teacher.introduction}
            onChange={e => setTeacher({...teacher, introduction: e.target.value})}
            label={<Text className="mt-2">Giới thiệu</Text>}
            />

          <Text className="required text-left italic mb-2" bold>
            *: Các trường bắt buộc
          </Text>

          <Button fullWidth onClick={handleSubmit}>
            <Text size="large">Đăng ký</Text>
          </Button>
        </form>
      </div>
    </Page>
  )

  async function handleSubmit() {
    const userResponse = await getUserInfo({ autoRequestPermission: false });
    
    teacher.zaloId = userResponse.userInfo.id;
    teacher.name = (!teacher.name) ? userResponse.userInfo.name : teacher.name;
    teacher.avatar = userResponse.userInfo.avatar;
    teacher.grades = (level === "THCS") ? [6,7,8,9] : [10,11,12];

    addTeacher(teacher).then(status => {
      if (status === 201) navTo("/teacher");
      else console.error(status);
    }).catch(err => console.error(err));
  }
}