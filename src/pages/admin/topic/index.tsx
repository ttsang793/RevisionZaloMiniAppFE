import { useState, useEffect } from "react";
import { Pencil, PlusCircle, X } from "react-bootstrap-icons";
import { Page, Text } from "zmp-ui";
import InfoTopicModal from "./info-modal";
import { Topic, getTopics, deleteTopic } from "./uiHandlers";

export default function TopicManagement() {
  const [loading, setLoading] = useState(true);
  const [topicList, setTopicList] = useState([]);
  let [visible, setVisible] = useState(false);
  let [editId, setEditId] = useState("");
  
  useEffect(() => {
    getTopics().then(topic => setTopicList(topic));
    setLoading(false);
  }, []);

  return loading ? <h1>Hello Topic!</h1> : (
    <Page>      
      <Text.Title>Quản lý chủ đề môn học</Text.Title>
      <button className="bg-zinc-700 rounded-full text-zinc-100 px-4 py-1 flex items-center" onClick={() => setVisible(true)}>
        <PlusCircle className="inline me-1"/> Thêm chủ đề mới
      </button>

      <table className="bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên chủ đề</th>
            <th>Lớp</th>
            <th>Môn học</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
        {
          topicList.map((topic: Topic) =>
            <tr key={topic.id}>
              <td>{topic.id}</td>
              <td>{topic.name}</td>
              <td>
              {
                topic.classes.map((c: number, i: number) => (i === 0) ? c : `, ${c}`)
              }
              </td>
              <td>{topic.subject!.name}</td>
              <td className="text-center">
                <Pencil size={18} className="inline" onClick={() => { setVisible(true); setEditId(topic.id!) }} />
                <X size={24} className="inline" onClick={() => deleteTopic(topic.id!, topic.isVisible!)} />
              </td>

              <td>{topic.isVisible ? <>&#x2714;</> : ""}</td>
            </tr>
          )
        }
        </tbody>
      </table>

      <InfoTopicModal visible={visible} setVisible={setVisible} editId={editId} setEditId={setEditId} />
    </Page>
  )
}