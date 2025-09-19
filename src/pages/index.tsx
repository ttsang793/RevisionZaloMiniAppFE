import { Book, Mortarboard } from "react-bootstrap-icons";
import { Text, Page } from "zmp-ui";
import { redirect } from "@/script/util";

export default function ChooseRolePage() {
  return (
    <Page className="flex flex-col justify-center text-center zaui-bg-blue-20 p-10">
      <div className="section-container flex flex-col gap-4">
        <Text.Title size="xLarge">Chào mừng bạn đến với MáyÔnTập! Mời bạn chọn vai trò:</Text.Title>

        <button onClick={() => redirect("/student")} className="w-full zaui-bg-green-20 border zaui-border-green-80 text-lg rounded-full py-2">
          <Book className="inline me-1" size={24} /> Học sinh
        </button>
        
        <button className="w-full zaui-bg-orange-20 border zaui-border-orange-80 text-lg rounded-full py-2">
          <Mortarboard className="inline me-1" size={24} /> Giáo viên
        </button>
      </div>
    </Page>
  )
}