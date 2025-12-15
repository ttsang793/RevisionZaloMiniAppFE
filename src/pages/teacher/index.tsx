import { useEffect } from "react";
import { useNavigate } from "zmp-ui";

export function TeacherPage() {
  const navTo = useNavigate();

  useEffect(() => {
    const checkData = () => {
      const id = sessionStorage.getItem("id");
      
      if (id) navTo("/teacher/question", { replace: true });
    }

    checkData();
  }, []);

  return <></>
}