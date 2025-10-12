import TestHolder from "@/components/exam-holder";
import { Page } from "zmp-ui";
import AppHeader from "@/components/header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  return (
    <Page className="page">
      <AppHeader title="Lịch sử truy cập" />
            
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
      <AppHeader title="Lịch sử truy cập" />
            
      <div className="flex gap-5 flex-wrap justify-center">
        <button onClick={() => navTo("/first-time")}>{inner}</button>
      </div>
    </Page>
  )
}*/