import { FormEvent } from "react";

export default function AdminLogin() {
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
            name="username"
            className="border border-zinc-300 py-2 px-4 rounded-md w-full focus:border-blue-800"
            placeholder="ID tài khoản"
            onInput={() => document.getElementById("username-error").innerHTML = ""}
          />
          <p id="username-error" className="text-red-500"></p>
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
            name="password"
            className="border border-zinc-300 py-2 px-4 rounded-md w-full focus:border-blue-800"
            placeholder="Mật khẩu"
            onInput={() => document.getElementById("password-error").innerHTML = ""}
          />
          <p id="password-error" className="text-red-500"></p>
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

    let errorFlag = false;
    if (username === "") {
      document.getElementById("username-error").innerHTML = "Vui lòng nhập ID tài khoản!";
      errorFlag = true;
    }

    if (password === "") {
      document.getElementById("password-error").innerHTML = "Vui lòng nhập mật khẩu!";
      errorFlag = true;
    }

    if (!errorFlag) {
      alert("Đăng nhập thành công!");
      location.href = "/admin";
    }
  }
}