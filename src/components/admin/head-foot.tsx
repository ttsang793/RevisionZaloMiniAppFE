import { useState } from "react";
import { BoxArrowLeft, Lock } from "react-bootstrap-icons";
import { useLocation, useNavigate, useSnackbar } from 'zmp-ui';

const AdminHeader = () => {
  const navTo = useNavigate();
  const [isAccountHover, setIsAccountHover] = useState(false);
  let pathname = useLocation().pathname;
  if (pathname.endsWith("/")) pathname = pathname.substring(0, pathname.length);
  if (pathname === "/admin") return <></>;
  const role = sessionStorage.getItem("role");
  const { openSnackbar } = useSnackbar();

  return (role !== "AD") ? <></> : (
    <header className="flex items-center bg-blue-200 fixed top-0 left-0 right-0 px-4">
      <div className="flex-1 flex">
        <a
          href="/admin/subject"
          className={`${location.pathname.startsWith("/admin/subject") ? "bg-blue-900 text-blue-200" : "hover:bg-blue-100 text-blue-900" } duration-150 py-3 px-4 cursor-pointer`}
        >
          Môn học
        </a>
        <a
          href="/admin/topic"
          className={`${location.pathname.startsWith("/admin/topic") ? "bg-blue-900 text-blue-200" : "hover:bg-blue-100 text-blue-900" } duration-150 py-3 px-4 cursor-pointer`}
        >
          Chủ đề
        </a>
      </div>

      <div>
        <button
          className="flex items-center px-2 cursor-pointer duration-150 h-[47px]"
          onMouseEnter={() => setIsAccountHover(true)}
          onMouseLeave={() => setIsAccountHover(false)}
        >
          <img
            src={sessionStorage.getItem("avatar") || "https://res.cloudinary.com/dqxhmt5sp/image/upload/default_uqpoz0.jpg"}
            alt="avatar"
            onError={e => e.target.src = "https://res.cloudinary.com/dqxhmt5sp/image/upload/default_uqpoz0.jpg"}
            className="size-10 inline-block rounded-md me-1" />
          {sessionStorage.getItem("name")}
        </button>
        <ul
          className={`${isAccountHover ? "text-right bg-blue-100 fixed top-[46.5px] right-4" : "hidden"} duration-150 divide-y divide-zinc-200`}
          onMouseEnter={() => setIsAccountHover(true)}
          onMouseLeave={() => setIsAccountHover(false)}
        >
          <li
            className="py-2 px-4 cursor-pointer hover:bg-blue-200 duration-150"
            onClick={() => navTo("/admin/reset-password")}
          >
            <Lock className="inline me-1 cursor-pointer" size={20} /> Đổi mật khẩu
          </li>
          <li
            className="py-2 px-4 cursor-pointer hover:bg-blue-200 duration-150"
            onClick={() => handleLogout()}
          >
            <BoxArrowLeft className="inline me-1" size={20} /> Đăng xuất
          </li>
        </ul>
      </div>
    </header>
  )

  function handleLogout() {    
    setIsAccountHover(false);
    openSnackbar({
      text: "Đăng xuất thành công!",
      type: "success",
      duration: 1500
    })
    sessionStorage.clear();
    navTo("/admin/login");
  }
}

const AdminFooter = () => {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 bg-blue-900 text-blue-200 text-center py-1 font-bold"
    >
      &copy; {new Date().getFullYear()} by EmOnThi. All right reserved.
    </footer>
  )
}

export { AdminHeader, AdminFooter };