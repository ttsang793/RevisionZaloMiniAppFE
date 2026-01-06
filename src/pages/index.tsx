import { Book, Mortarboard } from "react-bootstrap-icons";
import { Text, Page } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "zmp-sdk";
import { UserStorage, getStudentById, getTeacherSubjectById, getUserByZaloId } from "@/models/user";
import { useState, useEffect } from "react";

export default function ChooseRolePage() {
  const navTo = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Page className="flex flex-col justify-center text-center zaui-bg-blue-20 p-10">
    {
      loading ? <></> : (
        <div className="section-container flex flex-col gap-4">
          <Text.Title size="xLarge">Chào mừng bạn đến với EmOnThi! Mời bạn chọn vai trò:</Text.Title>

          <button
            className="w-full zaui-bg-green-20 border zaui-border-green-80 text-lg rounded-full py-2"
            onClick={() => navTo("/register/student", {
              state: { studentInfo: userInfo }
            })}
          >
            <Book className="inline me-1" size={24} /> Học sinh
          </button>
          
          <button
            className="w-full zaui-bg-orange-20 border zaui-border-orange-80 text-lg rounded-full py-2"
            onClick={() => navTo("/register/teacher", {
              state: { teacherInfo: userInfo }
            })}
          >
            <Mortarboard className="inline me-1" size={24} /> Giáo viên
          </button>
        </div>
      )
    }
    </Page>
  )

  async function loadUser() {
    const userResponse = await getUserInfo({ autoRequestPermission: true });
    const user = userResponse.userInfo;
    setUserInfo(user);

    try {    
      const curUser = await getUserByZaloId(user.id);
      const curUserData = curUser.data;
      
      UserStorage.setUserData({
        id: curUserData.id,
        role: curUserData.role,
        avatar: (!curUserData.avatar || curUserData.avatar.length === 0) ? "https://res.cloudinary.com/dqxhmt5sp/image/upload/default_uqpoz0.jpg" : curUserData.avatar
      });  

      if (curUserData.role === "GV") {
        const teacherResponse = await getTeacherSubjectById(curUserData.id);
        UserStorage.setTeacherData(teacherResponse.data);
        navTo("/teacher/question");
      }
      else if (curUserData.role === "HS") {
        const studentResponse = await getStudentById(curUserData.id);
        UserStorage.setStudentData(studentResponse.data);
        navTo("/student");
      }
      else throw new Error();
    }
    catch (err) {
      console.error(err);
      UserStorage.clear();
      setLoading(false);
    }
  }
}