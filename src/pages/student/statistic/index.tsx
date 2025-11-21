import axios from "axios";
import AchievementRow from "@/components/student/statistic/achievement";
import AppHeader from "@/components/header";
import { Tabs, Box, Text, Page } from "zmp-ui";
import { useState, useEffect } from "react";

type Achievement = {
  id: number,
  name: string,
  description: string,
  image: string,
  status: boolean
}

export default function StatisticPage() {
  const [title, setTitle] = useState("Danh hiệu");
  const [achievementList, setAchievementList] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = Number(sessionStorage.getItem("id"));

  useEffect(() => {
    axios.get(`/api/achievement/${studentId}`).then(response => setAchievementList(response.data));
    setLoading(false);
  }, []);

  return loading ? <>Chờ chút!</> : (
    <Page className="page-x-0">
      <AppHeader title={title} />
      <Tabs onTabClick={e => setTitle(e === "analyze" ? "Thông số" : "Danh hiệu")}>
        <Tabs.Tab label="Danh hiệu" key="achievement">
          <Box className="bg-white" p={4}>
            {
              achievementList.map((achievement: Achievement) => 
                <AchievementRow achievement={achievement} key={"achive_" + achievement.id} />
              )
            }
          </Box>
        </Tabs.Tab>
        <Tabs.Tab label="Thông số" key="statistic">
          <Box>
            <Text>Bonjour World</Text>
          </Box>
        </Tabs.Tab>
      </Tabs>
    </Page>
  )
}