import { AdminLogin, vertifyAdmin } from "@/models/user";
import { useState, FormEvent } from "react";
import { useNavigate } from "zmp-ui";

export default function AdminLoginPage() {
  const [admin, setAdmin] = useState<AdminLogin>(new AdminLogin());
  const [errors, setErrors] = useState<{ id?: string, password?: string }>();
  const navTo = useNavigate();

  return (
    <div className="flex h-dvh justify-center items-center px-20 bg-blue-100">
      <form
        onSubmit={Login}
        noValidate
        className="p-4 rounded-lg flex-1 max-w-80 bg-white shadow-lg"
      >
        <h1 className="uppercase text-center text-2xl font-bold pb-4">Đăng nhập</h1>

        <div className="pb-4">
          <label
            htmlFor="id"
            className="block pb-1"
          >
            ID tài khoản:
          </label>
          <input
            id="id"
            value={admin.id}
            className="border border-zinc-300 py-2 px-4 rounded-md w-full focus:border-blue-800"
            placeholder="ID tài khoản"
            onChange={e => {
              setAdmin({...admin, id: e.target.value});
              setErrors({...errors, id: ""})
            }}
          />
          <p className="zaui-text-red-60">{errors?.id}</p>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block pb-1"
          >
            Mật khẩu:
          </label>
          <input
            type="password"
            id="password"
            value={admin.password}
            className="border border-zinc-300 py-2 px-4 rounded-md w-full focus:border-blue-800"
            placeholder="Mật khẩu"
            onChange={e => {
              setAdmin({...admin, password: e.target.value});
              setErrors({...errors, password: ""})
            }}
          />
          <p className="zaui-text-red-60">{errors?.password}</p>
        </div>

        <div className="text-center">
          <input
            type="submit"
            value="Đăng nhập"
            className="bg-blue-950 hover:bg-blue-900 text-blue-50 py-2 px-6 rounded-full mt-4 me-2"
          />
        </div>
      </form>
    </div>
  )

  async function Login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newError: { id?: string, password?: string } = {};
    
    if (!admin.id) newError.id = "Vui lòng nhập ID tài khoản!";
    if (!admin.password) newError.password = "Vui lòng nhập mật khẩu!";

    setErrors(newError);
    if (Object.keys(newError).length === 0) {
      const response = await vertifyAdmin(admin);
      
      if (response.status === 200) {
        //navTo("/admin");
      }
      else if (response.status === 400) {
        const data = response.response.data;
        console.log(data);
        if (data.idError !== null) newError.id = data.idError;
        if (data.passwordError !== null) newError.password = data.passwordError;
        setErrors({...newError});
      }
    }
  }
}