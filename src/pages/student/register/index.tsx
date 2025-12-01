import { Box, Button, Input, Page, Text, Select, useNavigate, useLocation, useSnackbar } from "zmp-ui";
import { useState } from "react";
import { Student, addStudent } from "@/models/user";

export default function StudentRegisterPage() {
  const { studentInfo } = useLocation().state || {};
  const [student, setStudent] = useState<Student>(new Student());
  const [errors, setErrors] = useState<{email?: string, grade?: string}>({});
  const navTo = useNavigate();
  const { openSnackbar } = useSnackbar();

  return (
    <Page className="flex flex-col justify-center text-center zaui-bg-blue-20 p-5">
      <Box className="section-container flex flex-col gap-4">
        <Text.Title size="xLarge" className="border-b border-b-black pb-3">Chào mừng đến với hệ thống EmOnThi!</Text.Title>
        <Text.Title className="italic font-normal">
          Trước khi đăng nhập, em hãy điền các thông tin sau!
        </Text.Title>

        <form onSubmit={e => e.preventDefault()}>
          <Input
            placeholder="Tên hiển thị"
            label={<Text>Tên hiển thị</Text>}
            value={student.name}
            onChange={e => setStudent({...student, name: e.target.value})}
            helperText={<Text className="text-left">Nếu để trống, tên hiển thị là tên Zalo của em.</Text>}
          />

          <Select
            label={<Text className="mt-2">Lớp <span className="required">*</span></Text>}
            closeOnSelect value={student.grade}
            errorText={errors.grade} status={!errors.grade ? "" : "error"}
            onChange={(e: number) => { setErrors({...errors, grade: ""}); setStudent({...student, grade: e}) }}
          >
            <Select.Option value={-1} title="Chọn lớp" disabled />
            {
              [6,7,8,9,10,11,12].map(i => <Select.Option value={i} title={i + ""} />)
            }
          </Select>
          
          <Input
            label={<Text className="mt-2">Email <span className="required">*</span></Text>}
            placeholder="Email"
            value={student.email}
            onChange={e => { setErrors({...errors, email: ""}); setStudent({...student, email: e.target.value})} }
            errorText={errors.email}
            status={!errors.email ? "" : "error"}
          />

          <Button fullWidth onClick={handleSubmit} className="mt-2">
            <Text size="large">Đăng ký</Text>
          </Button>
        </form>
      </Box>
    </Page>
  )

  async function handleSubmit() {
    const newError: {email?: string, grade?: string} = {};
    if (!student.email) newError.email = "Vui lòng nhập email!";
    else if (/^\w+@\w+(\.\w+)+$/.test(student.email) === false) newError.email = "Vui lòng nhập email đúng định dạng!";

    if (student.grade === -1) newError.grade = "Vui lòng chọn lớp"

    setErrors(prev => prev = newError);
    if (Object.keys(newError).length !== 0) return;

    student.zaloId = studentInfo.id;
    student.name = (!student.name) ? studentInfo.name : student.name;
    student.avatar = studentInfo.avatar;

    const response = await addStudent(student);
    if (response.status === 201) {
      openSnackbar({
        text: "Đăng ký thành công",
        type: "success",
        duration: 1500
      })
      setTimeout(() => navTo("/"), 1500);
    }
    else {
      openSnackbar({
        text: "Đăng ký thất bại! Vui lòng thử lại sau.",
        type: "error"
      })
      console.error(response);
    }
  }
}