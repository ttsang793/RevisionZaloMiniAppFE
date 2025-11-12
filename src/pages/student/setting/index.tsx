import { CameraFill, ChevronRight } from "react-bootstrap-icons";
import { Box, Switch, Input, Text, Page, useNavigate } from "zmp-ui";
import AppHeader from "@/components/header";
import SettingAlarm from "@/components/setting/alarm";
import "./setting.css";
import { useState, useEffect } from 'react';
import { Student, getStudentById, updateStudent, deleteStudent } from "@/models/user";
import { getUserInfo } from "zmp-sdk";

export default function StudentSettingPage() {
  const navTo = useNavigate();
  const [student, setStudent] = useState<Student>(new Student());
  const [emailError, setEmailError] = useState("");
  
  const [noti, setNoti] = useState({
    all: sessionStorage.getItem("noti-all") === "true",
    following: sessionStorage.getItem("noti-following") === "true",
    manual: sessionStorage.getItem("noti-manual") === "true",
    reply: sessionStorage.getItem("noti-reply") === "true",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    Object.entries(noti).forEach(([key, value]) => {
      sessionStorage.setItem(`noti-${key}`, String(value));
    });
  }, [noti]);

  const handleChange = (key: keyof typeof noti) => {
    if (key === "all") {
      const newValue = !noti.all;
      setNoti({
        all: newValue,
        following: newValue,
        manual: newValue,
        reply: newValue,
      });
    }
    else setNoti(prev => ({...prev, [key]: !prev[key]}))
  };

  return (
    <Page className="page-x-0">
      <AppHeader title="Cài đặt" />
      <Box className="section-container">
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 mb-3 items-center">
          <Text>Thông báo</Text>
          <Switch checked={noti.all} onChange={() => handleChange("all")} />
        </Box>
        <hr />
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 my-3 items-center">
          <Text>Đề thi mới của giáo viên đang theo dõi</Text>
          <Switch checked={noti.following} onChange={() => handleChange("following")} />
        </Box>
        <hr />
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 my-3 items-center">
          <Text>Bài tự luận đã có điểm</Text>
          <Switch checked={noti.manual} onChange={() => handleChange("manual")} />
        </Box>
        <hr />
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 mt-3 items-center">
          <Text>Phản hồi của bình luận</Text>
          <Switch checked={noti.reply} onChange={() => handleChange("reply")} />
        </Box>
      </Box>

      <Box className="section-container">
        <Box className="grid grid-cols-[1fr_32px] mb-2 items-center">
          <Text.Title className="zaui-text-blue-80">Nhắc nhở ôn tập</Text.Title>
          <button
            className="zaui-bg-blue-80 text-white rounded-lg text-center size-8 text-xl"
          >
            +
          </button>
        </Box>

        <SettingAlarm />
        <SettingAlarm />
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
              value={student.name}
              onChange={e => setStudent({...student, name: e.target.value})}
              helperText={<Text className="text-left">Nếu để trống, tên hiển thị là tên Zalo của bạn.</Text>}
            />
            
            <Input
              placeholder="Email"
              label={<Text className="mt-2">Email <span className="required">*</span></Text>}
              value={student.email}
              onChange={e => { setEmailError(""); setStudent({...student, email: e.target.value}) }} 
              errorText={emailError} status={!emailError ? "" : "error"}
            />

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

  async function handleSubmit() {
    let newEmailError = ""
    if (!student.email) newEmailError = "Vui lòng nhập email!";
    else if (/^\w+@\w+(\.\w+)+$/.test(student.email) === false) newEmailError = "Vui lòng nhập email đúng định dạng!";

    setEmailError(newEmailError);
    if (newEmailError.length > 0) return;

    if (!student.name) {
      const userResponse = await getUserInfo({ autoRequestPermission: false });
      student.name = userResponse.userInfo.name;
    }
    updateStudent(student);
  }

  async function handleDelete() {
    const status = await deleteStudent(6);
    if (status === 201) {
      navTo("/");
    }
  }

  async function fetchData() {
    getStudentById().then(student => setStudent(student.data));
  }
}
