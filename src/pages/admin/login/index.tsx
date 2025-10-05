import { useState, FormEvent } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string, password?: string }>();

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
            htmlFor="username"
            className="block pb-1"
          >
            ID tài khoản:
          </label>
          <input
            id="username"
            value={username}
            className="border border-zinc-300 py-2 px-4 rounded-md w-full focus:border-blue-800"
            placeholder="ID tài khoản"
            onChange={e => {
              setUsername(e.target.value);
              setErrors({...errors, username: ""})
            }}
          />
          <p className="zaui-text-red-60">{errors?.username}</p>
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
            value={password}
            className="border border-zinc-300 py-2 px-4 rounded-md w-full focus:border-blue-800"
            placeholder="Mật khẩu"
            onChange={e => {
              setPassword(e.target.value);
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

  function Login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
       
    const formData = new FormData(e.currentTarget);    
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const newError: { username?: string, password?: string } = {};
    
    if (username === "") newError.username = "Vui lòng nhập ID tài khoản!";
    if (password === "") newError.password = "Vui lòng nhập mật khẩu!";

    setErrors(newError);
    if (Object.keys(newError).length === 0) {
      alert("Đăng nhập thành công!");
      location.href = "/admin";
    }
  }
}