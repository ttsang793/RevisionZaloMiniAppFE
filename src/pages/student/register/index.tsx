import { Box, Button, Input, Page, Text } from "zmp-ui";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addStudent } from "@/models/user";

export default function StudentRegisterPage() {
  const { studentInfo } = useLocation().state || {};
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navTo = useNavigate();

  return (
    <Page className="flex flex-col justify-center text-center zaui-bg-blue-20 p-5">
      <Box className="section-container flex flex-col gap-4">
        <Text.Title size="xLarge" className="border-b border-b-black pb-3">Chào mừng đến với hệ thống MáyÔnThi!</Text.Title>
        <Text.Title className="italic font-normal">
          Trước khi đăng nhập, hãy điền email của mình nhé!
        </Text.Title>

        <form onSubmit={e => e.preventDefault()}>
          <Input
            placeholder="Email"
            value={email}
            onChange={e => { setEmailError(""); setEmail(e.target.value)} }
            errorText={emailError}
            status={!emailError ? "" : "error"}
          />

          <Button fullWidth onClick={handleSubmit} className="mt-2">
            <Text size="large">Đăng ký</Text>
          </Button>
        </form>
      </Box>
    </Page>
  )

  async function handleSubmit() {
    let newEmailError = "";
    if (!email) newEmailError = "Vui lòng nhập email!";
    else if (/^\w+@\w+(\.\w+)+$/.test(email) === false) newEmailError = "Vui lòng nhập email đúng định dạng!";

    setEmailError(newEmailError);
    if (newEmailError.length > 0) return;
    
    try {
      const addResponse = await addStudent(studentInfo, email);
      if (addResponse === 201) {
        navTo("/student");
      }
    }
    catch (error) {
      console.error(error);
    }
  }
}