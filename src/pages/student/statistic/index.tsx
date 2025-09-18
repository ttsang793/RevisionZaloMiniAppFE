import Achivement from "@/components/statistic/achivement"
import StudentHeader from "@/components/student-header"
import { Tabs, Box, Text, Page } from "zmp-ui";
import { useState } from "react";

export default function StatisticPage() {
  const [title, setTitle] = useState("Danh hiệu");

  return (
    <Page className="page-x-0">
      <StudentHeader title={title} />
      <Tabs onTabClick={e => setTitle(e === "analyze" ? "Thông số" : "Danh hiệu")}>
        <Tabs.Tab label="Danh hiệu" key="achivement">
          <Box className="bg-white" p={4}>
            <Achivement />
            <Achivement achived />
            <Achivement achived />
            <Achivement />
          </Box>
        </Tabs.Tab>
        <Tabs.Tab label="Thông số" key="analyze">
          <Box>
            <Text>Bonjour World</Text>
          </Box>
        </Tabs.Tab>
      </Tabs>
    </Page>
  )
}