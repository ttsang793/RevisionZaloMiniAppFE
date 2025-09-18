import TestHolder from "@/components/test-holder";
import { Page } from "zmp-ui";
import StudentHeader from "@/components/student-header";
import axios from "axios";
import { useEffect, useState } from "react";



export default function HistoryPage() {
  return (
    <Page className="page">
      <StudentHeader title="Lịch sử truy cập" />
            
      <div className="flex gap-5 flex-wrap justify-center">
        Hello World
      </div>
    </Page>
  )
}

/*export default function HistoryPage() {
  const [loading, setLoading] = useState(true);
  const navTo = useNavigate(); // code tam;
  const [inner, setInner] = useState("");

  useEffect(() => {
    axios.get("/test/get").then(response => {
      setInner(response.data);
      setLoading(false);
    });
  }, [])

  

  return loading ? <></> : (
    <Page className="page">
      <StudentHeader title="Lịch sử truy cập" />
            
      <div className="flex gap-5 flex-wrap justify-center">
        <button onClick={() => navTo("/first-time")}>{inner}</button>
      </div>
    </Page>
  )
}*/