import { CameraFill, ChevronRight } from "react-bootstrap-icons";
import { Box, Switch, Input, Text, Page, Select, useNavigate } from "zmp-ui";
import AppHeader from "@/components/header";
import { useState, useEffect } from "react";
import { getSubjects, Subject } from "@/models/subject";
import { getUserInfo } from "zmp-sdk";
import "./setting.css";

import { deleteTeacher, getTeacherById, Teacher, updateTeacher } from "@/models/user";

export default function TeacherSettingPage() {
  const { TextArea } = Input;
  const navTo = useNavigate();
  const [teacher, setTeacher] = useState<Teacher>(new Teacher());
  const [level, setLevel] = useState("-1");
  const [loading, setLoading] = useState(true);

  const [allSubject, setAllSubject] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [subjectError, setSubjectError] = useState("");

  useEffect(() => {
    fetchData();
  }, [])

  return loading ? <></> : (
    <Page className="page-x-0">
      <AppHeader title="Cài đặt" />
      <Box className="section-container">
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 mb-3 items-center">
          <Text>Thông báo</Text>
          <Switch />
        </Box>
        <hr />
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 my-3 items-center">
          <Text>Bình luận của học sinh</Text>
          <Switch />
        </Box>
        <hr />
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 my-3 items-center">
          <Text>Có bài tự luận cần chấm</Text>
          <Switch />
        </Box>
      </Box>

      <Box className="section-container">
        <Box className="grid grid-cols-[80px_1fr] w-full gap-x-4">
          <Box className="relative mb-2">
            <img src="/avatar/default.jpg" alt="Avatar" className="h-25 rounded-full border-1 border-zinc-300" />
            <button className="absolute top-14 -right-2 border border-gray-200 rounded-full size-10 bg-zinc-300">
              <CameraFill size={24} className="inline" />
            </button>
          </Box>

          <form onSubmit={e => e.preventDefault()}>
            <Input
              placeholder="Tên hiển thị"
              label={<Text>Tên hiển thị</Text>}
              value={teacher.name}
              onChange={e => setTeacher({...teacher, name: e.target.value})}
              helperText={<Text className="text-left">Nếu để trống, tên hiển thị là tên Zalo của thầy/cô.</Text>}
            />
            <Select
              label={<Text className="mt-2">Khối <span className="required">*</span></Text>}
              closeOnSelect value={level} onChange={(e: string) => fetchSubject(e)}
            >
              <Select.Option value="-1" title="Chọn khối" disabled />
              <Select.Option value="THCS" title="THCS" />
              <Select.Option value="THPT" title="THPT" />
            </Select>

            <Select
              className={subjectList.length === 0 ? "hidden" : ""}
              label={<Text className="mt-2">Môn học <span className="required">*</span></Text>}
              closeOnSelect value={teacher.subjectId}
              errorText={subjectError} status={subjectError.length === 0 ? "" : "error"}
              onChange={(e: string) => { setSubjectError(""); setTeacher({...teacher, subjectId: e})} }
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

            <Box className="flex gap-x-2 justify-center mt-4">
              <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={() => handleSubmit()} />
              <input type="reset" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => fetchData()} />
            </Box>
          </form>
        </Box>

        <hr className="my-3" />
        <Box className="grid grid-cols-[1fr_16px]">
          <Box onClick={() => handleDelete()}>Xóa tài khoản của tôi</Box>
          <ChevronRight />
        </Box>
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
    let error = "";
    if (teacher.subjectId === "-1") error = "Vui lòng chọn môn học!"

    setSubjectError(error);
    if (error.length !== 0) return;

    if (!teacher.name) {
      const userResponse = await getUserInfo({ autoRequestPermission: false });
      teacher.name = userResponse.userInfo.name;
    }

    teacher.grades = (level === "THCS") ? [6,7,8,9] : [10,11,12];
    updateTeacher(teacher);
  }
  
  async function fetchData() {
    try {
      const teacherResponse = await getTeacherById();
      const data: Teacher = teacherResponse.data;
      const l = data.grades[0] === 6 ? "THCS" : "THPT";
      setLevel(l);
      setTeacher(data);

      const allSubjectResponse = await getSubjects();
      setAllSubject(allSubjectResponse);
      
      let newSubjectList = [];

      if (l === "THCS")
        newSubjectList = allSubjectResponse.filter((x: Subject) => x.grades.includes(6) || x.grades.includes(7) || x.grades.includes(8) || x.grades.includes(9));
      else newSubjectList = allSubjectResponse.filter((x: Subject) => x.grades.includes(10) || x.grades.includes(11) || x.grades.includes(12));
      setSubjectList(newSubjectList);
    }
    finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const status = await deleteTeacher(7);
    if (status === 201) {
      navTo("/");
    }
  }
}