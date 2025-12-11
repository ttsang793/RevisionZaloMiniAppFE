import axios from "axios";
import AchievementRow from "@/components/student/statistic/achievement";
import AppHeader from "@/components/header";
import { Tabs, Box, Text, Page, Spinner, Select } from "zmp-ui";
import { useState, useEffect } from "react";
import { BestExamsList, WorstExamsList } from "@/components/student/statistic/best-worst-exam-list";
import { CorrectRate } from "@/components/student/statistic/correct-rate";
import { PointChart } from "@/components/student/statistic/point-chart";

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
  const [statisticData, setStatisticData] = useState([]);
  const [subjectId, setSubjectId] = useState("TOAN");
  const [loading, setLoading] = useState(true);
  const studentId = Number(sessionStorage.getItem("id"));

  useEffect(() => {
    axios.get(`/api/achievement/${studentId}`).then(response => setAchievementList(response.data)).catch(() => setAchievementList([]));
    axios.get(`/api/statistic/student/${studentId}/${subjectId}`).then(response => setStatisticData(response.data));
    setLoading(false);
  }, []);

  if (loading) return (
    <Page className="page page-wo-footer">
      <AppHeader title="Danh hiệu" />

      <Box className="section-container text-center place-items-center">
        <Spinner />
        <Text className="mt-2 italic">Đang tải thông tin...</Text>
      </Box>
    </Page>
  )

  return (
    <Page className="page-x-0">
      <AppHeader title={title} />
      <Tabs onTabClick={e => setTitle(e === "analyze" ? "Thông số" : "Danh hiệu")}>
        <Tabs.Tab label="Danh hiệu" key="achievement">
          <Box className="bg-white" p={4}>
            {
              achievementList.map((achievement: Achievement) => 
                <AchievementRow achievement={achievement} key={"achieve_" + achievement.id} />
              )
            }
          </Box>
        </Tabs.Tab>
        <Tabs.Tab label="Thông số" key="statistic">
          <Box>
            <Box className="bg-white" p={4}>
              <Select
                value={subjectId}
                onChange={(e: string) => setSubjectId(e)} 
              >
                <Select.Option value="TOAN" title="Toán" />
              </Select>


              {/* Biểu đồ điểm số */}
              <Text.Title className="border-b pb-1 w-full zaui-border-blue-80 mt-4 mb-3">Biểu đồ điểm số</Text.Title>
              <PointChart pointData={statisticData[0]} />
              {/* Số câu đúng sai */}
              <Text.Title className="border-b pb-1 w-full zaui-border-blue-80 mt-4 mb-3">Tỉ lệ đúng sai</Text.Title>
              <Box className="divide-y divide-gray-200">
              {
                [1,2,3,4].map(i => 
                  <CorrectRate
                    difficulty={i - 1} key={`difficulty_${i}`}
                    ratingList={statisticData.length === 0 ? [] : statisticData[1][i - 1]}
                  />
                )
              }
              </Box>

              {/* Bài kiểm tra điểm tốt nhất */}
              <Text.Title className="border-b pb-1 w-full zaui-border-blue-80 mt-4 mb-3">Bài kiểm tra tốt nhất</Text.Title>
              <BestExamsList examList={statisticData[2]} />

              {/* Bài kiểm tra điểm tệ nhất */}
              <Text.Title className="border-b pb-1 w-full zaui-border-blue-80 mt-4 mb-3">Bài kiểm tra có điểm thấp nhất</Text.Title>
              <WorstExamsList examList={statisticData[2]} />
            </Box>
          </Box>
        </Tabs.Tab>
      </Tabs>
    </Page>
  )
}