import { useState } from "react";
import { BoxArrowLeft, Gear } from "react-bootstrap-icons";
import { useLocation } from 'react-router-dom';

const AdminHeader = () => {
  const [isAccountHover, setIsAccountHover] = useState(false);
  let pathname = useLocation().pathname;
  if (pathname.endsWith("/")) pathname = pathname.substring(0, pathname.length);

  return (pathname === "/admin/login") ? <></> : (
    <header className="flex items-center bg-blue-200 fixed top-0 left-0 right-0 px-4">
      <div className="flex-1 flex">
        <input type="button" value="MayOnThi" />
        <a
          href="/admin"
          className={`${location.pathname === "/admin" ? "bg-blue-900 text-blue-200" : "text-blue-900" } hover:bg-blue-800 hover:text-blue-200 duration-150 py-3 px-4 cursor-pointer`}
        >
          Kiểm duyệt
        </a>
        <a
          href="/admin/subject"
          className={`${location.pathname.startsWith("/admin/subject") ? "bg-blue-900 text-blue-200" : "text-blue-900" } hover:bg-blue-800 hover:text-blue-200 duration-150 py-3 px-4 cursor-pointer`}
        >
          Môn học
        </a>
        <a
          href="/admin/topic"
          className={`${location.pathname.startsWith("/admin/topic") ? "bg-blue-900 text-blue-200" : "text-blue-900" } hover:bg-blue-800 hover:text-blue-200 duration-150 py-3 px-4 cursor-pointer`}
        >
          Chủ đề
        </a>
      </div>

      <div>
        <button
          className="flex items-center px-2 cursor-pointer duration-150 h-[47px] hover:bg-blue-800 hover:text-blue-200"
          onMouseEnter={() => setIsAccountHover(true)}
          onMouseLeave={() => setIsAccountHover(false)}
        >
          <img src="/avatar/default.jpg" alt="avatar" className="size-10 inline-block rounded-xl me-1" />
          Admin
        </button>
        <ul
          className={`${isAccountHover ? "text-right bg-blue-100 fixed top-[46.5px] right-4" : "hidden"} duration-150 divide-y divide-zinc-200`}
          onMouseEnter={() => setIsAccountHover(true)}
          onMouseLeave={() => setIsAccountHover(false)}
        >
          <li className="py-2 px-4 cursor-pointer hover:bg-blue-200 duration-150">
            <Gear className="inline me-1 cursor-pointer" size={20} /> Cài đặt
          </li>
          <li className="py-2 px-4 cursor-pointer hover:bg-blue-200 duration-150">
            <BoxArrowLeft className="inline me-1" size={20} /> Đăng xuất
          </li>
        </ul>
      </div>
    </header>
  )
}

const AdminFooter = () => {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 bg-blue-900 text-blue-200 text-center py-1 font-bold"
    >
      &copy; 2025. All right reserved
    </footer>
  )
}

export { AdminHeader, AdminFooter };