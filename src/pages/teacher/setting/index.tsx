import { CameraFill, ChevronRight } from "react-bootstrap-icons";
import { Box, Switch, Input, Text, Page, Select, useNavigate, useSnackbar, Spinner } from "zmp-ui";
import AppHeader from "@/components/header";
import { useState, useEffect } from "react";
import { getActiveSubjects, Subject } from "@/models/subject";
import { getUserInfo } from "zmp-sdk";
import axios from "axios";
import "./setting.css";

import { deleteTeacher, getTeacherById, getTeacherSubjectById, getUserByZaloId, Teacher, updateTeacher } from "@/models/user";
import { updateTeacherStatus } from "@/models/notification";

export default function TeacherSettingPage() {
  const { TextArea } = Input;
  const navTo = useNavigate();
  const { openSnackbar } = useSnackbar();
  const [teacher, setTeacher] = useState<Teacher>(new Teacher());
  const [image, setImage] = useState<any>(null);
  const [level, setLevel] = useState("-1");
  const [loading, setLoading] = useState(true);

  const [allSubject, setAllSubject] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [errors, setErrors] = useState<{email?: string, subject?: string}>({});
  const [noti, setNoti] = useState([false, false, false]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (key: string, index: number) => {
    const status = !teacher.notification![index]
    const response = await updateTeacherStatus(teacher.id!, key, status);
    if (response.status === 200) {
      if (index === 0) teacher.notification = [status, status, status, status];
      else {
        teacher.notification![index] = status;
        teacher.notification![0] = teacher.notification![1] && teacher.notification![2];
      }
      setNoti([...teacher.notification!]);
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

  if (loading) return (
    <Page className="page page-wo-footer">
      <AppHeader title="Cài đặt" />

      <Box className="section-container text-center place-items-center">
        <Spinner />
        <Text className="mt-2 italic">Đang tải...</Text>
      </Box>
    </Page>
  )

  return (
    <Page className="page-x-0">
      <AppHeader title="Cài đặt" />
      <Box className="section-container">
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 mb-3 items-center">
          <Text>Thông báo</Text>
          <Switch checked={noti[0]} onChange={() => handleChange("all", 0)} />
        </Box>
        <hr />
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 my-3 items-center">
          <Text>Có bài tự luận cần chấm</Text>
          <Switch checked={noti[1]} onChange={() => handleChange("manual", 1)} />
        </Box>
        <hr />
        <Box className="grid grid-cols-[1fr_30px] gap-x-2 my-3 items-center">
          <Text>Bình luận của học sinh</Text>
          <Switch checked={noti[2]} onChange={() => handleChange("reply", 2)} />
        </Box>
      </Box>

      <Box className="section-container">
        <Box className="grid grid-cols-[80px_1fr] w-full gap-x-4">
          <Box className="relative mb-2">
            <img
              src={!image ? teacher.avatar : image}
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
              value={teacher.name}
              onChange={e => setTeacher({...teacher, name: e.target.value})}
              helperText={<Text className="text-left">Nếu để trống, tên hiển thị là tên Zalo của thầy/cô.</Text>}
            />

            <Input
              placeholder="Email"
              label={<Text className="mt-2">Email <span className="required">*</span></Text>}
              value={teacher.email}
              onChange={e => { setErrors({...errors, email: ""}); setTeacher({...teacher, email: e.target.value}) }}
              errorText={errors.email} status={!errors.email ? "" : "error"}
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
              errorText={errors.subject} status={!errors.subject ? "" : "error"}
              onChange={(e: string) => { setErrors({...errors, subject: ""}); setTeacher({...teacher, subjectId: e}) }}
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
    const newError: {email?: string, subject?: string} = {};
    if (!teacher.email) newError.email = "Vui lòng nhập email!";
    else if (/^\w+@\w+(\.\w+)+$/.test(teacher.email) === false) newError.email = "Vui lòng nhập email đúng định dạng!";

    if (teacher.subjectId === "-1") newError.subject = "Vui lòng chọn môn học!";

    setErrors(prev => prev = newError);
    if (Object.keys(newError).length !== 0) return;

    if (!teacher.name) {
      const userResponse = await getUserInfo({ autoRequestPermission: false });
      teacher.name = userResponse.userInfo.name;
    }

    teacher.grades = (level === "THCS") ? [6,7,8,9] : [10,11,12];
    if (typeof(image) === "string") teacher.avatar = image;
    
    let response = await updateTeacher(teacher);
    if (response.status === 200) {
      if (typeof(image) !== "string" && image !== null) {
        const formData: FormData = new FormData();
        formData.append("file", image);

        try {
          response = await axios.post(`/api/upload/image/${teacher.id}/avatar`,
            formData, { headers: { "Content-Type": "multipart/form-data" } });

          if (response.status === 200) {
            openSnackbar({
              text: "Cập nhật thông tin và avatar thành công!",
              type: "success",
              duration: 1500
            })
          }
          else throw new Error();
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

  async function handleCancel() {
    setImage(null);
    document.querySelector('#avatar-uploader').value = null;
    document.querySelector('#avatar-image').src = teacher.avatar;
    fetchData();
  }
  
  async function fetchData() {
    try {
      const teacherResponse = await getTeacherById();
      const data: Teacher = teacherResponse.data;
      const l = data.grades[0] === 6 ? "THCS" : "THPT";
      setLevel(l);
      setTeacher(data);
      setNoti(data.notification!);

      const allSubjectResponse = await getActiveSubjects();
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
    const response = await deleteTeacher();
    if (response.status === 200) {
      openSnackbar({
        text: "Xóa tài khoản thành công!",
        duration: 1500
      })
      sessionStorage.clear();
      navTo("/");
    }
    else {
      openSnackbar({ text: "Lỗi hệ thống! Vui lòng thử lại sau!" })
      console.error(response);
    }
  }

  async function resetSessionStorage() {
    sessionStorage.removeItem("avatar");
    sessionStorage.removeItem("subjectId");
    sessionStorage.removeItem("subjectName");
    sessionStorage.removeItem("questionMC");
    sessionStorage.removeItem("questionTF");
    sessionStorage.removeItem("questionSA");
    sessionStorage.removeItem("questionGF");
    sessionStorage.removeItem("questionST");

    let response = await getTeacherById();
    sessionStorage.setItem("avatar", response.data.avatar);

    response = await getTeacherSubjectById();      

    sessionStorage.setItem("subjectId", response.data.id);
    sessionStorage.setItem("subjectName", response.data.name);
    sessionStorage.setItem("questionMC", response.data.questionMC);
    sessionStorage.setItem("questionTF", response.data.questionTF);
    sessionStorage.setItem("questionSA", response.data.questionSA);
    sessionStorage.setItem("questionGF", response.data.questionGF);
    sessionStorage.setItem("questionST", response.data.questionST);
  }
}