import { Book, Mortarboard } from "react-bootstrap-icons";
import { Text, Page } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "zmp-sdk";
import { addStudent } from "@/models/student";

export default function ChooseRolePage() {
  const navTo = useNavigate();

  return (
    <Page className="flex flex-col justify-center text-center zaui-bg-blue-20 p-10">
      <div className="section-container flex flex-col gap-4">
        <Text.Title size="xLarge">Chào mừng bạn đến với MáyÔnTập! Mời bạn chọn vai trò:</Text.Title>

        <button onClick={handleNewStudent} className="w-full zaui-bg-green-20 border zaui-border-green-80 text-lg rounded-full py-2">
          <Book className="inline me-1" size={24} /> Học sinh
        </button>
        
        <button onClick={() => navTo("/register/teacher")} className="w-full zaui-bg-orange-20 border zaui-border-orange-80 text-lg rounded-full py-2">
          <Mortarboard className="inline me-1" size={24} /> Giáo viên
        </button>
      </div>
    </Page>
  )

  async function handleNewStudent() {
    try {
      const userResponse = await getUserInfo({ autoRequestPermission: false });
      const addResponse = await addStudent(userResponse.userInfo);
      if (addResponse === 201) {
        navTo("/student");
      }
    }
    catch (error) {
      console.error(error);
    }
  }
}