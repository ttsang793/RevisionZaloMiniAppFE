import { render_api } from "@/script/util";
import AchievementRow from "@/components/student/statistic/achievement";
import AppHeader from "@/components/header";
import { Tabs, Box, Text, Page, Spinner, Select } from "zmp-ui";
import { useState, useEffect } from "react";
import { BestExamsList, WorstExamsList } from "@/components/student/statistic/best-worst-exam-list";
import { CorrectRate } from "@/components/student/statistic/correct-rate";
import { PointChart } from "@/components/student/statistic/point-chart";
import { getSubjectsByGrade, Subject } from "@/models/subject";
import { UserStorage } from "@/models/user";

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
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [statisticData, setStatisticData] = useState([]);
  const [subjectId, setSubjectId] = useState("TOAN");
  const [loading, setLoading] = useState(true);
  const studentId = UserStorage.getId();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchStatistic();
  }, [subjectId]);

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
      <Tabs onTabClick={e => setTitle(e === "statistic" ? "Thông số" : "Danh hiệu")}>
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
                value={subjectId} label="Môn học"
                onChange={(e: string) => setSubjectId(e)}
                closeOnSelect
              >
              {
                subjectList.map((s: Subject) => <Select.Option value={s.id} title={s.name} key={`sub-${s.id}`} />)
              }                
              </Select>


              {/* Biểu đồ điểm số */}
              <Text.Title className="border-b pb-1 w-full zaui-border-blue-80 mt-4 mb-3">Biểu đồ điểm số</Text.Title>
              <PointChart pointData={statisticData[0]} />
              {/* Số câu đúng sai */}
              <Text.Title className="border-b pb-1 w-full zaui-border-blue-80 mt-4 mb-3">Tỉ lệ đúng sai</Text.Title>
              <Box className="divide-y divide-gray-200">
              {
                [1,2,3,4].map((i: number) => 
                  <CorrectRate
                    key={`difficulty_${i}`}
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
              <WorstExamsList examList={statisticData[3]} />
            </Box>
          </Box>
        </Tabs.Tab>
      </Tabs>
    </Page>
  )

  async function fetchData() {
    const achievementResponse = await render_api.get(`/api/achievement/${studentId}`);
    setAchievementList(achievementResponse.data || []);
    
    const subjectResponse = await getSubjectsByGrade(UserStorage.getGrade());
    setSubjectList(subjectResponse || []);

    await fetchStatistic();
    setLoading(false);
  }

  async function fetchStatistic() {
    const statisticResponse = await render_api.get(`/api/statistic/student/${studentId}/${subjectId}`);
    setStatisticData(statisticResponse.data);
  }
}