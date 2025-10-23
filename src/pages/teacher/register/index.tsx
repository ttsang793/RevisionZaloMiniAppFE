import { Box, Button, Input, Page, Select, Text } from "zmp-ui";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects, Subject } from "@/models/subject";
import { getUserInfo } from "zmp-sdk";

import { Teacher, addTeacher } from "@/models/teacher";

export default function TeacherRegisterPage() {
  const { TextArea } = Input;
  const [teacher, setTeacher] = useState<Teacher>(new Teacher());
  const [errors, setErrors] = useState<{grade?: string, subject?: string}>({});
  const [level, setLevel] = useState("-1");
  const navTo = useNavigate();

  const [allSubject, setAllSubject] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    getSubjects().then(allSubject => setAllSubject(allSubject));
  }, [])

  return (
    <Page className="flex flex-col justify-center text-center zaui-bg-blue-20 p-5">
      <Box className="section-container flex flex-col gap-4">
        <Text.Title size="xLarge" className="border-b border-b-black pb-3">Chào mừng thầy/cô đến với hệ thống MáyÔnThi!</Text.Title>
        <Text.Title className="italic font-normal">
          Trước khi đăng nhập, thầy/cô hãy điền các thông tin sau:
        </Text.Title>

        <form onSubmit={e => e.preventDefault()}>
          <Input
            placeholder="Tên hiển thị"
            label={<Text>Tên hiển thị</Text>}
            onChange={e => setTeacher({...teacher, name: e.target.value})}
            helperText={<Text className="text-left">Nếu để trống, tên hiển thị là tên Zalo của thầy/cô.</Text>}
          />
          <Select
            label={<Text className="mt-2">Khối <span className="required">*</span></Text>}
            closeOnSelect value={level} errorText={errors.grade} status={!errors.grade ? "" : "error"}
            onChange={(e: string) => { setErrors({}); fetchSubject(e); }}
          >
            <Select.Option value="-1" title="Chọn khối" disabled />
            <Select.Option value="THCS" title="THCS" />
            <Select.Option value="THPT" title="THPT" />
          </Select>

          <Select
            className={subjectList.length === 0 ? "hidden" : ""}
            label={<Text className="mt-2">Môn học <span className="required">*</span></Text>}
            closeOnSelect value={teacher.subjectId}
            errorText={errors.subject} status={!errors.subject ? "" : "error"}
            onChange={(e: string) => { setErrors({}); setTeacher({...teacher, subjectId: e})} }
          >
            <Select.Option value="-1" title="Chọn môn học" disabled />
            {
              subjectList.map((subject: Subject) => <Select.Option value={subject.id} title={subject.name} key={subject.id} />)
            }
          </Select>

          <TextArea
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
      </Box>
    </Page>
  )

  async function fetchSubject(level: string) {
    setLevel(level);
    setTeacher({...teacher, subjectId: "-1"});

    let newSubjectList = [];
    
    if (level === "THCS")
      newSubjectList = allSubject.filter((x: Subject) => x.grades.includes(6) || x.grades.includes(7) || x.grades.includes(8) || x.grades.includes(9));
    else newSubjectList = allSubject.filter((x: Subject) => x.grades.includes(10) || x.grades.includes(11) || x.grades.includes(12));
    setSubjectList(newSubjectList);
  }

  async function handleSubmit() {
    const newError: {grade?: string, subject?: string} = {};
    if (level === "-1") newError.grade = "Vui lòng chọn khối giảng dạy!";
    else if (teacher.subjectId === "-1") newError.subject = "Vui lòng chọn môn học!"

    setErrors(prev => prev = newError);
    if (Object.keys(newError).length !== 0) return;

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