import { useState, useEffect } from "react";
import { Eye, EyeSlash, Pencil, PlusCircleFill } from "react-bootstrap-icons";
import { Box, Input, Page, Text } from "zmp-ui";
import InfoTopicModal from "./info-modal";
import { Topic, getTopics, getTopicByName, deleteTopic } from "@/models/topic";

export default function TopicManagement() {
  const [loading, setLoading] = useState(true);
  const [searchParam, setSearchParam] = useState("");
  let [topicList, setTopicList] = useState([]);
  let [visible, setVisible] = useState(false);
  let [editId, setEditId] = useState("");

  const { Search } = Input;
  
  useEffect(() => {
    getTopics().then(topic => setTopicList(topic))
      .catch(err => {
        console.error(err);
        setTopicList([]);
      });
    setLoading(false);
  }, []);

  return (
    <Page className="page-admin">
      <Text.Title
        className="text-center uppercase text-3xl mb-3 font-bold"
      >
        Quản lý chủ đề môn học
      </Text.Title>
      
      <Box className="flex justify-between mb-4">
        <button
          className="bg-blue-900 rounded-lg text-zinc-100 px-8 flex items-center"
          onClick={() => setVisible(true)}
        >
          <PlusCircleFill className="inline me-2" size={20}/> Thêm chủ đề mới
        </button>

        <Search
          placeholder="Nhập chủ đề cần tìm..." value={searchParam} className="w-1/2"
          onChange={e => setSearchParam(e.target.value)} onSearch={() => searchTopic()}
        />
      </Box>

      <table className="w-full">
        <thead className="cursor-default">
          <tr className="bg-blue-100">
            <th className="border border-zinc-700 py-1">ID</th>
            <th className="border border-zinc-700">Tên chủ đề</th>
            <th className="border border-zinc-700">Lớp</th>
            <th className="border border-zinc-700">Môn học</th>
            <th className="border border-zinc-700">Hành động</th>
          </tr>
        </thead>
        <tbody>
        {
          loading ? (
            <tr>
              <th colSpan={10} className="bg-white border border-zinc-500 font-medium italic py-1">
                Đang tải dữ liệu...
              </th>
            </tr>
          ) : (
            topicList.length === 0 ? (
              <tr>
                <th colSpan={10} className="bg-white border border-zinc-500 font-medium italic py-1">
                  Chưa có chủ đề nào!
                </th>
              </tr>
            ) : topicList.map((topic: Topic) =>
              <tr key={topic.id} className="odd:bg-white even:bg-blue-50 hover:bg-blue-400/20 cursor-pointer duration-150">
                <th className="font-medium border border-zinc-500 py-1">{topic.id}</th>
                <td className="border border-zinc-500 px-2">{topic.name}</td>
                <td className="border border-zinc-500 px-2">
                {
                  topic.classes.map((c: number, i: number) => (i === 0) ? c : `, ${c}`)
                }
                </td>
                <td className="border border-zinc-500 px-2">
                  {topic.subject!.name}
                </td>
                <td className="border border-zinc-500 text-center">
                {
                  topic.isVisible ? (
                    <>
                      <abbr title="Cập nhật">
                        <Pencil size={20} className="inline me-1" onClick={() => { setVisible(true); setEditId(topic.id!) }} />
                      </abbr>
                      <abbr title="Ẩn chủ đề">
                        <Eye size={20} className="inline" onClick={() => deleteTopic(topic.id!, topic.isVisible!)} />
                      </abbr>
                    </>
                  ) : (
                    <abbr title="Hiện chủ đề">
                      <EyeSlash size={20} className="inline" onClick={() => deleteTopic(topic.id!, topic.isVisible!)} />
                    </abbr>
                  )
                }
                </td>
              </tr>
            )
          )
        }
        </tbody>
      </table>

      <InfoTopicModal visible={visible} setVisible={setVisible} editId={editId} setEditId={setEditId} />
    </Page>
  )

  async function searchTopic() {
    setLoading(true);
    try {
      const response = await getTopicByName(searchParam);
      setTopicList(response);
    } catch (err) {
      console.error(err);
      setTopicList([]);
    } finally {
      setLoading(false);
    }
  }
}