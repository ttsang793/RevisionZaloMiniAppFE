import { CameraFill, ChevronRight } from "react-bootstrap-icons";
import { Box, Switch, Input, Select, Text, Page, useNavigate, useSnackbar } from "zmp-ui";
import AppHeader from "@/components/header";
import Reminder from "@/components/student/settings/reminder";
import "./setting.css";
import { useState, useEffect } from 'react';
import { Student, getStudentById, updateStudent, deleteStudent } from "@/models/user";
import { getUserInfo } from "zmp-sdk";
import { updateStudentStatus } from "@/models/notification";
import axios from "axios";

export default function StudentSettingPage() {
  const navTo = useNavigate();
  const { openSnackbar } = useSnackbar();
  const [student, setStudent] = useState<Student>(new Student());
  const [image, setImage] = useState<any>(null);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(true);
  const [noti, setNoti] = useState([false, false, false, false]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (key: string, index: number) => {
    const status = !student.notification![index]
    const response = await updateStudentStatus(student.id!, key, status);
    if (response.status === 200) {
      if (index === 0) student.notification = [status, status, status, status];
      else {
        student.notification![index] = status;
        student.notification![0] = student.notification![1] && student.notification![2] && student.notification![3];
      }
      setNoti([...student.notification!]);
    }
    else {
      openSnackbar({
        text: "Thay dổi thông báo thất bại",
        type: "error"
      })
      console.error(response);
    }
  };

  const handleAvatarUpload = (e) => {
    try {
      setImage(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = e => document.querySelector('#avatar-image').src = e.target.result;
      reader.readAsDataURL(e.target.files[0]);
    }
    catch (err) {
      console.log(err);
      openSnackbar({
        text: "Không tải được hình ảnh!",
        type: "error"
      })
    }
  }

  const handleGetAvatarFromZalo = async () => {
    const userInfo = await getUserInfo({ autoRequestPermission: false });
    setImage(userInfo.userInfo.avatar)
  }

  return loading ? <></> : (
    <Page className="page-x-0">
      <AppHeader title="Cài đặt" />
      <Box className="section-container">
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 mb-3 items-center">
          <Text>Thông báo</Text>
          <Switch checked={noti[0]} onChange={() => handleChange("all", 0)} />
        </Box>
        <hr />
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 my-3 items-center">
          <Text>Đề thi mới của giáo viên đang theo dõi</Text>
          <Switch checked={noti[1]} onChange={() => handleChange("following", 1)} />
        </Box>
        <hr />
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 my-3 items-center">
          <Text>Bài tự luận đã có điểm</Text>
          <Switch checked={noti[2]} onChange={() => handleChange("manual", 2)} />
        </Box>
        <hr />
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 mt-3 items-center">
          <Text>Phản hồi của bình luận</Text>
          <Switch checked={noti[3]} onChange={() => handleChange("reply", 3)} />
        </Box>
      </Box>

      <Reminder />

      <Box className="section-container">
        <Box className="grid grid-cols-[80px_1fr] w-full gap-x-4">
          <Box className="relative mb-2">
            <img
              src={!image ? student.avatar : image}
              alt="Avatar"
              id="avatar-image"
              className="h-20 rounded-full border-1 border-zinc-300 object-cover"
            />
            <button
              className="absolute top-14 -right-2 border border-gray-200 rounded-full size-10 bg-zinc-300"
              onClick={() => document.getElementById("avatar-uploader")?.click()}
            >
              <CameraFill size={24} className="inline" />
            </button>
            <input
              type="file" id="avatar-uploader" accept="image/png, image/jpeg" hidden
              onChange={handleAvatarUpload}
            />
          </Box>

          <form onSubmit={e => e.preventDefault()}>
            <Input
              placeholder="Tên hiển thị"
              label={<Text>Tên hiển thị</Text>}
              value={student.name}
              onChange={e => setStudent({...student, name: e.target.value})}
              helperText={<Text className="text-left">Nếu để trống, tên hiển thị là tên Zalo của bạn.</Text>}
            />
            
            <Select
              label={<Text className="mt-2">Lớp</Text>}
              closeOnSelect value={student.grade}
              onChange={(e: number) => setStudent({...student, grade: e})}
            >
            {
              [6,7,8,9,10,11,12].map((g: number) => <Select.Option value={g} title={`${g}`} key={`grade_${g}`} />)
            }
            </Select>
            
            <Input
              placeholder="Email"
              label={<Text className="mt-2">Email <span className="required">*</span></Text>}
              value={student.email}
              onChange={e => { setEmailError(""); setStudent({...student, email: e.target.value}) }} 
              errorText={emailError} status={!emailError ? "" : "error"}
            />

            <Box className="flex gap-x-2 justify-center mt-4">
              <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={handleSubmit} />
              <input type="reset" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={handleCancel} />
              <input type="button" value="Lấy avatar từ Zalo" className="zaui-bg-blue-60 zaui-text-blue-10 rounded-full py-2 px-8" onClick={handleGetAvatarFromZalo} />
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
    if (typeof(image) === "string") student.avatar = image;

    let response = await updateStudent(student);
    console.log(response);
    if (response.status === 200) {
      if (typeof(image) !== "string" && image !== null) {
        const formData: FormData = new FormData();
        formData.append("file", image);

        try {
          response = await axios.post(`/api/upload/image/${student.id}/avatar`,
            formData, { headers: { "Content-Type": "multipart/form-data" } });

          if (response.status === 200) {
            openSnackbar({
              text: "Cập nhật thông tin và avatar thành công!",
              type: "success",
              duration: 1500
            })
          }
          else {
            console.error(response);
            openSnackbar({
              text: "Cập nhật thông tin thành công, nhưng tải hình thất bại!",
              type: "warning",
              duration: 1500
            });
          }
        }
        catch (err) {
          console.error(err);
          openSnackbar({
            text: "Cập nhật thông tin thành công, nhưng tải hình thất bại!",
            type: "warning",
            duration: 1500
          });
        }
      }
      else {
        openSnackbar({
          text: "Cập nhật thông tin thành công!",
          type: "success",
          duration: 1500
        })
      }
      resetSessionStorage();
    }
    else {
      openSnackbar({
        text: "Cập nhật thông tin thất bại!",
        type: "error"
      })
      console.error(response);
    }
  }

  async function handleDelete() {
    const response = await deleteStudent();
    if (response.status === 200) {
      openSnackbar({
        text: "Xóa tài khoản thành công!",
        duration: 1500
      })
      sessionStorage.clear();
      navTo("/");
    }
    else openSnackbar({ text: "Lỗi hệ thống! Vui lòng thử lại sau!" })
  }

  async function handleCancel() {
    setImage(null);
    document.querySelector('#avatar-uploader').value = null;
    document.querySelector('#avatar-image').src = teacher.avatar;
    fetchData();
  }

  async function fetchData() {
    setLoading(true);
    getStudentById().then(student => {
      setStudent(student.data);
      setNoti(student.data.notification);
      setLoading(false);
    });
  }

  async function resetSessionStorage() {
    sessionStorage.removeItem("avatar");

    let response = await getStudentById();
    sessionStorage.setItem("avatar", response.data.avatar);
  }
}