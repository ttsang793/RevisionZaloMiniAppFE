import { useState, useEffect } from "react";
import { Eye, EyeSlash, Pencil, PlusCircleFill } from "react-bootstrap-icons";
import { Box, Input, Page, Text, useNavigate, useSnackbar } from "zmp-ui";
import InfoTopicModal from "./info-modal";
import { Topic, getTopics, getTopicByName, deleteTopic } from "@/models/topic";

export default function TopicManagement() {
  const navTo = useNavigate();
  const { openSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [searchParam, setSearchParam] = useState("");
  let [topicList, setTopicList] = useState([]);
  const role = sessionStorage.getItem("role");
  let [visible, setVisible] = useState(false);
  let [editId, setEditId] = useState("");

  const { Search } = Input;
  
  useEffect(() => {
    if (role !== "AD") {
      navTo("/admin", { replace: true });
      return; 
    }
    fetchData();
  }, []);

  return (role !== "AD") ? <></> : (
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
                  topic.grades.map((c: number, i: number) => (i === 0) ? c : `, ${c}`)
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
                        <EyeSlash size={20} className="inline" onClick={() => handleDeleteTopic(topic)} />
                      </abbr>
                    </>
                  ) : (
                    <abbr title="Hiện chủ đề">
                      <Eye size={20} className="inline" onClick={() => handleDeleteTopic(topic)} />
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

      <InfoTopicModal
        visible={visible} setVisible={setVisible}
        editId={editId} setEditId={setEditId}
        fetchData={fetchData}
      />
    </Page>
  )

  async function fetchData() {
    setLoading(true);
    getTopics().then(topic => setTopicList(topic))
      .catch(err => {
        console.error(err);
        setTopicList([]);
      });
    setLoading(false);
  }

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

  function handleDeleteTopic(topic: Topic) {
    openSnackbar({
      text: `Bạn có muốn ${topic.isVisible ? "ẩn" : "hiện"} chủ đề này?`,
      action: {
        text: "Có",
        close: true,
        onClick: async () => {
          const response = await deleteTopic(topic.id!);

          if (response.status === 200) {
            openSnackbar({
              text: "Thay đối trạng thái thành công!",
              type: "success",
              duration: 1500
            })
            fetchData();
          }
          else if (response.status === 202) {
            openSnackbar({
              text: "Cần thay đổi trạng thái môn học của chủ đề!",
              type: "error",
            })
          }
          else {
            openSnackbar({
              text: "Thay đối trạng thái thất bại!",
              type: "error"
            });
            console.error(response);
          }
        }
      },
      type: `${topic.isVisible ? "warning" : "default"}`,
      verticalAction: true,
      icon: true,
      duration: 5000
    });
  }
}