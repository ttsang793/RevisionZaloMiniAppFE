import { AdminResetPassword, resetPassword } from "@/models/user";
import { FormEvent, useState, useEffect } from "react";
import { useNavigate, useSnackbar, Box } from "zmp-ui";
import { EyeFill, EyeSlash } from "react-bootstrap-icons";

export default function AdminResetPasswordPage() {
  const [admin, setAdmin] = useState<AdminResetPassword>(new AdminResetPassword());
  const [errors, setErrors] = useState<{ old?: string, new?: string, confirm?: string }>();
  const [seeOld, setSeeOld] = useState(false);
  const [seeNew, setSeeNew] = useState(false);
  const [seeConfirm, setSeeConfirm] = useState(false);

  const { openSnackbar } = useSnackbar();
  const navTo = useNavigate();
  const role = sessionStorage.getItem("role");
  
    useEffect(() => {
      if (role !== "AD") {
        navTo("/admin", { replace: true });
        return; 
      }
    }, [])
  
  return (role !== "AD") ? <></> : (
    <Box className="flex h-dvh justify-center items-center px-20 bg-white">
      <form
        onSubmit={ResetPassword}
        noValidate
        className="p-4 rounded-lg flex-1 max-w-96 bg-white border-x border-y border-gray-400"
      >
        <h1 className="uppercase text-center text-2xl font-bold pb-4">Cập nhật mật khẩu</h1>

        <Box className="pb-4">
          <label
            htmlFor="password"
            className="block pb-1"
          >
            Mật khẩu hiện tại:
          </label>

          <Box className="flex">
            <input
              type={`${seeOld ? "text" : "password"}`}
              id="password"
              value={admin.oldPassword}
              className="border-x border-y border-zinc-300 py-2 px-4 rounded-s-md w-full focus:border-blue-800"
              placeholder="Mật khẩu hiện tại"
              onChange={e => {
                setAdmin({...admin, oldPassword: e.target.value});
                setErrors({...errors, old: ""})
              }}
            />
            <button
              className="border-e border-y border-zinc-300 p-2 rounded-e-md bg-zinc-700 hover:bg-zinc-900 text-zinc-100"
              tabIndex={-1}
              onMouseEnter={() => setSeeOld(true)}
              onMouseLeave={() => setSeeOld(false)}
            >
              { seeOld ? <EyeSlash size={24} /> : <EyeFill size={24} /> }
            </button>
          </Box>
          <p className="zaui-text-red-60">{errors?.old}</p>
        </Box>

        <Box className="pb-4">
          <label
            htmlFor="password"
            className="block pb-1"
          >
            Mật khẩu mới:
          </label>

          <Box className="flex">
            <input
              type={`${seeNew ? "text" : "password"}`}
              id="password"
              value={admin.newPassword}
              className="border-x border-y border-zinc-300 py-2 px-4 rounded-s-md w-full focus:border-blue-800"
              placeholder="Mật khẩu mới"
              onChange={e => {
                setAdmin({...admin, newPassword: e.target.value});
                setErrors({...errors, new: ""})
              }}
            />
            <button
              className="border-e border-y border-zinc-300 p-2 rounded-e-md bg-zinc-700 hover:bg-zinc-900 text-zinc-100"
              tabIndex={-1}
              onMouseEnter={() => setSeeNew(true)}
              onMouseLeave={() => setSeeNew(false)}
            >
              { seeNew ? <EyeSlash size={24} /> : <EyeFill size={24} /> }
            </button>
          </Box>
          <p className="zaui-text-red-60">{errors?.new}</p>
        </Box>

        <Box className="pb-4">
          <label
            htmlFor="password"
            className="block pb-1"
          >
            Nhập lại mật khẩu mới:
          </label>

          <Box className="flex">
            <input
              type={`${seeConfirm ? "text" : "password"}`}
              id="password"
              value={admin.confirmPassword}
              className="border-x border-y border-zinc-300 py-2 px-4 rounded-s-md w-full focus:border-blue-800"
              placeholder="Nhập lại mật khẩu mới"
              onChange={e => {
                setAdmin({...admin, confirmPassword: e.target.value});
                setErrors({...errors, confirm: ""})
              }}
            />
            <button
              className="border-e border-y border-zinc-300 p-2 rounded-e-md bg-zinc-700 hover:bg-zinc-900 text-zinc-100"
              tabIndex={-1}
              onMouseEnter={() => setSeeConfirm(true)}
              onMouseLeave={() => setSeeConfirm(false)}
            >
              { seeConfirm ? <EyeSlash size={24} /> : <EyeFill size={24} /> }
            </button>
          </Box>
          <p className="zaui-text-red-60">{errors?.confirm}</p>
        </Box>

        <Box className="text-center">
          <input
            type="submit" value="Đổi mật khẩu" tabIndex={3}
            className="bg-blue-950 hover:bg-blue-900 text-blue-50 py-2 px-6 rounded-full mt-4 me-2"
          />
        </Box>
      </form>
    </Box>
  )

  async function ResetPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newError: { old?: string, new?: string, confirm?: string } = {};
    
    if (!admin.oldPassword) newError.old = "Vui lòng nhập mật khẩu cũ!";
    if (!admin.newPassword) newError.new = "Vui lòng nhập mật khẩu mới!";
    else if (admin.newPassword === admin.oldPassword) newError.new = "Mật khẩu mới không được trùng với mật khẩu cũ!";

    if (!admin.confirmPassword) newError.confirm = "Vui lòng xác nhận mật khẩu mới!";
    else if (admin.confirmPassword !== admin.newPassword) newError.confirm = "Mật khẩu xác nhận phải trùng với mật khẩu mới!";

    setErrors(newError);
    if (Object.keys(newError).length === 0) {
      admin.id = Number(sessionStorage.getItem("id"));
      console.log(admin);
      const response = await resetPassword(admin);
      
      if (response.status === 200) {
        openSnackbar({
          text: "Đổi mật khẩu thành công! Vui lòng đăng nhập lại",
          type: "success",
          duration: 1500
        })
        
        setTimeout(() => {
          navTo("/admin")
          sessionStorage.clear();
        }, 1500);
      }
      else if (response.status === 400) {        
        const data = response.response.data;
        if (data.old !== null) newError.old = data.old;
        setErrors({...newError});
      }
      else {
        openSnackbar({
          text: "Lỗi hệ thống. Vui lòng thử lại sau!",
          type: "error"
        })
      }
    }
  }
}