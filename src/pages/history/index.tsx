import TestHolder from "@/components/test-holder";
import { Page } from "zmp-ui";
import StudentHeader from "@/components/student-header";
import axios from "axios";
import { useEffect } from "react";

//Code tam;
import { useNavigate } from "zmp-ui";

export default function HistoryPage() {
  const navTo = useNavigate(); // code tam;
  let inner = "";

  useEffect(() => {
    axios.get("http://localhost:5273/get").then(response => console.log(response));
  }, [])

  

  return (
    <Page className="page">
      <StudentHeader title="Lịch sử truy cập" />
            
      <div className="flex gap-5 flex-wrap justify-center">
        <button onClick={() => navTo("/first-time")}>Home</button>
      </div>
    </Page>
  )
}